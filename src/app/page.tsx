// src/app/page.tsx
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Welcome to Finora
      </h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-md text-center">
        Your AI-powered personal finance architect. Upload your statements and let AI categorize your life.
      </p>
      
      <div className="mt-8 flex gap-4">
        <Button size="lg">Get Started</Button>
        <Button variant="outline" size="lg">View Demo</Button>
      </div>
    </main>
  );
}