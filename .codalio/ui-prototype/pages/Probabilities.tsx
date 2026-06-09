import React from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Progress } from "../components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Probabilities() {
    const [query, setQuery] = useState("")
    const [stage, setStage] = useState("all")
    const [view, setView] = useState("all")
    const cards = [
      { id: "m2", match: "Brazil vs Spain", stage: "group", stageLabel: "Group Stage", live: true, home: 48, draw: 24, away: 28, confidence: 77 },
      { id: "m3", match: "France vs Germany", stage: "knockout", stageLabel: "Round of 16", live: false, home: 38, draw: 30, away: 32, confidence: 69 },
    ]
    const filtered = useMemo(() => {
      return cards.filter((card) => {
        const q = card.match.toLowerCase().includes(query.toLowerCase())
        const s = stage === "all" || card.stage === stage || (stage === "live" && card.live)
        const v = view === "all" || (view === "live" && card.live)
        return q && s && v
      })
    }, [cards, query, stage, view])
  return (
   <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-6 px-4 py-6 md:px-6">
          <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Match Probability Center</h1>
      <div className="grid gap-3 md:grid-cols-3">
      <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search match" />
      <Select value={stage} onValueChange={setStage}>
      <SelectTrigger><SelectValue placeholder="Stage" /></SelectTrigger>
      <SelectContent>
      <SelectItem value="all">All Stages</SelectItem>
      <SelectItem value="group">Group Stage</SelectItem>
      <SelectItem value="knockout">Knockout</SelectItem>
      <SelectItem value="live">Live</SelectItem>
      </SelectContent>
      </Select>
      <Tabs value={view} onValueChange={setView}>
      <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="all">All</TabsTrigger>
      <TabsTrigger value="live">Live</TabsTrigger>
      </TabsList>
      </Tabs>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {filtered.map((item) => (
      <Card key={item.id}>
      <CardHeader>
      <CardTitle>{item.match}</CardTitle>
      <CardDescription>{item.stageLabel}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
      <div className="text-sm"><span className="font-medium">Home:</span> {item.home}%</div>
      <Progress value={item.home} />
      <div className="text-sm"><span className="font-medium">Draw:</span> {item.draw}%</div>
      <Progress value={item.draw} />
      <div className="text-sm"><span className="font-medium">Away:</span> {item.away}%</div>
      <Progress value={item.away} />
      <div className="flex items-center justify-between">
      <Badge variant="secondary">Confidence {item.confidence}%</Badge>
      <Button size="sm" asChild><Link to={`/probabilities/${item.id}`}>Details</Link></Button>
      </div>
      </CardContent>
      </Card>
      ))}
      </div>
      </section>
  <section>
      <Card>
      <CardHeader><CardTitle>Tournament Winner Odds</CardTitle></CardHeader>
      <CardContent className="overflow-x-auto">
      <Table>
      <TableHeader>
      <TableRow><TableHead>Team</TableHead><TableHead>Win %</TableHead><TableHead>Final %</TableHead><TableHead>Semi %</TableHead><TableHead>Status</TableHead></TableRow>
      </TableHeader>
      <TableBody>
      {[
      { team: "Brazil", win: 16, final: 31, semi: 49, status: "Rising" },
      { team: "France", win: 14, final: 28, semi: 45, status: "Stable" },
      { team: "Argentina", win: 11, final: 23, semi: 40, status: "Rising" },
      ].map((row) => (
      <TableRow key={row.team}>
      <TableCell className="font-medium">{row.team}</TableCell>
      <TableCell>{row.win}%</TableCell>
      <TableCell>{row.final}%</TableCell>
      <TableCell>{row.semi}%</TableCell>
      <TableCell><Badge variant="secondary">{row.status}</Badge></TableCell>
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