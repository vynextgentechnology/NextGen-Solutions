import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export function FloatingWhatsApp() {
  const phoneNumber = "918754020556";
  const defaultMessage = encodeURIComponent(
    "Hello VY NextGen Technology, I am interested in your software & IT services and would like to get more information."
  );

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center group"
    >
      {/* Tooltip on hover (desktop/laptop) */}
      <div className="mr-3 hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-medium shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        Chat on WhatsApp
      </div>

      <a
        href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-emerald-400 border-2 border-white"></span>
        </span>
        <FaWhatsapp className="w-6 h-6 sm:w-8 sm:h-8" />
      </a>
    </motion.div>

  );
}
