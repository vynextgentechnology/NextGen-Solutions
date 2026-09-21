import { motion } from "framer-motion";
import { Link } from "wouter";
import { SectionHeader } from "@/components/SectionHeader";
import { 
  School, 
  HeartPulse, 
  Factory, 
  ShoppingBag, 
  Landmark, 
  Wheat, 
  Truck, 
  Building2, 
  Compass, 
  Zap, 
  Store, 
  Building,
  ArrowRight,
  Globe
} from "lucide-react";

export function IndustriesSection() {
  const industries = [
    {
      title: "Education",
      desc: "Smart campus portals, RFID student attendance hardware & developer incubation labs.",
      icon: <School className="w-5 h-5 text-indigo-400" />,
      tag: "Academic",
    },
    {
      title: "Healthcare",
      desc: "Clinical workflow automation, EMR security, and diagnostic device telemetry.",
      icon: <HeartPulse className="w-5 h-5 text-rose-400" />,
      tag: "Clinical",
    },
    {
      title: "Manufacturing",
      desc: "Machine sensor retrofitting, OEE tracking, Modbus/MQTT edge telemetry & predictive maintenance.",
      icon: <Factory className="w-5 h-5 text-amber-400" />,
      tag: "Industry 4.0",
    },
    {
      title: "Retail",
      desc: "Sub-3-second POS barcode billing, 100% offline sync, thermal print & WhatsApp GST invoices.",
      icon: <ShoppingBag className="w-5 h-5 text-blue-400" />,
      tag: "Commerce",
    },
    {
      title: "Finance",
      desc: "Automated ledger reconciliation, digital payment integrations, and banking compliance APIs.",
      icon: <Landmark className="w-5 h-5 text-emerald-400" />,
      tag: "Fintech",
    },
    {
      title: "Agriculture",
      desc: "Smart soil moisture sensors, weather telemetry nodes, and automated solar pump controllers.",
      icon: <Wheat className="w-5 h-5 text-green-400" />,
      tag: "AgriTech",
    },
    {
      title: "Transportation",
      desc: "Fleet GPS tracking, remote OBD-II vehicle diagnostics, and dispatch route optimization.",
      icon: <Truck className="w-5 h-5 text-cyan-400" />,
      tag: "Logistics",
    },
    {
      title: "Government",
      desc: "Public service digital utilities, grievance tracking portals, and citizen self-service kiosks.",
      icon: <Building2 className="w-5 h-5 text-violet-400" />,
      tag: "Civic Tech",
    },
    {
      title: "Smart Cities",
      desc: "Automated municipal street lighting controllers, waste monitoring & urban sensor networks.",
      icon: <Compass className="w-5 h-5 text-teal-400" />,
      tag: "Urban IoT",
    },
    {
      title: "Energy",
      desc: "Substation power draw telemetry, solar inverter data loggers, and energy audit platforms.",
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      tag: "Power & Grid",
    },
    {
      title: "Small Businesses",
      desc: "Affordable digital transformation, inventory management, and computerized billing suites.",
      icon: <Store className="w-5 h-5 text-sky-400" />,
      tag: "MSMEs",
    },
    {
      title: "Enterprises",
      desc: "Distributed microservices, high-throughput cloud ERPs, and multi-facility synchronization.",
      icon: <Building className="w-5 h-5 text-blue-500" />,
      tag: "Enterprise",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-950 text-slate-100 relative overflow-hidden" id="industries">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          badge="Cross-Industry Impact"
          badgeIcon={<Globe className="w-3.5 h-3.5 text-cyan-400" />}
          title="Technology for"
          titleHighlight="Every Industry"
          subtitle="We adapt technology to the problem, not the other way around. Our modular software and hardware stack is purpose-built to eliminate bottlenecks across diverse operational environments."
          align="center"
        />

        {/* 12 Industry Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {industries.map((ind, idx) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.03 }}
            >
              <Link
                href="/industries"
                className="group p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-200 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/40 group-hover:bg-slate-800 transition-colors">
                      {ind.icon}
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      {ind.tag}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {ind.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-cyan-400 transition-colors">
                  <span>View Applications</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
