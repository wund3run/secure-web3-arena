
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Eye, Edit, Trash2, CheckCircle, Clock, XCircle } from "lucide-react";
import { toast } from "sonner";

interface Service {
  id: string;
  title: string;
  provider: string;
  category: string;
  price: number;
  status: "active" | "pending" | "suspended";
  createdDate: string;
  lastUpdated: string;
  completedAudits: number;
  rating: number;
}

export function ServiceManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [services] = useState<Service[]>([
    {
      id: "1",
      title: "Smart Contract Security Audit",
      provider: "Alex Thompson",
      category: "Smart Contract",
      price: 2500,
      status: "active",
      createdDate: "2024-01-15",
      lastUpdated: "2024-01-20",
      completedAudits: 45,
      rating: 4.9
    },
    {
      id: "2",
      title: "DeFi Protocol Complete Review",
      provider: "Sarah Chen",
      category: "DeFi",
      price: 5000,
      status: "active",
      createdDate: "2024-01-10",
      lastUpdated: "2024-01-19",
      completedAudits: 28,
      rating: 4.8
    },
    {
      id: "3",
      title: "NFT Marketplace Security Assessment",
      provider: "Marcus Rodriguez",
      category: "NFT",
      price: 3000,
      status: "pending",
      createdDate: "2024-01-18",
      lastUpdated: "2024-01-18",
      completedAudits: 0,
      rating: 0
    },
    {
      id: "4",
      title: "Cross-Chain Bridge Analysis",
      provider: "Elena Kovač",
      category: "Bridge",
      price: 7500,
      status: "suspended",
      createdDate: "2023-12-20",
      lastUpdated: "2024-01-15",
      completedAudits: 12,
      rating: 4.6
    }
  ]);

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "smart contract":
        return "bg-blue-100 text-blue-800";
      case "defi":
        return "bg-green-100 text-green-800";
      case "nft":
        return "bg-purple-100 text-purple-800";
      case "bridge":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "suspended":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const handleServiceAction = (action: string, serviceId: string, serviceTitle: string) => {
    toast.success(`${action} action performed for "${serviceTitle}"`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Service Management</h2>
        <p className="text-muted-foreground">
          Manage audit services, approvals, and quality control
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Security Services</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>Add Service</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{service.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Updated: {new Date(service.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{service.provider}</TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(service.category)}>
                      {service.category}
                    </Badge>
                  </TableCell>
                  <TableCell>${service.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(service.status)}
                      <span className="capitalize">{service.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{service.completedAudits} audits</div>
                      {service.rating > 0 && (
                        <div className="text-xs text-muted-foreground">
                          ⭐ {service.rating}/5.0
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => handleServiceAction("View", service.id, service.title)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleServiceAction("Edit", service.id, service.title)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Service
                        </DropdownMenuItem>
                        {service.status === "pending" && (
                          <DropdownMenuItem 
                            onClick={() => handleServiceAction("Approve", service.id, service.title)}
                            className="text-green-600"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </DropdownMenuItem>
                        )}
                        {service.status === "active" ? (
                          <DropdownMenuItem 
                            onClick={() => handleServiceAction("Suspend", service.id, service.title)}
                            className="text-red-600"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Suspend
                          </DropdownMenuItem>
                        ) : service.status === "suspended" && (
                          <DropdownMenuItem 
                            onClick={() => handleServiceAction("Reactivate", service.id, service.title)}
                            className="text-green-600"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Reactivate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          onClick={() => handleServiceAction("Delete", service.id, service.title)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
