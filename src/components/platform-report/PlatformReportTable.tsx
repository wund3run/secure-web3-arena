
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

type IssueType = "pass" | "warning" | "critical";
type IssueCategory = "ui" | "functionality" | "performance" | "security" | "accessibility";

interface Issue {
  id: string;
  name: string;
  category: IssueCategory;
  location: string;
  type: IssueType;
  impact: string;
}

const issues: Issue[] = [
  {
    id: "ISSUE-001",
    name: "Navigation links in header",
    category: "functionality",
    location: "Global navigation",
    type: "pass",
    impact: "Essential for user navigation across platform"
  },
  {
    id: "ISSUE-002",
    name: "User authentication flow",
    category: "security",
    location: "Auth pages",
    type: "pass",
    impact: "Critical for secure user access"
  },
  {
    id: "ISSUE-003",
    name: "Form validation",
    category: "ui",
    location: "Multiple forms",
    type: "warning",
    impact: "Affects user experience when entering data"
  },
  {
    id: "ISSUE-004",
    name: "Mobile responsiveness",
    category: "ui",
    location: "Dashboard pages",
    type: "warning",
    impact: "Limits usability on smaller devices"
  },
  {
    id: "ISSUE-005",
    name: "Performance optimization",
    category: "performance",
    location: "Marketplace listing",
    type: "critical",
    impact: "Slow loading times affecting user retention"
  },
  {
    id: "ISSUE-006",
    name: "Screen reader compatibility",
    category: "accessibility",
    location: "Interactive components",
    type: "warning",
    impact: "Limits access for users with screen readers"
  },
  {
    id: "ISSUE-007",
    name: "Error handling",
    category: "functionality",
    location: "Form submissions",
    type: "pass",
    impact: "Provides clear feedback on user actions"
  }
];

export function PlatformReportTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">ID</TableHead>
            <TableHead>Issue</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden sm:table-cell">Impact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-mono text-xs">{issue.id}</TableCell>
              <TableCell>{issue.name}</TableCell>
              <TableCell className="capitalize">{issue.category}</TableCell>
              <TableCell>{issue.location}</TableCell>
              <TableCell>
                {issue.type === "pass" && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="mr-1 h-4 w-4" />
                    <span>Pass</span>
                  </div>
                )}
                {issue.type === "warning" && (
                  <div className="flex items-center text-amber-600">
                    <AlertTriangle className="mr-1 h-4 w-4" />
                    <span>Warning</span>
                  </div>
                )}
                {issue.type === "critical" && (
                  <div className="flex items-center text-red-600">
                    <XCircle className="mr-1 h-4 w-4" />
                    <span>Critical</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="hidden sm:table-cell">{issue.impact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
