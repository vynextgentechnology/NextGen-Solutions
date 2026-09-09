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
  Phone,
  ArrowRight,
  Sparkles,
  Briefcase
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@assets/vy_nextgen_logo.png";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
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
      icon: <Code2 className="w-5 h-5 text-blue-500" />,
      tag: "Popular"
    },
    {
      title: "Billing & GST Software",
      desc: "Smart invoicing, POS, barcode & inventory management",
      href: "/billing-software",
      icon: <Receipt className="w-5 h-5 text-indigo-500" />,
      tag: "Featured"
    },
    {
      title: "UI/UX & Product Design",
      desc: "Figma wireframing, clickable prototypes & brand systems",
      href: "/web-development",
      icon: <Layers className="w-5 h-5 text-cyan-500" />,
      tag: "Creative"
    },
  ];


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-md border-b border-slate-100 py-3.5"
          : "bg-white/70 backdrop-blur-md py-5"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 sm:h-11 px-2 py-1 rounded-xl bg-[#041d57] border border-blue-900/30 shadow-md shadow-blue-950/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <img
              src={logoImg}
              alt="VY NextGen Technologies Logo"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
              VY NextGen
            </span>
            <span className="text-[11px] font-bold text-blue-600 tracking-wider uppercase mt-0.5">
              Technologies
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-7">
          <Link
            href="/"
            className={`text-sm font-semibold transition-colors hover:text-blue-600 ${
              location === "/" ? "text-blue-600 font-bold" : "text-slate-600"
            }`}
          >
            Home
          </Link>

          <Link
            href="/about"
            className={`text-sm font-semibold transition-colors hover:text-blue-600 ${
              location === "/about" ? "text-blue-600 font-bold" : "text-slate-600"
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
              className={`flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-blue-600 py-2 ${
                location.startsWith("/web-development") || 
                location.startsWith("/billing-software")
                  ? "text-blue-600 font-bold"
                  : "text-slate-600"
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
                  className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 mt-1"
                >
                  <div className="space-y-1">
                    {serviceItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-50 group-hover:scale-105 transition-all">
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                              {item.title}
                            </p>
                            <span className="text-[10px] font-semibold bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded-full">
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
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
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-blue-600 ${
              location === "/internship" ? "text-blue-600 font-bold" : "text-slate-600"
            }`}
          >
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>Tech Internship</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </Link>

          <Link
            href="/careers"
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-blue-600 ${
              location === "/careers" ? "text-blue-600 font-bold" : "text-slate-600"
            }`}
          >
            <Briefcase className="w-4 h-4 text-blue-600" />
            <span>Careers</span>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
              Hiring
            </span>
          </Link>

          <a
            href="/#contact"
            className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            Contact
          </a>

        </nav>

        {/* Right Action CTAs */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          <a
            href="tel:+918754020556"
            className="hidden xl:flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100"
          >
            <Phone className="w-4 h-4 text-blue-600" />
            <span>+91 87540 20556</span>
          </a>

          <Link href="/enquiry">
            <Button className="rounded-full px-4 xl:px-5 h-9 xl:h-10 text-xs xl:text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:-translate-y-0.5">
              <span>Enquire Now</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 transition-colors active:scale-95"
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
            className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 overflow-hidden shadow-2xl"
          >
            <div className="container mx-auto px-6 py-6 space-y-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-bold text-slate-800 hover:text-blue-600 py-1"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-bold text-slate-800 hover:text-blue-600 py-1"
              >
                About Us & Leadership
              </Link>
              
              <div className="pt-2 pb-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Solutions & Services
                </p>
                <div className="space-y-2 pl-2 border-l-2 border-blue-500/30">
                  <Link
                    href="/web-development"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 py-1.5"
                  >
                    <Code2 className="w-4 h-4 text-blue-500" />
                    <span>Web & App Development</span>
                  </Link>
                  <Link
                    href="/billing-software"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 py-1.5"
                  >
                    <Receipt className="w-4 h-4 text-indigo-500" />
                    <span>Billing & GST Software</span>
                  </Link>
                  <Link
                    href="/web-development"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 py-1.5"
                  >
                    <Layers className="w-4 h-4 text-cyan-500" />
                    <span>UI/UX & Product Design</span>
                  </Link>
                </div>
              </div>

              <Link
                href="/internship"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-bold text-slate-800 hover:text-blue-600 py-1"
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-emerald-600" />
                  <span>Tech Internship Program</span>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                  Enroll Now
                </span>
              </Link>

              <Link
                href="/careers"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-bold text-slate-800 hover:text-blue-600 py-1"
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <span>Careers & Job Openings</span>
                </div>
                <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                  We're Hiring
                </span>
              </Link>

              <a
                href="/#contact"
                className="block text-base font-bold text-slate-800 hover:text-blue-600 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </a>


              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <a
                  href="tel:+918754020556"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 active:bg-slate-100"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Call: +91 87540 20556</span>
                </a>
                <Link href="/enquiry" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full rounded-xl h-11 font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25">
                    Submit Project Enquiry
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

