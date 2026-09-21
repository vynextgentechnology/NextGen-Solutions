import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Receipt, 
  Cpu, 
  Database, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Barcode, 
  Activity,
  ArrowUpRight
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Products() {
  const products = [
    {
      id: "pos-suite",
      badge: "Flagship Retail Solution",
      title: "Smart Retail POS & GST Billing Suite",
      subtitle: "Ultra-fast barcode scanning, thermal printing, offline support & automated GST compliance.",
      icon: <Receipt className="w-8 h-8 text-blue-400" />,
      desc: "Engineered specifically for supermarkets, textiles, retail outlets, and wholesale distributors. Operates 100% offline with zero lag, automatically syncing transactions to the cloud once connectivity resumes.",
      specs: [
        "Sub-3-second barcode scan-to-print checkout speed",
        "100% offline functionality with zero counter interruptions",
        "ESC/POS 2-inch and 3-inch thermal printer compatibility",
        "Automated GST GSTR-1 & GSTR-3B tax report generation",
        "Instant WhatsApp bill dispatch directly to customer mobile",
        "Multi-counter and multi-branch centralized inventory sync"
      ],
      link: "/billing-software",
      actionText: "Explore Full POS Details"
    },
    {
      id: "iot-hub",
      badge: "Industrial Hardware",
      title: "NextGen IoT Smart Telemetry Gateways",
      subtitle: "Rugged edge hubs designed for real-time sensor ingestion, power monitoring & remote diagnostics.",
      icon: <Cpu className="w-8 h-8 text-cyan-400" />,
      desc: "A hardened physical computing device engineered to operate continuously in factories, agricultural hubs, and distributed utility substations. Interfaces seamlessly with industrial sensors and pushes telemetry to enterprise clouds.",
      specs: [
        "Dual-core 240MHz microcontroller with hardware crypto acceleration",
        "Industrial interfaces: RS-485, Modbus RTU, 4-20mA current loop, GPIO",
        "Wireless protocols: LoRaWAN 868/915MHz, 4G LTE-M / NB-IoT, WiFi",
        "Local NVMe / Flash storage for up to 30 days of offline telemetry caching",
        "DIN-rail mountable IP65-rated industrial enclosure with surge protection",
        "Firmware Over-The-Air (FOTA) signed remote updates"
      ],
      link: "/enquiry",
      actionText: "Request Gateway Specs"
    },
    {
      id: "erp",
      badge: "Cloud Enterprise Software",
      title: "Enterprise Multi-Branch ERP & Warehouse Portal",
      subtitle: "Unified cloud operating system for inventory, procurement, suppliers & financial ledgers.",
      icon: <Database className="w-8 h-8 text-indigo-400" />,
      desc: "Connect your central warehouse, retail outlets, and management offices into a synchronized real-time operational dashboard. Track stock movements, automate re-order thresholds, and generate consolidated financial statements.",
      specs: [
        "Real-time multi-branch inventory tracking with batch & expiry alerts",
        "Automated vendor Purchase Order (PO) and dispatch workflows",
        "Double-entry ledger accounting, accounts receivable & payable",
        "Granular role-based permissions (Cashier, Store Manager, Accountant, Director)",
        "Daily automated database snapshots and encrypted cloud backups",
        "RESTful integration with e-commerce portals and courier APIs"
      ],
      link: "/web-development",
      actionText: "Request ERP Demo"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navigation />

      {/* Header Banner */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-[#020817] via-[#04143a] to-slate-950 border-b border-slate-800 relative">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-mono font-bold uppercase mb-6">
            // Proprietary Product Portfolio
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
            Turnkey Hardware & Software Products
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Ready-to-deploy enterprise systems developed, tested, and supported directly by VY NextGen Technologies.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/enquiry">
              <Button className="rounded-full px-7 h-11 text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25">
                Request Product Quotation
              </Button>
            </Link>
            <a href="https://wa.me/918754020556" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="rounded-full px-6 h-11 text-xs sm:text-sm font-bold border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/30">
                <FaWhatsapp className="mr-2 w-4 h-4 text-emerald-400" />
                <span>Product Support WhatsApp</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Products Detail */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4 lg:px-8 space-y-16">
          {products.map((prod) => (
            <div
              key={prod.id}
              id={prod.id}
              className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 grid lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    {prod.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                    {prod.badge}
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">{prod.title}</h2>
                  <p className="text-xs sm:text-sm font-medium text-blue-300 mt-1">{prod.subtitle}</p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {prod.desc}
                </p>

                <div className="pt-2">
                  <p className="text-xs font-bold text-white uppercase tracking-wider mb-2.5">Technical Specifications & Highlights:</p>
                  <div className="space-y-2">
                    {prod.specs.map((spec, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link href={prod.link}>
                    <Button className="rounded-xl px-6 h-10 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white">
                      <span>{prod.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </Link>
                  <Link href="/enquiry" className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1">
                    <span>Order Commercial Trial</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <span className="text-[11px] font-mono uppercase text-slate-400 block border-b border-slate-800 pb-2">
                  // Commercial Deployment Ready
                </span>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Deployment Type:</span>
                    <span className="text-white font-bold">On-Premise & Cloud Sync</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Support Level:</span>
                    <span className="text-emerald-400 font-bold">24/7 SLA Engineering</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Hardware Warranty:</span>
                    <span className="text-cyan-300 font-bold">1 Year Direct Replacement</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">On-Site Setup:</span>
                    <span className="text-white font-bold">Available Across Tamil Nadu</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-blue-950/30 border border-blue-800/40 text-[11px] text-blue-200">
                  <p className="font-semibold text-white">Turnkey Hardware & Software Bundle Available:</p>
                  <p className="mt-0.5 text-slate-400">We supply the full setup including POS terminal, thermal printer, barcode gun, and pre-configured software ready out of the box.</p>
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
