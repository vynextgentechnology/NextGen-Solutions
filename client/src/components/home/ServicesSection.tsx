import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { 
  Globe, 
  Smartphone, 
  Code2, 
  Palette, 
  Wrench, 
  ArrowRight 
} from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      title: "Web Development",
      desc: "Custom websites and web applications for businesses and organizations.",
      icon: <Globe className="w-5 h-5 text-blue-600" />,
      tag: "Web Apps",
    },
    {
      title: "Mobile App Development",
      desc: "Modern mobile applications designed for Android and iOS devices.",
      icon: <Smartphone className="w-5 h-5 text-blue-600" />,
      tag: "iOS & Android",
    },
    {
      title: "Custom Software",
      desc: "Software developed specifically for your business or organization's requirements.",
      icon: <Code2 className="w-5 h-5 text-blue-600" />,
      tag: "Bespoke",
    },
    {
      title: "UI/UX Design",
      desc: "Simple and user-friendly interfaces that provide a better digital experience.",
      icon: <Palette className="w-5 h-5 text-blue-600" />,
      tag: "Design",
    },
    {
      title: "Software Maintenance",
      desc: "Continuous improvements, bug fixes, updates and dependable technical support.",
      icon: <Wrench className="w-5 h-5 text-blue-600" />,
      tag: "Support",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-100" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          title="What We Do"
          subtitle="We specialize in building clean, modern software tailored to your specific business needs."
          align="center"
        />

        {/* 5 Compact Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((svc, idx) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                  {svc.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {svc.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {svc.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>{svc.tag}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}

          {/* Callout Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="p-6 rounded-2xl bg-blue-600 text-white shadow-xs flex flex-col justify-between"
          >
            <div>
              <span className="text-xs uppercase font-semibold text-blue-200 block mb-2">Need Something Custom?</span>
              <h3 className="text-base font-bold text-white">Have a unique software idea?</h3>
              <p className="text-sm text-blue-100 mt-2 leading-relaxed">
                We're ready to analyze your requirements and architect the right solution.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-blue-500/50">
              <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:underline">
                <span>Discuss Your Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
