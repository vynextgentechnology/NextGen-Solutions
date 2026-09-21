import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  ShieldCheck, 
  Target, 
  Compass, 
  HeartHandshake, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Calendar, 
  Users,
  Terminal,
  Volume2,
  VolumeX,
  RotateCcw,
  FastForward,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";
import { MouseScrollIndicator } from "@/components/ScrollAnimation";
import { SpotlightCard } from "@/components/InteractiveSpotlightCard";
import { TypewriterDisplay } from "@/components/TypewriterText";
import founderPhoto from "@assets/file_000000002dc871fa82cdcaab5c34b0ec_1776134862189.png";
import narendraPhoto from "@assets/narendra_prasath_ceo.png";
import yuvanPhoto from "@assets/yuvan_shankar_raja_co_founder.png";
import santhoshPhoto from "@assets/santhosh_managing_director.png";
import yeswanthPhoto from "@assets/yeswanth_director.png";
import sriPrajithPhoto from "@assets/sri_prajith_cto_cfo.png";
import logoImg from "@assets/vy_nextgen_logo.png";

export interface ExecutiveLeader {
  name: string;
  role: string;
  badge: string;
  department: string;
  photo: string;
  summary: string;
  focus: string[];
  tenure: string;
  detailedBio: string;
  initiatives: string[];
  quote: string;
}

const leaders: ExecutiveLeader[] = [
  {
    name: "Mr. Valiullah",
    role: "Founder & Executive Chairman",
    badge: "Founder & Chair",
    department: "Founding Governance",
    photo: founderPhoto,
    summary: "Visionary founder governing corporate mission, core software architectures, regional digital transformation, and software developer incubation.",
    focus: ["System Architecture", "POS Engine R&D", "Tech Incubation"],
    tenure: "Founder & Chairman • 2025 - Present",
    detailedBio: "Visionary founder steering VY NextGen's enterprise software roadmap and technological foundation. Architected our flagship high-speed retail POS engine with sub-3-second barcode processing, thermal receipt dispatch, and real-time GST tax compliance. Deeply dedicated to regional tech incubation, transforming aspiring collegiate engineers into industry-ready full-stack developers.",
    initiatives: [
      "Engineered Flagship POS Retail Engine with 3s Scan Speed",
      "Founded VY NextGen Tech Incubation Lab for Engineers",
      "Architected Multi-Tenant Cloud ERP Microservices",
    ],
    quote: "True engineering leadership is not just writing code—it is building enduring digital platforms and empowering the generation of innovators who follow.",
  },
  {
    name: "Mr. Yuvan Shankar Raja",
    role: "Co-Founder",
    badge: "Co-Founder",
    department: "Founding Board",
    photo: yuvanPhoto,
    summary: "Co-Founder driving business architecture, financial technology innovation, and strategic industry partnerships.",
    focus: ["Fintech Systems", "Strategic Scale", "Commercial Alliances"],
    tenure: "Co-Founder • 2025 - Present",
    detailedBio: "Co-founding director steering corporate business architecture, strategic commercial alliances, and fintech innovations. Spearheaded enterprise ERP integrations and automated inventory management frameworks that helped regional retailers scale from single-counter stores to multi-branch operations with unified cloud analytics.",
    initiatives: [
      "Architected Seamless Multi-Gateway UPI/Card POS Workflows",
      "Formed Strategic Alliances with Regional Retail Alliances",
      "Spearheaded Centralized Cloud Inventory Sync Platforms",
    ],
    quote: "Sustainable business growth marries bold technological vision with disciplined execution and customer-first value.",
  },
  {
    name: "Mr. Narendhra Prashath",
    role: "Chief Executive Officer (CEO)",
    badge: "CEO",
    department: "Corporate Leadership",
    photo: narendraPhoto,
    summary: "Chief Executive Officer directing corporate strategy, technology consulting, enterprise client solutions and digital innovation.",
    focus: ["Corporate Strategy", "Enterprise Tech", "Client Acquisition"],
    tenure: "Chief Executive Officer • 2025 - Present",
    detailedBio: "Chief Executive Officer commanding corporate strategy, enterprise consulting, and client technology advisory. Directs global solutioning across retail, healthcare, manufacturing, and educational sectors, ensuring rapid time-to-market and high-ROI digital transformations.",
    initiatives: [
      "Expanded Enterprise Client Portfolio Across South India",
      "Pioneered High-Velocity Agile Delivery Frameworks",
      "Established Corporate Technology Advisory Services",
    ],
    quote: "We forge enduring partnerships through relentless delivery velocity, absolute transparency, and technological excellence.",
  },
  {
    name: "Mr. Sri Prajith",
    role: "Chief Technology & Chief Financial Officer",
    badge: "CTO / CFO",
    department: "Executive Technology & Finance",
    photo: sriPrajithPhoto,
    summary: "Executive Vice President commanding dual portfolios across technical architecture, cloud infrastructure, fiscal governance, and economic performance.",
    focus: ["Cloud DevSecOps", "Fiscal Governance", "99.9% SLAs"],
    tenure: "CTO / CFO • 2025 - Present",
    detailedBio: "Commanding dual portfolios spanning high-performance cloud infrastructure, DevOps pipelines, fiscal modeling, and capital governance. Maintains strict 99.9% uptime across all production software suites, container orchestration, and real-time database disaster recovery systems.",
    initiatives: [
      "Achieved 99.99% Cloud Production Uptime SLA Standards",
      "Automated Zero-Downtime Containerized CI/CD Pipelines",
      "Engineered Precision Unit Economics for Enterprise SaaS",
    ],
    quote: "Technical rigor without financial discipline is fragile; unified, they build an unstoppable innovation engine.",
  },
  {
    name: "Mr. Santhosh",
    role: "Managing Director",
    badge: "Managing Director",
    department: "Executive Management",
    photo: santhoshPhoto,
    summary: "Managing Director steering technical operations, engineering delivery standards, and core software solutions.",
    focus: ["DevOps Automation", "Agile Sprints", "Code Quality Rigor"],
    tenure: "Managing Director • 2025 - Present",
    detailedBio: "Managing Director driving engineering delivery standards, Agile sprint cycles, and automated code review pipelines. Champions modern TypeScript/React and Node.js architectures, ensuring modularity, zero-regression deployments, and seamless end-user experiences.",
    initiatives: [
      "Standardized Full-Stack Enterprise Code Reviews & Linters",
      "Accelerated Feature Sprint Velocity by 40% Across Squads",
      "Supervised Delivery of 50+ Custom Enterprise Portals",
    ],
    quote: "Execution is the ultimate differentiator. We turn ambitious architectural concepts into pristine, resilient production software.",
  },
  {
    name: "Mr. Yeswanth",
    role: "Director",
    badge: "Director",
    department: "Corporate Strategy",
    photo: yeswanthPhoto,
    summary: "Director spearheading strategic partnerships, client relations, and market expansion across Tamil Nadu and pan-India.",
    focus: ["Market Expansion", "Key Partnerships", "Client Retention"],
    tenure: "Director • 2025 - Present",
    detailedBio: "Director spearheading regional outreach, client relationship management, and commercial partner networks across Tamil Nadu and South India. Cultivates high-impact alliances with commercial trade associations and educational institutions for developer hiring and onboarding.",
    initiatives: [
      "Forged 20+ Enterprise Merchant & Partner Alliances",
      "Spearheaded Karur Tech Talent Campus Recruitment",
      "Maintained 98%+ Enterprise Client Retention Rating",
    ],
    quote: "Every lasting partnership is built on unwavering trust, authentic value addition, and shared success.",
  },
];

const milestones = [
  {
    year: "2025",
    title: "Company Foundation",
    tag: "Genesis",
    color: "#06b6d4",
    desc: "Established as a high-tech MSME enterprise in Karur, Tamil Nadu with a clear mission to bridge digital gaps for regional businesses.",
  },
  {
    year: "2026 (Q1)",
    title: "Billing & POS Software Launch",
    tag: "Product Release",
    color: "#3b82f6",
    desc: "Engineered and deployed our flagship retail billing software with 3-second barcode scanning, thermal printing, and GST compliance.",
  },
  {
    year: "2026 (Q2)",
    title: "Cloud & Custom ERP Solutions",
    tag: "Enterprise Scale",
    color: "#6366f1",
    desc: "Expanded enterprise offerings into custom ERP portals, inventory platforms, multi-store sync, and scalable cloud microservices.",
  },
  {
    year: "2026 (Q3-Q4)",
    title: "Tech Academy & AI-Driven Solutions",
    tag: "Modern Era",
    color: "#10b981",
    desc: "Mentored 100+ collegiate developers, launched ISO verified internships, and deployed 50+ enterprise systems across Tamil Nadu.",
  },
];

const values = [
  {
    icon: <Target className="w-6 h-6 text-cyan-400" />,
    title: "Precision Engineering",
    desc: "We build software with clean, maintainable architecture, sub-second load times, and rigorous quality assurance.",
    glow: "hover:border-cyan-500/50"
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
    title: "Security & Transparency",
    desc: "Clear upfront scopes, no hidden fees, and 100% client ownership of all intellectual property, credentials, and source code.",
    glow: "hover:border-blue-500/50"
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-indigo-400" />,
    title: "Client-Centric SLA",
    desc: "We don't just ship code and leave; our dedicated Karur team provides 6 months of free post-launch support and warranty.",
    glow: "hover:border-indigo-500/50"
  },
  {
    icon: <Users className="w-6 h-6 text-emerald-400" />,
    title: "Talent Empowerment",
    desc: "We are deeply committed to training collegiate talent into industry-ready engineers via our 1-month intensive tech internship.",
    glow: "hover:border-emerald-500/50"
  },
];

const marqueeItems = [
  "50+ Projects Engineered",
  "99.9% Uptime Architecture",
  "3-Second GST Billing POS",
  "100% Client Code Ownership",
  "ISO Certified Tech Academy",
  "6 Months Free SLA Support",
  "Full-Stack Web & Mobile Systems",
  "Karur Headquarters • Pan-India Reach",
];

function ZyvexLeaderGraphic({ index }: { index: number }) {
  if (index === 0) {
    // Founder & Executive Chairman: DNA Milestone Timeline
    return (
      <div className="video-dna-timeline">
        {[
          { year: "2025: Genesis", desc: "Founded VY NextGen Technologies in Karur, Tamil Nadu" },
          { year: "Core Architecture", desc: "Flagship POS Engine with 3-Second Barcode Scan Speed" },
          { year: "Hardware Sync", desc: "Integrated Thermal Printers, Barcode Scanners & Weighing Scales" },
          { year: "Cloud & ERP", desc: "Multi-Tenant Cloud Microservices & Real-Time Sync" },
          { year: "The Future", desc: "Autonomous AI-Driven Retail & Pan-India Expansion" },
        ].map((item, i) => (
          <div key={i} className="dna-item">
            <div className="dna-point" />
            <div className="dna-card">
              <h5>{item.year}</h5>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (index === 1) {
    // Co-Founder: Animated Multi-Color Line Graph Timeline
    return (
      <div className="line-graph-timeline">
        <svg className="lg-svg" viewBox="0 0 600 130" preserveAspectRatio="none">
          <polyline points="10,105 100,40 220,90 340,30 460,70 590,15" className="lg-path" />
          <circle cx="10" cy="105" r="6" className="lg-point" />
          <circle cx="100" cy="40" r="6" className="lg-point" />
          <circle cx="220" cy="90" r="6" className="lg-point" />
          <circle cx="340" cy="30" r="6" className="lg-point" />
          <circle cx="460" cy="70" r="6" className="lg-point" />
          <circle cx="590" cy="15" r="8" className="lg-point fill-sky-400 stroke-white" />
        </svg>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-3 text-center">
          <div>
            <span className="text-xs font-mono font-bold text-blue-300 block">Feb '25</span>
            <span className="text-[10px] text-slate-300">Genesis</span>
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-blue-300 block">Strategy</span>
            <span className="text-[10px] text-slate-300">Formulation</span>
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-blue-300 block">POS Sync</span>
            <span className="text-[10px] text-slate-300">Fintech Scale</span>
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-blue-300 block">Clients</span>
            <span className="text-[10px] text-slate-300">Acquisition</span>
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-blue-300 block">Brand</span>
            <span className="text-[10px] text-slate-300">Expansion</span>
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-sky-300 block">Future</span>
            <span className="text-[10px] text-slate-300">Dominance</span>
          </div>
        </div>
      </div>
    );
  }

  if (index === 2) {
    // CEO: Pure Ascending Bar Graph Timeline
    return (
      <div className="bar-graph-timeline">
        {[
          { label: "T1", metric: "Discovery", height: "18%" },
          { label: "T2", metric: "Consulting", height: "30%" },
          { label: "T3", metric: "Agile Ops", height: "45%" },
          { label: "T4", metric: "Client ROI", height: "58%" },
          { label: "T5", metric: "SLA 99.9%", height: "70%" },
          { label: "T6", metric: "Pan-India", height: "82%" },
          { label: "T7", metric: "Enterprise", height: "92%" },
          { label: "T8", metric: "Dominance", height: "100%" },
        ].map((bar, i) => (
          <div key={i} className="bg-bar" style={{ height: bar.height }}>
            <div className="bg-content">
              <span className="text-blue-300 font-mono text-[10px] block">{bar.label}</span>
              <span className="text-[9px] text-slate-200 hidden sm:inline">{bar.metric}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (index === 3) {
    // CTO / CFO: Histogram Phase Timeline
    return (
      <div className="histogram-timeline">
        {[
          { phase: "Phase 1", title: "DevSecOps", height: "25%" },
          { phase: "Phase 2", title: "CI/CD Pipeline", height: "40%" },
          { phase: "Phase 3", title: "99.99% SLA", height: "55%" },
          { phase: "Phase 4", title: "Microservices", height: "70%" },
          { phase: "Phase 5", title: "Unit Economics", height: "85%" },
          { phase: "Phase 6", title: "Cloud Dominance", height: "100%" },
        ].map((hist, i) => (
          <div key={i} className="hist-block" style={{ height: hist.height }}>
            <div className="hist-content">
              <h5 className="text-[10px] font-mono text-blue-200">{hist.phase}</h5>
              <span className="text-[9px] text-slate-300 hidden sm:block">{hist.title}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (index === 4) {
    // Managing Director: Agile Sprint Velocity Timeline
    return (
      <div className="bar-graph-timeline">
        {[
          { label: "S1", metric: "Architecture", height: "25%" },
          { label: "S2", metric: "Linting & CI", height: "42%" },
          { label: "S3", metric: "Zero Regress", height: "58%" },
          { label: "S4", metric: "+40% Velocity", height: "74%" },
          { label: "S5", metric: "50+ Portals", height: "88%" },
          { label: "S6", metric: "Gold Standard", height: "100%" },
        ].map((bar, i) => (
          <div key={i} className="bg-bar" style={{ height: bar.height }}>
            <div className="bg-content">
              <span className="text-blue-300 font-mono text-[10px] block">{bar.label}</span>
              <span className="text-[9px] text-slate-200 hidden sm:inline">{bar.metric}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Director (Yeswanth): Commercial Alliances & Outreach Timeline
  return (
    <div className="histogram-timeline">
      {[
        { phase: "Node 1", title: "20+ Alliances", height: "28%" },
        { phase: "Node 2", title: "Campus Drives", height: "48%" },
        { phase: "Node 3", title: "98%+ Retention", height: "68%" },
        { phase: "Node 4", title: "Tamil Nadu Reach", height: "84%" },
        { phase: "Node 5", title: "Pan-India Expansion", height: "100%" },
      ].map((hist, i) => (
        <div key={i} className="hist-block" style={{ height: hist.height }}>
          <div className="hist-content">
            <h5 className="text-[10px] font-mono text-blue-200">{hist.phase}</h5>
            <span className="text-[9px] text-slate-300 hidden sm:block">{hist.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function SequentialTypewriterBio({
  initiatives,
  quote,
  replayKey,
  isHovered,
}: {
  initiatives: string[];
  quote: string;
  replayKey: number;
  isHovered: boolean;
}) {
  const allLines = [...initiatives.map((item) => `> ${item}`), `> "${quote}"`];
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [typedChars, setTypedChars] = useState<number>(0);

  useEffect(() => {
    setCurrentLineIndex(0);
    setTypedChars(0);
  }, [replayKey]);

  useEffect(() => {
    if (currentLineIndex >= allLines.length) return;

    const line = allLines[currentLineIndex];
    if (typedChars < line.length) {
      const timeout = setTimeout(() => {
        setTypedChars((prev) => prev + 1);
      }, 12);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setTypedChars(0);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, typedChars, allLines]);

  return (
    <div className="typing-bio font-mono text-xs sm:text-sm my-3 space-y-1.5">
      {allLines.map((line, idx) => {
        const isQuote = idx === allLines.length - 1;
        if (idx < currentLineIndex) {
          return (
            <div key={idx} className="type-line flex items-start gap-1.5 py-0.5">
              <span className="text-sky-400 font-bold select-none">&gt;</span>
              <span className={isQuote ? "text-sky-200/90 italic text-xs" : "text-slate-100"}>
                {line.replace(/^>\s*/, "")}
              </span>
            </div>
          );
        } else if (idx === currentLineIndex) {
          const visible = line.substring(2, typedChars);
          return (
            <div key={idx} className="type-line flex items-start gap-1.5 py-0.5">
              <span className="text-sky-400 font-bold select-none">&gt;</span>
              <span className={isQuote ? "text-sky-200/90 italic text-xs" : "text-slate-100"}>
                {visible}
                <span className="inline-block w-2 h-3.5 ml-1 bg-sky-400 animate-pulse align-middle" />
              </span>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

function ZyvexLeaderFullShowcase({
  leader,
  index,
  soundEnabled,
  onToggleSound,
  onOpenModal,
}: {
  leader: ExecutiveLeader;
  index: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenModal: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  const isReverse = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => {
        setIsHovered(true);
        setReplayKey((k) => k + 1);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`leader-full-showcase ${isReverse ? "reverse" : ""} ${index > 0 ? "mt-16 sm:mt-24" : ""} group`}
    >
      {/* 1. Large Portrait Area with clean glowing neon blue border + smooth 3D Pop-Out (NO rotation) */}
      <div className="lfs-image">
        <motion.div
          animate={{
            scale: isHovered ? 1.06 : 1,
            y: isHovered ? -12 : 0,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="relative w-full max-w-[320px] sm:max-w-[380px] aspect-[4/5] rounded-3xl border-lightning overflow-hidden cursor-pointer"
          style={{
            filter: isHovered
              ? "drop-shadow(0 20px 35px rgba(37, 99, 235, 0.45)) drop-shadow(0 0 25px rgba(96, 165, 250, 0.4))"
              : "drop-shadow(0 10px 20px rgba(2, 16, 46, 0.5))",
          }}
          onClick={onOpenModal}
        >
          {/* Inner Photo Container */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#02102e] border border-blue-500/40">
            {/* Top Badge */}
            <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#041d57]/90 backdrop-blur-md border border-blue-400/50 text-[11px] font-mono font-bold text-blue-200 shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>{leader.badge}</span>
            </div>

            {/* Photo */}
            <img
              src={leader.photo}
              alt={`${leader.name} - ${leader.role}`}
              className={`w-full h-full object-cover object-top transition-all duration-700 ${
                isHovered ? "scale-105 filter-none" : "filter grayscale-[15%]"
              }`}
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#02102e] via-transparent to-transparent opacity-80 pointer-events-none" />

            {/* Shimmer sweep */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Bottom Callout Overlay */}
            <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none">
              <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#041d57]/90 backdrop-blur-md border border-blue-400/40 text-blue-200 text-[11px] font-semibold shadow-lg">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                  <span>Hover to pop out & stream</span>
                </span>
                <span className="text-[9px] uppercase font-mono tracking-wider bg-blue-500/20 text-blue-200 px-1.5 py-0.5 rounded border border-blue-400/30">
                  3D Pop ➔
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 2. Content Side: Name, Role, Typing Terminal Bio, Timeline Visualization */}
      <div className="lfs-content">
        {/* Top Mini HUD Header */}
        <div className="flex items-center justify-between pb-2 border-b border-blue-400/20 mb-4">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase">
            // EXECUTIVE DOSSIER • [ 0{index + 1} ]
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setReplayKey((k) => k + 1);
              }}
              title="Replay typing animation"
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-950/70 hover:bg-blue-900 border border-blue-500/40 text-blue-300 text-xs font-mono transition-colors active:scale-95"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Replay</span>
            </button>
            <button
              type="button"
              onClick={onToggleSound}
              title={soundEnabled ? "Mute typing audio" : "Enable typing audio"}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-950/70 hover:bg-blue-900 border border-blue-500/40 text-blue-300 text-xs font-mono transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-blue-300" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
              <span className="hidden sm:inline">{soundEnabled ? "Audio On" : "Muted"}</span>
            </button>
            <button
              type="button"
              onClick={onOpenModal}
              title="Expand Full Dossier Modal"
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold shadow-md shadow-blue-600/30 transition-all active:scale-95"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Full Dossier</span>
            </button>
          </div>
        </div>

        {/* Name & Role */}
        <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          {leader.name}
        </h3>
        <h4 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-sky-200 to-white text-lg sm:text-xl font-black uppercase tracking-wider mt-1">
          {leader.role}
        </h4>
        <p className="text-xs font-mono text-blue-200/70 mt-0.5">
          {leader.department} • {leader.tenure}
        </p>

        {/* Cyber Typing Bio with Dynamic Streaming Typing Animation */}
        <SequentialTypewriterBio
          initiatives={leader.initiatives}
          quote={leader.quote}
          replayKey={replayKey}
          isHovered={isHovered}
        />

        {/* Zyvex-Style Dedicated Timeline / Graph for Each Leader */}
        <ZyvexLeaderGraphic index={index} />

        {/* Focus Tags */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-blue-400/20">
          {leader.focus.map((tag, i) => (
            <span
              key={i}
              className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-blue-950/70 text-blue-200 border border-blue-500/30 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ExecutiveDossierModal({
  leader,
  soundEnabled,
  onToggleSound,
  onClose,
  onNavigate,
  currentIndex,
  totalCount,
}: {
  leader: ExecutiveLeader;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  currentIndex: number;
  totalCount: number;
}) {
  const [replayKey, setReplayKey] = useState(0);
  const [skip, setSkip] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((currentIndex - 1 + totalCount) % totalCount);
      if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % totalCount);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, totalCount, onClose, onNavigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#03153d] rounded-3xl border border-blue-400/50 shadow-[0_0_60px_rgba(37,99,235,0.35)] overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_15px_#2563eb]" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-blue-900/60 bg-[#041d57]/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-blue-300 animate-pulse" />
              <span>OFFICIAL EXECUTIVE DOSSIER</span>
            </div>
            <span className="text-xs font-mono text-blue-200/70 hidden sm:inline">
              [ 0{currentIndex + 1} / 0{totalCount} ]
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleSound}
              title={soundEnabled ? "Mute typing audio" : "Enable typing audio"}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-700/60 text-xs font-mono transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-blue-300" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
              <span className="hidden sm:inline">{soundEnabled ? "Audio On" : "Muted"}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-blue-900/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {/* Left Column: Photo & Badges */}
          <div className="md:col-span-4 flex flex-col items-center text-center">
            <div className="relative w-48 sm:w-56 aspect-[4/5] rounded-2xl overflow-hidden border-2 border-blue-500/50 shadow-xl shadow-blue-500/15 bg-slate-900 group">
              <img
                src={leader.photo}
                alt={leader.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02102e] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md">
                  {leader.badge}
                </span>
              </div>
            </div>

            <h3 className="text-xl font-black text-white mt-4">{leader.name}</h3>
            <p className="text-xs font-semibold text-blue-300 mt-1">{leader.role}</p>
            <p className="text-xs font-mono text-blue-200/70 mt-0.5">{leader.department}</p>
            <p className="text-[11px] font-mono text-slate-400 mt-1">{leader.tenure}</p>

            <div className="flex flex-wrap gap-1.5 justify-center mt-4 pt-4 border-t border-blue-900/60 w-full">
              {leader.focus.map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-950/60 text-blue-200 border border-blue-800/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Terminal Typing Stream */}
          <div className="md:col-span-8 flex flex-col justify-between bg-[#02102e]/80 rounded-2xl p-5 sm:p-6 border border-blue-900/60 terminal-scanlines relative">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-blue-900/60 mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-mono font-bold text-blue-300 uppercase tracking-wider">
                    // EXECUTIVE_MEMORANDUM & TECHNICAL BRIEF
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSkip(false);
                      setIsDone(false);
                      setReplayKey((k) => k + 1);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-blue-200 text-xs font-mono border border-blue-700/60 transition-all active:scale-95"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Replay</span>
                  </button>
                  {!skip && !isDone && (
                    <button
                      type="button"
                      onClick={() => setSkip(true)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-slate-300 text-xs font-mono border border-blue-700/60 transition-all active:scale-95"
                    >
                      <FastForward className="w-3 h-3" />
                      <span>Skip</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Typed Biography */}
              <div className="text-sm font-mono text-slate-100 leading-relaxed min-h-[110px]">
                {skip ? (
                  <p>{leader.detailedBio}</p>
                ) : (
                  <TypewriterDisplay
                    key={`${leader.name}-${replayKey}`}
                    text={leader.detailedBio}
                    speed={15}
                    delay={100}
                    enableSound={soundEnabled}
                    onComplete={() => setIsDone(true)}
                    className="text-slate-100"
                  />
                )}
              </div>

              {/* Core Enterprise Initiatives */}
              <div className="mt-6 pt-5 border-t border-blue-900/60">
                <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-300 mb-2 flex items-center gap-1.5">
                  <span>▸ Core Enterprise Initiatives & Impact</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {leader.initiatives.map((item, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-800/60 text-xs font-mono text-slate-200 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leadership Philosophy Quote */}
              <div className="mt-6 p-4 rounded-2xl bg-blue-900/30 border border-blue-500/20 relative">
                <Quote className="w-6 h-6 text-blue-400/30 absolute top-2 right-2 pointer-events-none" />
                <p className="text-xs sm:text-sm italic text-blue-100 font-sans leading-relaxed">
                  "{leader.quote}"
                </p>
                <span className="block text-[11px] font-mono text-blue-300 font-semibold mt-2">
                  — {leader.name}, {leader.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Navigation Footer */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-blue-900/60 bg-[#041d57]/80 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate((currentIndex - 1 + totalCount) % totalCount)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-blue-200 text-xs font-semibold transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Official</span>
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onNavigate(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentIndex ? "bg-blue-400 w-6" : "bg-blue-950 hover:bg-blue-800"
                }`}
                aria-label={`Jump to leader ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => onNavigate((currentIndex + 1) % totalCount)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            <span>Next Official</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function HeroTypewriter({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, index + 1));
        setIndex((prev) => prev + 1);
      }, 24);
      return () => clearTimeout(timer);
    }
  }, [index, text]);

  return (
    <span className="inline-flex items-center">
      <span>{displayedText}</span>
      {index < text.length && (
        <span className="inline-block w-2 h-4 ml-1 bg-sky-400 animate-pulse align-middle" />
      )}
    </span>
  );
}

export default function About() {
  const [modalLeaderIndex, setModalLeaderIndex] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 80%"],
  });
  const smoothTimelineProgress = useSpring(timelineProgress, { stiffness: 100, damping: 30 });
  const timelineHeight = useTransform(smoothTimelineProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600/15 selection:text-blue-600 font-sans overflow-x-hidden">
      <Navigation />

      {/* 1. Cinematic Hero Section with Ambient Glows */}
      <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 bg-gradient-to-br from-[#031c54] via-[#08368c] to-[#0e4cb8] text-white overflow-hidden">
        {/* Ambient Glow Spheres */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-400/25 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-sky-400/20 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />
        <div className="absolute inset-0 tech-grid-pattern-dark opacity-25 pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full liquid-glass-pill text-blue-200 text-xs sm:text-sm font-semibold mb-8 shadow-lg shadow-blue-500/15">
              <img src={logoImg} alt="VY NextGen Logo" className="h-5 w-auto rounded object-contain" />
              <span className="font-mono tracking-wide">// VY NEXTGEN TECHNOLOGIES • EST. 2025</span>
            </div>

            {/* Main Animated Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6 text-white">
              <span className="text-white">Pioneering</span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-sky-200 to-white">
                Digital Evolution
              </span>{" "}
              <br className="hidden sm:inline" />
              <span className="text-white">from Karur to the World</span>
            </h1>

            {/* Subheading - STRICTLY ONE LINE INTRODUCTION WITH TYPING ANIMATION */}
            <div className="mb-10 text-center flex justify-center overflow-hidden">
              <p className="text-sm sm:text-base md:text-lg text-blue-100 font-semibold px-4 max-w-3xl leading-normal sm:whitespace-nowrap">
                <HeroTypewriter text="Engineering next-generation web apps, GST billing platforms, and cloud software." />
              </p>
            </div>

            {/* Live Metrics Showcase */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-blue-400/20">
              {[
                { val: "50+", label: "Projects Delivered" },
                { val: "99.9%", label: "Uptime Architecture" },
                { val: "100+", label: "Interns Mentored" },
                { val: "6 Mos", label: "Free SLA Warranty" },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg shadow-blue-950/30"
                >
                  <p className="text-2xl sm:text-3xl font-black text-white font-mono">{m.val}</p>
                  <p className="text-xs text-blue-200 font-semibold mt-1 uppercase tracking-wider">{m.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Animated Mouse Scroll Indicator */}
            <div className="mt-12 flex justify-center">
              <MouseScrollIndicator targetId="leadership" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Infinite Marquee Ticker Banner */}
      <div className="stats-banner py-4 bg-white border-y border-blue-100 overflow-hidden relative shadow-sm">
        <div className="animate-marquee items-center gap-8 text-xs sm:text-sm font-mono tracking-wider uppercase text-blue-700 font-semibold">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="inline-flex items-center gap-8">
              <span>{item}</span>
              <span className="text-blue-500">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Mission & Vision Section */}
      <section className="py-24 bg-white relative overflow-hidden border-b border-slate-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">// ARCHITECTURAL PURPOSE</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">Our Mission & Strategic Vision</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-slate-200 hover:border-blue-500 rounded-3xl p-8 sm:p-10 shadow-lg hover:shadow-2xl hover:shadow-blue-500/15 relative overflow-hidden group transition-all duration-300"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all" />
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-6 shadow-sm">
                <Target className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono uppercase text-blue-600 font-bold block mb-1">Purpose & Execution</span>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                To democratize enterprise-grade software and automated digital tools for retail shops, startups, and expanding businesses, enabling frictionless operations, tax compliance, and accelerated digital scalability.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-slate-200 hover:border-blue-500 rounded-3xl p-8 sm:p-10 shadow-lg hover:shadow-2xl hover:shadow-blue-500/15 relative overflow-hidden group transition-all duration-300"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all" />
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-6 shadow-sm">
                <Compass className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono uppercase text-blue-600 font-bold block mb-1">Horizon & Impact</span>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                To be recognized as South India's premier digital technology partner, revered for rock-solid software engineering, customer-first service, and an uncompromising dedication to nurturing future engineering talent.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Core Values Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">// ENGINEERING FOUNDATIONS</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">The Values That Guide Us</h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Standardizing trust, technical rigor, and full client transparency in every software build.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <SpotlightCard
                  spotlightColor="rgba(37, 99, 235, 0.12)"
                  className="h-full bg-white p-7 rounded-2xl border border-slate-200 hover:border-blue-400 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 text-blue-600 shadow-sm">
                      {v.icon}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{v.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{v.desc}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Executive Director Board */}
      <section id="leadership" className="py-28 bg-gradient-to-b from-[#021338] via-[#041d57] to-[#021338] text-white relative overflow-hidden border-t border-blue-900/60">
        {/* Ambient Halo Spheres */}
        <div className="absolute top-1/4 -left-40 w-[550px] h-[550px] bg-blue-500/20 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-10 -right-40 w-[550px] h-[550px] bg-sky-500/20 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
        <div className="absolute inset-0 tech-grid-pattern-dark opacity-25 pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-6xl">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-300 animate-pulse" />
              <span>// COMPANY OFFICIALS • EXECUTIVE LEADERSHIP</span>
            </motion.div>

            <h2 className="text-3xl sm:text-5xl font-black text-white mt-2 tracking-tight">
              The <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-sky-300 to-white">Leadership.</span>
            </h2>
            <p className="text-blue-100 text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
              Meet the exceptional minds driving VY NextGen Technologies' vision, core system architectures, and operational excellence.
            </p>
          </div>

          {/* Zyvex-Inspired Executive Members Showcase with Full-Width Alternating Cards, Lightning Borders, and Timelines */}
          <div className="flex flex-col">
            {leaders.map((leader, idx) => (
              <ZyvexLeaderFullShowcase
                key={leader.name}
                leader={leader}
                index={idx}
                soundEnabled={soundEnabled}
                onToggleSound={() => setSoundEnabled((prev) => !prev)}
                onOpenModal={() => setModalLeaderIndex(idx)}
              />
            ))}
          </div>


        </div>
      </section>

      {/* 6. Company Evolution Timeline */}
      <section id="timeline" ref={timelineRef} className="py-28 bg-slate-50 relative overflow-hidden border-t border-slate-200">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">// EVOLUTION</span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-2">
              Company <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600">History.</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              From our founding roots in Karur to delivering high-scale software systems and empowering next-gen engineers.
            </p>
          </div>

          <div className="relative">
            {/* Center Vertical Inactive Track */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />

            {/* Center Vertical Animated Scroll-Driven Beam */}
            <motion.div 
              style={{ height: timelineHeight }}
              className="absolute left-4 sm:left-1/2 top-0 w-0.5 bg-gradient-to-b from-blue-400 via-blue-600 to-indigo-600 -translate-x-1/2 shadow-[0_0_14px_#2563eb] origin-top z-10" 
            />

            <div className="space-y-12">
              {milestones.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30, y: 15 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex items-center ${
                    idx % 2 === 0 ? "sm:flex-row-reverse" : "sm:flex-row"
                  } flex-row`}
                >
                  {/* Timeline Dot Node with Pulsing Ring */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div 
                      whileInView={{ scale: [0.8, 1.3, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="w-5 h-5 rounded-full border-2 border-white shadow-lg"
                      style={{ backgroundColor: m.color, boxShadow: `0 0 16px ${m.color}` }}
                    />
                  </div>

                  {/* Content Card with Spotlight */}
                  <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8">
                    <SpotlightCard
                      spotlightColor="rgba(37, 99, 235, 0.12)"
                      className="bg-white border border-slate-200 hover:border-blue-400 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase text-white shadow"
                          style={{ backgroundColor: m.color }}
                        >
                          {m.year}
                        </span>
                        <span className="text-xs font-mono text-blue-600 font-semibold uppercase tracking-wider">
                          // {m.tag}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {m.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {m.desc}
                      </p>
                    </SpotlightCard>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7. Interactive Call-To-Action Strip */}
      <section className="py-20 bg-gradient-to-r from-[#02102e] via-[#041d57] to-[#0a2f7c] text-white relative overflow-hidden border-t border-blue-900/40">
        <div className="absolute inset-0 tech-grid-pattern-dark opacity-25 pointer-events-none" />
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-6 relative z-10">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-300 uppercase">
            // ACCELERATE YOUR GROWTH
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Build Something Remarkable Together?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Whether you need a custom web application, point-of-sale GST software, or want to join our developer internship, we're ready to deploy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 max-w-md sm:max-w-none mx-auto">
            <Link href="/web-development">
              <Button size="lg" className="w-full sm:w-auto rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 shadow-xl shadow-blue-500/30 h-12">
                Start a Project <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <a href="tel:+918754020556">
              <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full border-blue-400/30 bg-white/10 text-white hover:bg-white/20 font-bold px-8 h-12">
                <Phone className="mr-2 w-4 h-4 text-blue-300" /> Call: 8754020556
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Executive Dossier Full Pop-Up Modal */}
      <AnimatePresence>
        {modalLeaderIndex !== null && (
          <ExecutiveDossierModal
            leader={leaders[modalLeaderIndex]}
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled((prev) => !prev)}
            onClose={() => setModalLeaderIndex(null)}
            onNavigate={(newIdx) => setModalLeaderIndex(newIdx)}
            currentIndex={modalLeaderIndex}
            totalCount={leaders.length}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
