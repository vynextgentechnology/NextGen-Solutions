import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * Top horizontal scroll progress bar
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none bg-slate-900/40 backdrop-blur-sm">
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
        style={{
          scaleX,
          transformOrigin: "0%",
        }}
      />
    </div>
  );
}

/**
 * Modern floating Back-to-Top button with circular scroll progress ring
 */
export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min(100, Math.max(0, Math.round((current / total) * 100))) : 0;
      setProgress(pct);
      setVisible(current > 280);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      type="button"
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={
        visible
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.6, y: 20 }
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
      aria-label="Scroll back to top"
      className="fixed bottom-24 right-6 z-40 p-2.5 rounded-full bg-slate-950/85 border border-cyan-500/40 text-cyan-300 shadow-[0_4px_20px_rgba(6,182,212,0.25)] backdrop-blur-xl hover:border-cyan-400 hover:text-white hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-300 group cursor-pointer"
    >
      {/* SVG Circular Progress Ring */}
      <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
        <path
          className="text-slate-800"
          strokeWidth="3"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="text-cyan-400 transition-all duration-150"
          strokeDasharray={`${progress}, 100`}
          strokeWidth="3"
          strokeLinecap="round"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>

      {/* Center Arrow Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 text-cyan-300 group-hover:text-white" />
      </div>
    </motion.button>
  );
}

/**
 * Animated Mouse Scroll Cue for Hero Sections
 */
export function MouseScrollIndicator({ targetId = "leadership" }: { targetId?: string }) {
  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      aria-label="Scroll down"
      className="inline-flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer group"
    >
      <span className="text-[11px] font-mono tracking-widest uppercase group-hover:text-cyan-300 transition-colors">
        Scroll To Explore
      </span>
      <div className="w-5 h-9 rounded-full border-2 border-slate-700 group-hover:border-cyan-400 flex items-start justify-center p-1 transition-colors">
        <motion.div
          animate={{
            y: [0, 12, 0],
            opacity: [1, 0.2, 1],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]"
        />
      </div>
    </motion.button>
  );
}
