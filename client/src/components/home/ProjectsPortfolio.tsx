import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { 
  ArrowRight, 
  Receipt, 
  Database, 
  School, 
  HeartPulse 
} from "lucide-react";

export function ProjectsPortfolio() {
  const projects = [
    {
      id: "pos-billing",
      title: "Retail POS & GST Billing Suite",
      desc: "Fast, reliable billing software with offline operation, 3-second barcode scanning, thermal printing, and WhatsApp invoice dispatch.",
      category: "Desktop & Web Software",
      tech: "React • Electron • SQLite",
      link: "/billing-software",
      icon: <Receipt className="w-6 h-6 text-blue-600" />,
      bgGradient: "from-blue-50 to-indigo-50",
    },
    {
      id: "enterprise-erp",
      title: "Multi-Store Management & ERP Portal",
      desc: "Centralized cloud portal connecting multi-branch retail stores with real-time inventory tracking, vendor orders, and financial accounts.",
      category: "Cloud Web Application",
      tech: "React • Node.js • PostgreSQL",
      link: "/web-development",
      icon: <Database className="w-6 h-6 text-indigo-600" />,
      bgGradient: "from-indigo-50 to-slate-50",
    },
    {
      id: "campus-portal",
      title: "Campus & Student Information System",
      desc: "Comprehensive academic management platform automating student admissions, digital fee collection, attendance records, and exams.",
      category: "Education Platform",
      tech: "TypeScript • Express • MySQL",
      link: "/enquiry",
      icon: <School className="w-6 h-6 text-emerald-600" />,
      bgGradient: "from-emerald-50 to-teal-50",
    },
    {
      id: "clinic-software",
      title: "Clinic Appointment & Health Records App",
      desc: "Streamlined medical practice software for patient appointment queues, electronic health records, and automated prescription receipts.",
      category: "Healthcare Software",
      tech: "React • Tailwind • REST API",
      link: "/enquiry",
      icon: <HeartPulse className="w-6 h-6 text-rose-600" />,
      bgGradient: "from-rose-50 to-orange-50",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-100" id="projects">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          title="Some of Our Work"
          subtitle="A selection of software platforms and customized applications we have built for clients."
          align="center"
        />

        {/* 4 Clean Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Header Banner */}
                <div className={`w-full h-32 rounded-xl bg-gradient-to-br ${project.bgGradient} border border-slate-100 p-5 flex items-center justify-between mb-5`}>
                  <div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white text-slate-700 shadow-2xs border border-slate-200">
                      {project.category}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white shadow-2xs border border-slate-100">
                    {project.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {project.desc}
                </p>

                <p className="text-xs font-mono text-slate-400 mt-3">
                  Technologies: {project.tech}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={project.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <span>View Project</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <a href="#contact" className="text-xs text-slate-400 hover:text-slate-600">
                  Request Similar
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
