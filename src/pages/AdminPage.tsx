import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import { toast } from "@/hooks/use-toast";
import { useDocumentHead } from "@/lib/useDocumentHead";

const db = supabase as any;

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface Prospect {
  id: string;
  full_name: string;
  business: string;
  prefix_slug: string;
  created_at: string;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("seddayoub77@gmail.com");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [business, setBusiness] = useState("");
  const [prefix, setPrefix] = useState("");
  const [generated, setGenerated] = useState<string | null>(null);
  const [prospects, setProspects] = useState<Prospect[]>([]);

  useDocumentHead({
    title: "Admin — Phaos AI Pitch Deck",
    description: "Internal admin console to generate prospect-specific Phaos AI pitch deck links and review engagement analytics.",
    canonical: "https://pitch-deck.phaosai.com/admin",
    noindex: true,
  });


  useEffect(() => {
    let mounted = true;
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      if (data.session) {
        const { data: roleData } = await db
          .from("user_roles")
          .select("role")
          .eq("user_id", data.session.user.id)
          .eq("role", "admin")
          .maybeSingle();
        if (roleData) setAuthed(true);
        else await supabase.auth.signOut();
      }
      setChecking(false);
    };
    init();
    const { data: sub } = supabase.auth.onAuthStateChange(() => { });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!authed) return;
    loadProspects();
  }, [authed]);

  const loadProspects = async () => {
    const { data } = await db
      .from("prospects")
      .select("*")
      .order("created_at", { ascending: false });
    setProspects((data as Prospect[]) ?? []);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErr(null);
    if (email !== "seddayoub77@gmail.com") {
      setLoginErr("Unauthorized");
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.session) {
      setLoginErr(error?.message ?? "Login failed");
      return;
    }
    const { data: roleData } = await db
      .from("user_roles")
      .select("role")
      .eq("user_id", data.session.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleData) {
      await supabase.auth.signOut();
      setLoginErr("Not an admin");
      return;
    }
    setAuthed(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = slugify(prefix);
    if (!fullName.trim() || !business.trim() || !slug) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    const { error } = await db.from("prospects").insert({
      full_name: fullName.trim(),
      business: business.trim(),
      prefix_slug: slug,
    });
    if (error) {
      toast({ title: "Failed", description: error.message, variant: "destructive" });
      return;
    }
    setGenerated(`pitch-deck.phaosai.com/${slug}`);
    setFullName("");
    setBusiness("");
    setPrefix("");
    loadProspects();
  };

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(`https://${link}`);
    toast({ title: "Copied" });
  };

  if (checking) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Loading…</div>;
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Username</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pw">Password</Label>
                <Input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {loginErr && <p className="text-sm text-destructive">{loginErr}</p>}
              <Button type="submit" className="w-full">Sign in</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Button variant="outline" onClick={async () => { await supabase.auth.signOut(); setAuthed(false); }}>
            Sign out
          </Button>
        </div>

        <Tabs defaultValue="generate">
          <TabsList>
            <TabsTrigger value="generate">Generate Link</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6 mt-6">
            <Card>
              <CardHeader><CardTitle>Generate prospect link</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Contact's Full Name</Label>
                    <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact's Business</Label>
                    <Input value={business} onChange={(e) => setBusiness(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Subdomain Prefix</Label>
                    <Input value={prefix} onChange={(e) => setPrefix(e.target.value)} placeholder="daniel-lindros" />
                  </div>
                  <Button type="submit">Submit</Button>
                  <div className="space-y-2 pt-4">
                    <Label>Generated Link</Label>
                    <div className="flex gap-2">
                      <Input readOnly value={generated ?? ""} placeholder="pitch-deck.phaosai.com/..." />
                      {generated && <Button type="button" variant="outline" onClick={() => copyLink(generated)}>Copy</Button>}
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Existing prospects</CardTitle></CardHeader>
              <CardContent>
                {prospects.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No prospects yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {prospects.map((p) => (
                      <li key={p.id} className="flex items-center justify-between border-b py-2">
                        <div>
                          <div className="font-medium">{p.full_name} <span className="text-muted-foreground">— {p.business}</span></div>
                          <div className="text-sm text-muted-foreground">pitch-deck.phaosai.com/{p.prefix_slug}</div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => copyLink(`pitch-deck.phaosai.com/${p.prefix_slug}`)}>Copy</Button>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
