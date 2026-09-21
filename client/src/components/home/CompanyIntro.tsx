import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Cpu, 
  Cloud, 
  Network, 
  ShieldCheck, 
  Wrench, 
  Search, 
  Compass, 
  Activity,
  Award
} from "lucide-react";

export function CompanyIntro() {
  const highlights = [
    { title: "Problem Identification", desc: "Root cause analysis & operational gap assessment" },
    { title: "Solution Architecture", desc: "Full-stack software & hardware blueprint design" },
    { title: "Product Development", desc: "Turnkey engineering from prototype to manufacturing" },
    { title: "Software Development", desc: "Web, mobile, APIs & distributed microservices" },
    { title: "Hardware Integration", desc: "Custom PCBs, embedded firmware & industrial sensors" },
    { title: "Testing & Validation", desc: "Stress testing, security audits & environmental checks" },
    { title: "Deployment", desc: "Smooth on-site and cloud infrastructure rollout" },
    { title: "Maintenance & Long-Term Support", desc: "24/7 SLA uptime, FOTA updates & continuous optimization" },
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-950 text-slate-100 relative overflow-hidden" id="about-intro">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Company Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              // ABOUT VY NEXTGEN TECHNOLOGIES
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              One Technology Partner.{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
                Limitless Possibilities.
              </span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed">
              VY NextGen Technologies brings software, hardware, artificial intelligence, automation, and digital technologies together to create complete, end-to-end solutions. We eliminate the friction of coordinating separate software vendors and hardware contractors by delivering unified systems under one roof.
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Whether you are an enterprise modernizing supply chain telemetry, a retail chain demanding sub-second offline billing, an educational campus requiring student automation, or an industrial plant needing predictive machine maintenance—we engineer solutions that work reliably in the real world.
            </p>

            {/* Complete Lifecycle Grid */}
            <div className="pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
                Comprehensive Engineering Lifecycle:
              </h4>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {highlights.map((item, idx) => (
                  <div
                    key={item.title}
                    className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-start gap-2.5"
                  >
                    <div className="w-5 h-5 rounded-md bg-blue-950/80 border border-blue-800/60 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400 font-mono text-[10px] font-bold">
                      0{idx + 1}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white leading-snug">{item.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link href="/about">
                <Button className="rounded-xl px-6 h-11 text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25">
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/solutions">
                <Button variant="outline" className="rounded-xl px-6 h-11 text-xs sm:text-sm font-bold border-slate-700 hover:bg-slate-800 text-slate-200">
                  <span>View Solutions</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Innovative Architecture Visual Stack */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Full-Stack Co-Design Architecture
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                  UNIFIED CO-DESIGN
                </span>
              </div>

              {/* Visual Stack Layers */}
              <div className="py-6 space-y-3">
                {/* Layer 4: Client Interaction Layer */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-blue-800/40 hover:border-blue-500/50 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wide">
                      LAYER 04 • USER EXPERIENCE
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">React, iOS, Android, POS</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Client Portals, Mobile & Hardware Kiosks</h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Instant sub-3s checkout interfaces, administrative dashboards, and touch kiosks.
                  </p>
                </div>

                {/* Layer 3: Cloud & Intelligence */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-800/40 hover:border-indigo-500/50 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wide">
                      LAYER 03 • INTELLIGENCE & CLOUD
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">AWS, Node, Python, PyTorch</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Distributed Cloud APIs & AI Engines</h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Multi-tenant data storage, automated analytics pipelines, and neural anomaly detectors.
                  </p>
                </div>

                {/* Layer 2: Edge Telemetry & Gateway */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-800/40 hover:border-cyan-500/50 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wide">
                      LAYER 02 • EDGE TELEMETRY
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Modbus, MQTT, LoRa, 4G</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">IoT Industrial Gateway & Edge Cache</h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Zero-data-loss local caching, high-speed packet ingestion, and remote device orchestration.
                  </p>
                </div>

                {/* Layer 1: Physical Hardware & Sensors */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-800/40 hover:border-emerald-500/50 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wide">
                      LAYER 01 • PHYSICAL HARDWARE
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">C/C++, STM32, ESP32, PCB</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Custom Embedded Circuits & Physical Devices</h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Multi-layer custom PCBs, smart sensor interfacing, thermal-rated industrial electronics.
                  </p>
                </div>
              </div>

              {/* Bottom Guarantee Banner */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <ShieldCheck className="w-4 h-4" /> Single-Source Accountability
                </span>
                <span className="text-slate-500">100% In-House Integration</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
