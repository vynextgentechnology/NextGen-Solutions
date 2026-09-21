import { motion } from "framer-motion";
import { 
  Code2, 
  Cpu, 
  Bot, 
  Network, 
  Cloud, 
  Zap, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

export function CapabilitiesTrust() {
  const capabilities = [
    {
      title: "Software",
      desc: "Full-Stack & Mobile Apps",
      icon: <Code2 className="w-5 h-5 text-blue-400" />,
      tag: "Enterprise",
      href: "#solutions",
    },
    {
      title: "Hardware",
      desc: "Embedded Systems & Devices",
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      tag: "Physical Tech",
      href: "#solutions",
    },
    {
      title: "AI & ML",
      desc: "Computer Vision & Analytics",
      icon: <Bot className="w-5 h-5 text-violet-400" />,
      tag: "Intelligence",
      href: "#solutions",
    },
    {
      title: "IoT",
      desc: "Telemetry & Edge Gateways",
      icon: <Network className="w-5 h-5 text-emerald-400" />,
      tag: "Connected",
      href: "#solutions",
    },
    {
      title: "Cloud",
      desc: "DevOps & Zero-Trust Infra",
      icon: <Cloud className="w-5 h-5 text-sky-400" />,
      tag: "Scalable",
      href: "#solutions",
    },
    {
      title: "Automation",
      desc: "Industrial & Process Control",
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      tag: "Robotic",
      href: "#solutions",
    },
  ];

  return (
    <section className="relative z-20 -mt-8 sm:-mt-12 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl p-5 sm:p-7 backdrop-blur-2xl">
        {/* Top Header Label */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block animate-pulse" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              From Idea to Implementation
            </span>
            <span className="hidden md:inline text-xs text-slate-400 font-mono">
              — Integrated Lifecycle Engineering
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Single-Source Technology Partner</span>
          </div>
        </div>

        {/* 6 Capabilities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {capabilities.map((cap, idx) => (
            <motion.a
              key={cap.title}
              href={cap.href}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group p-3.5 sm:p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-cyan-500/50 hover:bg-slate-800/60 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/40 group-hover:bg-slate-800 transition-colors">
                    {cap.icon}
                  </div>
                  <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {cap.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {cap.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  {cap.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
