import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { HeroTypewriter } from "@/components/HeroTypewriter";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-[#031c54] via-[#08368c] to-[#0e4cb8] text-white relative overflow-hidden">
      <Navigation />
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-400/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 tech-grid-pattern-dark opacity-30 pointer-events-none" />

      <div className="flex-1 flex items-center justify-center px-4 relative z-10 pt-20">
        <div className="w-full max-w-lg liquid-glass-dark rounded-3xl p-8 sm:p-10 text-center border border-white/20 shadow-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-400/40 text-blue-300 mb-6 mx-auto shadow-lg shadow-blue-500/20">
            <AlertCircle className="h-8 w-8" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full liquid-glass-pill text-blue-200 text-xs font-mono font-bold tracking-widest uppercase mb-4">
            ERROR 404 // ROUTE NOT FOUND
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Page Out of Orbit
          </h1>

          {/* STRICTLY ONE LINE INTRODUCTION WITH TYPING ANIMATION */}
          <div className="mb-8 text-center flex justify-center overflow-hidden">
            <p className="text-blue-100 text-sm leading-normal max-w-md mx-auto px-2 sm:whitespace-nowrap font-medium">
              <HeroTypewriter text="The requested route does not exist or has migrated to a new system coordinate." />
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto rounded-full px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/30">
                <Home className="w-4 h-4 mr-2" /> Back to Home
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
              className="w-full sm:w-auto rounded-full px-6 border-slate-700 bg-slate-900/60 text-slate-200 hover:bg-slate-800 font-bold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Previous Page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
