// src/components/LoadingSpinner.tsx
"use client";

import { motion } from "framer-motion";

export type SpinnerVariant =
  | "ring"
  | "dual-ring"
  | "dots"
  | "bars"
  | "pulse-grid";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

export type SpinnerTone =
  | "amber"
  | "cyan"
  | "emerald"
  | "white"
  | "slate";

export interface LoadingSpinnerProps {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  tone?: SpinnerTone;
  label?: string;
  className?: string;
  fullscreen?: boolean;
}

const SIZE_PX: Record<SpinnerSize, number> = {
  xs: 16,
  sm: 24,
  md: 36,
  lg: 52,
  xl: 72,
};

const TONE_HEX: Record<SpinnerTone, { a: string; b: string }> = {
  amber: { a: "#fbbf24", b: "#fb923c" },
  cyan: { a: "#22d3ee", b: "#3b82f6" },
  emerald: { a: "#34d399", b: "#14b8a6" },
  white: { a: "#ffffff", b: "#cbd5e1" },
  slate: { a: "#94a3b8", b: "#475569" },
};

interface VariantProps {
  size: SpinnerSize;
  tone: SpinnerTone;
}

function RingSpinner({ size, tone }: VariantProps) {
  const px = SIZE_PX[size];
  const { a, b } = TONE_HEX[tone];
  const uid = `ring-${tone}-${size}`;
  return (
    <div
      className="relative animate-spin"
      style={{ width: px, height: px, animationDuration: "0.9s" }}
    >
      <svg viewBox="0 0 50 50" className="block h-full w-full">
        <defs>
          <linearGradient id={uid} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={a} />
            <stop offset="100%" stopColor={b} />
          </linearGradient>
        </defs>
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={a}
          strokeOpacity={0.15}
          strokeWidth={4}
        />
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={`url(#${uid})`}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray="94 32"
          transform="rotate(-90 25 25)"
        />
      </svg>
    </div>
  );
}

function DualRingSpinner({ size, tone }: VariantProps) {
  const px = SIZE_PX[size];
  const { a, b } = TONE_HEX[tone];
  const uidOuter = `dr-out-${tone}-${size}`;
  const uidInner = `dr-in-${tone}-${size}`;
  return (
    <div className="relative" style={{ width: px, height: px }}>
      <div
        className="absolute inset-0 animate-spin"
        style={{ animationDuration: "1s" }}
      >
        <svg viewBox="0 0 50 50" className="block h-full w-full">
          <defs>
            <linearGradient
              id={uidOuter}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={a} />
              <stop offset="100%" stopColor={b} />
            </linearGradient>
          </defs>
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke={`url(#${uidOuter})`}
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray="60 65"
            transform="rotate(-90 25 25)"
          />
        </svg>
      </div>
      <div
        className="absolute inset-0 animate-spin"
        style={{
          animationDuration: "1.4s",
          animationDirection: "reverse",
        }}
      >
        <svg viewBox="0 0 50 50" className="block h-full w-full">
          <defs>
            <linearGradient
              id={uidInner}
              x1="100%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor={b} />
              <stop offset="100%" stopColor={a} />
            </linearGradient>
          </defs>
          <circle
            cx="25"
            cy="25"
            r="13"
            fill="none"
            stroke={`url(#${uidInner})`}
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray="40 42"
            transform="rotate(90 25 25)"
          />
        </svg>
      </div>
    </div>
  );
}

function DotsSpinner({ size, tone }: VariantProps) {
  const px = SIZE_PX[size];
  const dotSize = Math.max(6, Math.round(px / 5));
  const { a } = TONE_HEX[tone];
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: px, gap: dotSize * 0.5 }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="rounded-full"
          style={{
            width: dotSize,
            height: dotSize,
            backgroundColor: a,
            boxShadow: `0 0 ${dotSize}px ${a}66`,
          }}
          animate={{
            y: [0, -dotSize * 0.9, 0],
            opacity: [0.35, 1, 0.35],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.12,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function BarsSpinner({ size, tone }: VariantProps) {
  const px = SIZE_PX[size];
  const barWidth = Math.max(3, Math.round(px / 9));
  const gap = Math.max(3, Math.round(px / 12));
  const { a, b } = TONE_HEX[tone];
  return (
    <div
      className="flex items-end justify-center"
      style={{ height: px, gap }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="rounded-full"
          style={{
            width: barWidth,
            background: `linear-gradient(180deg, ${a}, ${b})`,
          }}
          animate={{
            height: [px * 0.28, px, px * 0.28],
          }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function PulseGridSpinner({ size, tone }: VariantProps) {
  const px = SIZE_PX[size];
  const gap = Math.max(2, Math.round(px / 20));
  const { a } = TONE_HEX[tone];
  return (
    <div
      className="grid grid-cols-3"
      style={{ width: px, height: px, gap }}
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <motion.span
          key={i}
          className="rounded-sm"
          style={{ backgroundColor: a }}
          animate={{
            opacity: [0.15, 1, 0.15],
            scale: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            delay: ((i % 3) + Math.floor(i / 3)) * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function renderVariant(
  variant: SpinnerVariant,
  size: SpinnerSize,
  tone: SpinnerTone,
) {
  switch (variant) {
    case "ring":
      return <RingSpinner size={size} tone={tone} />;
    case "dual-ring":
      return <DualRingSpinner size={size} tone={tone} />;
    case "dots":
      return <DotsSpinner size={size} tone={tone} />;
    case "bars":
      return <BarsSpinner size={size} tone={tone} />;
    case "pulse-grid":
      return <PulseGridSpinner size={size} tone={tone} />;
  }
}

export function LoadingSpinner({
  variant = "ring",
  size = "md",
  tone = "amber",
  label = "Memuat...",
  className = "",
  fullscreen = false,
}: LoadingSpinnerProps) {
  const spinner = renderVariant(variant, size, tone);

  if (fullscreen) {
    return (
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-[#08090c]/85 backdrop-blur-md ${className}`}
        role="status"
        aria-live="polite"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-5"
        >
          <div className="relative flex items-center justify-center">
            <span
              className="absolute rounded-full bg-amber-400/20 blur-2xl"
              style={{ width: 96, height: 96 }}
            />
            <span className="relative">{spinner}</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">
              THIS IS CANGBOY
            </p>
            <p className="font-mono text-[11px] text-slate-500">{label}</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      role="status"
      aria-live="polite"
    >
      {spinner}
      <span className="sr-only">{label}</span>
    </span>
  );
}

export default LoadingSpinner;