import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { SectionHeader } from "@/components/SectionHeader";
import { 
  Code2, 
  Bot, 
  Network, 
  Cpu, 
  Zap, 
  Cloud, 
  ShieldCheck, 
  Server, 
  ArrowRight,
  CheckCircle2,
  Sparkles
} from "lucide-react";

export function SolutionsSection() {
  const solutions = [
    {
      id: "software",
      num: "01",
      title: "Software Solutions",
      category: "Full-Stack Development",
      icon: <Code2 className="w-6 h-6 text-blue-400" />,
      colorBorder: "hover:border-blue-500/50",
      accentBg: "bg-blue-950/40",
      badgeText: "Web & Mobile",
      desc: "End-to-end custom application development with modern architectures engineered for scale, speed, and seamless user experiences.",
      items: [
        "Web applications",
        "Mobile applications",
        "Enterprise software",
        "Custom software",
        "Business management systems",
        "API development",
      ],
      link: "/solutions#software",
    },
    {
      id: "ai-ml",
      num: "02",
      title: "AI & Machine Learning",
      category: "Applied Intelligence",
      icon: <Bot className="w-6 h-6 text-violet-400" />,
      colorBorder: "hover:border-violet-500/50",
      accentBg: "bg-violet-950/40",
      badgeText: "Neural Systems",
      desc: "Practical, high-impact machine learning algorithms and computer vision pipelines solving complex operational problems.",
      items: [
        "AI applications",
        "Machine learning systems",
        "Computer vision",
        "Predictive analytics",
        "Intelligent automation",
        "Generative AI solutions",
      ],
      link: "/solutions#ai-data",
    },
    {
      id: "iot",
      num: "03",
      title: "IoT & Smart Systems",
      category: "Edge Telemetry",
      icon: <Network className="w-6 h-6 text-cyan-400" />,
      colorBorder: "hover:border-cyan-500/50",
      accentBg: "bg-cyan-950/40",
      badgeText: "Connected Edge",
      desc: "Sensor telemetry orchestration, edge computing hubs, and remote monitoring platforms linking physical assets to the cloud.",
      items: [
        "IoT platforms",
        "Smart monitoring",
        "Sensors & telemetry",
        "Connected devices",
        "Remote monitoring",
        "Industrial IoT",
      ],
      link: "/solutions#iot",
    },
    {
      id: "hardware",
      num: "04",
      title: "Hardware Solutions",
      category: "Embedded Engineering",
      icon: <Cpu className="w-6 h-6 text-emerald-400" />,
      colorBorder: "hover:border-emerald-500/50",
      accentBg: "bg-emerald-950/40",
      badgeText: "Physical Computing",
      desc: "Custom electronic design, microcontroller architecture, multilayer PCB fabrication, and bare-metal firmware development.",
      items: [
        "Custom hardware",
        "Embedded systems",
        "Smart devices",
        "Electronic systems",
        "Hardware integration",
        "Prototyping & testing",
      ],
      link: "/solutions#hardware",
    },
    {
      id: "automation",
      num: "05",
      title: "Automation",
      category: "Process & Industrial Control",
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      colorBorder: "hover:border-amber-500/50",
      accentBg: "bg-amber-950/40",
      badgeText: "Optimization",
      desc: "Eliminating manual bottlenecks with intelligent workflow orchestrations, robotic process automation, and closed-loop control.",
      items: [
        "Business process automation",
        "Industrial automation",
        "Workflow automation",
        "AI automation",
        "Monitoring systems",
        "PLC & telemetry control",
      ],
      link: "/solutions#integration",
    },
    {
      id: "cloud",
      num: "06",
      title: "Cloud & Digital",
      category: "Cloud Architecture",
      icon: <Cloud className="w-6 h-6 text-sky-400" />,
      colorBorder: "hover:border-sky-500/50",
      accentBg: "bg-sky-950/40",
      badgeText: "High Availability",
      desc: "Resilient multi-cloud deployments, containerized microservices, high-throughput data platforms, and modernization roadmaps.",
      items: [
        "Cloud applications",
        "Cloud migration",
        "DevOps & CI/CD",
        "Data platforms",
        "Digital transformation",
        "Microservices architecture",
      ],
      link: "/solutions#software",
    },
    {
      id: "cybersecurity",
      num: "07",
      title: "Cybersecurity",
      category: "Threat Defense",
      icon: <ShieldCheck className="w-6 h-6 text-rose-400" />,
      colorBorder: "hover:border-rose-500/50",
      accentBg: "bg-rose-950/40",
      badgeText: "Zero Trust",
      desc: "Proactive perimeter defense, device encryption, zero-trust network segmentation, and automated vulnerability monitoring.",
      items: [
        "Application security",
        "Network security",
        "Security monitoring",
        "Data protection",
        "Secure infrastructure",
        "VAPT & compliance audits",
      ],
      link: "/solutions#cybersecurity",
    },
    {
      id: "infrastructure",
      num: "08",
      title: "IT Infrastructure",
      category: "Enterprise Systems",
      icon: <Server className="w-6 h-6 text-indigo-400" />,
      colorBorder: "hover:border-indigo-500/50",
      accentBg: "bg-indigo-950/40",
      badgeText: "Mission Critical",
      desc: "Robust enterprise networking, high-performance servers, scalable storage, and comprehensive system lifecycle management.",
      items: [
        "Networking & VLANs",
        "Servers & virtualization",
        "Storage architectures",
        "System integration",
        "IT infrastructure",
        "Technical support & SLAs",
      ],
      link: "/services#it-infra",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-950 text-slate-100 relative overflow-hidden" id="solutions">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          badge="End-To-End Capabilities"
          badgeIcon={<Sparkles className="w-3.5 h-3.5 text-cyan-400" />}
          title="Technology Solutions Built for"
          titleHighlight="Real-World Needs"
          subtitle="Explore our 8 specialized engineering practices. From microcontrollers and factory sensors to enterprise portals and AI-driven automation."
          align="center"
        />

        {/* 8 Interactive Solution Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((sol, idx) => (
            <motion.div
              key={sol.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`rounded-3xl bg-slate-900/80 border border-slate-800/90 ${sol.colorBorder} p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:bg-slate-900/95 hover:-translate-y-1 group relative`}
            >
              <div>
                {/* Top Bar: Icon + Number */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${sol.accentBg} border border-slate-800 group-hover:scale-110 transition-transform duration-200`}>
                    {sol.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {sol.num}
                  </span>
                </div>

                <div className="mb-3">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-400">
                    {sol.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors">
                    {sol.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {sol.desc}
                </p>

                {/* Sub-item tags */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80 mb-6">
                  {sol.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Link */}
              <Link
                href={sol.link}
                className="inline-flex items-center justify-between w-full pt-3 border-t border-slate-800/80 text-xs font-bold text-cyan-400 group-hover:text-white transition-colors"
              >
                <span>Explore Solution</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
