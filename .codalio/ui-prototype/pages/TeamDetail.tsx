import React from "react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "../components/ui/breadcrumb";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

import { Link, useParams } from "react-router-dom";

export default function TeamDetail() {
    const { team_id } = useParams()
    const teamName = team_id === "bra" ? "Brazil" : team_id === "fra" ? "France" : "United States"
    const teamCode = teamName.slice(0, 2).toUpperCase()
  return (
   <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-6 px-4 py-6 md:px-6">
          <section className="space-y-4">
      <Breadcrumb>
      <BreadcrumbList>
      <BreadcrumbItem><BreadcrumbLink asChild><Link to="/teams">Teams</Link></BreadcrumbLink></BreadcrumbItem>
      <BreadcrumbItem><BreadcrumbPage>{teamName}</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
      </Breadcrumb>

      <Card>
      <CardHeader className="flex flex-row items-center gap-3">
      <Avatar><AvatarFallback>{teamCode}</AvatarFallback></Avatar>
      <div>
      <CardTitle>{teamName}</CardTitle>
      <Badge variant="secondary">Group A</Badge>
      </div>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
      <div className="space-y-2"><p className="text-sm">FIFA Ranking</p><Progress value={84} /></div>
      <div className="space-y-2"><p className="text-sm">Group Position</p><Progress value={66} /></div>
      <div className="space-y-2"><p className="text-sm">Win Probability</p><Progress value={52} /></div>
      </CardContent>
      </Card>
      </section>
  <section className="space-y-4">
      <h2 className="text-xl font-semibold">Squad and Fixtures</h2>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <Card>
      <CardHeader><CardTitle>Squad</CardTitle></CardHeader>
      <CardContent className="overflow-x-auto">
      <Table>
      <TableHeader><TableRow><TableHead>Player</TableHead><TableHead>Position</TableHead><TableHead>Club</TableHead><TableHead>Caps</TableHead></TableRow></TableHeader>
      <TableBody>
      <TableRow><TableCell>Pulisic</TableCell><TableCell>FW</TableCell><TableCell>Milan</TableCell><TableCell>66</TableCell></TableRow>
      <TableRow><TableCell>McKennie</TableCell><TableCell>MF</TableCell><TableCell>Juventus</TableCell><TableCell>52</TableCell></TableRow>
      <TableRow><TableCell>Dest</TableCell><TableCell>DF</TableCell><TableCell>PSV</TableCell><TableCell>31</TableCell></TableRow>
      </TableBody>
      </Table>
      </CardContent>
      </Card>
      <Card>
      <CardHeader><CardTitle>Upcoming Fixtures</CardTitle></CardHeader>
      <CardContent className="space-y-3">
      <div className="rounded-lg border p-3 text-sm">USA vs Japan • Jun 12 • Los Angeles</div>
      <div className="rounded-lg border p-3 text-sm">USA vs Spain • Jun 18 • Seattle</div>
      <Button asChild><Link to="/schedule/m1">Open Match</Link></Button>
      </CardContent>
      </Card>
      </div>
      </section>
      </div>
    </div>
  );
}