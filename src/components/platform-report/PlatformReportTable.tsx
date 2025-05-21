
import React, { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ValidationIssue } from "@/utils/validation/types";

interface PlatformReportTableProps {
  issues: ValidationIssue[];
  compact?: boolean;
}

export function PlatformReportTable({ issues, compact = false }: PlatformReportTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredIssues = issues.filter(issue => 
    issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.severity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (issues.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">No issues found in this category.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {!compact && (
        <Input
          placeholder="Search issues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      )}
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Severity</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead>Description</TableHead>
              {!compact && <TableHead className="hidden lg:table-cell">Recommendation</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIssues.length === 0 ? (
              <TableRow>
                <TableCell colSpan={compact ? 4 : 5} className="text-center h-24 text-muted-foreground">
                  No matching issues found.
                </TableCell>
              </TableRow>
            ) : (
              filteredIssues.map((issue, index) => (
                <TableRow key={`${issue.type}-${issue.location}-${index}`}>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        issue.severity === "high" 
                          ? "border-red-500 text-red-600 bg-red-50" 
                          : issue.severity === "medium"
                            ? "border-amber-500 text-amber-600 bg-amber-50"
                            : "border-blue-500 text-blue-600 bg-blue-50"
                      }
                    >
                      {issue.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{issue.type}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                    {issue.location}
                  </TableCell>
                  <TableCell className="max-w-[300px]">{issue.description}</TableCell>
                  {!compact && (
                    <TableCell className="hidden lg:table-cell max-w-[300px]">
                      {issue.suggestion}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="text-sm text-muted-foreground">
        Showing {filteredIssues.length} of {issues.length} issues
      </div>
    </div>
  );
}
