
import React from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CodeOfConduct() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-2xl font-bold mb-4">Code of Conduct</h2>
      <Separator className="mb-4" />
      <ScrollArea className="h-[300px]">
        <div className="space-y-4 pr-4">
          <section>
            <h3 className="text-lg font-semibold">1. Purpose</h3>
            <p className="text-muted-foreground">
              This Code of Conduct outlines our expectations for participants within the Hawkly community, as well as the consequences for unacceptable behavior.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold">2. Expected Behavior</h3>
            <ul className="list-disc pl-5 text-muted-foreground">
              <li>Participate in an authentic and active way.</li>
              <li>Exercise consideration and respect in your speech and actions.</li>
              <li>Attempt collaboration before conflict.</li>
              <li>Refrain from demeaning, discriminatory, or harassing behavior and speech.</li>
              <li>Be mindful of your surroundings and of your fellow participants.</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold">3. Professional Conduct</h3>
            <p className="text-muted-foreground">
              Auditors must conduct audits with the highest standards of integrity and professionalism. This includes:
            </p>
            <ul className="list-disc pl-5 text-muted-foreground">
              <li>Delivering audits on time as promised.</li>
              <li>Maintaining confidentiality of project details.</li>
              <li>Providing objective and thorough analysis.</li>
              <li>Declaring any conflicts of interest.</li>
              <li>Being responsive to client communications.</li>
              <li>Adhering to the agreed scope of work.</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold">4. Unacceptable Behavior</h3>
            <p className="text-muted-foreground">
              Unacceptable behaviors include:
            </p>
            <ul className="list-disc pl-5 text-muted-foreground">
              <li>Intimidating, harassing, abusive, discriminatory, or derogatory conduct.</li>
              <li>Making false claims about one's expertise or experience.</li>
              <li>Deliberate misrepresentation of audit findings.</li>
              <li>Sharing confidential information without authorization.</li>
              <li>Engaging in any form of unprofessional behavior.</li>
              <li>Violating the terms of any non-disclosure agreements.</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold">5. Consequences of Unacceptable Behavior</h3>
            <p className="text-muted-foreground">
              Unacceptable behavior will not be tolerated. Consequences for violations may include:
            </p>
            <ul className="list-disc pl-5 text-muted-foreground">
              <li>Removal from the platform.</li>
              <li>Loss of reputation score.</li>
              <li>Withholding of payment.</li>
              <li>Legal action when applicable.</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold">6. Reporting Guidelines</h3>
            <p className="text-muted-foreground">
              If you experience or witness unacceptable behavior, or have any concerns, please report it by contacting us at conduct@hawkly.io.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold">7. Addressing Grievances</h3>
            <p className="text-muted-foreground">
              The Hawkly team will review and investigate all complaints and respond in a way that is deemed appropriate to the circumstances. We are committed to maintaining confidentiality with regard to reporting incidents.
            </p>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
}

export default CodeOfConduct;
