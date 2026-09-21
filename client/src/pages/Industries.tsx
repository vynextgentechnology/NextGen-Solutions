import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  ShoppingBag, 
  School, 
  Factory, 
  HeartPulse, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  ArrowUpRight,
  ShieldCheck
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Industries() {
  const industriesList = [
    {
      id: "retail",
      title: "Retail & Commercial Enterprises",
      badge: "Commerce Automation",
      icon: <ShoppingBag className="w-8 h-8 text-blue-400" />,
      tagline: "Ultra-fast POS checkouts, real-time inventory, and multi-branch synchronization.",
      desc: "We empower supermarkets, apparel showrooms, wholesale distributors, and retail chains with custom point-of-sale hardware, high-speed barcode scanning, automated GST compliance, and centralized cloud inventory tracking.",
      benefits: [
        "Sub-3-second billing preventing counter queues",
        "100% offline operational guarantee with automatic cloud synchronization",
        "Automated WhatsApp digital bill delivery reducing thermal paper waste",
        "Multi-branch centralized warehouse and stock re-order thresholds",
        "Integrated UPI, QR code, and card payment terminal workflows"
      ]
    },
    {
      id: "education",
      title: "Educational Institutions & Universities",
      badge: "Campus Digitization",
      icon: <School className="w-8 h-8 text-indigo-400" />,
      tagline: "Smart campus automation, student portals, biometric attendance & incubation labs.",
      desc: "We partner with engineering colleges, universities, and schools to modernize academic administration. From student fee portals and digital examination grading to hardware RFID attendance and student technology incubation labs.",
      benefits: [
        "Biometric and RFID smart attendance hardware with instant SMS alerts to parents",
        "Comprehensive Student Information Systems (SIS) & online fee payment gateways",
        "Digital marks evaluation, report card generation, and alumni portals",
        "On-campus Developer Incubation Labs mentoring future software engineers",
        "Institutional website development compliant with NAAC/NIRF presentation standards"
      ]
    },
    {
      id: "manufacturing",
      title: "Manufacturing & Industrial Facilities",
      badge: "Industry 4.0",
      icon: <Factory className="w-8 h-8 text-amber-400" />,
      tagline: "Predictive machine maintenance, shop-floor sensor telemetry & energy tracking.",
      desc: "Our industrial IoT edge gateways capture real-time machine telemetry (temperature, vibration, power draw, cycle counts) over Modbus and MQTT, providing operations managers with live alerts and downtime reduction.",
      benefits: [
        "Non-intrusive sensor retrofitting on legacy manufacturing equipment",
        "Real-time machine health monitoring and predictive failure alerting",
        "Automated production count tracking and Overall Equipment Effectiveness (OEE) metrics",
        "Factory-floor environmental and energy consumption optimization",
        "Hardened IP65 enclosures resistant to dust, moisture, and electrical surges"
      ]
    },
    {
      id: "healthcare",
      title: "Healthcare & Clinical Networks",
      badge: "Clinical Technology",
      icon: <HeartPulse className="w-8 h-8 text-rose-400" />,
      tagline: "Secure diagnostic workflows, patient records & clinical device telemetry.",
      desc: "We build compliant digital software and connected hardware for diagnostic clinics, hospitals, and medical practitioners, enabling reliable electronic health records and real-time medical equipment monitoring.",
      benefits: [
        "Digital patient appointment scheduling and outpatient queue management",
        "Electronic Medical Records (EMR) with strict data privacy and encryption",
        "Integration with laboratory diagnostic equipment and automated PDF test reports",
        "Pharmacy inventory management with batch tracking and expiry date alarms",
        "Secure remote doctor consultations and prescription dispatch"
      ]
    },
    {
      id: "society",
      title: "Smart Society & Public Digital Utilities",
      badge: "Social Impact Tech",
      icon: <Building2 className="w-8 h-8 text-emerald-400" />,
      tagline: "Civic automation, public e-services & community empowerment technology.",
      desc: "Dedicated to leveraging technology for broad social benefit. We engineer reliable digital utilities, citizen services automation, and self-service kiosks that make government and community services accessible to all.",
      benefits: [
        "Civic grievance registration and transparent resolution tracking portals",
        "Public self-service hardware kiosks for bill payments and digital certificates",
        "Energy metering and smart municipal street lighting telemetry",
        "Non-profit donation and community outreach transparency dashboards",
        "Affordable digital transformation packages for grassroots community organizations"
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
            // Industry Solutions
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
            Transforming Critical Sectors & Society
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            We adapt our core software, hardware, and IoT capabilities into domain-specific systems that solve real operational bottlenecks.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/enquiry">
              <Button className="rounded-full px-7 h-11 text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25">
                Discuss Sector Requirements
              </Button>
            </Link>
            <a href="https://wa.me/918754020556" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="rounded-full px-6 h-11 text-xs sm:text-sm font-bold border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/30">
                <FaWhatsapp className="mr-2 w-4 h-4 text-emerald-400" />
                <span>Sector Advisory on WhatsApp</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Industries Detailed List */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4 lg:px-8 space-y-14">
          {industriesList.map((ind) => (
            <div
              key={ind.id}
              id={ind.id}
              className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                    {ind.icon}
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                      {ind.badge}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">{ind.title}</h2>
                    <p className="text-xs sm:text-sm text-blue-300 mt-1">{ind.tagline}</p>
                  </div>
                </div>

                <Link href="/enquiry">
                  <Button className="rounded-xl px-5 h-10 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shrink-0">
                    Request Sector Scope <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>

              <div className="pt-6 grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {ind.desc}
                  </p>
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Includes customized on-premise hardware deployment & staff onboarding.</span>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-2.5">
                  <p className="text-xs font-bold text-white uppercase tracking-wider mb-2">Key Value & Solutions Delivered:</p>
                  {ind.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
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
