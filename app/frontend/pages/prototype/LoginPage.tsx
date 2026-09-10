import React, { useState } from "react";
import { useSignInAction } from "@rhino-project/core/queries";
import { useRhinoContext } from "@rhino-project/core";
import { useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Shield, Building2, Eye, Lock, Mail, ArrowRight, CheckCircle2, Trophy, Sparkles } from "lucide-react";

export default function LoginPage() {
  const { user, logOut } = useRhinoContext();
  const { mutate: signIn, isPending, error } = useSignInAction();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    signIn(
      { email, password },
      {
        onSuccess: () => {
          navigate({ to: "/" });
        },
        onError: (err: any) => {
          setLoginError(err?.message || "Invalid credentials. Please try again.");
        },
      }
    );
  };

  const handleQuickLogin = (quickEmail: string) => {
    setEmail(quickEmail);
    setPassword("password");
    setLoginError(null);
    signIn(
      { email: quickEmail, password: "password" },
      {
        onSuccess: () => {
          navigate({ to: "/" });
        },
        onError: (err: any) => {
          setLoginError(err?.message || "Failed to sign in. Make sure seeds are loaded.");
        },
      }
    );
  };

  return (
    <div className="mx-auto max-w-4xl py-6 md:py-10">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-3">
          <Trophy className="h-4 w-4" /> World Cup 2026 Match Tracker
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Sign In to Your Account</h1>
        <p className="mt-2 text-muted-foreground">
          Select your user type or sign in with email and password.
        </p>
      </div>

      {user ? (
        <Card className="mx-auto max-w-md text-center p-6">
          <CardHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <CardTitle>Already Signed In</CardTitle>
            <CardDescription>
              Logged in as <strong className="text-foreground">{user.email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" onClick={() => navigate({ to: "/" })}>
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full" onClick={() => logOut()}>
              Sign Out
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Quick Role Switcher Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" /> Select User Type
              </h2>
              <span className="text-xs text-muted-foreground">Click for 1-click login</span>
            </div>

            {/* Admin Role Card */}
            <Card
              className="cursor-pointer transition-all hover:border-primary hover:shadow-md group relative overflow-hidden"
              onClick={() => handleQuickLogin("admin@example.com")}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500" />
              <CardHeader className="pl-6 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-red-500" />
                    <CardTitle className="text-base font-bold">Admin User</CardTitle>
                  </div>
                  <Badge variant="destructive" className="font-semibold">Full Control</Badge>
                </div>
                <CardDescription className="text-xs pt-1">
                  admin@example.com
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-6 pt-0 text-xs text-muted-foreground space-y-1">
                <p>• Create, edit, and delete <strong>everything</strong> (all teams, squad rosters, players, venues, match schedules).</p>
                <p>• Access system configuration and admin portal dashboards.</p>
              </CardContent>
              <CardFooter className="pl-6 pt-2 pb-4">
                <Button size="sm" variant="default" className="w-full group-hover:bg-primary">
                  Sign In as Admin <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>

            {/* Club Owner Role Card */}
            <Card
              className="cursor-pointer transition-all hover:border-primary hover:shadow-md group relative overflow-hidden"
              onClick={() => handleQuickLogin("clubowner@example.com")}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500" />
              <CardHeader className="pl-6 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-base font-bold">Club Owner</CardTitle>
                  </div>
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">Club Management</Badge>
                </div>
                <CardDescription className="text-xs pt-1">
                  clubowner@example.com
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-6 pt-0 text-xs text-muted-foreground space-y-1">
                <p>• Access, create, edit, and delete <strong>their club info</strong> and club squad players.</p>
                <p>• Manage team details, position assignments, and jersey numbers.</p>
              </CardContent>
              <CardFooter className="pl-6 pt-2 pb-4">
                <Button size="sm" variant="outline" className="w-full group-hover:border-primary group-hover:text-primary">
                  Sign In as Club Owner <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>

            {/* Viewer / Guest Card */}
            <Card
              className="cursor-pointer transition-all hover:border-primary hover:shadow-md group relative overflow-hidden"
              onClick={() => handleQuickLogin("viewer@example.com")}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500" />
              <CardHeader className="pl-6 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-emerald-500" />
                    <CardTitle className="text-base font-bold">General User / Viewer</CardTitle>
                  </div>
                  <Badge variant="secondary" className="font-semibold">View Only</Badge>
                </div>
                <CardDescription className="text-xs pt-1">
                  viewer@example.com
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-6 pt-0 text-xs text-muted-foreground space-y-1">
                <p>• View match schedule, probabilities, team lists, and player directories.</p>
                <p>• Browse tournament data without edit/delete privileges.</p>
              </CardContent>
              <CardFooter className="pl-6 pt-2 pb-4">
                <Button size="sm" variant="ghost" className="w-full border group-hover:bg-accent">
                  Sign In as Viewer <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Standard Login Form */}
          <div className="lg:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" /> Standard Credentials
                </CardTitle>
                <CardDescription className="text-xs">
                  Enter email and password to log in.
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleLoginSubmit}>
                <CardContent className="space-y-4">
                  {(loginError || (error as any)?.message) && (
                    <div className="rounded-md bg-destructive/10 p-3 text-xs text-destructive">
                      {loginError || (error as any)?.message}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-semibold">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="user@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-8"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-xs font-semibold">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-8"
                        required
                      />
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Signing in..." : "Sign In"}
                  </Button>
                  <p className="text-[11px] text-center text-muted-foreground">
                    Default password for demo accounts is <code className="bg-muted px-1 rounded">password</code>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
