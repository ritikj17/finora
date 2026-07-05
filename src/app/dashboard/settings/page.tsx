"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function SettingsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Auto-fill the form once the session loads from the server
  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    // Call the Better Auth API to update the database
    const { error } = await authClient.updateUser({
      name: name,
    });

    if (error) {
      setMessage({ type: 'error', text: error.message || "Failed to update profile." });
    } else {
      setMessage({ type: 'success', text: "Profile updated successfully!" });
    }
    
    setIsSaving(false);
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await authClient.signOut();
      router.push("/sign-in");
    } catch (error) {
      console.error("Failed to sign out:", error);
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground animate-pulse">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account preferences and profile details.
        </p>
      </div>

      {/* Profile Information Card */}
      <Card>
        <form onSubmit={handleSave}>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {message && (
               <div className={`p-4 rounded-md text-sm font-medium ${message.type === 'success' ? 'bg-emerald-500/15 text-emerald-600' : 'bg-destructive/15 text-destructive'}`}>
                 {message.text}
               </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={session?.user?.email || ""}
                disabled
                className="bg-muted/50 text-muted-foreground cursor-not-allowed"
              />
              <p className="text-[0.8rem] text-muted-foreground">
                Your email address is used for authentication and cannot be changed here.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                disabled={isSaving}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              disabled={isSaving || name === session?.user?.name || name.trim() === ""}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Danger Zone / Account Security Card */}
      <Card className="border-rose-500/20">
        <CardHeader>
          <CardTitle className="text-rose-500">Account Security</CardTitle>
          <CardDescription>
            Manage your active session across the Finora platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="destructive" 
            onClick={handleSignOut}
            disabled={isSigningOut}
          >
            {isSigningOut ? "Signing out..." : "Sign Out of Finora"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}