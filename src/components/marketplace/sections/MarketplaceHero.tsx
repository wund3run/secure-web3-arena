
import { Globe } from "lucide-react";
import { Link } from "react-router-dom";

interface MarketplaceHeroProps {
  onShowOnboarding: () => void;
}

export function MarketplaceHero({ onShowOnboarding }: MarketplaceHeroProps) {
  return (
    <div className="w-full pt-16 pb-24 mb-8 text-center" role="banner">
      <div className="max-w-4xl mx-auto px-6">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
          <Globe className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Web3 Security Made Simple</span>
        </div>
        
        {/* Two-part heading with gradient */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Connect With Expert
          <br />
          <span className="bg-gradient-to-r from-[#6E59A5] to-[#33C3F0] bg-clip-text text-transparent">
            Security Auditors
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          The intelligent marketplace matching blockchain projects with verified
          security experts. Secure your Web3 project with confidence.
        </p>
        
        {/* Link for auditors */}
        <Link 
          to="/service-provider-onboarding"
          className="inline-flex items-center mt-8 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>Are you an auditor?</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2 h-4 w-4"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
