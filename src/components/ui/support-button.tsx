
import React, { useState } from "react";
import { MessageSquare, X, Mail, FileText, HelpCircle, Video, BookOpen, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/use-mobile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SupportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("help");
  const isMobile = useMediaQuery("(max-width: 640px)");

  const toggleSupport = () => {
    setIsOpen(!isOpen);
  };

  const sendEmail = () => {
    window.location.href = "mailto:support@hawkly.com?subject=Support%20Request";
    toast.success("Preparing email client", { description: "Opening your email client to contact support" });
    setIsOpen(false);
  };

  const helpOptions = [
    {
      title: "Email Support",
      description: "Get personalized help from our team",
      icon: Mail,
      action: sendEmail
    },
    {
      title: "Contact Form",
      description: "Submit a detailed support request",
      icon: FileText,
      link: "/contact"
    },
    {
      title: "Help Guides",
      description: "Browse our knowledge base",
      icon: BookOpen,
      link: "/audit-guidelines"
    },
    {
      title: "Video Tutorials",
      description: "Learn with step-by-step videos",
      icon: Video,
      link: "/tutorials"
    }
  ];

  const resourceOptions = [
    {
      title: "Audit Guidelines",
      description: "Best practices and standards",
      icon: HelpCircle,
      link: "/audit-guidelines"
    },
    {
      title: "Community Forums",
      description: "Connect with fellow auditors",
      icon: MessageSquare,
      link: "/community"
    },
    {
      title: "Schedule Demo",
      description: "Get a personalized walkthrough",
      icon: UserPlus,
      action: () => {
        toast.success("Demo request received", { 
          description: "Our team will contact you shortly to schedule a demo" 
        });
        setIsOpen(false);
      }
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <Card className={`mb-4 ${isMobile ? 'w-[90vw] max-w-[350px]' : 'w-[350px]'} animate-in slide-in-from-bottom`}>
          <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Need help?</CardTitle>
            <Button variant="ghost" size="icon" onClick={toggleSupport} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-4 pt-2">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="help">Support</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="help" className="mt-0">
              <CardContent className="p-4 space-y-3">
                {helpOptions.map((option, index) => (
                  option.link ? (
                    <Link 
                      key={index}
                      to={option.link} 
                      className="flex items-center space-x-3 w-full rounded-md p-2 hover:bg-muted text-left"
                      onClick={() => setIsOpen(false)}
                    >
                      <option.icon className="h-5 w-5 text-primary" />
                      <div>
                        <span className="font-medium block">{option.title}</span>
                        <span className="text-xs text-muted-foreground">{option.description}</span>
                      </div>
                    </Link>
                  ) : (
                    <button
                      key={index}
                      onClick={option.action}
                      className="flex items-center space-x-3 w-full rounded-md p-2 hover:bg-muted text-left"
                    >
                      <option.icon className="h-5 w-5 text-primary" />
                      <div>
                        <span className="font-medium block">{option.title}</span>
                        <span className="text-xs text-muted-foreground">{option.description}</span>
                      </div>
                    </button>
                  )
                ))}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="resources" className="mt-0">
              <CardContent className="p-4 space-y-3">
                {resourceOptions.map((option, index) => (
                  option.link ? (
                    <Link 
                      key={index}
                      to={option.link} 
                      className="flex items-center space-x-3 w-full rounded-md p-2 hover:bg-muted text-left"
                      onClick={() => setIsOpen(false)}
                    >
                      <option.icon className="h-5 w-5 text-primary" />
                      <div>
                        <span className="font-medium block">{option.title}</span>
                        <span className="text-xs text-muted-foreground">{option.description}</span>
                      </div>
                    </Link>
                  ) : (
                    <button
                      key={index}
                      onClick={option.action}
                      className="flex items-center space-x-3 w-full rounded-md p-2 hover:bg-muted text-left"
                    >
                      <option.icon className="h-5 w-5 text-primary" />
                      <div>
                        <span className="font-medium block">{option.title}</span>
                        <span className="text-xs text-muted-foreground">{option.description}</span>
                      </div>
                    </button>
                  )
                ))}
              </CardContent>
            </TabsContent>
          </Tabs>
          
          <div className="text-xs text-muted-foreground p-4 pt-0">
            Our team is ready to assist you with any questions about Web3 security audits.
          </div>
        </Card>
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
