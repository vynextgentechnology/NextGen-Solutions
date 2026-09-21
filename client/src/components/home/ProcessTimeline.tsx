import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { 
  Search, 
  Compass, 
  Code2, 
  ShieldCheck, 
  Rocket, 
  Wrench,
  Clock,
  ArrowRight
} from "lucide-react";

export function ProcessTimeline() {
  const steps = [
    {
      num: "01",
      title: "DISCOVER",
      label: "Problem & Requirements",
      desc: "We analyze the operational bottleneck, assess existing machinery and workflows, interview stakeholders, and establish clear technical KPIs.",
      icon: <Search className="w-5 h-5 text-cyan-400" />,
      detail: "Requirements matrix, feasibility report, and technical scope",
    },
    {
      num: "02",
      title: "DESIGN",
      label: "Architecture & User Experience",
      desc: "Our architects draft end-to-end circuit schematics, database entity diagrams, API contracts, and high-fidelity interactive user interfaces.",
      icon: <Compass className="w-5 h-5 text-blue-400" />,
      detail: "Hardware schematics, UI wireframes, and API documentation",
    },
    {
      num: "03",
      title: "DEVELOP",
      label: "Full-Stack Build & Fabrication",
      desc: "Engineering squads build the software, embedded firmware, and physical PCB assemblies simultaneously with continuous automated review sprints.",
      icon: <Code2 className="w-5 h-5 text-indigo-400" />,
      detail: "Clean TypeScript code, firmware flashing & PCB prototypes",
    },
    {
      num: "04",
      title: "TEST",
      label: "Quality, Security & Reliability",
      desc: "Rigorous quality assurance including edge cases, thermal stress tests, network latency simulation, penetration testing, and user trials.",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      detail: "VAPT audits, load testing reports, and certification checks",
    },
    {
      num: "05",
      title: "DEPLOY",
      label: "Real-World Environment Rollout",
      desc: "Smooth physical installation, zero-downtime cloud infrastructure deployment, database migrations, and comprehensive staff onboarding.",
      icon: <Rocket className="w-5 h-5 text-amber-400" />,
      detail: "On-site installation, cloud provisioning & staff training",
    },
    {
      num: "06",
      title: "SUPPORT",
      label: "Optimization & Long-Term SLAs",
      desc: "Continuous 24/7 uptime monitoring, Firmware Over-The-Air security patching, database optimization, and strategic future feature upgrades.",
      icon: <Wrench className="w-5 h-5 text-rose-400" />,
      detail: "24/7 SLA desk, health reports, and quarterly optimizations",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-950 text-slate-100 relative overflow-hidden" id="process">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          badge="Execution Methodology"
          badgeIcon={<Clock className="w-3.5 h-3.5 text-cyan-400" />}
          title="From Concept to"
          titleHighlight="Real-World Deployment"
          subtitle="Our battle-tested 6-stage engineering lifecycle ensures predictable timelines, zero-risk integrations, and continuous long-term support."
          align="center"
        />

        {/* 6 Steps Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-7 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-2xl relative"
            >
              <div>
                {/* Step Number & Icon Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">
                      {step.num}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400 tracking-wider">
                      // STEP
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/40 group-hover:bg-slate-800 transition-colors">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs font-mono font-semibold text-slate-400 mt-1 uppercase tracking-wide">
                  {step.label}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Deliverable info */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="text-slate-400 truncate">{step.detail}</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
