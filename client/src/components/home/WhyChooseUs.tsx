import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Lightbulb, Sliders, Wrench } from "lucide-react";

export function WhyChooseUs() {
  const points = [
    {
      num: "01",
      title: "Simple Solutions",
      desc: "We focus on solving the actual problem without unnecessary complexity. Clean interfaces and dependable performance come first.",
      icon: <Lightbulb className="w-5 h-5 text-blue-600" />,
    },
    {
      num: "02",
      title: "Custom Development",
      desc: "We build software according to each client's specific requirements. No rigid templates or forced workflows.",
      icon: <Sliders className="w-5 h-5 text-blue-600" />,
    },
    {
      num: "03",
      title: "Reliable Support",
      desc: "We continue supporting and improving the software after delivery. You can count on prompt help whenever needed.",
      icon: <Wrench className="w-5 h-5 text-blue-600" />,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-100" id="why-us">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          title="Why Partner With Us?"
          subtitle="Three straightforward principles that guide everything we engineer."
          align="center"
        />

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {points.map((pt, idx) => (
            <motion.div
              key={pt.num}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="p-7 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-black font-mono text-blue-600">
                    {pt.num}
                  </span>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-blue-600 shadow-2xs">
                    {pt.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {pt.title}
                </h3>

                <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
