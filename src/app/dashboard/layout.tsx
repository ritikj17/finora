// src/app/dashboard/layout.tsx
"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/sign-in";
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <div className="font-bold text-xl">Finora</div>
            <nav className="hidden md:flex gap-4">
              <Link 
                href="/dashboard" 
                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Overview
              </Link>
              <Link 
                href="/dashboard/upload" 
                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === '/dashboard/upload' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Upload CSV
              </Link>
              <Link 
                href="/dashboard/settings" 
                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === '/dashboard/settings' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Settings
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:inline-block">
              {session?.user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}