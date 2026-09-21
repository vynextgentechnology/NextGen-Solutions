import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Code2, 
  CheckCircle2, 
  Smartphone, 
  Globe, 
  Sparkles,
  Layers
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 bg-white text-slate-900 overflow-hidden border-b border-slate-100">
      {/* Subtle light background grid */}
      <div className="absolute inset-0 tech-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-50 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
              <span>Software Solutions & Services</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]"
            >
              Software That Solves{" "}
              <span className="text-blue-600">
                Real Problems.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed"
            >
              We build simple, reliable and scalable software solutions designed around your needs. From custom web applications to mobile software, we engineer tools that make business operations effortless.
            </motion.p>

            {/* Quick check points */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 pt-1"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Custom Web & Mobile
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Clean Code Architecture
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Reliable Support
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <a href="#services">
                <Button className="rounded-xl px-6 h-11 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all hover:-translate-y-0.5">
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </a>

              <a href="#contact">
                <Button
                  variant="outline"
                  className="rounded-xl px-6 h-11 text-sm font-semibold border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all hover:-translate-y-0.5"
                >
                  <span>Contact Us</span>
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Clean Software Preview Visual */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-2xl bg-white border border-slate-200 shadow-xl p-6 sm:p-7 relative overflow-hidden"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-200 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-slate-200 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-slate-200 inline-block" />
                </div>
                <span className="text-xs font-mono text-slate-400">app.vytech.io</span>
              </div>

              {/* Mock App Overview Card */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">Active Software Build</span>
                    <span className="text-sm font-bold text-slate-800">Enterprise Web Portal</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                    Live & Synced
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl border border-slate-100 bg-white">
                    <Globe className="w-4 h-4 text-blue-600 mb-1.5" />
                    <p className="text-xs text-slate-500 font-medium">Uptime Guarantee</p>
                    <p className="text-base font-bold text-slate-900">99.9%</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-100 bg-white">
                    <Smartphone className="w-4 h-4 text-indigo-600 mb-1.5" />
                    <p className="text-xs text-slate-500 font-medium">Mobile Support</p>
                    <p className="text-base font-bold text-slate-900">iOS & Android</p>
                  </div>
                </div>

                {/* Code-like clean preview */}
                <div className="p-3.5 rounded-xl bg-slate-900 text-slate-300 font-mono text-xs space-y-1">
                  <p className="text-slate-400">// modern, scalable stack</p>
                  <p><span className="text-blue-400">const</span> stack = [ <span className="text-emerald-400">'React'</span>, <span className="text-emerald-400">'TypeScript'</span>, <span className="text-emerald-400">'Node'</span> ];</p>
                  <p className="text-cyan-400">deploySolution(stack, {'{'} fast: true, secure: true {'}'});</p>
                </div>
              </div>

              {/* Bottom message */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Built for Performance</span>
                <span className="text-blue-600 font-semibold">Ready to Deploy</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
