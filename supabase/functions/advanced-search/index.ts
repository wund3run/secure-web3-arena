
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    const { 
      query = null, 
      types = [], 
      tags = [],  
      category = null,
      sortBy = 'relevance', 
      page = 1, 
      limit = 20
    } = await req.json();

    console.log("Advanced search request:", { query, types, tags, category, sortBy, page, limit });

    const rpcParams = {
      search_term: query,
      filter_types: types,
      filter_tags: tags,
      filter_category: category,
      sort_by: sortBy,
      page_num: page,
      page_size: limit,
    };

    const { data, error } = await supabaseClient.rpc("advanced_search", rpcParams);

    if (error) {
      console.error("RPC Error:", error);
      throw error;
    }

    const totalCount = data?.[0]?.total_count ?? 0;
    const results = data?.map(({ total_count, ...rest }) => rest) ?? [];

    console.log(`Search completed: ${results.length} results, total: ${totalCount}`);

    return new Response(
      JSON.stringify({
        results: results,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: Number(totalCount),
          totalPages: Math.ceil(totalCount / limit),
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error in advanced-search function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An unexpected error occurred." }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
