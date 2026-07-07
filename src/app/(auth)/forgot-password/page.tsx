"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
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
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* LEFT PANEL: Premium Dark Mode Showcase */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-zinc-950 p-10 text-white lg:flex border-r border-border overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute -left-1/4 -top-1/4 h-[800px] w-[800px] rounded-full bg-indigo-500/20 blur-[120px]"></div>
        
        <div className="relative z-10 flex items-center gap-2 font-bold text-2xl tracking-tight">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          Finora
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Secure your finances</h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Don't worry if you forgot your password. We'll send you a secure link to reset it and get you back into your dashboard immediately.
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
                  Enter your email address and we'll send you a link to reset your password.
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
                  We've sent a password reset link to your email address. Please check your inbox and spam folder.
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
