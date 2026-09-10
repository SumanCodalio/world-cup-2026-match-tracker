import React from "react";
import { Badge } from "../../components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "../../components/ui/breadcrumb";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { Separator } from "../../components/ui/separator";
import { Slider } from "../../components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

import { useState } from "react";
import { Link, useParams } from "@tanstack/react-router";

export default function ProbabilityMatchDetail() {
    const { match_id } = useParams()
    const matchIdLabel = match_id ? match_id.toUpperCase() : "MATCH"
    const [form, setForm] = useState([52])
    const [injury, setInjury] = useState([18])
    const [showBadge, setShowBadge] = useState(false)
    const recalculate = () => {
      setShowBadge(true)
    }
  return (
   <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-6 px-4 py-6 md:px-6">
          <section className="space-y-4">
      <Breadcrumb>
      <BreadcrumbList>
      <BreadcrumbItem><BreadcrumbLink asChild><Link to="/probabilities">Probabilities</Link></BreadcrumbLink></BreadcrumbItem>
      <BreadcrumbItem><BreadcrumbPage>Match Probability Breakdown</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
      </Breadcrumb>

      <Card>
      <CardHeader>
      <div className="flex items-center justify-between gap-2">
      <CardTitle>Outcome Breakdown • {matchIdLabel}</CardTitle>
      <Badge variant="secondary">Model v2.6</Badge>
      </div>
      </CardHeader>
      <CardContent className="space-y-4">
      <div className="space-y-2"><div className="flex justify-between text-sm"><span>Home Win</span><span>45%</span></div><Progress value={45} /></div>
      <div className="space-y-2"><div className="flex justify-between text-sm"><span>Draw</span><span>27%</span></div><Progress value={27} /></div>
      <div className="space-y-2"><div className="flex justify-between text-sm"><span>Away Win</span><span>28%</span></div><Progress value={28} /></div>
      <Separator />
      <p className="text-sm text-muted-foreground">Updated 30 seconds ago from live-event feed.</p>
      </CardContent>
      </Card>
      </section>
  <section className="space-y-4">
      <h2 className="text-xl font-semibold">Scenario Analysis</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
      <CardHeader><CardTitle>Scenario Simulator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
      <div className="space-y-2">
      <p className="text-sm">Form Impact: {form[0]}</p>
      <Slider value={form} onValueChange={setForm} max={100} step={1} />
      </div>
      <div className="space-y-2">
      <p className="text-sm">Injury Load: {injury[0]}</p>
      <Slider value={injury} onValueChange={setInjury} max={100} step={1} />
      </div>
      <Button onClick={recalculate}>Recalculate</Button>
      {showBadge && <Badge>Updated probabilities generated</Badge>}
      </CardContent>
      </Card>
      <Card>
      <CardHeader><CardTitle>Recent Similar Fixtures</CardTitle></CardHeader>
      <CardContent className="overflow-x-auto">
      <Table>
      <TableHeader><TableRow><TableHead>Fixture</TableHead><TableHead>Result</TableHead><TableHead>xG Gap</TableHead></TableRow></TableHeader>
      <TableBody>
      <TableRow><TableCell>France vs Germany</TableCell><TableCell>2 - 1</TableCell><TableCell>+0.34</TableCell></TableRow>
      <TableRow><TableCell>Spain vs Brazil</TableCell><TableCell>1 - 1</TableCell><TableCell>+0.08</TableCell></TableRow>
      <TableRow><TableCell>USA vs Japan</TableCell><TableCell>0 - 1</TableCell><TableCell>-0.26</TableCell></TableRow>
      </TableBody>
      </Table>
      </CardContent>
      </Card>
      </div>
      </section>
      </div>
    </div>
  );
}