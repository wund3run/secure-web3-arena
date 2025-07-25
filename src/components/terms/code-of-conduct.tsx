
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CodeOfConductProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CodeOfConduct({ open, onOpenChange }: CodeOfConductProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Code of Conduct</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <h2 className="text-xl font-semibold">Hawkly Security Marketplace Code of Conduct</h2>
          <p className="text-muted-foreground">Last Updated: May 16, 2025</p>
          
          <div className="space-y-4">
            <section>
              <h3 className="text-lg font-medium">1. Integrity and Honesty</h3>
              <p>
                All participants on the Hawkly platform are expected to act with the highest 
                level of integrity and honesty in their interactions with clients, colleagues, and staff.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-medium">2. Professional Conduct</h3>
              <p>
                Security professionals must conduct themselves professionally, providing accurate 
                representations of their qualifications, experience, and capabilities.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-medium">3. Confidentiality</h3>
              <p>
                All sensitive information accessed during audits or interactions on the platform 
                must be kept confidential and not disclosed without proper authorization.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-medium">4. Quality of Service</h3>
              <p>
                Auditors commit to delivering high-quality services, meeting agreed-upon deadlines, 
                and communicating promptly when issues arise.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-medium">5. Ethical Reporting</h3>
              <p>
                Security findings must be reported accurately and completely. Security professionals 
                must not manipulate results or hide findings for personal benefit or to meet client preferences.
              </p>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
