import React from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";

import { MoreHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

export default function AdminMatches() {
    const [query, setQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [tab, setTab] = useState("all")
    const items = [
      { id: "1", match: "USA vs Japan", date: "Jun 12", venue: "Los Angeles", status: "upcoming", updated: "2m ago" },
      { id: "2", match: "Brazil vs Spain", date: "Jun 12", venue: "Dallas", status: "live", updated: "just now" },
      { id: "3", match: "France vs Germany", date: "Jun 10", venue: "Miami", status: "completed", updated: "1h ago" },
    ]
    const rows = useMemo(() => {
      return items.filter((item) => {
        const q = item.match.toLowerCase().includes(query.toLowerCase())
        const s = statusFilter === "all" || item.status === statusFilter
        const t = tab === "all" || item.status === tab
        return q && s && t
      })
    }, [items, query, statusFilter, tab])
  return (
   <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-6 px-4 py-6 md:px-6">
          <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Match Management</h1>
      <div className="grid gap-3 md:grid-cols-3">
      <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search matches" />
      <Select value={statusFilter} onValueChange={setStatusFilter}>
      <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
      <SelectContent>
      <SelectItem value="all">All Status</SelectItem>
      <SelectItem value="upcoming">Upcoming</SelectItem>
      <SelectItem value="completed">Completed</SelectItem>
      <SelectItem value="live">Live</SelectItem>
      </SelectContent>
      </Select>
      <Button>Add New Match</Button>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
      <TabsList>
      <TabsTrigger value="all">All Matches</TabsTrigger>
      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
      <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      </Tabs>

      <Card>
      <CardContent className="overflow-x-auto p-2">
      <Table>
      <TableHeader><TableRow><TableHead>Match</TableHead><TableHead>Date</TableHead><TableHead>Venue</TableHead><TableHead>Status</TableHead><TableHead>Last Updated</TableHead><TableHead /></TableRow></TableHeader>
      <TableBody>
      {rows.map((row) => (
      <TableRow key={row.id}>
      <TableCell className="font-medium">{row.match}</TableCell><TableCell>{row.date}</TableCell><TableCell>{row.venue}</TableCell><TableCell><Badge variant="secondary">{row.status}</Badge></TableCell><TableCell>{row.updated}</TableCell>
      <TableCell className="text-right">
      <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover text-popover-foreground">
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuItem>Publish</DropdownMenuItem>
      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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