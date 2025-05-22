
import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Search,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type IssueType = "pass" | "warning" | "critical";
type IssueCategory =
  | "ui"
  | "functionality"
  | "performance"
  | "security"
  | "accessibility"
  | "navigation"
  | "responsiveness";

interface Issue {
  id: string;
  name: string;
  category: IssueCategory;
  location: string;
  type: IssueType;
  impact: string;
  affectedUserTypes?: ("general" | "auditor" | "project-owner" | "admin")[];
}

const issues: Issue[] = [
  {
    id: "ISSUE-001",
    name: "Navigation links in header",
    category: "functionality",
    location: "Global navigation",
    type: "pass",
    impact: "Essential for user navigation across platform",
    affectedUserTypes: ["general", "auditor", "project-owner", "admin"],
  },
  {
    id: "ISSUE-002",
    name: "User authentication flow",
    category: "security",
    location: "Auth pages",
    type: "pass",
    impact: "Critical for secure user access",
    affectedUserTypes: ["general", "auditor", "project-owner", "admin"],
  },
  {
    id: "ISSUE-003",
    name: "Form validation",
    category: "ui",
    location: "Multiple forms",
    type: "warning",
    impact: "Affects user experience when entering data",
    affectedUserTypes: ["auditor", "project-owner"],
  },
  {
    id: "ISSUE-004",
    name: "Mobile responsiveness",
    category: "responsiveness",
    location: "Dashboard pages",
    type: "warning",
    impact: "Limits usability on smaller devices",
    affectedUserTypes: ["auditor", "project-owner"],
  },
  {
    id: "ISSUE-005",
    name: "Performance optimization",
    category: "performance",
    location: "Marketplace listing",
    type: "critical",
    impact: "Slow loading times affecting user retention",
    affectedUserTypes: ["general", "project-owner"],
  },
  {
    id: "ISSUE-006",
    name: "Screen reader compatibility",
    category: "accessibility",
    location: "Interactive components",
    type: "warning",
    impact: "Limits access for users with screen readers",
    affectedUserTypes: ["general", "auditor", "project-owner", "admin"],
  },
  {
    id: "ISSUE-007",
    name: "Error handling",
    category: "functionality",
    location: "Form submissions",
    type: "pass",
    impact: "Provides clear feedback on user actions",
    affectedUserTypes: ["auditor", "project-owner"],
  },
  {
    id: "ISSUE-008",
    name: "Route validation",
    category: "navigation",
    location: "Platform-wide",
    type: "warning",
    impact: "Some links may lead to invalid routes",
    affectedUserTypes: ["general", "auditor", "project-owner"],
  },
  {
    id: "ISSUE-009",
    name: "API response caching",
    category: "performance",
    location: "Service listings",
    type: "warning",
    impact: "Repeated API calls slow down browsing experience",
    affectedUserTypes: ["general", "project-owner"],
  },
  {
    id: "ISSUE-010",
    name: "Cross-site scripting protection",
    category: "security",
    location: "User inputs",
    type: "pass",
    impact: "Prevents malicious scripts in user content",
    affectedUserTypes: ["general", "admin"],
  },
  {
    id: "ISSUE-011",
    name: "Payment flow security",
    category: "security",
    location: "Escrow system",
    type: "critical",
    impact: "Critical for secure financial transactions",
    affectedUserTypes: ["auditor", "project-owner"],
  },
  {
    id: "ISSUE-012",
    name: "User onboarding flow",
    category: "ui",
    location: "Registration process",
    type: "warning",
    impact: "Affects new user conversion rates",
    affectedUserTypes: ["general"],
  },
];

export function PlatformReportTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilters, setCategoryFilters] = useState<IssueCategory[]>([]);
  const [statusFilter, setStatusFilter] = useState<IssueType[]>([]);
  const [userTypeFilter, setUserTypeFilter] = useState<string[]>([]);

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        issue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.id.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory =
        categoryFilters.length === 0 || categoryFilters.includes(issue.category);

      // Status filter
      const matchesStatus =
        statusFilter.length === 0 || statusFilter.includes(issue.type);

      // User type filter
      const matchesUserType =
        userTypeFilter.length === 0 ||
        (issue.affectedUserTypes &&
          issue.affectedUserTypes.some((type) =>
            userTypeFilter.includes(type)
          ));

      return matchesSearch && matchesCategory && matchesStatus && matchesUserType;
    });
  }, [searchTerm, categoryFilters, statusFilter, userTypeFilter]);

  const toggleCategoryFilter = (category: IssueCategory) => {
    setCategoryFilters((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleStatusFilter = (status: IssueType) => {
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const toggleUserTypeFilter = (userType: string) => {
    setUserTypeFilter((prev) =>
      prev.includes(userType)
        ? prev.filter((t) => t !== userType)
        : [...prev, userType]
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 items-start sm:items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search issues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Categories
                {categoryFilters.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {categoryFilters.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={categoryFilters.includes("ui")}
                onCheckedChange={() => toggleCategoryFilter("ui")}
              >
                UI
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={categoryFilters.includes("functionality")}
                onCheckedChange={() => toggleCategoryFilter("functionality")}
              >
                Functionality
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={categoryFilters.includes("performance")}
                onCheckedChange={() => toggleCategoryFilter("performance")}
              >
                Performance
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={categoryFilters.includes("security")}
                onCheckedChange={() => toggleCategoryFilter("security")}
              >
                Security
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={categoryFilters.includes("accessibility")}
                onCheckedChange={() => toggleCategoryFilter("accessibility")}
              >
                Accessibility
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={categoryFilters.includes("navigation")}
                onCheckedChange={() => toggleCategoryFilter("navigation")}
              >
                Navigation
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={categoryFilters.includes("responsiveness")}
                onCheckedChange={() => toggleCategoryFilter("responsiveness")}
              >
                Responsiveness
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                Status
                {statusFilter.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {statusFilter.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("pass")}
                onCheckedChange={() => toggleStatusFilter("pass")}
              >
                Pass
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("warning")}
                onCheckedChange={() => toggleStatusFilter("warning")}
              >
                Warning
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("critical")}
                onCheckedChange={() => toggleStatusFilter("critical")}
              >
                Critical
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                User Type
                {userTypeFilter.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {userTypeFilter.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={userTypeFilter.includes("general")}
                onCheckedChange={() => toggleUserTypeFilter("general")}
              >
                General Users
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={userTypeFilter.includes("auditor")}
                onCheckedChange={() => toggleUserTypeFilter("auditor")}
              >
                Auditors
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={userTypeFilter.includes("project-owner")}
                onCheckedChange={() => toggleUserTypeFilter("project-owner")}
              >
                Project Owners
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={userTypeFilter.includes("admin")}
                onCheckedChange={() => toggleUserTypeFilter("admin")}
              >
                Administrators
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Impact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIssues.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Search className="h-8 w-8 mb-2" />
                    <p>No matching issues found</p>
                    <Button
                      variant="link"
                      onClick={() => {
                        setSearchTerm("");
                        setCategoryFilters([]);
                        setStatusFilter([]);
                        setUserTypeFilter([]);
                      }}
                    >
                      Clear all filters
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-mono text-xs">{issue.id}</TableCell>
                  <TableCell>{issue.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        issue.category === "security"
                          ? "bg-red-50"
                          : issue.category === "performance"
                          ? "bg-amber-50"
                          : issue.category === "accessibility"
                          ? "bg-blue-50"
                          : ""
                      }
                    >
                      {issue.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{issue.location}</TableCell>
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
