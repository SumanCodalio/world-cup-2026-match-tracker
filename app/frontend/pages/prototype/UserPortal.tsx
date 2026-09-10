import React from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";

import { Link } from "@tanstack/react-router";

export default function UserPortal() {
  return (
    <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-6 px-4 py-6 md:px-6">
          <section>
      <Card>
      <CardHeader>
      <CardTitle>Your Personalized Match Hub</CardTitle>
      <CardDescription>Manage favorites, alerts, and account preferences.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
      <Button asChild><Link to="/user/dashboard">Dashboard</Link></Button>
      <Button asChild variant="secondary"><Link to="/user/profile">Profile</Link></Button>
      <Button asChild variant="outline"><Link to="/user/settings">Settings</Link></Button>
      </CardContent>
      </Card>
      </section>
  <section className="space-y-4">
      <h2 className="text-xl font-semibold">Recent Activity</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
      <CardHeader><CardTitle>Favorite Teams</CardTitle></CardHeader>
      <CardContent className="flex flex-wrap gap-2">
      <Badge>USA</Badge><Badge>Brazil</Badge><Badge>France</Badge>
      </CardContent>
      </Card>
      <Card>
      <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
      <CardContent className="space-y-3">
      <p className="text-sm text-muted-foreground">3 alert rules are active for your teams.</p>
      <Button asChild><Link to="/user/settings">Manage Settings</Link></Button>
      </CardContent>
      </Card>
      </div>
      </section>
      </div>
    </div>
  );
}