import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Code2, 
  Layers, 
  Cpu, 
  Network, 
  Sparkles, 
  Wrench, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  ShieldCheck, 
  Clock,
  ArrowUpRight
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Services() {
  const servicesList = [
    {
      id: "software-dev",
      title: "Custom Full-Stack Software Engineering",
      badge: "Core Engineering",
      desc: "Turnkey development of responsive web applications, distributed APIs, microservices, and specialized enterprise management software built with modern standards.",
      icon: <Code2 className="w-8 h-8 text-blue-400" />,
      features: [
        "React 18 / Next.js high-performance web frontends",
        "Node.js, Express, Go, and Python distributed REST/GraphQL APIs",
        "Relational & time-series database design (PostgreSQL, SQLite, TimescaleDB)",
        "Role-based authentication, audit logs & multi-tenant isolation",
        "Clean architecture with comprehensive test coverage and documentation"
      ]
    },
    {
      id: "mobile-dev",
      title: "Native & Cross-Platform Mobile Applications",
      badge: "iOS & Android",
      desc: "Engaging, fluid mobile apps designed for seamless consumer experiences and mission-critical field operations with offline data synchronization.",
      icon: <Layers className="w-8 h-8 text-indigo-400" />,
      features: [
        "Cross-platform React Native and Flutter engineering",
        "Offline-first local caching and automatic background sync",
        "Hardware integration: Bluetooth BLE, NFC, barcode camera scanning & GPS",
        "Push notifications, biometric login & payment gateway integration",
        "App Store & Google Play submission and lifecycle management"
      ]
    },
    {
      id: "hardware-eng",
      title: "Hardware Engineering & Embedded Firmware",
      badge: "Electronics Co-Design",
      desc: "Comprehensive physical product development from circuit schematic capture to multilayer PCB layout and bare-metal embedded programming.",
      icon: <Cpu className="w-8 h-8 text-cyan-400" />,
      features: [
        "Microcontroller firmware development in C and modern C++",
        "Custom PCB schematics, routing, layout & Bill of Materials (BOM)",
        "Rapid prototyping, 3D casing integration & physical stress qualification",
        "Sensor & peripheral interfacing via I2C, SPI, UART, RS-485 and CAN-bus",
        "Low-power optimization for battery-operated remote sensor hubs"
      ]
    },
    {
      id: "it-infra",
      title: "IT Infrastructure, Networking & Cloud Ops",
      badge: "Enterprise Networks",
      desc: "Designing and maintaining enterprise networking, private cloud environments, server virtualization, and resilient communications backbones.",
      icon: <Network className="w-8 h-8 text-slate-300" />,
      features: [
        "Enterprise network topology design, VLAN segmentation & firewalling",
        "Public and hybrid cloud provisioning on AWS and Microsoft Azure",
        "Containerization with Docker & Kubernetes orchestration",
        "Automated backup procedures, disaster recovery & failover clustering",
        "Structured LAN cabling, wireless mesh & server rack commissioning"
      ]
    },
    {
      id: "consulting",
      title: "Digital Transformation & Technology Consulting",
      badge: "Strategic Advisory",
      desc: "Guiding organizations through legacy system replacement, software modernization, cloud adoption, and technology cost optimization.",
      icon: <Sparkles className="w-8 h-8 text-amber-400" />,
      features: [
        "Comprehensive architectural audits and technical debt assessment",
        "Technology roadmaps aligned with corporate expansion milestones",
        "Vendor evaluation, technical RFP creation & third-party validation",
        "Enterprise workflow re-engineering & digital paperwork elimination",
        "Cybersecurity readiness & regulatory compliance advisories"
      ]
    },
    {
      id: "support",
      title: "24/7 SLA Maintenance, Patching & Support",
      badge: "Mission-Critical",
      desc: "Reliable, round-the-clock technical operations ensuring system uptime, timely security updates, and rapid bug resolution.",
      icon: <Wrench className="w-8 h-8 text-emerald-400" />,
      features: [
        "Guaranteed 99.98% uptime SLA with automated synthetic monitoring",
        "Firmware Over-The-Air (FOTA) patch deployment for distributed devices",
        "Routine database maintenance, query indexing & security audits",
        "Dedicated Tier-1 to Tier-3 engineer escalation channels",
        "Detailed monthly operational health & incident post-mortem reporting"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navigation />

      {/* Header Banner */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-[#020817] via-[#04143a] to-slate-950 border-b border-slate-800 relative">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-mono font-bold uppercase mb-6">
            // Engineering & Professional Services
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
            End-To-End Technology Engineering Services
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            From initial discovery and custom hardware schematics to enterprise software development and round-the-clock SLA support.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/enquiry">
              <Button className="rounded-full px-7 h-11 text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25">
                Book Technical Consultation
              </Button>
            </Link>
            <a href="tel:+918754020556">
              <Button variant="outline" className="rounded-full px-6 h-11 text-xs sm:text-sm font-bold border-slate-700 text-slate-300 hover:text-white">
                <Phone className="mr-2 w-4 h-4 text-cyan-400" />
                <span>Call +91 87540 20556</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4 lg:px-8 space-y-12">
          {servicesList.map((srv) => (
            <div
              key={srv.id}
              id={srv.id}
              className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                    {srv.icon}
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                      {srv.badge}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">{srv.title}</h2>
                  </div>
                </div>

                <Link href="/enquiry">
                  <Button className="rounded-xl px-5 h-10 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shrink-0">
                    Request Scope Proposal <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>

              <div className="pt-6 grid lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {srv.desc}
                  </p>
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Includes certified QA testing, technical handoff & source documentation.</span>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-2">
                  <p className="text-xs font-bold text-white uppercase tracking-wider mb-2">Service Inclusions:</p>
                  {srv.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
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
