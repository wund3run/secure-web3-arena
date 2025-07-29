
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Shield,
  User,
  Edit,
  UserX,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "Alex Thompson",
    email: "alex@example.com",
    role: "Auditor",
    status: "active",
    reputation: 95,
    joinDate: "2023-04-15",
    avatar: ""
  },
  {
    id: "2",
    name: "Jamie Chen",
    email: "jamie@example.com",
    role: "Service Provider",
    status: "active",
    reputation: 88,
    joinDate: "2023-06-22",
    avatar: ""
  },
  {
    id: "3",
    name: "Morgan Smith",
    email: "morgan@example.com",
    role: "Client",
    status: "active",
    reputation: 72,
    joinDate: "2023-08-09",
    avatar: ""
  },
  {
    id: "4",
    name: "Taylor Wilson",
    email: "taylor@example.com",
    role: "Auditor",
    status: "suspended",
    reputation: 64,
    joinDate: "2023-09-18",
    avatar: ""
  },
  {
    id: "5",
    name: "Jordan Lee",
    email: "jordan@example.com",
    role: "Service Provider",
    status: "active",
    reputation: 91,
    joinDate: "2023-03-05",
    avatar: ""
  },
  {
    id: "6",
    name: "Casey Brown",
    email: "casey@example.com",
    role: "Client",
    status: "pending",
    reputation: 0,
    joinDate: "2023-11-01",
    avatar: ""
  }
];

export function UserManagement() {
  const [users, setUsers] = useState(mockUsers);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Active</Badge>;
      case "suspended":
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">Suspended</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getAvatarFallback = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const editUser = (user: typeof users[0]) => {
    toast.info("Edit user", {
      description: `Editing ${user.name}'s profile (feature in development)`,
    });
  };

  const emailUser = (user: typeof users[0]) => {
    toast.info("Send email", {
      description: `Preparing to send email to ${user.email}`,
    });
  };

  const suspendUser = (user: typeof users[0]) => {
    toast.info("User action", {
      description: user.status === "suspended" 
        ? `Reactivating ${user.name}'s account`
        : `Suspending ${user.name}'s account`,
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
            <div>
              <CardTitle>Platform Users</CardTitle>
              <CardDescription>
                Manage users, roles and permissions
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8 w-full md:w-[300px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead className="hidden md:table-cell">Role</TableHead>
                  <TableHead className="hidden lg:table-cell">Joined</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Reputation</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{getAvatarFallback(user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        {user.role === "Auditor" && <Shield className="h-4 w-4 text-primary" />}
                        {user.role === "Service Provider" && <User className="h-4 w-4 text-secondary" />}
                        {user.role === "Client" && <User className="h-4 w-4 text-muted-foreground" />}
                        {user.role}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(user.status)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <div className={`w-full bg-muted rounded-full h-2`}>
                          <div
                            className={`h-2 rounded-full ${
                              user.reputation > 80
                                ? "bg-green-500"
                                : user.reputation > 60
                                ? "bg-yellow-500"
                                : user.reputation > 0
                                ? "bg-red-500"
                                : "bg-gray-300"
                            }`}
                            style={{ width: `${user.reputation === 0 ? 0 : Math.max(15, user.reputation)}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium">
                          {user.reputation === 0 ? "N/A" : user.reputation}
                        </span>
                      </div>
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
                          <DropdownMenuItem onClick={() => editUser(user)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => emailUser(user)}>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => suspendUser(user)}>
                            <UserX className="h-4 w-4 mr-2" />
                            {user.status === "suspended" ? "Reactivate User" : "Suspend User"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">6</span> of{" "}
              <span className="font-medium">100</span> users
            </div>
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
