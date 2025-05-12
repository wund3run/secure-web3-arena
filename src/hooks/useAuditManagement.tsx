
import { useState } from "react";
import { toast } from "sonner";

// Define the audit type for better type safety
export interface Audit {
  id: string;
  projectName: string;
  client: string;
  auditor: string;
  status: string;
  auditType: string;
  severity: string;
  submissionDate: string;
  completionDate: string;
  vulnerabilitiesFound: number;
}

// Mock audit data
const mockAudits = [
  {
    id: "1",
    projectName: "DefiSwap Protocol",
    client: "DefiSwap Foundation",
    auditor: "BlockSec Audit Team",
    status: "completed",
    auditType: "Smart Contract",
    severity: "critical",
    submissionDate: "2023-10-15",
    completionDate: "2023-10-28",
    vulnerabilitiesFound: 7
  },
  {
    id: "2",
    projectName: "NFTMarket",
    client: "ArtDAO Collective",
    auditor: "SecureChain Audits",
    status: "in_progress",
    auditType: "Smart Contract",
    severity: "medium",
    submissionDate: "2023-11-01",
    completionDate: "",
    vulnerabilitiesFound: 3
  },
  {
    id: "3",
    projectName: "StableCoin Implementation",
    client: "StableFinance Inc.",
    auditor: "Crypto Security Group",
    status: "completed",
    auditType: "Protocol",
    severity: "high",
    submissionDate: "2023-09-22",
    completionDate: "2023-10-10",
    vulnerabilitiesFound: 5
  },
  {
    id: "4",
    projectName: "Bridge Contract",
    client: "CrossChain Solutions",
    auditor: "BlockSec Audit Team",
    status: "scheduled",
    auditType: "Smart Contract",
    severity: "unknown",
    submissionDate: "2023-11-05",
    completionDate: "",
    vulnerabilitiesFound: 0
  },
  {
    id: "5",
    projectName: "DAO Governance",
    client: "Community DAO",
    auditor: "SecureChain Audits",
    status: "completed",
    auditType: "Protocol",
    severity: "low",
    submissionDate: "2023-08-14",
    completionDate: "2023-09-01",
    vulnerabilitiesFound: 2
  }
];

export function useAuditManagement() {
  const [audits, setAudits] = useState<Audit[]>(mockAudits);

  const viewAudit = (audit: Audit) => {
    toast.info("View audit details", {
      description: `Viewing details for ${audit.projectName} audit`,
    });
  };

  const downloadReport = (audit: Audit) => {
    if (audit.status === "completed") {
      toast.success("Download started", {
        description: `Downloading report for ${audit.projectName}`,
      });
    } else {
      toast.error("Report unavailable", {
        description: "This audit hasn't been completed yet",
      });
    }
  };

  const viewOnExplorer = (audit: Audit) => {
    toast.info("External link", {
      description: `Opening blockchain explorer for ${audit.projectName} contract`,
    });
  };

  return {
    audits,
    viewAudit,
    downloadReport,
    viewOnExplorer
  };
}
