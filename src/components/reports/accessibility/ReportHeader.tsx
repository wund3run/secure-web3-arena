
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ReportHeaderProps {
  downloadFormat: "pdf" | "csv" | "json";
  setDownloadFormat: (format: "pdf" | "csv" | "json") => void;
  handleDownloadReport: () => void;
  isGeneratingReport: boolean;
}

export const ReportHeader: React.FC<ReportHeaderProps> = ({ 
  downloadFormat, 
  setDownloadFormat, 
  handleDownloadReport, 
  isGeneratingReport 
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Platform Validation Report</h2>
        <p className="text-muted-foreground mt-1">
          Comprehensive analysis of accessibility, performance, and user experience
        </p>
      </div>
      
      <div className="flex gap-2 items-start">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDownloadFormat("pdf")}
            className={downloadFormat === "pdf" ? "bg-muted" : ""}
          >
            PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDownloadFormat("csv")}
            className={downloadFormat === "csv" ? "bg-muted" : ""}
          >
            CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDownloadFormat("json")}
            className={downloadFormat === "json" ? "bg-muted" : ""}
          >
            JSON
          </Button>
        </div>
        
        <Button 
          onClick={handleDownloadReport} 
          disabled={isGeneratingReport}
          size="sm"
        >
          <Download className="mr-2 h-4 w-4" />
          {isGeneratingReport ? "Generating..." : "Download Report"}
        </Button>
      </div>
    </div>
  );
};
