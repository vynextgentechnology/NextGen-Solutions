import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { useContactMutation } from "@/hooks/use-contact";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Code2, 
  Smartphone, 
  Receipt, 
  Building2, 
  GraduationCap, 
  Lightbulb, 
  ArrowRight,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  Facebook,
  Sparkles,
  ShieldCheck,
  Zap,
  Clock,
  Layers,
  Star,
  ChevronDown,
  Calculator,
  ArrowUpRight
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "wouter";

import founderPhoto from "@assets/file_000000002dc871fa82cdcaab5c34b0ec_1776134862189.png";
import narendraPhoto from "@assets/narendra_prasath_ceo.jpeg";
import yuvanPhoto from "@assets/yuvan_shankar_raja_co_founder.png";
import santhoshPhoto from "@assets/santhosh_managing_director.png";
import yeswanthPhoto from "@assets/yeswanth_director.png";
import sriPrajithPhoto from "@assets/sri_prajith_cto_cfo.jpg";
import logoImg from "@assets/vy_nextgen_logo.png";
import heroImage from "@assets/generated_images/modern_ai_it_industry_scene_for_hero_background.png";

export default function Home() {
  const contactMutation = useContactMutation();

  // Interactive Project Cost Estimator States
  const [calcService, setCalcService] = useState<"web" | "ecommerce" | "app" | "billing">("web");
  const [calcScale, setCalcScale] = useState<"standard" | "custom" | "enterprise">("custom");
  const [calcTimeline, setCalcTimeline] = useState<"standard" | "express">("standard");

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  // Project Scope & Timeline Estimator
  const calculateEstimate = () => {
    let days = "7 - 14 Days";
    let tierName = "Custom Scope";

    if (calcService === "web") {
      days = calcScale === "standard" ? "5 - 7 Days" : calcScale === "custom" ? "10 - 14 Days" : "2 - 4 Weeks";
      tierName = calcScale === "standard" ? "Starter Web Architecture" : calcScale === "custom" ? "Custom Business Platform" : "Enterprise Web Portal";
    } else if (calcService === "ecommerce") {
      days = calcScale === "standard" ? "10 - 14 Days" : calcScale === "custom" ? "2 - 3 Weeks" : "4 - 6 Weeks";
      tierName = calcScale === "standard" ? "Standard E-Store" : calcScale === "custom" ? "Multi-Category Marketplace" : "OmniChannel E-Commerce";
    } else if (calcService === "app") {
      days = calcScale === "standard" ? "2 - 3 Weeks" : calcScale === "custom" ? "3 - 5 Weeks" : "6 - 8 Weeks";
      tierName = calcScale === "standard" ? "MVP Mobile App" : calcScale === "custom" ? "Full Feature iOS & Android" : "Enterprise Mobile App";
    } else if (calcService === "billing") {
      days = calcScale === "standard" ? "1 - 2 Days" : calcScale === "custom" ? "3 - 5 Days" : "1 - 2 Weeks";
      tierName = calcScale === "standard" ? "Single Store POS" : calcScale === "custom" ? "Retail & Inventory POS" : "Multi-Branch Cloud Billing";
    }

    return {
      tierName,
      duration: calcTimeline === "express" ? "Priority Express (~50% Faster)" : days,
    };
  };

  const estimate = calculateEstimate();

  const services = [
    {
      icon: <Code2 className="w-6 h-6 text-blue-600" />,
      title: "Custom Web Development",
      badge: "High ROI",
      desc: "Fast, responsive web portals, landing pages, and web apps built with modern React, Next.js, and TypeScript.",
      href: "/web-development",
      points: ["100% Mobile Responsive", "SEO Optimized Architecture", "Fast Load Times (<1s)", "Custom Admin CMS"]
    },
    {
      icon: <Receipt className="w-6 h-6 text-indigo-600" />,
      title: "Billing & GST Software",
      badge: "Featured",
      desc: "Smart point-of-sale (POS) and invoicing software with barcode scanning, automated GST reports, and WhatsApp bills.",
      href: "/billing-software",
      points: ["Superfast 3-Sec Billing", "Offline Operation Support", "Barcode & Thermal Printing", "Daily Profit/Loss Reports"]
    },
    {
      icon: <Smartphone className="w-6 h-6 text-cyan-600" />,
      title: "Mobile App Development",
      badge: "iOS & Android",
      desc: "Native and cross-platform mobile apps providing seamless UX, push notifications, and payment gateway integration.",
      href: "/web-development",
      points: ["Cross-platform React Native", "Smooth Gestures & Offline Cache", "Google Play & App Store Setup", "Real-time Push Alerts"]
    },
    {
      icon: <Layers className="w-6 h-6 text-emerald-600" />,
      title: "UI/UX & Product Design",
      badge: "Design Systems",
      desc: "Intuitive user experiences, clickable Figma prototypes, responsive interfaces, and custom brand design systems.",
      href: "/web-development",
      points: ["User Journey & Wireframing", "Figma Interactive Prototypes", "Modern Component Libraries", "Conversion-Focused UI"]
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-rose-600" />,
      title: "Tech Internship & Training",
      badge: "Batch Open",
      desc: "1-month hands-on developer training with live project coding, 1-on-1 mentorship, and recognized completion certificate.",
      href: "/internship",
      points: ["Full-Stack MERN / React", "Live GitHub Portfolio Project", "Verifiable Certificate", "Letter of Recommendation"]
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-amber-600" />,
      title: "IT Consulting & Digital Strategy",
      badge: "Enterprise",
      desc: "Strategic technical advice to modernize legacy systems, cloud migration, cybersecurity audits, and workflow automation.",
      href: "/about",
      points: ["Cloud Architecture Planning", "Database Optimization", "Payment Gateway Setup", "Business Process Automation"]
    },
  ];


  const techStack = [
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Language" },
    { name: "Next.js", category: "Framework" },
    { name: "Node.js", category: "Backend" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Express", category: "API" },
    { name: "Flutter / RN", category: "Mobile" },
    { name: "Docker", category: "DevOps" },
    { name: "AWS Cloud", category: "Cloud" },
  ];

  const portfolioItems = [
    {
      title: "OmniChannel E-Commerce Store",
      category: "Web & E-Commerce",
      desc: "High-speed multi-vendor shopping platform with Razorpay payment integration, product variations, and SMS dispatch.",
      tech: ["React", "Node.js", "PostgreSQL", "Tailwind"],
      stat: "+180% Sales Growth"
    },
    {
      title: "Smart Retail GST POS Software",
      category: "Billing Solution",
      desc: "Supermarket billing system supporting 10,000+ SKU barcodes, thermal printing, and automatic GST e-way billing.",
      tech: ["Electron", "SQLite", "ESC/POS", "TypeScript"],
      stat: "3-Sec Checkouts"
    },
    {
      title: "Enterprise Cloud ERP & Management Portal",
      category: "Enterprise Software",
      desc: "Centralized cloud ERP platform for multi-warehouse inventory, procurement workflows, and real-time ledger accounting.",
      tech: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
      stat: "99.9% Uptime"
    },
  ];


  const testimonials = [
    {
      quote: "VY NextGen Technology built our business website in just 10 days. The design is super clean, loads instantly on mobile, and has brought us dozens of high-value customer inquiries.",
      author: "K. Vignesh",
      role: "Managing Director",
      company: "Textiles & Exports, Karur",
      rating: 5
    },
    {
      quote: "Their billing and GST software simplified our entire supermarket operations. Billing is now 3x faster, barcode scanning is effortless, and our end-of-day accounts balance automatically.",
      author: "M. Saravanan",
      role: "Store Owner",
      company: "Sri Krishna Supermart, Trichy",
      rating: 5
    },
    {
      quote: "The 1-month internship gave me real-world development experience that college never taught. Building a full-stack project under Mr. Valiullah's guidance helped me clear my developer interviews!",
      author: "P. Divya",
      role: "Junior React Developer",
      company: "Internship Alumna",
      rating: 5
    }
  ];

  const faqs = [
    {
      q: "How long does it take to develop a custom website or software?",
      a: "Standard business websites take 5 to 10 working days. E-Commerce portals and custom software take 2 to 4 weeks depending on features and third-party integrations. We provide exact delivery milestones before starting."
    },
    {
      q: "Do I get full ownership of the source code and website?",
      a: "Yes! Once development is completed and final payment is processed, 100% intellectual property, domain access, hosting credentials, and source code belong to your business."
    },
    {
      q: "Can your billing software run offline if our internet disconnects?",
      a: "Absolutely. Our retail billing software is engineered to work 100% offline so your checkout counter never stops. Data syncs automatically to the cloud once connectivity resumes."
    },
    {
      q: "What post-launch support and maintenance do you provide?",
      a: "We include 6 months of free technical support, security patching, and minor content updates with every website or software project we deliver."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-600/10">
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden bg-slate-950 text-white">
        {/* Ambient Grid & Glow Effects */}
        <div className="absolute inset-0 tech-grid-pattern-dark opacity-30 pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-blue-600/25 via-indigo-600/20 to-cyan-400/20 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-300 text-xs sm:text-sm font-semibold mb-8 backdrop-blur-md">
                <img src={logoImg} alt="VY NextGen Technologies Logo" className="h-5 w-auto rounded object-contain" />
                <span>VY NextGen Technologies • Innovating Digital Excellence</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.15] sm:leading-[1.1] mb-6 text-white break-words">
                <span className="text-white">Architecting</span>{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">
                  Next-Gen
                </span>{" "}
                <span className="text-white">IT Solutions & Software</span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg md:text-xl text-slate-200 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed font-normal px-2">
                We build high-converting websites, robust mobile applications, GST billing software, and custom enterprise platforms tailored for modern business growth.
              </p>

              {/* Hero Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto">
                <Link href="/enquiry" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto rounded-full px-7 sm:px-8 h-12 text-sm sm:text-base font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:-translate-y-0.5">
                    Submit Project Enquiry <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>

                <a href="#calculator" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-7 sm:px-8 h-12 text-sm sm:text-base font-bold border-slate-700 bg-slate-900/60 text-slate-200 hover:bg-slate-800 hover:text-white transition-all">
                    <Calculator className="mr-2 w-4 h-4 text-cyan-400" /> Scope Estimator
                  </Button>
                </a>

                <a
                  href="https://wa.me/918754020556"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-6 sm:px-7 h-12 text-sm sm:text-base font-bold border-emerald-500/40 bg-emerald-950/20 text-emerald-300 hover:bg-emerald-900/30">
                    <FaWhatsapp className="mr-2 w-5 h-5 text-emerald-400" /> WhatsApp Chat
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Counters Strip */}
      <section className="bg-white border-b border-slate-200 py-6 sm:py-8 relative shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
            <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 md:bg-transparent border border-slate-100 md:border-0 md:border-r md:border-slate-100">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-blue-600">50+</p>
              <p className="text-[11px] sm:text-sm text-slate-500 font-semibold mt-1">Delivered Projects</p>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 md:bg-transparent border border-slate-100 md:border-0 md:border-r md:border-slate-100">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">100%</p>
              <p className="text-[11px] sm:text-sm text-slate-500 font-semibold mt-1">Client Satisfaction</p>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 md:bg-transparent border border-slate-100 md:border-0 md:border-r md:border-slate-100">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-600">100+</p>
              <p className="text-[11px] sm:text-sm text-slate-500 font-semibold mt-1">Interns Mentored</p>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 md:bg-transparent border border-slate-100 md:border-0">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">24/7</p>
              <p className="text-[11px] sm:text-sm text-slate-500 font-semibold mt-1">Technical Support SLA</p>
            </div>
          </div>
        </div>
      </section>


      {/* Tech Stack Marquee / Badge Strip */}
      <section className="py-8 bg-slate-100/70 border-b border-slate-200/80 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Modern Technologies We Specialize In:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 justify-center md:justify-end">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 shadow-sm"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white relative">
        <div className="container mx-auto px-4 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">
              End-To-End Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mt-2">
              Comprehensive IT & Software Solutions
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
              Tailored technology engineering for retail shops, startups, enterprises, and citizens.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-300">
                      {service.icon}
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {service.desc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 mb-6">
                    {service.points.map((pt, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link href={service.href}>
                  <Button variant="ghost" className="w-full justify-between px-0 text-blue-600 font-bold hover:bg-transparent hover:text-blue-700 group/btn">
                    <span>Explore & Get Started</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Project Cost Calculator */}
      <section id="calculator" className="py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern-dark opacity-20 pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs">
              Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2 text-white">
              Interactive Project Cost Estimator
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              Configure your requirements below to get an instant estimate of project budget and delivery turnaround.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            <div className="grid md:grid-cols-3 gap-8">
              
              {/* Controls (2 cols) */}
              <div className="md:col-span-2 space-y-6">
                {/* 1. Service Type */}
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
                    1. Select Project Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {[
                      { id: "web", label: "Business Website", icon: "🌐" },
                      { id: "ecommerce", label: "E-Commerce Portal", icon: "🛍️" },
                      { id: "app", label: "Mobile Application", icon: "📱" },
                      { id: "billing", label: "Billing & GST POS", icon: "🧾" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setCalcService(item.id as any)}
                        className={`p-3 sm:p-3.5 rounded-xl text-left border transition-all flex items-center gap-3 ${
                          calcService === item.id
                            ? "bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <span className="text-xl shrink-0">{item.icon}</span>
                        <span className="text-sm font-semibold">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Scale & Features */}
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
                    2. Project Scope & Design Tier
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    {[
                      { id: "standard", label: "Starter", desc: "Core essentials" },
                      { id: "custom", label: "Professional", desc: "Custom features" },
                      { id: "enterprise", label: "Enterprise", desc: "Full scale & SLA" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setCalcScale(item.id as any)}
                        className={`p-3 rounded-xl text-center border transition-all ${
                          calcScale === item.id
                            ? "bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <p className="text-sm font-bold">{item.label}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Delivery Speed */}
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
                    3. Turnaround Speed
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    <button
                      onClick={() => setCalcTimeline("standard")}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        calcTimeline === "standard"
                          ? "bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500"
                          : "bg-slate-950 border-slate-800 text-slate-400"
                      }`}
                    >
                      <p className="text-sm font-bold">Standard Delivery</p>
                      <p className="text-[11px] text-slate-400">Regular development cycle</p>
                    </button>
                    <button
                      onClick={() => setCalcTimeline("express")}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        calcTimeline === "express"
                          ? "bg-cyan-600/20 border-cyan-400 text-white ring-1 ring-cyan-400"
                          : "bg-slate-950 border-slate-800 text-slate-400"
                      }`}
                    >
                      <p className="text-sm font-bold text-cyan-300">⚡ Express Delivery</p>
                      <p className="text-[11px] text-slate-400">Dedicated sprint team</p>
                    </button>
                  </div>
                </div>
              </div>

              {/* Estimate Result Display (1 col) */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between text-center relative">
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-bold uppercase">
                    Estimated Scope & Timeline
                  </span>

                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Solution Tier</p>
                    <p className="text-xl sm:text-2xl font-black text-cyan-400 mt-1">
                      {estimate.tierName}
                    </p>
                    <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                      Custom RFP Quote
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-left space-y-2 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Estimated Turnaround:</span>
                      <span className="font-bold text-white">{estimate.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Free Support:</span>
                      <span className="font-bold text-emerald-400">6 Months Included</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Source Code:</span>
                      <span className="font-bold text-white">100% Client Ownership</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <Link href="/web-development">
                    <Button className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25">
                      Request Scope & Proposal
                    </Button>
                  </Link>
                  <a
                    href={`https://wa.me/918754020556?text=${encodeURIComponent(
                      `Hello, I would like to discuss a project for ${calcService} (${calcScale} scope) with ${estimate.duration} turnaround. Can we connect?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full h-10 rounded-xl border-emerald-500/40 text-emerald-400 hover:bg-emerald-950/40 text-xs font-semibold">
                      <FaWhatsapp className="mr-1.5 w-4 h-4" /> Discuss on WhatsApp
                    </Button>
                  </a>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies / Portfolio Preview */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">
                Proven Track Record
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                Featured Client Deployments
              </h2>
              <p className="text-slate-600 mt-2">
                Real results delivered across commercial websites, retail automation, and digital portals.
              </p>
            </div>
            <Link href="/web-development">
              <Button variant="outline" className="rounded-full px-6 border-slate-300 text-slate-700 hover:bg-white font-bold">
                Order Your Custom Project <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {portfolioItems.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                <div className="p-7">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
                      {item.category}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                      {item.stat}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{item.desc}</p>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {item.tech.map((t) => (
                      <span key={t} className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Live Client Architecture</span>
                  <Link href="/web-development" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                    <span>Request Similar</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">Client Voices</span>
            <h2 className="text-3xl font-black text-slate-900 mt-2">What Our Clients & Interns Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <p className="font-bold text-slate-900 text-sm">{t.author}</p>
                  <p className="text-xs text-slate-500">{t.role} • {t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">Got Questions?</span>
            <h2 className="text-3xl font-black text-slate-900 mt-2">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Contact & Consultation Section */}
      <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern-dark opacity-20 pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-5">
              
              {/* Left Contact Details Sidebar */}
              <div className="lg:col-span-2 bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
                <div className="space-y-6">
                  <div>
                    <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs">Let's Connect</span>
                    <h3 className="text-2xl font-black text-white mt-1">Start Your Project</h3>
                    <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                      Reach out for custom software inquiries, live demos, or technical consulting. We respond within 2 hours.
                    </p>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-cyan-300 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase">Direct Call</p>
                        <a href="tel:+918754020556" className="font-bold text-white hover:text-cyan-300 transition-colors">
                          +91 87540 20556
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                        <FaWhatsapp className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase">WhatsApp Instant</p>
                        <a
                          href="https://wa.me/918754020556"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-emerald-400 hover:underline"
                        >
                          Chat: 8754020556
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase">Official Email</p>
                        <a href="mailto:vynextgentechnology@gmail.com" className="font-medium text-white hover:text-cyan-300 transition-colors break-all">
                          vynextgentechnology@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase">Office Location</p>
                        <p className="font-medium text-white">Karur, Tamil Nadu, India</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-800">
                  <p className="text-xs font-semibold text-slate-400 mb-3">Connect on Social Channels</p>
                  <div className="flex gap-3">
                    <a href="https://wa.me/918754020556" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                      <FaWhatsapp size={16} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                      <Linkedin size={16} />
                    </a>
                    <a href="https://www.instagram.com/vynextgentechnology?igsi=dnEycjhyMGIxcnU4" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                      <Instagram size={16} />
                    </a>
                    <a href="https://www.facebook.com/people/Vynextgentechnology/61593831857829/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                      <Facebook size={16} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Contact Form */}
              <div className="lg:col-span-3 p-8 sm:p-10 bg-slate-950">
                <h4 className="text-xl font-bold text-white mb-6">Send Us a Direct Inquiry</h4>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300 text-xs uppercase font-bold">Your Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Ramesh Kumar"
                                {...field}
                                className="bg-slate-900 border-slate-800 text-white focus:border-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300 text-xs uppercase font-bold">Mobile Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. +91 98765 43210"
                                {...field}
                                className="bg-slate-900 border-slate-800 text-white focus:border-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300 text-xs uppercase font-bold">Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="you@company.com"
                              {...field}
                              className="bg-slate-900 border-slate-800 text-white focus:border-blue-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300 text-xs uppercase font-bold">Project Details or Inquiry</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about what you want to build (website, mobile app, billing software, e-sevai, or internship inquiry)..."
                              rows={4}
                              {...field}
                              className="bg-slate-900 border-slate-800 text-white focus:border-blue-500 resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button
                        type="submit"
                        disabled={contactMutation.isPending}
                        className="flex-1 h-11 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/30"
                      >
                        {contactMutation.isPending ? "Submitting Inquiry..." : "Submit Inquiry"}
                        {!contactMutation.isPending && <Send className="ml-2 w-4 h-4" />}
                      </Button>

                      <a
                        href="https://wa.me/918754020556"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full h-11 rounded-xl border-emerald-500/50 text-emerald-400 hover:bg-emerald-950/40 text-sm font-semibold"
                        >
                          <FaWhatsapp className="mr-2 w-4 h-4" /> Quick WhatsApp
                        </Button>
                      </a>
                    </div>
                  </form>
                </Form>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
