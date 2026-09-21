import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-100" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-blue-600 text-xs font-semibold">
            About VY NextGen
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Building Software With Purpose
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We are a growing software company focused on turning ideas and real-world challenges into practical digital solutions. From websites and mobile applications to customized software, we build technology that is simple, useful and reliable.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-medium text-slate-700">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              Direct Client Collaboration
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              Clean, Modern Codebase
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              Transparent Delivery
            </span>
          </div>

          <div className="pt-4">
            <Link href="/about">
              <Button
                variant="outline"
                className="rounded-xl px-6 h-10 text-xs sm:text-sm font-semibold border-slate-300 text-slate-700 hover:bg-white hover:text-blue-600"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
