import React from "react";
import { Badge } from "../../components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "../../components/ui/breadcrumb";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

import { useMemo } from "react";
import { Link, useParams } from "@tanstack/react-router";

export default function ScheduleMatchDetail() {
    const { match_id } = useParams()
    const match = useMemo(() => {
      const map: Record<string, { home: string; away: string; status: string; date: string; kickoff: string; venue: string; stage: string; score: string }> = {
        m1: { home: "USA", away: "Japan", status: "Upcoming", date: "Jun 12", kickoff: "19:00", venue: "Los Angeles", stage: "Group Stage", score: "-" },
        m2: { home: "Brazil", away: "Spain", status: "Live", date: "Jun 12", kickoff: "22:00", venue: "Dallas", stage: "Group Stage", score: "1 - 0" },
      }
      return map[match_id ?? ""] ?? { home: "Team A", away: "Team B", status: "Upcoming", date: "TBD", kickoff: "TBD", venue: "TBD", stage: "TBD", score: "-" }
    }, [match_id])
  return (
   <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-6 px-4 py-6 md:px-6">
          <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
      <Breadcrumb>
      <BreadcrumbList>
      <BreadcrumbItem><BreadcrumbLink asChild><Link to="/schedule">Schedule</Link></BreadcrumbLink></BreadcrumbItem>
      <BreadcrumbItem><BreadcrumbPage>Match Detail</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
      </Breadcrumb>
      <Button asChild variant="outline"><Link to="/schedule">Back to Schedule</Link></Button>
      </div>

      <Card>
      <CardHeader>
      <div className="flex items-center justify-between gap-3">
      <CardTitle>{match.home} vs {match.away}</CardTitle>
      <Badge>{match.status}</Badge>
      </div>
      <CardDescription>{match.date} • {match.kickoff} • {match.venue}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
      <p>Stage: <span className="text-foreground">{match.stage}</span></p>
      <p>Score: <span className="text-foreground">{match.score}</span></p>
      </CardContent>
      </Card>
      </section>
  <section className="space-y-4">
      <h2 className="text-xl font-semibold">Match Insights</h2>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <Card className="xl:col-span-2">
      <CardHeader><CardTitle>Timeline and Lineups</CardTitle></CardHeader>
      <CardContent>
      <Tabs defaultValue="timeline" className="w-full">
      <TabsList>
      <TabsTrigger value="timeline">Timeline</TabsTrigger>
      <TabsTrigger value="lineups">Lineups</TabsTrigger>
      <TabsTrigger value="stats">Stats</TabsTrigger>
      </TabsList>
      <TabsContent value="timeline" className="text-sm text-muted-foreground">22' Goal • 40' Yellow card • 61' Substitution</TabsContent>
      <TabsContent value="lineups" className="text-sm text-muted-foreground">Confirmed starting XI available 1h before kickoff.</TabsContent>
      <TabsContent value="stats" className="text-sm text-muted-foreground">Possession 54% - 46%, Shots 7 - 4</TabsContent>
      </Tabs>
      </CardContent>
      </Card>
      <Card>
      <CardHeader><CardTitle>Live Outcome Probability</CardTitle></CardHeader>
      <CardContent className="space-y-3">
      <div>
      <div className="mb-1 flex items-center justify-between text-sm"><span>Home Win</span><span>44%</span></div>
      <Progress value={44} />
      </div>
      <div>
      <div className="mb-1 flex items-center justify-between text-sm"><span>Draw</span><span>28%</span></div>
      <Progress value={28} />
      </div>
      <div>
      <div className="mb-1 flex items-center justify-between text-sm"><span>Away Win</span><span>28%</span></div>
      <Progress value={28} />
      </div>
      <Badge variant="secondary">Model v2.6</Badge>
      <Button asChild className="w-full"><Link to="/probabilities/m2">Open Full Probability View</Link></Button>
      </CardContent>
      </Card>
      </div>
      </section>
      </div>
    </div>
  );
}