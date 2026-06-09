import React from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

export default function AdminDashboard() {
  return (
    <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-6 px-4 py-6 md:px-6">
          <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
      <CardHeader><CardTitle>Operations Overview</CardTitle></CardHeader>
      <CardContent className="overflow-x-auto">
      <Table>
      <TableHeader><TableRow><TableHead>Panel</TableHead><TableHead>Status</TableHead><TableHead>Notes</TableHead></TableRow></TableHeader>
      <TableBody>
      <TableRow><TableCell>Live Match Status</TableCell><TableCell><Badge>Healthy</Badge></TableCell><TableCell>All feeds streaming</TableCell></TableRow>
      <TableRow><TableCell>Data Sync Health</TableCell><TableCell><Badge variant="secondary">Stable</Badge></TableCell><TableCell>Last sync 1m ago</TableCell></TableRow>
      <TableRow><TableCell>Prediction Model Status</TableCell><TableCell><Badge>Healthy</Badge></TableCell><TableCell>No degraded nodes</TableCell></TableRow>
      </TableBody>
      </Table>
      </CardContent>
      </Card>
      <Card>
      <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
      <CardContent className="flex flex-col gap-2">
      <Button>Add Match</Button>
      <Button variant="secondary">Publish Update</Button>
      <Button variant="outline">Run Model Recheck</Button>
      </CardContent>
      </Card>
      </div>
      </section>
      </div>
    </div>
  );
}