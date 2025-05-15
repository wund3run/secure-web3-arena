
import React, { useState } from "react";
import { MessageSquare, X, Mail, FileText, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/use-mobile";

export function SupportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const toggleSupport = () => {
    setIsOpen(!isOpen);
  };

  const sendEmail = () => {
    window.location.href = "mailto:support@hawkly.com?subject=Support%20Request";
    toast.success("Preparing email client", { description: "Opening your email client to contact support" });
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className={`mb-4 rounded-lg bg-card border border-border shadow-lg ${isMobile ? 'w-[90vw] max-w-[350px]' : 'min-w-[250px]'} animate-in slide-in-from-bottom`}>
          <div className="p-3 border-b border-border flex justify-between items-center">
            <h3 className="font-medium text-sm">Need help?</h3>
            <button
              onClick={toggleSupport}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close support panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="p-4 space-y-3">
            <button
              onClick={sendEmail}
              className="flex items-center space-x-2 w-full rounded-md p-2 hover:bg-muted text-left"
            >
              <Mail className="h-5 w-5 text-primary" />
              <span>Email Support</span>
            </button>
            
            <Link 
              to="/contact" 
              className="flex items-center space-x-2 w-full rounded-md p-2 hover:bg-muted text-left"
              onClick={() => setIsOpen(false)}
            >
              <FileText className="h-5 w-5 text-primary" />
              <span>Contact Form</span>
            </Link>
            
            <Link 
              to="/audit-guidelines" 
              className="flex items-center space-x-2 w-full rounded-md p-2 hover:bg-muted text-left"
              onClick={() => setIsOpen(false)}
            >
              <HelpCircle className="h-5 w-5 text-primary" />
              <span>Help Guides</span>
            </Link>
            
            <div className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border/30">
              Our team is ready to assist you with any questions about Web3 security audits.
            </div>
          </div>
        </div>
      )}

      <Button
        size="icon"
        className={`rounded-full ${isMobile ? 'h-12 w-12' : 'h-14 w-14'} shadow-lg ${isOpen ? 'bg-foreground text-background' : 'bg-primary text-primary-foreground'}`}
        onClick={toggleSupport}
        aria-label="Get support"
      >
        {isOpen ? (
          <X className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
        ) : (
          <MessageSquare className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
        )}
      </Button>
    </div>
  );
}
