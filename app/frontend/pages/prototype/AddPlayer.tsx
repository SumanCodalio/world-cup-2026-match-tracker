import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { useModelCreate } from "@rhino-project/core/hooks";
import { ArrowLeft, Save } from "lucide-react";

const POSITIONS = ["Goalkeeper", "Defender", "Midfielder", "Forward"];

export default function AddPlayer() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [nationality, setNationality] = useState("");
  const [club, setClub] = useState("");
  const [position, setPosition] = useState("Forward");
  const [error, setError] = useState("");

  const { mutate: createPlayer, isPending } = useModelCreate("player", {
    onSuccess: () => {
      navigate({ to: "/players" });
    },
    onError: (err: any) => {
      setError(err?.message || "Failed to create player");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    createPlayer({
      name: name.trim(),
      surname: surname.trim(),
      nationality: nationality.trim(),
      club: club.trim(),
      position: position,
    });
  };

  return (
    <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-col gap-6 px-4 py-6 md:px-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate({ to: "/players" })}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Add New Player</h1>
            <p className="text-sm text-muted-foreground">Fill in the player details to add them to the database.</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Player Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md border border-destructive/20">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Lionel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="surname">Surname</Label>
                  <Input
                    id="surname"
                    placeholder="e.g. Messi"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    placeholder="e.g. Argentina"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="club">Club</Label>
                  <Input
                    id="club"
                    placeholder="e.g. Inter Miami"
                    value={club}
                    onChange={(e) => setClub(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select value={position} onValueChange={setPosition}>
                  <SelectTrigger id="position">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    {POSITIONS.map((pos) => (
                      <SelectItem key={pos} value={pos}>
                        {pos}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => navigate({ to: "/players" })}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  {isPending ? "Saving..." : "Save Player"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
