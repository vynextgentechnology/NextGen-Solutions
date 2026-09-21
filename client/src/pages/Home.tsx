import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/home/Hero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProjectsPortfolio } from "@/components/home/ProjectsPortfolio";
import { AboutSection } from "@/components/home/AboutSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FinalCTA } from "@/components/home/FinalCTA";
import { ContactSection } from "@/components/home/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Simple Sticky Navbar */}
      <Navigation />

      {/* Clean Hero Section */}
      <Hero />

      {/* Services: What We Do (5 Cards) */}
      <ServicesSection />

      {/* Projects: Some of Our Work (4 Cards) */}
      <ProjectsPortfolio />

      {/* About: Building Software With Purpose */}
      <AboutSection />

      {/* Why Choose Us: 3-Column Simple Points */}
      <WhyChooseUs />

      {/* Call to Action: Have an Idea? Let's Build It. */}
      <FinalCTA />

      {/* Clean Contact Form & Company Info */}
      <ContactSection />
    </div>
  );
}
