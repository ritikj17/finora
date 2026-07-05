"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileSettingsProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export function ProfileSettings({ user }: ProfileSettingsProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    setSuccessMessage("");
    
    try {
      // Leverage Better Auth's native client to update the user record
      const { error } = await authClient.updateUser({
        name: data.name,
      });

      if (error) {
        throw new Error(error.message || "Failed to update profile.");
      }

      setSuccessMessage("Profile updated successfully.");
      router.refresh(); // Force server components to pull the fresh name
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
  };

  return (
    <div className="space-y-6">
      {/* Profile Update Form */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold leading-none tracking-tight">Personal Information</h3>
          <p className="text-sm text-muted-foreground mt-1.5">Update your display name and email settings.</p>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={user.email} 
                disabled 
                className="bg-muted/50 cursor-not-allowed" 
              />
              <p className="text-[0.8rem] text-muted-foreground">Your email is used for login and cannot be changed here.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input 
                id="name" 
                type="text" 
                placeholder="John Doe" 
                {...register("name")} 
              />
              {errors.name && (
                <p className="text-[0.8rem] font-medium text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
              {successMessage && (
                <span className="text-sm text-emerald-500 font-medium animate-in fade-in">
                  {successMessage}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-xl border border-rose-500/20 bg-card shadow-sm overflow-hidden">
         <div className="p-6">
          <h3 className="text-lg font-semibold leading-none tracking-tight text-rose-500">Account Security</h3>
          <p className="text-sm text-muted-foreground mt-1.5">Manage your active session.</p>
          
          <div className="mt-4">
            <Button variant="destructive" onClick={handleSignOut}>
              Sign Out of Finora
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}