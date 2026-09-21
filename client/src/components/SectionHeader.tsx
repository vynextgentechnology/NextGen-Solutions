import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  dark?: boolean;
}

export function SectionHeader({
  badge,
  badgeIcon,
  title,
  titleHighlight,
  subtitle,
  align = "center",
  className = "",
  dark = false,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`max-w-3xl mb-12 sm:mb-14 ${
        isCenter ? "mx-auto text-center" : "text-left"
      } ${className}`}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3.5 ${
            dark
              ? "bg-slate-900 border border-slate-700 text-blue-400"
              : "bg-blue-50 border border-blue-100 text-blue-600"
          } ${isCenter ? "justify-center" : ""}`}
        >
          {badgeIcon}
          <span>{badge}</span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className={`text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}{" "}
        {titleHighlight && (
          <span className="text-blue-600">
            {titleHighlight}
          </span>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`mt-3.5 text-sm sm:text-base leading-relaxed ${
            dark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
