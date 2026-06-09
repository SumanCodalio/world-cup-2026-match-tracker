import React from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Schedule() {
    const [query, setQuery] = useState("")
    const [stage, setStage] = useState("all")
    const matches = [
      { id: "m1", date: "Jun 12", time: "19:00", home: "USA", away: "Japan", stage: "group", stageLabel: "Group Stage", venue: "Los Angeles", status: "Upcoming" },
      { id: "m2", date: "Jun 12", time: "22:00", home: "Brazil", away: "Spain", stage: "group", stageLabel: "Group Stage", venue: "Dallas", status: "Live" },
      { id: "m3", date: "Jun 18", time: "20:00", home: "France", away: "Germany", stage: "round16", stageLabel: "Round of 16", venue: "Miami", status: "Upcoming" },
    ]
    const filteredMatches = useMemo(() => {
      return matches.filter((match) => {
        const searchMatches = `${match.home} ${match.away} ${match.venue}`.toLowerCase().includes(query.toLowerCase())
        const stageMatches = stage === "all" || match.stage === stage
        return searchMatches && stageMatches
      })
    }, [matches, query, stage])
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [added, setAdded] = useState(false)
  return (
   <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-6 px-4 py-6 md:px-6">
          <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Match Schedule</h1>
      <Card className="space-y-3 p-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <div className="relative flex-1">
      <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search team or venue" className="pl-8" />
      </div>
      <Select value={stage} onValueChange={setStage}>
      <SelectTrigger className="w-full md:w-44"><SelectValue placeholder="Stage" /></SelectTrigger>
      <SelectContent>
      <SelectItem value="all">All Stages</SelectItem>
      <SelectItem value="group">Group Stage</SelectItem>
      <SelectItem value="round16">Round of 16</SelectItem>
      <SelectItem value="quarter">Quarterfinal</SelectItem>
      </SelectContent>
      </Select>
      <Button variant="secondary" onClick={() => setStage("all")}>Today</Button>
      </div>
      </Card>

      <Card className="overflow-x-auto p-2">
      <Table>
      <TableHeader>
      <TableRow>
      <TableHead>Date</TableHead><TableHead>Time</TableHead><TableHead>Match</TableHead><TableHead>Stage</TableHead><TableHead>Venue</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Action</TableHead>
      </TableRow>
      </TableHeader>
      <TableBody>
      {filteredMatches.map((match) => (
      <TableRow key={match.id}>
      <TableCell>{match.date}</TableCell>
      <TableCell>{match.time}</TableCell>
      <TableCell className="font-medium">{match.home} vs {match.away}</TableCell>
      <TableCell>{match.stageLabel}</TableCell>
      <TableCell>{match.venue}</TableCell>
      <TableCell><Badge variant={match.status === "Live" ? "default" : "secondary"}>{match.status}</Badge></TableCell>
      <TableCell className="text-right">
      <Button size="sm" variant="outline" asChild><Link to={`/schedule/${match.id}`}>Open</Link></Button>
      </TableCell>
      </TableRow>
      ))}
      </TableBody>
      </Table>
      </Card>
      </section>
  <section className="space-y-4">
      <h2 className="text-xl font-semibold">Calendar View</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
      <CardHeader><CardTitle>Select Date</CardTitle></CardHeader>
      <CardContent>
      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
      </CardContent>
      </Card>
      <Card>
      <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
      <CardContent className="space-y-3">
      <p className="text-sm text-muted-foreground">{selectedDate ? `Selected: ${selectedDate.toDateString()}` : "Pick a date to view match events."}</p>
      <Button onClick={() => setAdded(true)} disabled={!selectedDate}>Add selected day to calendar</Button>
      {added && <p className="text-sm text-accent">Added to your calendar preview.</p>}
      </CardContent>
      </Card>
      </div>
      </section>
      </div>
    </div>
  );
}