
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MoreHorizontal,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  AlertCircle,
  Shield,
  User
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

// Mock application data
const mockApplications = [
  {
    id: "1",
    name: "Alex Rivera",
    email: "alex@securityfirm.com",
    type: "auditor",
    status: "pending",
    expertise: ["Smart Contracts", "DeFi"],
    submittedDate: "2023-04-28",
  },
  {
    id: "2",
    name: "Blockchain Security Labs",
    email: "contact@bslabs.io",
    type: "service",
    status: "pending",
    expertise: ["Protocol Audits", "Formal Verification"],
    submittedDate: "2023-05-03",
  },
  {
    id: "3",
    name: "Sarah Chen",
    email: "sarah@chainauditors.com",
    type: "auditor",
    status: "pending",
    expertise: ["Zero Knowledge", "MEV Protection"],
    submittedDate: "2023-05-10",
  },
  {
    id: "4",
    name: "Secure Web3 Group",
    email: "info@secureweb3.io",
    type: "service",
    status: "pending",
    expertise: ["Bridge Security", "Layer 2 Security"],
    submittedDate: "2023-05-15",
  },
  {
    id: "5",
    name: "Marcus Johnson",
    email: "marcus@blocksec.dev",
    type: "auditor",
    status: "pending",
    expertise: ["EVM Security", "Contract Optimization"],
    submittedDate: "2023-05-18",
  },
  {
    id: "6",
    name: "Crypto Defense Alliance",
    email: "team@cryptodefense.io",
    type: "service",
    status: "pending",
    expertise: ["Incident Response", "Red Team"],
    submittedDate: "2023-05-22",
  }
];

// Mock detailed application data (would come from API/database)
const mockDetailedApplication = {
  id: "1",
  name: "Alex Rivera",
  email: "alex@securityfirm.com",
  walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  type: "auditor",
  status: "pending",
  expertise: ["Smart Contracts", "DeFi", "EVM Security"],
  blockchains: ["Ethereum", "Polygon", "Avalanche"],
  experience: "5+ years",
  completedProjects: 42,
  notableClients: "Major DeFi protocol\nLeading NFT marketplace\nL2 scaling solution",
  certifications: "Certified Smart Contract Auditor\nCertified Blockchain Security Professional",
  tools: ["Slither", "Echidna", "Manticore", "Mythril"],
  submittedDate: "2023-04-28",
  website: "https://alexrivera.dev",
  github: "https://github.com/alex-security"
};

export function ProviderApplications() {
  const [applications, setApplications] = useState(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const getApplicationBadge = (type: string) => {
    switch (type) {
      case "auditor":
        return <Badge variant="outline" className="bg-primary/10 text-primary">Auditor</Badge>;
      case "service":
        return <Badge variant="outline" className="bg-secondary/10 text-secondary">Service Provider</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getAvatarFallback = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const viewDetails = (applicationId: string) => {
    // In a real implementation, we would fetch the application details
    // For now, we'll use our mock data
    setSelectedApplication(mockDetailedApplication);
    setIsDetailsOpen(true);
  };

  const approveApplication = (applicationId: string, name: string) => {
    // Here we would call an API to approve the application
    toast.success(`Application approved`, {
      description: `${name} has been approved and added to the platform.`,
    });
    
    // Update the local state
    setApplications(applications.filter(app => app.id !== applicationId));
  };

  const rejectApplication = (applicationId: string, name: string) => {
    // Here we would call an API to reject the application
    toast.info(`Application rejected`, {
      description: `${name}'s application has been rejected.`,
    });
    
    // Update the local state
    setApplications(applications.filter(app => app.id !== applicationId));
  };

  const requestMoreInfo = (applicationId: string, name: string) => {
    toast.info(`Information requested`, {
      description: `Email has been sent to ${name} requesting additional information.`,
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
            <div>
              <CardTitle>Provider Applications</CardTitle>
              <CardDescription>
                Review and approve security provider applications
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search applications..."
                  className="pl-8 w-full md:w-[250px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead className="hidden lg:table-cell">Expertise</TableHead>
                  <TableHead className="hidden md:table-cell">Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{getAvatarFallback(application.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{application.name}</div>
                          <div className="text-xs text-muted-foreground">{application.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        {application.type === "auditor" ? 
                          <Shield className="h-4 w-4 text-primary" /> : 
                          <User className="h-4 w-4 text-secondary" />}
                        {getApplicationBadge(application.type)}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {application.expertise.map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-muted text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(application.submittedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => viewDetails(application.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => approveApplication(application.id, application.name)}>
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => rejectApplication(application.id, application.name)}>
                            <XCircle className="h-4 w-4 mr-2 text-red-500" />
                            Reject
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => requestMoreInfo(application.id, application.name)}>
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Request Info
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                
                {applications.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No pending applications
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{applications.length}</span> of{" "}
              <span className="font-medium">{applications.length}</span> applications
            </div>
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled={applications.length === 0}>
              Next
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedApplication && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
              <DialogDescription>
                Complete information for {selectedApplication.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Basic Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{selectedApplication.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{selectedApplication.email}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Wallet:</span>
                    <span className="font-medium text-xs sm:text-sm">{selectedApplication.walletAddress}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type:</span>
                    <span>{getApplicationBadge(selectedApplication.type)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="font-medium">{selectedApplication.experience}</span>
                  </div>
                </div>
                
                <h3 className="text-sm font-medium mb-2 mt-6">External Profiles</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Website:</span>
                    <a href={selectedApplication.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {selectedApplication.website}
                    </a>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GitHub:</span>
                    <a href={selectedApplication.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {selectedApplication.github}
                    </a>
                  </div>
                </div>
                
                <h3 className="text-sm font-medium mb-2 mt-6">Security Credentials</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Certifications:</span>
                    <div className="mt-1">
                      {selectedApplication.certifications.split('\n').map((cert, index) => (
                        <div key={index} className="text-sm py-1 border-b border-border last:border-0">
                          {cert}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Expertise & Skills</h3>
                <div className="flex flex-wrap gap-1 mb-4">
                  {selectedApplication.expertise.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/10">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <h3 className="text-sm font-medium mb-2">Blockchain Experience</h3>
                <div className="flex flex-wrap gap-1 mb-4">
                  {selectedApplication.blockchains.map((blockchain, index) => (
                    <Badge key={index} variant="outline" className="bg-secondary/10">
                      {blockchain}
                    </Badge>
                  ))}
                </div>
                
                <h3 className="text-sm font-medium mb-2">Tools & Methodologies</h3>
                <div className="flex flex-wrap gap-1 mb-4">
                  {selectedApplication.tools.map((tool, index) => (
                    <Badge key={index} variant="outline" className="bg-muted">
                      {tool}
                    </Badge>
                  ))}
                </div>
                
                <h3 className="text-sm font-medium mb-2 mt-4">Projects Experience</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Completed Projects:</span>
                    <span className="font-medium">{selectedApplication.completedProjects}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Notable Clients:</span>
                    <div className="mt-1">
                      {selectedApplication.notableClients.split('\n').map((client, index) => (
                        <div key={index} className="text-sm py-1 border-b border-border last:border-0">
                          {client}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between border-t pt-4 mt-2">
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                Close
              </Button>
              <div className="flex gap-2">
                <Button variant="destructive" onClick={() => {
                  rejectApplication(selectedApplication.id, selectedApplication.name);
                  setIsDetailsOpen(false);
                }}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button variant="default" className="bg-green-600 hover:bg-green-700" onClick={() => {
                  approveApplication(selectedApplication.id, selectedApplication.name);
                  setIsDetailsOpen(false);
                }}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
