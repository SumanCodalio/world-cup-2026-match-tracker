import { useMemo, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "./ui/breadcrumb";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, Trophy } from "lucide-react";

import GlobalFooter from "./GlobalFooter";
import GlobalHeader from "./GlobalHeader";

export default function Layout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigationItems = [
    { label: "Home", route: "/" },
    { label: "Schedule", route: "/schedule" },
    { label: "Probabilities", route: "/probabilities" },
    { label: "Teams", route: "/teams" },
    { label: "User", route: "/user" },
    { label: "Admin", route: "/admin" },
  ];

  const crumbLabel = useMemo(() => {
    const direct = navigationItems.find((item) => item.route === location.pathname);
    if (direct) return direct.label;
    if (location.pathname.startsWith("/schedule/")) return "Match Detail";
    if (location.pathname.startsWith("/probabilities/")) return "Probability Detail";
    if (location.pathname.startsWith("/teams/")) return "Team Detail";
    if (location.pathname.startsWith("/user/")) return "User";
    if (location.pathname.startsWith("/admin/")) return "Admin";
    return "Home";
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full min-w-0 bg-background text-foreground">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className={`hidden border-r bg-card p-4 transition-all duration-200 lg:block ${collapsed ? "w-20" : "w-full"}`}>
          <div className="mb-6 flex items-center gap-2 px-2">
            <Trophy className="h-5 w-5 text-primary" />
            {!collapsed && <span className="text-sm font-semibold">World Cup 2026 Match Tracker</span>}
          </div>

          <nav className="flex flex-col gap-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.route}
                to={item.route}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm transition-colors duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`
                }
              >
                {collapsed ? item.label.slice(0, 1) : item.label}
              </NavLink>
            ))}
          </nav>

          <Separator className="my-4" />
          <Button variant="outline" size="sm" onClick={() => setCollapsed((value) => !value)}>
            {collapsed ? "Expand" : "Collapse"}
          </Button>
        </aside>

        <div className="flex min-w-0 flex-col">
          <div className="flex items-center justify-between border-b px-4 py-2 lg:hidden">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold">World Cup 2026 Match Tracker</span>
            </div>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open navigation menu">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-2">
                  {navigationItems.map((item) => (
                    <Button key={item.route} variant="ghost" asChild className="justify-start">
                      <Link to={item.route} onClick={() => setMobileOpen(false)}>
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <GlobalHeader />

          <div className="px-4 pt-4 md:px-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>{crumbLabel}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <main className="w-full min-w-0 flex-1 p-4 md:p-6">
            <Outlet />
          </main>

          <GlobalFooter />
        </div>
      </div>
    </div>
  );
}