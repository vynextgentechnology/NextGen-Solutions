import { Link } from "wouter";
import { FaWhatsapp, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import logoImg from "@assets/vy_nextgen_logo.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Projects", href: "/#projects" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center p-1.5 shrink-0">
              <img
                src={logoImg}
                alt="VY NextGen Technologies"
                className="h-full w-auto object-contain brightness-0 invert"
              />
            </div>
            <div>
              <span className="text-base font-bold text-white block">
                VY NextGen Technologies
              </span>
              <span className="text-xs text-slate-400 block">
                Software solutions built for real-world needs.
              </span>
            </div>
          </div>

          {/* Clean Links */}
          <nav className="flex flex-wrap items-center justify-center gap-5 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/918754020556"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:bg-slate-700 transition-colors"
            >
              <FaWhatsapp size={15} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:bg-slate-700 transition-colors"
            >
              <FaLinkedin size={15} />
            </a>
            <a
              href="https://www.instagram.com/vynextgentechnology?igsi=dnEycjhyMGIxcnU4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:text-pink-400 hover:bg-slate-700 transition-colors"
            >
              <FaInstagram size={15} />
            </a>
            <a
              href="https://www.facebook.com/people/Vynextgentechnology/61593831857829/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:text-blue-500 hover:bg-slate-700 transition-colors"
            >
              <FaFacebook size={15} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 text-center text-xs text-slate-400">
          © {currentYear} VY NextGen Technologies. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
