import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Code2, 
  Receipt, 
  Layers, 
  GraduationCap, 
  ArrowRight,
  Briefcase
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@assets/vy_nextgen_logo.webp";
import { useIsPastHero } from "@/hooks/use-hero-passed";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [location] = useLocation();
  const isPastHero = useIsPastHero();

  const isHome = location === "/";
  const showNav = !isHome || isPastHero;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  const serviceItems = [
    {
      title: "Web & Mobile Development",
      desc: "Custom full-stack web applications, portals & mobile apps",
      href: "/web-development",
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
      tag: "Popular"
    },
    {
      title: "Billing & GST Software",
      desc: "Smart invoicing, POS, barcode & inventory management",
      href: "/billing-software",
      icon: <Receipt className="w-5 h-5 text-amber-400" />,
      tag: "Featured"
    },
    {
      title: "UI/UX & Product Design",
      desc: "Figma wireframing, clickable prototypes & brand systems",
      href: "/web-development",
      icon: <Layers className="w-5 h-5 text-emerald-400" />,
      tag: "Creative"
    },
  ];

  return (
    <AnimatePresence>
      {showNav && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isHome
              ? isScrolled
                ? "bg-slate-950/90 backdrop-blur-xl shadow-2xl border-b border-cyan-500/30 py-3.5"
                : "bg-slate-950/60 backdrop-blur-md py-4 border-b border-cyan-500/10"
              : isScrolled
                ? "bg-white/90 backdrop-blur-xl shadow-md border-b border-slate-100 py-3.5"
                : "bg-white/70 backdrop-blur-md py-5"
          }`}
        >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className={`h-10 sm:h-11 px-2 py-1 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shrink-0 ${
            isHome
              ? "bg-slate-900 border border-cyan-500/40 shadow-lg shadow-cyan-950/50"
              : "bg-[#041d57] border border-blue-900/30 shadow-md shadow-blue-950/20"
          }`}>
            <img
              src={logoImg}
              alt="VY NextGen Technologies Logo"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="flex flex-col whitespace-nowrap select-none">
            <span className={`text-lg sm:text-xl font-black tracking-tight leading-none whitespace-nowrap ${
              isHome ? "text-white" : "text-slate-900"
            }`}>
              VY NEXTGEN
            </span>
            <span className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase mt-1 whitespace-nowrap ${
              isHome ? "text-cyan-400 font-mono" : "text-blue-600"
            }`}>
              TECHNOLOGIES
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-7">
          <Link
            href="/"
            className={`text-sm font-semibold transition-colors ${
              isHome
                ? "text-cyan-400 font-bold font-mono"
                : location === "/" ? "text-blue-600 font-bold" : "text-slate-600 hover:text-blue-600"
            }`}
          >
            Home
          </Link>

          <Link
            href="/about"
            className={`text-sm font-semibold transition-colors ${
              isHome
                ? "text-slate-300 hover:text-cyan-300"
                : location === "/about" ? "text-blue-600 font-bold" : "text-slate-600 hover:text-blue-600"
            }`}
          >
            About Us
          </Link>

          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              className={`flex items-center gap-1.5 text-sm font-semibold transition-colors py-2 cursor-pointer ${
                isHome
                  ? "text-slate-300 hover:text-cyan-300"
                  : location.startsWith("/web-development") || location.startsWith("/billing-software")
                    ? "text-blue-600 font-bold"
                    : "text-slate-600 hover:text-blue-600"
              }`}
            >
              <span>Services & Solutions</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute top-full left-0 w-80 rounded-2xl shadow-2xl p-3 mt-1 ${
                    isHome 
                      ? "bg-[#090d16] border border-cyan-500/40 text-white shadow-[0_0_35px_rgba(6,182,212,0.25)]" 
                      : "bg-white border border-slate-100 text-slate-900"
                  }`}
                >
                  <div className="space-y-1">
                    {serviceItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className={`flex items-start gap-3 p-3 rounded-xl transition-colors group ${
                          isHome ? "hover:bg-slate-900" : "hover:bg-slate-50"
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          isHome ? "bg-slate-900 border border-slate-800" : "bg-slate-100"
                        }`}>
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className={`text-sm font-bold transition-colors ${
                              isHome ? "text-slate-200 group-hover:text-cyan-400" : "text-slate-800 group-hover:text-blue-600"
                            }`}>
                              {item.title}
                            </p>
                            <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                              isHome ? "bg-cyan-950 text-cyan-300 border border-cyan-500/30" : "bg-blue-100 text-blue-700"
                            }`}>
                              {item.tag}
                            </span>
                          </div>
                          <p className={`text-xs mt-0.5 line-clamp-2 ${isHome ? "text-slate-400" : "text-slate-500"}`}>
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/internship"
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
              isHome
                ? "text-slate-300 hover:text-emerald-400"
                : location === "/internship" ? "text-blue-600 font-bold" : "text-slate-600 hover:text-blue-600"
            }`}
          >
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>Tech Internship</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </Link>

          <Link
            href="/careers"
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
              isHome
                ? "text-slate-300 hover:text-cyan-300"
                : location === "/careers" ? "text-blue-600 font-bold" : "text-slate-600 hover:text-blue-600"
            }`}
          >
            <Briefcase className="w-4 h-4 text-cyan-400" />
            <span>Careers</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
              isHome ? "bg-cyan-950 text-cyan-300 border border-cyan-500/30" : "bg-blue-100 text-blue-700"
            }`}>
              Hiring
            </span>
          </Link>

          <Link
            href="/enquiry"
            className={`text-sm font-semibold transition-colors ${
              isHome ? "text-slate-300 hover:text-cyan-300" : "text-slate-600 hover:text-blue-600"
            }`}
          >
            Contact
          </Link>

        </nav>

        {/* Right Action CTAs */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          <Link href="/enquiry">
            <button className={`rounded-xl px-4 xl:px-5 h-9 xl:h-10 text-xs xl:text-sm font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isHome
                ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/25"
            }`}>
              <span>[ ENQUIRE NOW ]</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className={`lg:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl transition-colors active:scale-95 cursor-pointer ${
            isHome ? "text-slate-200 hover:bg-slate-900" : "text-slate-700 hover:bg-slate-100"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className={`lg:hidden overflow-hidden shadow-2xl ${
              isHome 
                ? "bg-slate-950/95 backdrop-blur-2xl border-b border-cyan-500/30 text-white" 
                : "bg-white/95 backdrop-blur-xl border-b border-slate-200 text-slate-900"
            }`}
          >
            <div className="container mx-auto px-6 py-6 space-y-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-base font-bold py-1 ${isHome ? "text-cyan-400 font-mono" : "text-slate-800 hover:text-blue-600"}`}
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-base font-bold py-1 ${isHome ? "text-slate-200 hover:text-cyan-400" : "text-slate-800 hover:text-blue-600"}`}
              >
                About Us & Leadership
              </Link>
              
              <div className="pt-2 pb-1">
                <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${isHome ? "text-cyan-400/70 font-mono" : "text-slate-400"}`}>
                  Solutions & Services
                </p>
                <div className={`space-y-2 pl-2 border-l-2 ${isHome ? "border-cyan-500/40" : "border-blue-500/30"}`}>
                  <Link
                    href="/web-development"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2 text-sm font-semibold py-1.5 ${isHome ? "text-slate-300 hover:text-cyan-300" : "text-slate-700 hover:text-blue-600"}`}
                  >
                    <Code2 className="w-4 h-4 text-cyan-400" />
                    <span>Web & App Development</span>
                  </Link>
                  <Link
                    href="/billing-software"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2 text-sm font-semibold py-1.5 ${isHome ? "text-slate-300 hover:text-amber-300" : "text-slate-700 hover:text-blue-600"}`}
                  >
                    <Receipt className="w-4 h-4 text-amber-400" />
                    <span>Billing & GST Software</span>
                  </Link>
                  <Link
                    href="/web-development"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2 text-sm font-semibold py-1.5 ${isHome ? "text-slate-300 hover:text-emerald-300" : "text-slate-700 hover:text-blue-600"}`}
                  >
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <span>UI/UX & Product Design</span>
                  </Link>
                </div>
              </div>

              <Link
                href="/internship"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between text-base font-bold py-1 ${isHome ? "text-slate-200 hover:text-emerald-400" : "text-slate-800 hover:text-blue-600"}`}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-emerald-400" />
                  <span>Tech Internship Program</span>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isHome ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40" : "bg-emerald-100 text-emerald-700"}`}>
                  Enroll Now
                </span>
              </Link>

              <Link
                href="/careers"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between text-base font-bold py-1 ${isHome ? "text-slate-200 hover:text-cyan-400" : "text-slate-800 hover:text-blue-600"}`}
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-cyan-400" />
                  <span>Careers & Job Openings</span>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isHome ? "bg-cyan-950 text-cyan-300 border border-cyan-500/40" : "bg-blue-100 text-blue-700"}`}>
                  We're Hiring
                </span>
              </Link>

              <Link
                href="/enquiry"
                className={`block text-base font-bold py-1 ${isHome ? "text-slate-200 hover:text-cyan-400" : "text-slate-800 hover:text-blue-600"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>

              <div className={`pt-4 border-t ${isHome ? "border-slate-800" : "border-slate-100"} flex flex-col gap-3`}>
                <Link href="/enquiry" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className={`w-full rounded-xl h-11 font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    isHome 
                      ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                  }`}>
                    [ SUBMIT PROJECT ENQUIRY ]
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
