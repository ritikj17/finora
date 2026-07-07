"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // Better Auth forgetPassword API
      // @ts-expect-error: forgetPassword exists on the client at runtime but TS inference is missing without server types
      const { error: apiError } = await authClient.forgetPassword({
        email: data.email,
        redirectTo: "/reset-password",
      });

      if (apiError) {
        setError(apiError.message || "Failed to send reset email.");
        setIsLoading(false);
        return;
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
            <div className="relative hidden w-1/2 flex-col justify-between bg-zinc-950 p-10 text-white lg:flex border-r border-border overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute -left-1/4 -top-1/4 h-[800px] w-[800px] rounded-full bg-indigo-500/20 blur-[120px]"></div>
        
        <div className="relative z-10 flex items-center gap-2 font-bold text-2xl tracking-tight">
          <Logo className="size-8 shadow-none" showText={true} />
        </div>

        {/* Animated Bento Box Mockup */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center mt-12 perspective-1000">
          <div className="relative w-[120%] max-w-2xl rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-2xl rounded-3xl" />
            
            {/* Main Mockup Card */}
            <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
              
              {/* Header Skeleton */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-32 bg-white/10 rounded-md" />
                  <div className="h-8 w-48 bg-white/20 rounded-md" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-indigo-500/20 rounded-full" />
                </div>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-3 gap-4">
                {/* Large Chart Area */}
                <div className="col-span-2 row-span-2 bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-end h-48 relative overflow-hidden">
                  <div className="absolute top-4 left-4 h-4 w-24 bg-white/10 rounded-md" />
                  <div className="w-full flex items-end justify-between gap-2 h-24">
                    {[40, 70, 45, 90, 65, 85, 55].map((h, i) => (
                      <div key={i} className="w-full bg-indigo-500/80 rounded-t-sm transition-all duration-1000 ease-out animate-pulse" style={{ height: h + "%", animationDelay: (i * 100) + "ms" }} />
                    ))}
                  </div>
                </div>

                {/* Small Stats */}
                <div className="col-span-1 bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col gap-2">
                  <div className="h-3 w-16 bg-white/10 rounded-md" />
                  <div className="h-6 w-24 bg-emerald-400/80 rounded-md" />
                </div>
                <div className="col-span-1 bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col gap-2">
                  <div className="h-3 w-16 bg-white/10 rounded-md" />
                  <div className="h-6 w-24 bg-rose-400/80 rounded-md" />
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-md mt-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
            Intelligent finance.
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Finora categorizes your transactions, visualizes your cash flow, and provides AI-driven insights directly from your secure data.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL: Form */}
      <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2 relative">
        <div className="mx-auto flex w-full max-w-[400px] flex-col justify-center space-y-8">
          
          <Link href="/sign-in" className="absolute top-8 left-8 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign In
          </Link>

          {!isSubmitted ? (
            <>
              <div className="flex flex-col space-y-2 text-center mt-8">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  Reset password
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email address and we&apos;ll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    {...register("email")}
                    className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive font-medium">{errors.email.message}</p>
                  )}
                </div>

                {error && (
                  <div className="rounded-md bg-destructive/15 p-3 text-sm font-medium text-destructive">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending link..." : "Send reset link"}
                </Button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-6 text-center mt-12 animate-in fade-in zoom-in duration-500">
              <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
                <p className="text-muted-foreground max-w-[300px]">
                  We&apos;ve sent a password reset link to your email address. Please check your inbox and spam folder.
                </p>
              </div>
              <Button asChild className="w-full" variant="outline">
                <Link href="/sign-in">Return to Sign In</Link>
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
