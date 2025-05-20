
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServiceProviderOnboardingForm } from "@/components/service-provider/ServiceProviderOnboardingForm";
import { OnboardingBenefits } from "@/components/service-provider/OnboardingBenefits";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ServiceProviderOnboarding = () => {
  const [activeTab, setActiveTab] = useState<string>("auditor");

  return (
    <>
      <Helmet>
        <title>Join the Security Provider Network | Hawkly</title>
        <meta
          name="description"
          content="Join Hawkly's elite network of security service providers and auditors. Get matched with ideal projects and grow your Web3 security business."
        />
      </Helmet>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-secondary/5 pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Join the Hawkly Security Circle
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Become part of the premier Web3 security marketplace where top talent connects 
              with cutting-edge projects. Apply to join our vetted network of security professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            <div className="lg:col-span-5">
              <OnboardingBenefits />
            </div>
            
            <div className="lg:col-span-7">
              <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl border border-border/40 p-6">
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-8">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="auditor">Independent Auditor</TabsTrigger>
                    <TabsTrigger value="service">Security Service Provider</TabsTrigger>
                  </TabsList>
                  <TabsContent value="auditor" className="pt-4">
                    <h2 className="text-xl font-semibold mb-2">Independent Auditor Application</h2>
                    <p className="text-muted-foreground mb-6">
                      Showcase your auditing expertise and join our network of trusted independent security professionals.
                    </p>
                  </TabsContent>
                  <TabsContent value="service" className="pt-4">
                    <h2 className="text-xl font-semibold mb-2">Security Service Provider Application</h2>
                    <p className="text-muted-foreground mb-6">
                      Register your security firm to access enterprise-level clients and expand your service offerings.
                    </p>
                  </TabsContent>
                </Tabs>

                <ServiceProviderOnboardingForm providerType={activeTab as "auditor" | "service"} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ServiceProviderOnboarding;
