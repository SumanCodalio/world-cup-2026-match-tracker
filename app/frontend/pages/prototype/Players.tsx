import React, { useState, useMemo } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { Link, useNavigate } from "@tanstack/react-router";
import { useModelIndex, useModelDelete } from "@rhino-project/core/hooks";
import { useRhinoContext } from "@rhino-project/core";
import { getUserRole } from "../../components/prototype/GlobalHeader";
import { UserPlus, Search, Edit, Trash2, ChevronLeft, ChevronRight, Shield, Building2, Eye, Lock } from "lucide-react";

// Mock players to ensure there are initially 20 players listed
const DEFAULT_PLAYERS = [
  { id: "def-1", name: "Lionel", surname: "Messi", nationality: "Argentina", club: "Inter Miami", position: "Forward" },
  { id: "def-2", name: "Cristiano", surname: "Ronaldo", nationality: "Portugal", club: "Al Nassr", position: "Forward" },
  { id: "def-3", name: "Kylian", surname: "Mbappé", nationality: "France", club: "Real Madrid", position: "Forward" },
  { id: "def-4", name: "Erling", surname: "Haaland", nationality: "Norway", club: "Manchester City", position: "Forward" },
  { id: "def-5", name: "Kevin", surname: "De Bruyne", nationality: "Belgium", club: "Manchester City", position: "Midfielder" },
  { id: "def-6", name: "Jude", surname: "Bellingham", nationality: "England", club: "Real Madrid", position: "Midfielder" },
  { id: "def-7", name: "Luka", surname: "Modrić", nationality: "Croatia", club: "Real Madrid", position: "Midfielder" },
  { id: "def-8", name: "Virgil", surname: "van Dijk", nationality: "Netherlands", club: "Liverpool", position: "Defender" },
  { id: "def-9", name: "Ruben", surname: "Dias", nationality: "Portugal", club: "Manchester City", position: "Defender" },
  { id: "def-10", name: "Alisson", surname: "Becker", nationality: "Brazil", club: "Liverpool", position: "Goalkeeper" },
  { id: "def-11", name: "Thibaut", surname: "Courtois", nationality: "Belgium", club: "Real Madrid", position: "Goalkeeper" },
  { id: "def-12", name: "Vinicius", surname: "Junior", nationality: "Brazil", club: "Real Madrid", position: "Forward" },
  { id: "def-13", name: "Mohamed", surname: "Salah", nationality: "Egypt", club: "Liverpool", position: "Forward" },
  { id: "def-14", name: "Harry", surname: "Kane", nationality: "England", club: "Bayern Munich", position: "Forward" },
  { id: "def-15", name: "Pedri", surname: "González", nationality: "Spain", club: "Barcelona", position: "Midfielder" },
  { id: "def-16", name: "Rodri", surname: "Hernández", nationality: "Spain", club: "Manchester City", position: "Midfielder" },
  { id: "def-17", name: "Achraf", surname: "Hakimi", nationality: "Morocco", club: "Paris Saint-Germain", position: "Defender" },
  { id: "def-18", name: "Alphonso", surname: "Davies", nationality: "Canada", club: "Bayern Munich", position: "Defender" },
  { id: "def-19", name: "Lautaro", surname: "Martínez", nationality: "Argentina", club: "Inter Milan", position: "Forward" },
  { id: "def-20", name: "Federico", surname: "Valverde", nationality: "Uruguay", club: "Real Madrid", position: "Midfielder" },
];

const ITEMS_PER_PAGE = 20;

export default function Players() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { user, usersRoles } = useRhinoContext();
  const activeRole = getUserRole(user, usersRoles);
  const canManage = activeRole === "admin" || activeRole === "club_owner";

  const { resources, refetch } = useModelIndex("player", {
    order: "created_at desc",
  });

  const { mutate: deletePlayer } = useModelDelete("player", {
    onSuccess: () => {
      refetch();
    },
  });

  const dbPlayers = useMemo(() => {
    if (!resources?.results) return [];
    return resources.results.map((p: any) => {
      // Handle names if split or single
      const parts = (p.name || "").trim().split(" ");
      const firstName = p.name ? (p.surname ? p.name : parts[0]) : "";
      const lastName = p.surname ? p.surname : (parts.slice(1).join(" ") || "");

      return {
        id: p.id,
        dbId: p.id,
        name: firstName,
        surname: lastName,
        nationality: p.nationality || "N/A",
        club: p.club || "N/A",
        position: p.position || "N/A",
      };
    });
  }, [resources]);

  // Combined list with DB players first, then default players
  const allPlayers = useMemo(() => {
    return [...dbPlayers, ...DEFAULT_PLAYERS];
  }, [dbPlayers]);

  const filteredPlayers = useMemo(() => {
    return allPlayers.filter((player) => {
      const fullSearch = `${player.name} ${player.surname} ${player.nationality} ${player.club} ${player.position}`.toLowerCase();
      const matchesQuery = fullSearch.includes(query.toLowerCase());
      const matchesPosition = positionFilter === "all" || player.position.toLowerCase() === positionFilter.toLowerCase();
      return matchesQuery && matchesPosition;
    });
  }, [allPlayers, query, positionFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPlayers.length / ITEMS_PER_PAGE) || 1;
  const paginatedPlayers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPlayers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPlayers, currentPage]);

  const handleDelete = (player: any) => {
    if (confirm(`Are you sure you want to delete ${player.name} ${player.surname}?`)) {
      if (player.dbId) {
        deletePlayer({ id: player.dbId });
      } else {
        alert("Demo player removed from view.");
      }
    }
  };

  return (
    <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-6 px-4 py-6 md:px-6">
        {/* Permission Status Banner */}
        {activeRole === "admin" && (
          <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20 p-3 text-xs text-red-700 dark:text-red-300">
            <span className="flex items-center gap-2 font-medium">
              <Shield className="h-4 w-4" /> Admin Mode: Full permissions to create, edit, and delete all player records.
            </span>
            <Badge variant="destructive">Admin</Badge>
          </div>
        )}
        {activeRole === "club_owner" && (
          <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-950/20 p-3 text-xs text-blue-700 dark:text-blue-300">
            <span className="flex items-center gap-2 font-medium">
              <Building2 className="h-4 w-4" /> Club Owner Mode: Permissions to manage club info and player roster.
            </span>
            <Badge className="bg-blue-600 text-white">Club Owner</Badge>
          </div>
        )}
        {activeRole === "viewer" && (
          <div className="flex items-center justify-between rounded-lg border bg-muted/60 p-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-2 font-medium">
              <Eye className="h-4 w-4" /> Public Viewer Mode: Viewing player profiles in read-only mode.
            </span>
            <Button size="sm" variant="outline" asChild className="h-7 text-xs">
              <Link to="/auth/signin">Sign In to Edit</Link>
            </Button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Players Directory</h1>
            <p className="text-sm text-muted-foreground">Manage and search player profiles across all teams and clubs.</p>
          </div>
          {canManage ? (
            <Button asChild className="flex items-center gap-2">
              <Link to="/players/new">
                <UserPlus className="h-4 w-4" /> Add Player
              </Link>
            </Button>
          ) : (
            <Button variant="outline" asChild className="gap-2 text-muted-foreground text-xs">
              <Link to="/auth/signin">
                <Lock className="h-3.5 w-3.5" /> Sign In to Add Player
              </Link>
            </Button>
          )}
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search player by name, surname, nationality or club..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-9"
                />
              </div>
              <Select
                value={positionFilter}
                onValueChange={(val) => {
                  setPositionFilter(val);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                  <SelectItem value="defender">Defender</SelectItem>
                  <SelectItem value="midfielder">Midfielder</SelectItem>
                  <SelectItem value="forward">Forward</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Players List Table */}
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base font-semibold">
              Showing {paginatedPlayers.length} of {filteredPlayers.length} Players
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Surname</TableHead>
                    <TableHead>Nationality</TableHead>
                    <TableHead>Club</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedPlayers.length > 0 ? (
                    paginatedPlayers.map((player) => (
                      <TableRow key={player.id}>
                        <TableCell className="font-medium">{player.name}</TableCell>
                        <TableCell>{player.surname}</TableCell>
                        <TableCell>{player.nationality}</TableCell>
                        <TableCell>{player.club}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground">
                            {player.position}
                          </span>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          {canManage ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate({ to: `/players/$playerId/edit`, params: { playerId: player.id.toString() } })}
                              >
                                <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(player)}
                              >
                                <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                              </Button>
                            </>
                          ) : (
                            <Badge variant="outline" className="text-muted-foreground font-normal">
                              View Only
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No players found matching your search criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-4 border-t">
                <div className="text-xs text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
