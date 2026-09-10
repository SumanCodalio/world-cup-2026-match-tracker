import React, { useMemo, useState } from "react";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

import { Link } from "@tanstack/react-router";
import { useModelIndex, useModelCreate, useModelDelete, useBaseOwnerId } from "@rhino-project/core/hooks";
import { useRhinoContext } from "@rhino-project/core";
import { getUserRole } from "../../components/prototype/GlobalHeader";
import { Plus, Trash2, Shield, Building2, Eye, Lock } from "lucide-react";

interface SquadMember {
  id: string;
  name: string;
  position: string;
  jersey_number: number | string;
}

const POSITIONS = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];

export default function Teams() {
  const [query, setQuery] = useState("");
  const [confed, setConfed] = useState("all");
  const baseOwnerId = useBaseOwnerId();
  const { user, usersRoles } = useRhinoContext();
  const activeRole = getUserRole(user, usersRoles);
  const canManage = activeRole === "admin" || activeRole === "club_owner";

  // Model hooks for backend integration
  const { resources, refetch } = useModelIndex('team', {
    order: 'created_at desc'
  });

  const { mutate: createTeam, isPending: isSaving } = useModelCreate('team', {
    onSuccess: () => {
      resetForm();
      setIsModalOpen(false);
      refetch();
    }
  });

  const { mutate: deleteTeam } = useModelDelete('team', {
    onSuccess: () => {
      refetch();
    }
  });

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [squad, setSquad] = useState<SquadMember[]>([]);

  // Squad Member Form State
  const [playerName, setPlayerName] = useState('');
  const [playerPosition, setPlayerPosition] = useState('Forward');
  const [playerJersey, setPlayerJersey] = useState('');
  const [formError, setFormError] = useState('');

  const resetForm = () => {
    setTeamName('');
    setTeamCode('');
    setSquad([]);
    setPlayerName('');
    setPlayerPosition('Forward');
    setPlayerJersey('');
    setFormError('');
  };

  const handleAddPlayer = () => {
    if (!playerName.trim()) {
      setFormError('Player name is required');
      return;
    }
    if (!playerJersey) {
      setFormError('Jersey number is required');
      return;
    }

    setSquad([
      ...squad,
      {
        id: Date.now().toString(),
        name: playerName.trim(),
        position: playerPosition,
        jersey_number: playerJersey
      }
    ]);

    setPlayerName('');
    setPlayerJersey('');
    setFormError('');
  };

  const handleRemovePlayer = (id: string) => {
    setSquad(squad.filter((p) => p.id !== id));
  };

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) {
      setFormError('Team name is required');
      return;
    }
    if (!teamCode.trim()) {
      setFormError('Team code is required');
      return;
    }

    const players_attributes = squad.map((member) => ({
      name: member.name,
      position: member.position,
      jersey_number: Number(member.jersey_number) || 0
    }));

    createTeam({
      name: teamName.trim(),
      group_name: teamCode.trim(),
      status: 'active',
      organization_id: baseOwnerId,
      players_attributes
    });
  };

  const handleDeleteTeam = (id: number) => {
    if (confirm('Are you sure you want to delete this team?')) {
      deleteTeam({ id });
    }
  };

  // Static prototype initial teams
  const defaultTeams = [
    { id: "usa", name: "United States", code: "US", confed: "concacaf", confedLabel: "CONCACAF", group: "A", players: [] },
    { id: "bra", name: "Brazil", code: "BR", confed: "conmebol", confedLabel: "CONMEBOL", group: "B", players: [] },
    { id: "fra", name: "France", code: "FR", confed: "uefa", confedLabel: "UEFA", group: "C", players: [] },
  ];

  const dbTeams = (resources?.results || []).map((t: any) => ({
    id: t.id.toString(),
    dbId: t.id,
    name: t.name,
    code: (t.group_name || t.name.slice(0, 2)).toUpperCase(),
    confed: "other",
    confedLabel: t.group_name ? `Code: ${t.group_name}` : "National Team",
    group: t.group_name || "A",
    players: t.players || []
  }));

  const allTeams = [...dbTeams, ...defaultTeams];

  const filteredTeams = useMemo(() => {
    return allTeams.filter((team) => {
      const byQuery = team.name.toLowerCase().includes(query.toLowerCase()) || team.code.toLowerCase().includes(query.toLowerCase());
      const byConfed = confed === "all" || team.confed === confed;
      return byQuery && byConfed;
    });
  }, [allTeams, query, confed]);

  return (
    <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-6 px-4 py-6 md:px-6">
        <section className="space-y-4">
          {/* Permission Status Banner */}
          {activeRole === "admin" && (
            <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20 p-3 text-xs text-red-700 dark:text-red-300">
              <span className="flex items-center gap-2 font-medium">
                <Shield className="h-4 w-4" /> Admin Mode: Full permissions to create, edit, and delete all teams and players.
              </span>
              <Badge variant="destructive">Admin</Badge>
            </div>
          )}
          {activeRole === "club_owner" && (
            <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-950/20 p-3 text-xs text-blue-700 dark:text-blue-300">
              <span className="flex items-center gap-2 font-medium">
                <Building2 className="h-4 w-4" /> Club Owner Mode: Permissions to manage club info, team details, and squad rosters.
              </span>
              <Badge className="bg-blue-600 text-white">Club Owner</Badge>
            </div>
          )}
          {activeRole === "viewer" && (
            <div className="flex items-center justify-between rounded-lg border bg-muted/60 p-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-2 font-medium">
                <Eye className="h-4 w-4" /> Public Viewer Mode: Viewing teams in read-only mode.
              </span>
              <Button size="sm" variant="outline" asChild className="h-7 text-xs">
                <Link to="/auth/signin">Sign In to Edit</Link>
              </Button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold">National Teams</h1>
            {canManage ? (
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Add New Team
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Team</DialogTitle>
                    <DialogDescription>
                      Create a new national team with a team name, team code, and squad roster.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateTeam} className="space-y-4 py-2">
                    {formError && (
                      <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md border border-destructive/20">
                        {formError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="teamName">Team Name</Label>
                        <Input
                          id="teamName"
                          placeholder="e.g. Argentina"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="teamCode">Team Code</Label>
                        <Input
                          id="teamCode"
                          placeholder="e.g. ARG"
                          value={teamCode}
                          onChange={(e) => setTeamCode(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-3">
                      <h4 className="text-sm font-semibold">Team Squad Roster</h4>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end bg-muted/50 p-3 rounded-lg border">
                        <div className="space-y-1 md:col-span-2">
                          <Label className="text-xs">Player Name</Label>
                          <Input
                            placeholder="e.g. Lionel Messi"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Position</Label>
                          <Select value={playerPosition} onValueChange={setPlayerPosition}>
                            <SelectTrigger><SelectValue placeholder="Position" /></SelectTrigger>
                            <SelectContent>
                              {POSITIONS.map((pos) => (
                                <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Jersey #</Label>
                          <Input
                            type="number"
                            placeholder="10"
                            value={playerJersey}
                            onChange={(e) => setPlayerJersey(e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-4 flex justify-end">
                          <Button type="button" variant="secondary" size="sm" onClick={handleAddPlayer}>
                            Add Player
                          </Button>
                        </div>
                      </div>

                      {squad.length > 0 ? (
                        <div className="border rounded-md overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {squad.map((member) => (
                                <TableRow key={member.id}>
                                  <TableCell className="font-medium">#{member.jersey_number}</TableCell>
                                  <TableCell>{member.name}</TableCell>
                                  <TableCell>{member.position}</TableCell>
                                  <TableCell className="text-right">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                                      onClick={() => handleRemovePlayer(member.id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground text-center py-4 italic border border-dashed rounded-md">
                          No players added to the squad yet.
                        </p>
                      )}
                    </div>

                    <DialogFooter className="pt-2">
                      <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSaving}>
                        {isSaving ? "Creating..." : "Create Team"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            ) : (
              <Button variant="outline" asChild className="gap-2 text-muted-foreground">
                <Link to="/auth/signin">
                  <Lock className="h-4 w-4" /> Sign In as Admin / Club Owner to Add Team
                </Link>
              </Button>
            )}
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search team" />
            <Select value={confed} onValueChange={setConfed}>
              <SelectTrigger><SelectValue placeholder="Confederation" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Confederations</SelectItem>
                <SelectItem value="uefa">UEFA</SelectItem>
                <SelectItem value="conmebol">CONMEBOL</SelectItem>
                <SelectItem value="concacaf">CONCACAF</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="secondary" onClick={() => { setQuery(""); setConfed("all"); }}>Reset</Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTeams.map((team) => (
              <Card key={team.id} className="shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{team.code}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{team.name}</CardTitle>
                        <CardDescription>{team.confedLabel}</CardDescription>
                      </div>
                    </div>
                    {canManage && team.dbId && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                        onClick={() => handleDeleteTeam(team.dbId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Group {team.group}</Badge>
                    <Button size="sm" asChild><Link to={`/teams/${team.id}`}>View Team</Link></Button>
                  </div>
                  {team.players && team.players.length > 0 && (
                    <div className="pt-2 border-t text-xs space-y-1">
                      <div className="font-medium text-muted-foreground mb-1">Squad Roster ({team.players.length}):</div>
                      <div className="max-h-24 overflow-y-auto space-y-1">
                        {team.players.map((p: any) => (
                          <div key={p.id} className="flex justify-between items-center text-muted-foreground">
                            <span>#{p.jersey_number} {p.name}</span>
                            <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded">{p.position}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}