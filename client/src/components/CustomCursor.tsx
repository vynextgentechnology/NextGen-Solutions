import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for trailing outer ring
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Ambient spotlight trailing spring (slower, softer)
  const spotlightConfig = { damping: 40, stiffness: 120, mass: 0.8 };
  const spotlightX = useSpring(mouseX, spotlightConfig);
  const spotlightY = useSpring(mouseY, spotlightConfig);

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse / trackpad)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Detect hover over interactive elements
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, input, select, textarea, [role='button'], [tabindex='0'], .interactive-hover"
      );
      setIsHovered(!!interactive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* 1. Global Ambient Spotlight Glow that trails the mouse */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500"
        style={{
          opacity: isVisible ? 1 : 0,
          background: `radial-gradient(650px circle at ${spotlightX}px ${spotlightY}px, rgba(6, 182, 212, 0.06), rgba(37, 99, 235, 0.03) 40%, transparent 80%)`,
        }}
      />

      {/* 2. Fluid Trailing Outer Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-cyan-400/50 mix-blend-screen"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 48 : isClicked ? 24 : 32,
          height: isHovered ? 48 : isClicked ? 24 : 32,
          backgroundColor: isHovered
            ? "rgba(6, 182, 212, 0.15)"
            : isClicked
            ? "rgba(37, 99, 235, 0.25)"
            : "rgba(6, 182, 212, 0.04)",
          borderColor: isHovered
            ? "rgba(34, 211, 238, 0.9)"
            : isClicked
            ? "rgba(96, 165, 250, 0.9)"
            : "rgba(6, 182, 212, 0.4)",
          boxShadow: isHovered
            ? "0 0 20px rgba(6, 182, 212, 0.5), inset 0 0 10px rgba(6, 182, 212, 0.3)"
            : "0 0 10px rgba(6, 182, 212, 0.2)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
        }}
      />

      {/* 3. Center Glowing Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 8 : isClicked ? 4 : 6,
          height: isHovered ? 8 : isClicked ? 4 : 6,
          opacity: isVisible ? 1 : 0,
          scale: isClicked ? 0.7 : isHovered ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 35,
        }}
      />
    </>
  );
}
