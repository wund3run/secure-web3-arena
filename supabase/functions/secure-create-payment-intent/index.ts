
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting map
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

function checkRateLimit(key: string, maxAttempts: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now - entry.lastReset > windowMs) {
    rateLimitMap.set(key, { count: 1, lastReset: now });
    return true;
  }

  if (entry.count >= maxAttempts) {
    return false;
  }

  entry.count++;
  return true;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate origin
    const origin = req.headers.get("origin");
    const allowedOrigins = [
      "https://hawkly.app",
      "https://hawkly.app",
      "http://localhost:8080"
    ];
    
    if (origin && !allowedOrigins.includes(origin)) {
      throw new Error("Unauthorized origin");
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      throw new Error("Unauthorized");
    }

    // Rate limiting per user
    const rateLimitKey = `payment_${userData.user.id}`;
    if (!checkRateLimit(rateLimitKey, 10, 3600000)) { // 10 requests per hour
      throw new Error("Rate limit exceeded");
    }

    const { amount, currency, description, audit_request_id, escrow_contract_id } = await req.json();

    // Validate input
    if (!amount || amount <= 0 || amount > 1000000) { // Max $10,000
      throw new Error("Invalid amount");
    }

    if (!currency || currency !== "usd") {
      throw new Error("Invalid currency");
    }

    if (!description || description.length > 500) {
      throw new Error("Invalid description");
    }

    // Verify user has access to the audit request
    if (audit_request_id) {
      const { data: auditRequest, error: auditError } = await supabaseClient
        .from("audit_requests")
        .select("client_id")
        .eq("id", audit_request_id)
        .single();

      if (auditError || auditRequest.client_id !== userData.user.id) {
        throw new Error("Unauthorized access to audit request");
      }
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Create or retrieve customer
    const customers = await stripe.customers.list({
      email: userData.user.email!,
      limit: 1,
    });

    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      const customer = await stripe.customers.create({
        email: userData.user.email!,
        metadata: {
          user_id: userData.user.id,
        },
      });
      customerId = customer.id;
    }

    // Create payment intent with enhanced security
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency,
      customer: customerId,
      description: description,
      metadata: {
        user_id: userData.user.id,
        audit_request_id: audit_request_id || "",
        escrow_contract_id: escrow_contract_id || "",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Log the payment intent creation
    await supabaseClient.rpc('log_security_event', {
      p_user_id: userData.user.id,
      p_event_type: 'PAYMENT_INTENT_CREATED',
      p_event_description: 'Payment intent created successfully',
      p_metadata: {
        amount: amount,
        currency: currency,
        payment_intent_id: paymentIntent.id
      }
    });

    console.log(`Payment intent created: ${paymentIntent.id} for user: ${userData.user.id}`);

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error creating payment intent:", error);
    
    // Don't expose internal errors
    const safeError = error.message.includes("Rate limit") || 
                     error.message.includes("Invalid") ||
                     error.message.includes("Unauthorized") 
                     ? error.message 
                     : "Payment processing error";

    return new Response(
      JSON.stringify({ error: safeError }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: error.message.includes("Unauthorized") ? 401 : 400,
      }
    );
  }
});
