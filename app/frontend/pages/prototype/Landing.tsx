import React from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";

import { BarChart3, CalendarClock, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function Landing() {
  return (
    <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-8 px-4 py-6 md:px-6">
          <section className="relative overflow-hidden rounded-xl border bg-gradient-to-r from-primary to-accent p-8 text-primary-foreground shadow-md">
      <img
      src="https://pixabay.com/get/g0dfecb58050805a4ab5f6975148b276fb8f66f0a138e2c7f43cd59622e459e2bfc9682ce3cd7667a9951373a6112be84c3f270049f1df3ed1352b16f2819f8b2_640.jpg"
      alt="Crowd in a football stadium"
      className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="relative z-10 max-w-3xl space-y-4">
      <Badge className="bg-white/20 text-white hover:bg-white/20">World Cup 2026</Badge>
      <h1 className="text-3xl font-bold md:text-5xl">Track Every Moment of World Cup 2026</h1>
      <p className="text-base opacity-95 md:text-lg">
      Live schedules, real-time scores, and AI-powered match probabilities in one place.
      </p>
      <div className="flex flex-wrap gap-3">
      <Button asChild variant="secondary" className="text-secondary-foreground">
      <Link to="/schedule">View Schedule</Link>
      </Button>
      <Button asChild variant="outline" className="border-white/50 bg-transparent text-white hover:bg-white/20">
      <Link to="/probabilities">Explore Probabilities</Link>
      </Button>
      </div>
      </div>
      </section>
  <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Live Tournament Snapshot</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {[
      { label: "Matches Tracked", value: "104" },
      { label: "Teams", value: "48" },
      { label: "Live Updates", value: "24/7" },
      ].map((item) => (
      <Card key={item.label} className="shadow-sm">
      <CardHeader className="pb-2">
      <CardTitle className="text-sm text-muted-foreground">{item.label}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
      <p className="text-3xl font-bold text-foreground">{item.value}</p>
      <Badge variant="secondary">Live</Badge>
      </CardContent>
      </Card>
      ))}
      </div>
      </section>
  <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Everything Fans Need</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {[
      {
      title: "Real-time Schedule",
      description: "Kick-off times, venues, and status updates as they happen.",
      icon: CalendarClock,
      },
      {
      title: "Win Probabilities",
      description: "Pre-match and live model insights for every fixture.",
      icon: BarChart3,
      },
      {
      title: "Team Insights",
      description: "Form, squad details, and tournament performance at a glance.",
      icon: ShieldCheck,
      },
      ].map((feature) => (
      <Card key={feature.title} className="shadow-sm">
      <CardHeader>
      <feature.icon className="mb-2 h-5 w-5 text-primary" />
      <CardTitle>{feature.title}</CardTitle>
      <CardDescription>{feature.description}</CardDescription>
      </CardHeader>
      <CardContent />
      </Card>
      ))}
      </div>
      </section>
  <section className="space-y-4">
      <h2 className="text-2xl font-semibold">How It Works</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {[
      {
      title: "Follow Matches",
      description: "Browse by date, team, or stage in schedule and calendar views.",
      },
      {
      title: "Compare Probabilities",
      description: "See model confidence and scenario outcomes for each game.",
      },
      {
      title: "Personalize Alerts",
      description: "Save favorite teams and receive notification preferences.",
      },
      ].map((step, index) => (
      <Card key={step.title} className="shadow-sm">
      <CardContent className="space-y-3 p-5">
      <p className="text-sm font-semibold text-primary">Step {index + 1}</p>
      <h3 className="font-semibold">{step.title}</h3>
      <Separator />
      <p className="text-sm text-muted-foreground">{step.description}</p>
      </CardContent>
      </Card>
      ))}
      </div>
      </section>
  <section>
      <Card className="rounded-xl border bg-card shadow-sm">
      <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
      <h3 className="text-2xl font-bold">Never Miss a Matchday</h3>
      <p className="max-w-xl text-muted-foreground">
      Create your account and personalize your World Cup tracker.
      </p>
      <Button asChild>
      <Link to="/user">Go to User Portal</Link>
      </Button>
      </CardContent>
      </Card>
      </section>
      </div>
    </div>
  );
}