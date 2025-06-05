
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CodeAnalysisRequest {
  code: string;
  language: 'solidity' | 'vyper' | 'rust' | 'javascript';
  analysisType: 'security' | 'gas' | 'compliance' | 'full';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { code, language, analysisType }: CodeAnalysisRequest = await req.json();

    console.log(`Starting ${analysisType} analysis for ${language} code`);

    const systemPrompt = `You are an expert Web3 security auditor specializing in smart contract analysis. 
    Analyze the provided ${language} code for ${analysisType === 'full' ? 'security vulnerabilities, gas optimizations, and compliance issues' : analysisType + ' issues'}.
    
    Return a JSON response with the following structure:
    {
      "securityScore": number (0-100),
      "vulnerabilities": [
        {
          "id": "unique_id",
          "severity": "critical|high|medium|low|info",
          "category": "string",
          "title": "string",
          "description": "string",
          "location": { "line": number, "column": number },
          "recommendation": "string",
          "confidence": number (0-100)
        }
      ],
      "gasOptimizations": [
        {
          "function": "string",
          "suggestion": "string",
          "estimatedSavings": number,
          "difficulty": "easy|medium|hard"
        }
      ],
      "complianceChecks": {
        "standards": ["ERC-20", "ERC-721", etc.],
        "violations": [
          {
            "standard": "string",
            "violation": "string",
            "severity": "string"
          }
        ]
      },
      "summary": {
        "totalIssues": number,
        "criticalIssues": number,
        "gasOptimizationPotential": number,
        "overallRating": "excellent|good|fair|poor"
      }
    }`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze this ${language} code:\n\n${code}` }
        ],
        temperature: 0.1,
        max_tokens: 4000
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const analysisContent = data.choices[0].message.content;

    console.log('AI Analysis completed');

    // Parse the JSON response from OpenAI
    let analysisResult;
    try {
      analysisResult = JSON.parse(analysisContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Fallback response
      analysisResult = {
        securityScore: 75,
        vulnerabilities: [
          {
            id: "fallback_1",
            severity: "medium",
            category: "Analysis Error",
            title: "Unable to parse detailed analysis",
            description: "The AI analysis completed but the response format was invalid",
            location: { line: 1 },
            recommendation: "Please try again or contact support",
            confidence: 50
          }
        ],
        gasOptimizations: [],
        complianceChecks: {
          standards: [],
          violations: []
        },
        summary: {
          totalIssues: 1,
          criticalIssues: 0,
          gasOptimizationPotential: 0,
          overallRating: "fair"
        }
      };
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in AI code analysis:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      securityScore: 0,
      vulnerabilities: [],
      gasOptimizations: [],
      complianceChecks: { standards: [], violations: [] },
      summary: {
        totalIssues: 0,
        criticalIssues: 0,
        gasOptimizationPotential: 0,
        overallRating: "poor"
      }
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
