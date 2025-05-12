
import { Shield, Award, FileCode, CheckCircle } from "lucide-react";
import { HawklyLogo } from "@/components/layout/hawkly-logo";

export function GuidelinesHeader() {
  return (
    <div className="bg-gradient-to-b from-primary/90 to-primary/70 text-white">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="flex items-center justify-center mb-6">
          <HawklyLogo variant="full" className="h-12" />
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6">
          Audit Guidelines & Standards
        </h1>
        
        <p className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-10 text-white/90">
          Our comprehensive approach to securing Web3 projects with transparent methodologies and industry-leading best practices
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 text-center hover:bg-white/20 transition">
            <div className="mx-auto bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mb-3">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-1">Rigorous Methodology</h3>
            <p className="text-sm text-white/80">Standardized processes that ensure thorough security assessments</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 text-center hover:bg-white/20 transition">
            <div className="mx-auto bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mb-3">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-1">Quality Standards</h3>
            <p className="text-sm text-white/80">Industry-leading benchmarks for audit quality and reporting</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 text-center hover:bg-white/20 transition">
            <div className="mx-auto bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mb-3">
              <FileCode className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-1">Detailed Classification</h3>
            <p className="text-sm text-white/80">Standardized vulnerability categorization and severity ratings</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 text-center hover:bg-white/20 transition">
            <div className="mx-auto bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mb-3">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-1">Transparent Process</h3>
            <p className="text-sm text-white/80">Clear expectations and communication at every stage</p>
          </div>
        </div>
      </div>
    </div>
  );
}
