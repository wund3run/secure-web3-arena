import { serve } from "std/http/server.ts";
import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = process.env.SUPABASE_URL ?? "";
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
    const supabaseClient = createClient(
      supabaseUrl,
      supabaseServiceRoleKey,
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

    const { client_id, auditor_id, total_amount, milestones }: { client_id: string; auditor_id: string; total_amount: number; milestones: { title: string; description: string; amount: number }[] } = await req.json();

    // Create escrow contract
    const { data: escrowContract, error: escrowError } = await supabaseClient
      .from("escrow_contracts")
      .insert({
        client_id,
        auditor_id,
        total_amount,
        title: "Security Audit Escrow",
        description: "Milestone-based payment for security audit services",
        status: "pending",
      })
      .select()
      .single();

    if (escrowError) {
      throw escrowError;
    }

    // Create milestones
    const milestoneInserts = milestones.map((milestone) => ({
      escrow_contract_id: escrowContract.id,
      title: milestone.title,
      description: milestone.description,
      amount: milestone.amount,
    }));

    const { data: createdMilestones, error: milestonesError } = await supabaseClient
      .from("milestones")
      .insert(milestoneInserts)
      .select();

    if (milestonesError) {
      throw milestonesError;
    }

    console.log(`Escrow contract created: ${escrowContract.id} with ${createdMilestones.length} milestones`);

    return new Response(
      JSON.stringify({
        escrow_contract: escrowContract,
        milestones: createdMilestones,
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
    console.error("Error creating escrow contract:", error);
    return new Response(
      JSON.stringify({ error: message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
