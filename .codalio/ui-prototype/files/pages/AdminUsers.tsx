import React from "react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

import { MoreHorizontal } from "lucide-react";
export default function AdminUsers() {
  return (
    <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-6 px-4 py-6 md:px-6">
          <section className="space-y-4">
      <h1 className="text-2xl font-semibold">User Management</h1>
      <div className="grid gap-3 md:grid-cols-3">
      <Input placeholder="Search users" />
      <Select defaultValue="all">
      <SelectTrigger><SelectValue placeholder="Role" /></SelectTrigger>
      <SelectContent>
      <SelectItem value="all">All Roles</SelectItem>
      <SelectItem value="admin">Admin</SelectItem>
      <SelectItem value="user">User</SelectItem>
      </SelectContent>
      </Select>
      <Button variant="secondary">Export</Button>
      </div>
      <Card>
      <CardContent className="overflow-x-auto p-2">
      <Table>
      <TableHeader><TableRow><TableHead>User</TableHead><TableHead>Email</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead><TableHead>Created At</TableHead><TableHead /></TableRow></TableHeader>
      <TableBody>
      {[
      { name: "Alex Morgan", email: "alex@example.com", role: "Admin", status: "Active", created: "Mar 2" },
      { name: "Jordan Lee", email: "jordan@example.com", role: "User", status: "Pending", created: "Apr 8" },
      ].map((user) => (
      <TableRow key={user.email}>
      <TableCell>
      <div className="flex items-center gap-2"><Avatar className="h-7 w-7"><AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback></Avatar><span>{user.name}</span></div>
      </TableCell>
      <TableCell>{user.email}</TableCell><TableCell>{user.role}</TableCell><TableCell><Badge variant="secondary">{user.status}</Badge></TableCell><TableCell>{user.created}</TableCell>
      <TableCell className="text-right">
      <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover text-popover-foreground">
      <DropdownMenuItem>View</DropdownMenuItem>
      <DropdownMenuItem>Suspend</DropdownMenuItem>
      <DropdownMenuItem>Reset Password</DropdownMenuItem>
      </DropdownMenuContent>
      </DropdownMenu>
      </TableCell>
      </TableRow>
      ))}
      </TableBody>
      </Table>
      </CardContent>
      </Card>
      </section>
      </div>
    </div>
  );
}