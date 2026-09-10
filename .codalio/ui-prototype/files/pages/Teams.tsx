import React from "react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Teams() {
    const [query, setQuery] = useState("")
    const [confed, setConfed] = useState("all")
    const teams = [
      { id: "usa", name: "United States", code: "US", confed: "concacaf", confedLabel: "CONCACAF", group: "A" },
      { id: "bra", name: "Brazil", code: "BR", confed: "conmebol", confedLabel: "CONMEBOL", group: "B" },
      { id: "fra", name: "France", code: "FR", confed: "uefa", confedLabel: "UEFA", group: "C" },
    ]
    const filteredTeams = useMemo(() => {
      return teams.filter((team) => {
        const byQuery = team.name.toLowerCase().includes(query.toLowerCase())
        const byConfed = confed === "all" || team.confed === confed
        return byQuery && byConfed
      })
    }, [teams, query, confed])
  return (
   <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-6 px-4 py-6 md:px-6">
          <section className="space-y-4">
      <h1 className="text-2xl font-semibold">National Teams</h1>
      <div className="grid gap-3 md:grid-cols-3">
      <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search team" />
      <Select value={confed} onValueChange={setConfed}>
      <SelectTrigger><SelectValue placeholder="Confederation" /></SelectTrigger>
      <SelectContent>
      <SelectItem value="all">All Confederations</SelectItem>
      <SelectItem value="uefa">UEFA</SelectItem>
      <SelectItem value="conmebol">CONMEBOL</SelectItem>
      <SelectItem value="concacaf">CONCACAF</SelectItem>
      </SelectContent>
      </Select>
      <Button variant="secondary" onClick={() => { setQuery(""); setConfed("all") }}>Reset</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredTeams.map((team) => (
      <Card key={team.id}>
      <CardHeader>
      <div className="flex items-center gap-3">
      <Avatar>
      <AvatarFallback>{team.code}</AvatarFallback>
      </Avatar>
      <div>
      <CardTitle>{team.name}</CardTitle>
      <CardDescription>{team.confedLabel}</CardDescription>
      </div>
      </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
      <Badge variant="secondary">Group {team.group}</Badge>
      <Button size="sm" asChild><Link to={`/teams/${team.id}`}>View Team</Link></Button>
      </CardContent>
      </Card>
      ))}
      </div>
      </section>
      </div>
    </div>
  );
}