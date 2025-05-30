
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Search, MoreHorizontal, Shield, Ban, CheckCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: "auditor" | "project_owner" | "admin";
  status: "active" | "suspended" | "pending";
  joinDate: string;
  lastActive: string;
  auditsCompleted?: number;
  projectsManaged?: number;
  avatar?: string;
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "Alex Thompson",
      email: "alex@securitypro.com",
      role: "auditor",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2024-01-20",
      auditsCompleted: 45
    },
    {
      id: "2",
      name: "Sarah Chen",
      email: "sarah@defiprotocol.com",
      role: "project_owner",
      status: "active",
      joinDate: "2024-01-10",
      lastActive: "2024-01-19",
      projectsManaged: 8
    },
    {
      id: "3",
      name: "Marcus Rodriguez",
      email: "marcus@blockchain.audit",
      role: "auditor",
      status: "pending",
      joinDate: "2024-01-18",
      lastActive: "2024-01-18",
      auditsCompleted: 0
    },
    {
      id: "4",
      name: "Elena Kovač",
      email: "elena@web3games.com",
      role: "project_owner",
      status: "suspended",
      joinDate: "2023-12-20",
      lastActive: "2024-01-15",
      projectsManaged: 3
    }
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "auditor":
        return "bg-blue-100 text-blue-800";
      case "project_owner":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "suspended":
        return <Ban className="h-4 w-4 text-red-500" />;
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const handleUserAction = (action: string, userId: string, userName: string) => {
    toast.success(`${action} action performed for ${userName}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
        <p className="text-muted-foreground">
          Manage platform users, roles, and permissions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>Add User</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>
                      {user.role.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(user.status)}
                      <span className="capitalize">{user.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {user.role === "auditor" && (
                        <span>{user.auditsCompleted} audits completed</span>
                      )}
                      {user.role === "project_owner" && (
                        <span>{user.projectsManaged} projects managed</span>
                      )}
                      <div className="text-xs text-muted-foreground">
                        Last active: {new Date(user.lastActive).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(user.joinDate).toLocaleDateString()}
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
                          onClick={() => handleUserAction("View", user.id, user.name)}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleUserAction("Edit", user.id, user.name)}
                        >
                          Edit User
                        </DropdownMenuItem>
                        {user.status === "active" ? (
                          <DropdownMenuItem 
                            onClick={() => handleUserAction("Suspend", user.id, user.name)}
                            className="text-red-600"
                          >
                            Suspend User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem 
                            onClick={() => handleUserAction("Activate", user.id, user.name)}
                            className="text-green-600"
                          >
                            Activate User
                          </DropdownMenuItem>
                        )}
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
