import React from "react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";

import { useState } from "react";

export default function UserProfile() {
    const [name, setName] = useState("Football Fan")
    const [email, setEmail] = useState("fan@example.com")
    const [timezone, setTimezone] = useState("UTC-5")
    const [favorites, setFavorites] = useState(["USA", "Brazil", "France"])
  return (
   <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-6 px-4 py-6 md:px-6">
          <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <Card>
      <CardHeader>
      <div className="flex items-center gap-3">
      <Avatar><AvatarFallback>FM</AvatarFallback></Avatar>
      <div>
      <CardTitle>{name}</CardTitle>
      <CardDescription>{email}</CardDescription>
      </div>
      </div>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-3">
      <Input value={name} onChange={(event) => setName(event.target.value)} />
      <Input value={email} onChange={(event) => setEmail(event.target.value)} />
      <Input value={timezone} onChange={(event) => setTimezone(event.target.value)} />
      </CardContent>
      </Card>

      <Card>
      <CardHeader><CardTitle>Favorite Teams</CardTitle></CardHeader>
      <CardContent className="flex flex-wrap items-center gap-2">
      {favorites.map((fav) => (<Badge key={fav}>{fav}</Badge>))}
      <Button size="sm" variant="secondary" onClick={() => setFavorites((current) => current.includes("Spain") ? current : [...current, "Spain"])}>Add Spain</Button>
      </CardContent>
      </Card>
      </section>
      </div>
    </div>
  );
}