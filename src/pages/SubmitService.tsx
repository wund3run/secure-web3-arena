
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServiceSubmissionForm } from "@/components/service-provider/ServiceSubmissionForm";

export default function SubmitService() {
  return (
    <>
      <Helmet>
        <title>Submit a Service | Hawkly</title>
        <meta name="description" content="Submit your security service to the Hawkly marketplace. Connect with clients looking for Web3 security services." />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-10 bg-gradient-to-br from-white via-primary/5 to-secondary/5">
          <div className="container max-w-4xl px-4 sm:px-6">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">Submit Your Security Service</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                List your security service on our marketplace and connect with clients looking for Web3 security expertise
              </p>
            </div>
            
            <ServiceSubmissionForm />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
