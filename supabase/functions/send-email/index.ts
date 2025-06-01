
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  template?: 'audit_status' | 'finding_alert' | 'welcome' | 'notification';
  templateData?: any;
}

const getEmailTemplate = (template: string, data: any) => {
  switch (template) {
    case 'audit_status':
      return `
        <h1>Audit Status Update</h1>
        <p>Your audit "${data.projectName}" has been updated.</p>
        <p><strong>New Status:</strong> ${data.status}</p>
        <p><strong>Message:</strong> ${data.message}</p>
        <a href="${data.actionUrl}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">View Audit Details</a>
      `;
    case 'finding_alert':
      return `
        <h1>Security Finding Alert</h1>
        <p>A ${data.severity} severity finding has been identified in your audit.</p>
        <p><strong>Title:</strong> ${data.title}</p>
        <p><strong>Description:</strong> ${data.description}</p>
        <a href="${data.actionUrl}" style="background: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">View Finding</a>
      `;
    case 'welcome':
      return `
        <h1>Welcome to Hawkly!</h1>
        <p>Thank you for joining our Web3 security audit platform.</p>
        <p>Your account has been successfully created. You can now:</p>
        <ul>
          <li>Request security audits for your projects</li>
          <li>Connect with verified security auditors</li>
          <li>Track audit progress in real-time</li>
        </ul>
        <a href="${data.dashboardUrl}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Go to Dashboard</a>
      `;
    default:
      return data.html || `
        <h1>${data.title}</h1>
        <p>${data.message}</p>
      `;
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, html, template, templateData }: EmailRequest = await req.json();

    const emailHtml = template ? getEmailTemplate(template, templateData) : html;

    const emailResponse = await resend.emails.send({
      from: "Hawkly Security <noreply@hawkly.dev>",
      to: [to],
      subject,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, id: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
