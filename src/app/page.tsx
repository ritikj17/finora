import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/landing/hero-section";

export const metadata = {
  title: "Finora | AI-Powered Financial Navigation",
  description:
    "Automate your accounting, forecast your runway, and get actionable financial insights in real-time with Finora.",
};

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* We wrap page content in a div to manage stacking contexts under the fixed navbar */}
      <div className="flex-1 w-full">
        <HeroSection />

        {/* Future sections (Features, Pricing, etc.) will go here in subsequent sprints */}
        {/* <FeaturesSection /> */}
        {/* <PricingSection /> */}
        {/* <Footer /> */}
      </div>
    </main>
  );
}
