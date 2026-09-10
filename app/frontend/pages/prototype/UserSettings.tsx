import React from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Switch } from "../../components/ui/switch";

import { useState } from "react";

export default function UserSettings() {
    const [push, setPush] = useState(true)
    const [emailAlerts, setEmailAlerts] = useState(true)
    const [timezone, setTimezone] = useState("utc-5")
    const [saved, setSaved] = useState(false)
  return (
   <div className="w-full min-w-0 bg-background text-foreground overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-6 px-4 py-6 md:px-6">
          <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <Card>
      <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
      <CardContent className="space-y-4">
      <div className="flex items-center justify-between"><span>Push Notifications</span><Switch checked={push} onCheckedChange={setPush} /></div>
      <div className="flex items-center justify-between"><span>Email Alerts</span><Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} /></div>
      <Select value={timezone} onValueChange={setTimezone}>
      <SelectTrigger className="max-w-xs"><SelectValue placeholder="Timezone" /></SelectTrigger>
      <SelectContent>
      <SelectItem value="utc-8">UTC-8</SelectItem>
      <SelectItem value="utc-5">UTC-5</SelectItem>
      <SelectItem value="utc+1">UTC+1</SelectItem>
      </SelectContent>
      </Select>
      <Button onClick={() => setSaved(true)}>Save Settings</Button>
      {saved && <Badge>Saved</Badge>}
      </CardContent>
      </Card>

      <Card>
      <CardHeader><CardTitle>Subscription</CardTitle></CardHeader>
      <CardContent className="flex items-center gap-3">
      <Badge variant="secondary">Pro Plan</Badge>
      <Button variant="outline">Renew</Button>
      <Button variant="destructive">Cancel</Button>
      </CardContent>
      </Card>
      </section>
      </div>
    </div>
  );
}