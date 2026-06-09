import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Bell, Moon, Search, Sun } from "lucide-react";

export default function GlobalHeader() {
  const [query, setQuery] = useState("");
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((current) => {
      const next = !current;
      document.documentElement.classList.toggle("dark", next);
      return next;
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