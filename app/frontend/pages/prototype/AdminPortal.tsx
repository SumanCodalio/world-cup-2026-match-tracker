import React from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";

import { Link } from "@tanstack/react-router";

export default function AdminPortal() {
  return (
    <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-6 px-4 py-6 md:px-6">
          <section>
      <Card>
      <CardHeader>
      <CardTitle>Administration Center</CardTitle>
      <CardDescription>Manage matches, users, and editorial content from one workspace.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
      <Button asChild><Link to="/admin/dashboard">Admin Dashboard</Link></Button>
      <Button asChild variant="secondary"><Link to="/admin/matches">Match Management</Link></Button>
      <Button asChild variant="outline"><Link to="/admin/users">User Management</Link></Button>
      <Button asChild variant="outline"><Link to="/admin/content">Content Management</Link></Button>
      </CardContent>
      </Card>
      </section>
  <section className="space-y-4">
      <h2 className="text-xl font-semibold">System Snapshot</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {[
      { label: "Matches Today", value: "12" },
      { label: "Pending Content Reviews", value: "4" },
      { label: "Active Users", value: "68.4k" },
      { label: "Model Health", value: "98.7%" },
      ].map((kpi) => (
      <Card key={kpi.label}>
      <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">{kpi.label}</CardTitle></CardHeader>
      <CardContent className="flex items-center justify-between"><p className="text-2xl font-bold">{kpi.value}</p><Badge variant="secondary">OK</Badge></CardContent>
      </Card>
      ))}
      </div>
      </section>
      </div>
    </div>
  );
}