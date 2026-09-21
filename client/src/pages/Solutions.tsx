import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Cpu, 
  Network, 
  Cloud, 
  ShieldCheck, 
  Bot, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  Activity, 
  Server,
  Zap,
  ArrowUpRight
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Solutions() {
  const solutions = [
    {
      id: "hardware",
      badge: "Physical Technology",
      title: "Hardware Solutions & Embedded Systems",
      subtitle: "Custom electronic design, microcontroller engineering & rugged physical computing.",
      icon: <Cpu className="w-8 h-8 text-cyan-400" />,
      desc: "We engineer customized physical hardware from schematic capture and multilayer PCB design to low-level embedded firmware. Built for industrial durability, thermal tolerance, and uninterrupted operational cycles.",
      capabilities: [
        "Embedded C/C++, FreeRTOS, and ARM Cortex Architecture",
        "Microcontroller Design (ESP32, STM32, PIC, Atmel)",
        "Multilayer PCB Schematics, Routing & Prototyping",
        "Thermal, EMI & Environmental Stress Qualification",
        "Sensor Interfacing: I2C, SPI, RS-485, CAN-Bus & UART"
      ],
      deliverables: ["Hardware Schematics & BOM", "Gerber Fabrication Files", "Validated Prototype Units", "Tested Embedded Firmware"]
    },
    {
      id: "iot",
      badge: "Connected Telemetry",
      title: "IoT Solutions & Industrial Automation",
      subtitle: "Bridging isolated machines and sensor nodes into real-time telemetry pipelines.",
      icon: <Network className="w-8 h-8 text-blue-400" />,
      desc: "Our IoT gateways gather machine telemetry, environmental data, and energy consumption metrics at the edge. We deliver real-time control, automated alerts, and seamless integration with industrial PLC and SCADA environments.",
      capabilities: [
        "Edge Computing Gateways with Local Caching & Failover",
        "Industrial Protocols: Modbus RTU/TCP, MQTT, OPC-UA",
        "Wireless Telemetry: LoRaWAN, Cellular 4G/NB-IoT, WiFi & BLE",
        "Predictive Maintenance Algorithms & Threshold Alerts",
        "Remote Device Provisioning & Fleet Telemetry Management"
      ],
      deliverables: ["Edge Gateway Hubs", "Cloud Telemetry Pipeline", "Real-Time Monitoring Dashboard", "Automated Alert Relays"]
    },
    {
      id: "software",
      badge: "Cloud & Distributed Systems",
      title: "Enterprise Software & Cloud Platforms",
      subtitle: "High-throughput web portals, distributed APIs & multi-tenant cloud architectures.",
      icon: <Cloud className="w-8 h-8 text-indigo-400" />,
      desc: "From customer-facing digital portals to distributed enterprise ERP engines, we architect resilient software capable of scaling seamlessly under heavy production workloads with high uptime guarantees.",
      capabilities: [
        "Modern React, Next.js, and TypeScript Web Architectures",
        "High-Concurrency Node.js, Go, and Python Backend APIs",
        "PostgreSQL, TimescaleDB, Redis & Document Stores",
        "Role-Based Access Control (RBAC) & Enterprise Auditing",
        "Microservices Orchestration with Docker and Kubernetes"
      ],
      deliverables: ["Full-Stack Source Code", "Admin Management Console", "REST/GraphQL API Documentation", "Automated CI/CD Pipeline"]
    },
    {
      id: "cybersecurity",
      badge: "Zero-Trust Defense",
      title: "Cybersecurity & IT Infrastructure",
      subtitle: "Fortifying enterprise perimeters, networks & connected device ecosystems.",
      icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
      desc: "We implement defense-in-depth security architectures that protect confidential business assets, database records, and hardware endpoints against unauthorized access, eavesdropping, and service interruption.",
      capabilities: [
        "Zero-Trust Network Access & End-to-End Encryption",
        "Vulnerability Assessments & Penetration Testing (VAPT)",
        "Hardware Secure Boot & Cryptographic Key Management",
        "Network Segmentation, Firewalling & Intrusion Detection",
        "Automated Backup, Disaster Recovery & High-Availability SLA"
      ],
      deliverables: ["Security Audit Report", "Hardened Cloud Perimeter", "Automated Backup Runbooks", "Compliance Verification"]
    },
    {
      id: "ai-data",
      badge: "Applied Intelligence",
      title: "Applied AI, Data & Analytics",
      subtitle: "Actionable machine learning models and automated data processing pipelines.",
      icon: <Bot className="w-8 h-8 text-violet-400" />,
      desc: "We focus on pragmatic, problem-solving artificial intelligence rather than speculative hype. Our models automate manual document reading, detect operational anomalies, optimize inventory forecasting, and power live decision analytics.",
      capabilities: [
        "Predictive Analytics for Demand, Inventory & Maintenance",
        "Computer Vision for Quality Inspection & Barcode Recognition",
        "Intelligent Document Processing & Automated Data Extraction",
        "High-Throughput ETL Pipelines & Data Warehouse Design",
        "Real-Time Executive Business Intelligence Dashboards"
      ],
      deliverables: ["Custom Trained ML Models", "Data Ingestion Pipeline", "Executive BI Dashboards", "Automated Action Triggers"]
    },
    {
      id: "integration",
      badge: "Turnkey Co-Design",
      title: "Hardware & Software Integration",
      subtitle: "Single-source engineering uniting physical devices, edge software & cloud portals.",
      icon: <Layers className="w-8 h-8 text-amber-400" />,
      desc: "Our hallmark capability is eliminating the friction between hardware vendors and software development agencies. We build both simultaneously, guaranteeing flawless synchronization, fast turnarounds, and single-point accountability.",
      capabilities: [
        "Co-Designed Firmware & Cloud Communication Contracts",
        "Firmware-Over-The-Air (FOTA) Secure Remote Updating",
        "Sub-Second Bidirectional WebSocket & Socket.io Channels",
        "End-to-End Hardware Testing in Karur Incubation Facility",
        "Turnkey Packaging, Deployment & Staff Training"
      ],
      deliverables: ["Integrated Hardware-Software Solution", "FOTA Update Server", "Operator Manuals & Handbooks", "24/7 SLA Support Plan"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navigation />

      {/* Header Banner */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-[#020817] via-[#04143a] to-slate-950 border-b border-slate-800 relative">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-mono font-bold uppercase mb-6">
            // Technology Solutions Catalog
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
            End-To-End Software & Hardware Solutions
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Explore our specialized technology practices. We build cohesive architectures that combine custom physical hardware, industrial IoT, and enterprise cloud software.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/enquiry">
              <Button className="rounded-full px-7 h-11 text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25">
                Request Solution Proposal
              </Button>
            </Link>
            <a href="https://wa.me/918754020556" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="rounded-full px-6 h-11 text-xs sm:text-sm font-bold border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/30">
                <FaWhatsapp className="mr-2 w-4 h-4 text-emerald-400" />
                <span>Consult on WhatsApp</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Solutions Detailed Breakdown */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4 lg:px-8 space-y-16">
          {solutions.map((sol, index) => (
            <div
              key={sol.id}
              id={sol.id}
              className={`p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 grid lg:grid-cols-12 gap-8 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    {sol.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                    {sol.badge}
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">{sol.title}</h2>
                  <p className="text-xs sm:text-sm font-medium text-blue-300 mt-1">{sol.subtitle}</p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {sol.desc}
                </p>

                <div className="pt-2">
                  <p className="text-xs font-bold text-white uppercase tracking-wider mb-2">Core Engineering Capabilities:</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {sol.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link href="/enquiry">
                    <Button className="rounded-xl px-5 h-9 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white">
                      Inquire About {sol.title.split("&")[0]}
                    </Button>
                  </Link>
                  <Link href="/web-development" className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1">
                    <span>View Development Tiers</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <span className="text-[11px] font-mono uppercase text-slate-400 block border-b border-slate-800 pb-2">
                  // Standard Architecture Deliverables
                </span>
                <div className="space-y-2.5">
                  {sol.deliverables.map((item, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-white font-medium">{item}</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                        Included
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-800/40 text-[11px] text-blue-200">
                  <p className="font-semibold text-white">Full Intellectual Property Ownership:</p>
                  <p className="mt-0.5 text-slate-400">All schematics, source code, and production firmware transfer 100% to client upon project completion.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
