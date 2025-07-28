
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Edit,
  Trash,
  Eye,
  InfoIcon,
} from "lucide-react";
import { toast } from "sonner";
import { SERVICES } from "@/data/marketplace-data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ServiceManagement() {
  const [services, setServices] = useState(SERVICES.slice(0, 10));
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const handleDeleteService = () => {
    if (selectedService) {
      setServices(services.filter((service) => service.id !== selectedService.id));
      toast.success("Service deleted successfully", {
        description: `"${selectedService.title}" has been removed.`,
      });
      setIsDeleteDialogOpen(false);
      setSelectedService(null);
    }
  };

  const confirmDelete = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsDeleteDialogOpen(true);
  };

  const editService = (service: typeof services[0]) => {
    toast.info("Edit service", {
      description: `Editing "${service.title}" (feature in development)`,
    });
  };

  const viewService = (service: typeof services[0]) => {
    toast.info("View service details", {
      description: `Viewing details for "${service.title}"`,
    });
  };

  return (
    <>
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
              <div>
                <CardTitle>Security Services</CardTitle>
                <CardDescription>
                  Manage and monitor all security services on the platform
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search services..."
                    className="pl-8 w-full md:w-[300px]"
                  />
                </div>
                <Button variant="outline" size="icon" aria-label="Filter services">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button aria-label="Add new service">
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Add Service</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="hidden md:table-cell">
                      <div className="flex items-center">
                        <span>Status</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <InfoIcon className="h-3.5 w-3.5 ml-1 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Current availability of the service</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      <div className="flex items-center">
                        <span>Price</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <InfoIcon className="h-3.5 w-3.5 ml-1 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Base price in USD</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.title}</TableCell>
                      <TableCell>{service.provider.name}</TableCell>
                      <TableCell>{service.category}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">${service.pricing.amount}</TableCell>
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
                            <DropdownMenuItem onClick={() => viewService(service)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => editService(service)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Service
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive" 
                              onClick={() => confirmDelete(service)}
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Delete Service
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-4">
              <div className="text-sm text-muted-foreground order-2 sm:order-1">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{services.length}</span> of{" "}
                <span className="font-medium">{SERVICES.length}</span> services
              </div>
              <div className="flex gap-2 order-1 sm:order-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Already on the first page</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Go to next page</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedService?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="error" onClick={handleDeleteService}>
              Delete Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
