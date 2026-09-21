import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { 
  User, 
  Smartphone, 
  Bot, 
  Cloud, 
  Network, 
  Cpu, 
  Zap, 
  ArrowDown, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Layers
} from "lucide-react";

export function SoftwareHardwareFlow() {
  const [selectedStep, setSelectedStep] = useState(0);

  const pipeline = [
    {
      step: "01",
      label: "USER",
      role: "Interaction & Input",
      icon: <User className="w-5 h-5 text-blue-400" />,
      desc: "Client taps an action on a mobile app, scans an item at a POS kiosk, or submits an operational command.",
      tech: "Store Manager, Customer, Student, Operator",
    },
    {
      step: "02",
      label: "APPLICATION",
      role: "Client-Side Interface",
      icon: <Smartphone className="w-5 h-5 text-indigo-400" />,
      desc: "Responsive web portal, native iOS/Android application, or ultra-fast offline Electron POS engine.",
      tech: "React 18, React Native, TypeScript, Tailwind",
    },
    {
      step: "03",
      label: "AI / SOFTWARE",
      role: "Processing & Decision Logic",
      icon: <Bot className="w-5 h-5 text-violet-400" />,
      desc: "Algorithmic decision engines, automated business validation, ML inference, and high-concurrency business logic.",
      tech: "Python, Node.js, PyTorch, Go Microservices",
    },
    {
      step: "04",
      label: "CLOUD / DATABASE",
      role: "State, Ledgers & Storage",
      icon: <Cloud className="w-5 h-5 text-sky-400" />,
      desc: "Distributed databases, audit logs, multi-tenant records, and zero-trust authentication backbones.",
      tech: "PostgreSQL, TimescaleDB, Redis, AWS Cloud",
    },
    {
      step: "05",
      label: "IoT / NETWORK",
      role: "Edge Telemetry & Transmission",
      icon: <Network className="w-5 h-5 text-cyan-400" />,
      desc: "Encrypted industrial message protocols, zero-data-loss buffering, and edge gateway synchronization.",
      tech: "MQTT, Modbus RTU/TCP, LoRaWAN, 4G LTE-M",
    },
    {
      step: "06",
      label: "HARDWARE / DEVICE",
      role: "Physical Embedded Controller",
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      desc: "Custom microcontroller board, thermal print head, optical barcode scanner, smart sensor, or relay controller.",
      tech: "ESP32, STM32, Bare-Metal C/C++, Multilayer PCB",
    },
    {
      step: "07",
      label: "REAL-WORLD ACTION",
      role: "Physical Outcome & Automation",
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      desc: "Printed GST thermal invoice, actuated industrial valve, synchronized store inventory, or door turnstile unlock.",
      tech: "Physical Output, Automation, Motor, Display, Alert",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-slate-950 via-[#031131] to-slate-950 text-slate-100 relative overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          badge="Integrated Full-Stack Engineering"
          badgeIcon={<Layers className="w-3.5 h-3.5 text-cyan-400" />}
          title="Where Software Meets"
          titleHighlight="Hardware"
          subtitle="Unlike agencies that only write code or hardware vendors that ignore user experience, we develop complete end-to-end systems. Inspect how data flows from user touch all the way to physical real-world execution."
          align="center"
        />

        {/* Visual Architecture Pipeline (Horizontal on lg, Vertical on mobile) */}
        <div className="mt-8 rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 pb-8 mb-8 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                // System Architecture Blueprint
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                The 7-Stage End-to-End Pipeline
              </h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero Hand-off Friction Guaranteed</span>
            </div>
          </div>

          {/* Pipeline Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 relative">
            {pipeline.map((item, idx) => {
              const isSelected = selectedStep === idx;
              return (
                <div key={item.step} className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => setSelectedStep(idx)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden flex flex-col justify-between min-h-[160px] ${
                      isSelected
                        ? "bg-slate-800 border-cyan-500 shadow-xl shadow-cyan-500/10 scale-105"
                        : "bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
                    )}

                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        {item.step}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-wider">
                        {item.label}
                      </h4>
                      <p className="text-[10px] text-cyan-400 font-semibold truncate mt-0.5">
                        {item.role}
                      </p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-900 text-[9px] font-mono text-slate-400 truncate">
                      {item.tech}
                    </div>
                  </button>

                  {/* Flow Arrow (hidden on last item) */}
                  {idx < pipeline.length - 1 && (
                    <div className="lg:hidden my-1 flex justify-center text-cyan-500">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Step Deep Inspector */}
          <div className="mt-8 p-6 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden">
            <div className="grid md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wide">
                    Stage {pipeline[selectedStep].step} Detailed Flow
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 font-mono border border-blue-800">
                    {pipeline[selectedStep].label}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white">
                  {pipeline[selectedStep].role}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {pipeline[selectedStep].desc}
                </p>
              </div>

              <div className="md:col-span-4 p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Technologies / Interfaces Used:
                </p>
                <p className="text-xs font-mono text-cyan-300 font-semibold">
                  {pipeline[selectedStep].tech}
                </p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Pipeline Latency</span>
                  <span className="text-emerald-400 font-bold">Sub-Second Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Callout */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 font-mono">
            <span>// NO SPREADSHEETS • NO THIRD-PARTY HARDWARE BOTTLENECKS</span>
            <span className="text-cyan-400 font-bold">Complete Co-Designed Physical + Digital Solutions</span>
          </div>

        </div>

      </div>
    </section>
  );
}
