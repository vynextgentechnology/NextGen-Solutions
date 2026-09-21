import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { 
  Code2, 
  Layers, 
  Bot, 
  Cloud, 
  Database, 
  Cpu, 
  CheckCircle2,
  Terminal
} from "lucide-react";

export function TechStackSection() {
  const [selectedCat, setSelectedCat] = useState<string>("all");

  const categories = [
    {
      id: "languages",
      title: "Languages & Runtimes",
      icon: <Code2 className="w-5 h-5 text-blue-400" />,
      items: [
        { name: "Python", type: "Core AI & Backend", badge: "Primary" },
        { name: "TypeScript", type: "Full-Stack Web/App", badge: "Primary" },
        { name: "JavaScript", type: "Frontend & Node.js", badge: "Web" },
        { name: "Java", type: "Enterprise Systems", badge: "Enterprise" },
        { name: "C / C++", type: "Embedded & Microcontrollers", badge: "Bare-Metal" },
      ],
    },
    {
      id: "frameworks",
      title: "Web & Mobile Frameworks",
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      items: [
        { name: "React", type: "Modern Web Frontends", badge: "Primary" },
        { name: "Node.js", type: "High-Throughput APIs", badge: "Backend" },
        { name: "Spring Boot", type: "Enterprise Microservices", badge: "Java" },
        { name: "Flutter", type: "Cross-Platform Mobile", badge: "Mobile" },
        { name: "Android", type: "Native Embedded Apps", badge: "Mobile" },
      ],
    },
    {
      id: "ai",
      title: "AI & Machine Learning",
      icon: <Bot className="w-5 h-5 text-violet-400" />,
      items: [
        { name: "TensorFlow", type: "Deep Learning Models", badge: "Inference" },
        { name: "PyTorch", type: "Neural Networks & Research", badge: "Primary" },
        { name: "OpenCV", type: "Computer Vision & Edge AI", badge: "Vision" },
        { name: "Scikit-Learn", type: "Predictive Analytics", badge: "Analytics" },
      ],
    },
    {
      id: "cloud",
      title: "Cloud & DevOps",
      icon: <Cloud className="w-5 h-5 text-sky-400" />,
      items: [
        { name: "AWS", type: "Scalable Cloud Infra", badge: "Cloud" },
        { name: "Docker", type: "Container Orchestration", badge: "DevOps" },
        { name: "Kubernetes", type: "Cluster Management", badge: "Clusters" },
        { name: "CI / CD Pipelines", type: "Automated Deployments", badge: "DevOps" },
      ],
    },
    {
      id: "databases",
      title: "Databases & Storage",
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      items: [
        { name: "PostgreSQL", type: "Relational Ledger DB", badge: "Primary" },
        { name: "MySQL", type: "Enterprise Relational DB", badge: "SQL" },
        { name: "MongoDB", type: "Document & Telemetry", badge: "NoSQL" },
        { name: "Redis", type: "In-Memory Caching", badge: "Sub-ms" },
      ],
    },
    {
      id: "hardware",
      title: "Hardware & Embedded IoT",
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      items: [
        { name: "Embedded Systems", type: "Bare-Metal Microcontrollers", badge: "Hardware" },
        { name: "IoT Gateways", type: "Modbus / MQTT Telemetry", badge: "Connected" },
        { name: "ESP32 / STM32", type: "Low-Power Dual-Core MCUs", badge: "Chips" },
        { name: "FreeRTOS", type: "Real-Time Embedded OS", badge: "RTOS" },
      ],
    },
  ];

  const displayedCategories =
    selectedCat === "all"
      ? categories
      : categories.filter((c) => c.id === selectedCat);

  return (
    <section className="py-20 sm:py-28 bg-slate-950 text-slate-100 relative overflow-hidden" id="tech-stack">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          badge="Technological Ecosystem"
          badgeIcon={<Terminal className="w-3.5 h-3.5 text-cyan-400" />}
          title="Battle-Tested"
          titleHighlight="Technology Stack"
          subtitle="We select technologies based on stability, throughput, and hardware-software compatibility. No trendy fluff—only battle-tested tools that survive enterprise workloads."
          align="center"
        />

        {/* Category Pills Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            type="button"
            onClick={() => setSelectedCat("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCat === "all"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            All Disciplines
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCat(c.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCat === c.id
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* Categorized Tech Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((group, idx) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    {group.icon}
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {group.title}
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {group.items.map((tech) => (
                    <div
                      key={tech.name}
                      className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/90 flex items-center justify-between hover:border-cyan-500/30 transition-colors"
                    >
                      <div>
                        <p className="text-xs font-bold text-white">{tech.name}</p>
                        <p className="text-[10px] text-slate-400">{tech.type}</p>
                      </div>
                      <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800">
                        {tech.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Enterprise Ready</span>
                <span className="text-emerald-400 font-semibold">Production Validated</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
