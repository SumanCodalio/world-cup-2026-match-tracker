import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function GlobalFooter() {
  return (
    <footer className="mt-10 w-full min-w-0 border-t bg-card px-4 py-6 text-sm text-muted-foreground">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <h4 className="font-semibold text-foreground">Platform</h4>
          <div className="flex flex-col items-start gap-2">
            <Button variant="link" asChild className="h-auto p-0 text-muted-foreground">
              <Link to="/schedule">Schedule</Link>
            </Button>
            <Button variant="link" asChild className="h-auto p-0 text-muted-foreground">
              <Link to="/probabilities">Probabilities</Link>
            </Button>
            <Button variant="link" asChild className="h-auto p-0 text-muted-foreground">
              <Link to="/teams">Teams</Link>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-foreground">Portals</h4>
          <div className="flex flex-col items-start gap-2">
            <Button variant="link" asChild className="h-auto p-0 text-muted-foreground">
              <Link to="/user">User Portal</Link>
            </Button>
            <Button variant="link" asChild className="h-auto p-0 text-muted-foreground">
              <Link to="/admin">Admin Portal</Link>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-foreground">Legal</h4>
          <div className="flex flex-col items-start gap-2">
            <Button variant="link" className="h-auto p-0 text-muted-foreground">
              Privacy
            </Button>
            <Button variant="link" className="h-auto p-0 text-muted-foreground">
              Terms
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-4" />
      <p>© 2026 World Cup Match Tracker</p>
    </footer>
  );
}