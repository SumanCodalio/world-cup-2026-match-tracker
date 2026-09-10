import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export default function UserDashboard() {
  return (
    <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-6 px-4 py-6 md:px-6">
          <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
      {[
      "Upcoming Favorite Team Matches",
      "Live Match Alerts",
      "Saved Predictions",
      ].map((item) => (
      <Card key={item}><CardContent className="p-5 text-sm font-medium">{item}</CardContent></Card>
      ))}
      </div>
      <Card>
      <CardHeader><CardTitle>Personalized Feed</CardTitle></CardHeader>
      <CardContent>
      <Tabs defaultValue="highlights">
      <TabsList>
      <TabsTrigger value="highlights">Highlights</TabsTrigger>
      <TabsTrigger value="news">News</TabsTrigger>
      <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
      </TabsList>
      <TabsContent value="highlights" className="text-sm text-muted-foreground">Today: Brazil vs Spain simulation update available.</TabsContent>
      <TabsContent value="news" className="text-sm text-muted-foreground">Model confidence trend moved +2.1% this week.</TabsContent>
      <TabsContent value="recommendations" className="text-sm text-muted-foreground">Pin France to receive lineup alerts.</TabsContent>
      </Tabs>
      </CardContent>
      </Card>
      </section>
      </div>
    </div>
  );
}