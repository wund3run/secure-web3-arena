import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Add retry mechanism for critical operations
const maxRetries = 3;
const withRetry = async (operation) => {
  let retryCount = 0;
  while (retryCount < maxRetries) {
    try {
      return await operation();
    } catch (error) {
      retryCount++;
      if (retryCount === maxRetries) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
    }
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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

    const { amount, currency, description, audit_request_id, escrow_contract_id }: { amount: number; currency?: string; description?: string; audit_request_id?: string; escrow_contract_id?: string } = await req.json();

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

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Ensure it's an integer
      currency: currency || "usd",
      customer: customerId,
      description: description || "Hawkly security audit payment",
      metadata: {
        user_id: userData.user.id,
        audit_request_id: audit_request_id || "",
        escrow_contract_id: escrow_contract_id || "",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Log payment intent creation
    console.log(`Payment intent created: ${paymentIntent.id} for user: ${userData.user.id}`);

    return new Response(
      JSON.stringify({
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        status: paymentIntent.status,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: unknown) {
    let message = "Unknown error";
    if (typeof error === "object" && error && "message" in error) {
      message = (error as { message: string }).message;
    }
    console.error("Error creating payment intent:", error);
    return new Response(
      JSON.stringify({ error: message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

const projectOwnerOnboardingSteps = [
  {
    title: 'Account Setup',
    fields: ['email', 'password', 'confirmPassword']
  },
  {
    title: 'Project Information',
    fields: ['fullName', 'projectName', 'projectType']
  },
  {
    title: 'Security Needs',
    fields: ['securityNeeds', 'timeline', 'budget']
  }
];

const auditorOnboardingSteps = [
  {
    title: 'Account Setup',
    fields: ['email', 'password', 'confirmPassword']
  },
  {
    title: 'Professional Information',
    fields: ['fullName', 'company', 'yearsExperience']
  },
  {
    title: 'Specializations',
    fields: ['specializations', 'blockchains', 'certifications']
  },
  {
    title: 'Verification',
    fields: ['portfolio', 'linkedin', 'github']
  }
];

// Enhanced progress tracking
interface ProgressMetrics {
  currentStage: string;
  completedSteps: number;
  totalSteps: number;
  estimatedTimeRemaining: number;
  lastActivity: Date;
}
