import React from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

import { MoreHorizontal } from "lucide-react";
export default function AdminContent() {
  return (
    <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-6 px-4 py-6 md:px-6">
          <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Content Management</h1>
      <div className="grid gap-3 md:grid-cols-4">
      <Input className="md:col-span-2" placeholder="Search articles" />
      <Select defaultValue="all">
      <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
      <SelectContent>
      <SelectItem value="all">All Types</SelectItem>
      <SelectItem value="news">News</SelectItem>
      <SelectItem value="analysis">Analysis</SelectItem>
      </SelectContent>
      </Select>
      <Button>Create Content</Button>
      </div>

      <Card>
      <CardContent className="overflow-x-auto p-2">
      <Table>
      <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Category</TableHead><TableHead>Status</TableHead><TableHead>Updated</TableHead><TableHead /></TableRow></TableHeader>
      <TableBody>
      {[
      { title: "Quarterfinal Preview", category: "Analysis", status: "Draft", updated: "10m ago" },
      { title: "Injury Roundup", category: "News", status: "Published", updated: "1h ago" },
      ].map((row) => (
      <TableRow key={row.title}>
      <TableCell className="font-medium">{row.title}</TableCell>
      <TableCell>{row.category}</TableCell>
      <TableCell><Badge variant="secondary">{row.status}</Badge></TableCell>
      <TableCell>{row.updated}</TableCell>
      <TableCell className="text-right">
      <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover text-popover-foreground">
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuItem>Publish</DropdownMenuItem>
      <DropdownMenuItem>Archive</DropdownMenuItem>
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