import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 text-slate-900 border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Have an Idea? Let's Build It.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 mt-3 max-w-xl mx-auto leading-relaxed">
            Tell us what you need and let's turn your idea into a useful software solution.
          </p>

          <div className="mt-8 flex justify-center">
            <a href="#contact">
              <Button className="rounded-xl px-7 h-11 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all hover:-translate-y-0.5">
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
