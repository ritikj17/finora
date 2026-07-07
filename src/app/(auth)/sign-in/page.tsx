"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";

import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/ui/logo";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [authError, setAuthError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInValues) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const { error } = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setAuthError(error.message || "Invalid email or password.");
        setIsLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setAuthError(err.message || "An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      
      {/* LEFT PANEL: Premium Dark Mode Showcase */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-zinc-950 p-10 text-white lg:flex border-r border-border overflow-hidden">
        
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Ambient Mesh Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Logo (Top) */}
        <div className="relative z-20">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold hover:opacity-80 transition-opacity w-fit outline-none">
            <Logo className="size-8" />
            Finora
          </Link>
        </div>

        {/* Floating Glassmorphism Graphic (Center) */}
        <div className="relative z-10 flex w-full flex-1 items-center justify-center">
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="flex flex-col gap-5 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl w-[340px]"
          >
            {/* Header Fake UI */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-white/20 rounded-full" />
                  <div className="h-2 w-16 bg-white/10 rounded-full" />
                </div>
              </div>
              <div className="h-6 w-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <div className="h-1.5 w-8 bg-emerald-500 rounded-full" />
              </div>
            </div>
            
            <div className="h-10 w-40 bg-white/80 rounded-lg mt-2" />
            
            {/* Fake Recharts Bar Graph */}
            <div className="flex items-end justify-between gap-3 h-28 pt-6 border-t border-white/10 mt-2">
               {[40, 70, 45, 90, 65, 100, 85].map((height, i) => (
                 <div 
                   key={i} 
                   className={`w-full rounded-t-md transition-all duration-700 ${i === 5 ? 'bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]' : 'bg-white/10 hover:bg-white/20'}`} 
                   style={{ height: `${height}%` }} 
                 />
               ))}
            </div>
          </motion.div>
        </div>

        {/* Testimonial (Bottom) */}
        <div className="relative z-20 max-w-md">
          <blockquote className="space-y-4">
            <p className="text-lg leading-relaxed text-zinc-300 font-medium">
              &ldquo;Finora completely transformed how we manage our startup&apos;s runway. The automated categorization saved us hundreds of hours.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-400">SD</div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">Sofia Davis</span>
                <span className="text-xs text-zinc-500">Founder at Vertex</span>
              </div>
            </div>
          </blockquote>
        </div>
      </div>

      {/* RIGHT PANEL: Auth Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col space-y-6"
          >
            <div className="flex flex-col items-center space-y-3 text-center mb-4">
              <Link href="/" className="mb-2 hover:scale-105 transition-transform outline-none lg:hidden">
                <Logo className="size-12" />
              </Link>
              <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
              <p className="text-muted-foreground">
                Enter your email to sign in to your account
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  disabled={isLoading}
                  {...register("email")}
                  className={`h-11 ${errors.email ? "border-destructive" : ""}`}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  disabled={isLoading}
                  {...register("password")}
                  className={`h-11 ${errors.password ? "border-destructive" : ""}`}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              {authError && (
                <div className="p-3 rounded-md bg-destructive/15 text-destructive text-sm font-medium">
                  {authError}
                </div>
              )}

              <Button type="submit" className="w-full h-11 text-base mt-2" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground pt-4">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="hover:text-primary font-medium transition-colors"
              >
                Sign up for free
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}