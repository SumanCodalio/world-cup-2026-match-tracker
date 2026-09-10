import { useState } from "react";
import { useRhinoContext } from "@rhino-project/core";
import { useSignOutAction } from "@rhino-project/core/queries";
import { Link, useNavigate } from "@tanstack/react-router";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Bell, Moon, Search, Sun, Shield, Building2, Eye, LogIn, LogOut } from "lucide-react";

export function getUserRole(user: any, usersRoles: any[]): "admin" | "club_owner" | "viewer" {
  if (!user) return "viewer";
  const roleNames = (usersRoles || user?.users_roles || [])
    .map((ur: any) => ur?.role?.name)
    .filter(Boolean);
  if (roleNames.includes("admin") || user.email?.startsWith("admin")) return "admin";
  if (roleNames.includes("club_owner") || user.email?.startsWith("clubowner")) return "club_owner";
  return "viewer";
}

export default function GlobalHeader() {
  const [query, setQuery] = useState("");
  const [isDark, setIsDark] = useState(false);
  const { user, usersRoles, logOut } = useRhinoContext();
  const { mutate: signOut } = useSignOutAction();
  const navigate = useNavigate();

  const activeRole = getUserRole(user, usersRoles);

  const toggleTheme = () => {
    setIsDark((current) => {
      const next = !current;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  const handleSignOut = () => {
    signOut(undefined, {
      onSettled: () => {
        logOut();
        navigate({ to: "/auth/signin" });
      }
    });
  };

  return (
    <header className="flex w-full min-w-0 items-center justify-between gap-3 border-b bg-background/95 px-4 py-3 backdrop-blur">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div className="relative hidden w-full max-w-sm md:block">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search matches, teams, venues..."
            className="pl-8"
          />
        </div>
        <Badge variant="secondary" className="hidden sm:inline-flex">
          Live: 6 Matches
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        {user ? (
          <div className="flex items-center gap-2 mr-2">
            {activeRole === "admin" && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <Shield className="h-3 w-3" /> Admin
              </Badge>
            )}
            {activeRole === "club_owner" && (
              <Badge className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1">
                <Building2 className="h-3 w-3" /> Club Owner
              </Badge>
            )}
            {activeRole === "viewer" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Eye className="h-3 w-3" /> Viewer
              </Badge>
            )}
            <span className="hidden md:inline text-xs font-medium text-foreground">
              {user.name || user.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut} title="Sign Out" className="gap-1 text-xs">
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        ) : (
          <Button variant="default" size="sm" asChild className="gap-1 text-xs">
            <Link to="/auth/signin">
              <LogIn className="h-3.5 w-3.5" /> Sign In
            </Link>
          </Button>
        )}

        <Button variant="outline" size="icon" aria-label="Open notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  );
}