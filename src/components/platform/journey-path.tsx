"use client";
import { motion } from "framer-motion";
import { Video, Facebook, MessageCircle } from "lucide-react";

const stops = [
  { label: "تيك توك", sub: "الاكتشاف", Icon: Video, color: "text-gold" },
  { label: "فيسبوك", sub: "بناء الثقة", Icon: Facebook, color: "text-teal-light" },
  { label: "واتساب", sub: "الشراء", Icon: MessageCircle, color: "text-rust-light" },
];

export function JourneyPath({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-between gap-2 ${className}`} dir="rtl">
      <svg
        className="absolute top-6 right-0 hidden h-6 w-full sm:block"
        viewBox="0 0 400 24"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d="M390 12 C 300 12, 260 12, 200 12 C 140 12, 100 12, 10 12"
          className="journey-path-line"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      </svg>
      {stops.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className="relative z-10 flex flex-1 flex-col items-center gap-2 text-center"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-bg-card shadow-glow">
            <s.Icon className={`h-5 w-5 ${s.color}`} />
          </div>
          <div>
            <p className="font-display text-sm font-bold text-ink">{s.label}</p>
            <p className="text-xs text-ink-muted">{s.sub}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
