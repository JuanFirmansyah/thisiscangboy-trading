"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  Activity,
  ArrowRight,
  ArrowUp,
  BarChart3,
  BookOpen,
  Brain,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Image as ImageIcon,
  LineChart,
  MessageCircle,
  Moon,
  Music,
  RefreshCw,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  TrendingUp,
  Trophy,
  Users,
  Video,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ============ KONFIGURASI ============
const SITE = {
  name: "THIS IS CANGBOY",
  handle: "@thisiscangboy",
  tagline: "Trading Ecosystem • Community • Lifestyle",
  bio: "Semua link penting, panduan, dan komunitas trading saya di satu tempat.",
  whatsappNumber: "6281241768395",
  // Foto profil — taruh file di /public/images/thisisocan.jpeg
  profileImage: "/images/thisisocan.jpeg",
  // Background hero — taruh file di /public/hero-bg.jpg
  heroBackground: "/hero-bg.jpg",
  socials: {
    instagram: "https://instagram.com/thisiscangboy",
    tiktok: "https://tiktok.com/@thisiscangboy",
    youtube: "https://youtube.com/@thisiscangboy",
    telegram: "https://t.me/thisiscangboy",
  },
} as const;

// ============ TIPE ============
interface GuideStep {
  id: string;
  title: string;
  description: string;
  image?: string;
}

interface Platform {
  id: string;
  name: string;
  shortDescription: string;
  referralUrl: string;
  recommended: boolean;
  tags: string[];
  features: string[];
  estimatedRegistrationTime: string;
  steps: GuideStep[];
}

interface StackLink {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent: "blue" | "green" | "indigo" | "cyan" | "amber" | "rose";
  external: boolean;
  badge?: string;
}

interface LearnCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface ProgressState {
  [platformId: string]: {
    completed: string[];
    updatedAt: string;
  };
}

// ============ DATA PLATFORM ============
const PLATFORMS: Platform[] = [
  {
    id: "broker",
    name: "Link Pendaftaran",
    shortDescription:
      "Pendaftaran akun trading resmi dengan proses cepat, verifikasi mudah, dan dukungan deposit lokal.",
    referralUrl: "https://sc.myuserhub.com/welcome?returnUrl=%2Faccounts&pt=225883", // ← ganti dengan link pendaftaran Anda
    recommended: true,
    tags: ["Regulasi Ketat", "MT5", "Ramah Pemula"],
    features: ["Web", "Mobile", "MT5", "Deposit Lokal"],
    estimatedRegistrationTime: "5–10 menit",
    steps: [
      {
        id: "s1",
        title: "Klik link registrasi",
        description:
          "Buka link pendaftaran di bawah. Anda akan diarahkan ke halaman resmi pendaftaran.",
      },
      {
        id: "s2",
        title: "Isi email & password",
        description:
          "Gunakan email aktif. Buat password minimal 8 karakter yang kuat.",
      },
      {
        id: "s3",
        title: "Verifikasi email",
        description:
          "Cek inbox dan klik tautan verifikasi yang dikirim platform.",
      },
      {
        id: "s4",
        title: "Lengkapi data profil",
        description:
          "Isi nama sesuai identitas, tanggal lahir, dan nomor telepon aktif.",
      },
      {
        id: "s5",
        title: "Verifikasi identitas (KYC)",
        description: "Unggah KTP/SIM dan selfie sesuai instruksi platform.",
      },
      {
        id: "s6",
        title: "Akun siap digunakan",
        description:
          "Setelah verifikasi disetujui, akun siap untuk deposit & trading.",
      },
    ],
  },
];

const START_STEPS: { title: string; description: string }[] = [
  { title: "Pilih platform", description: "Lihat rekomendasi di bawah." },
  { title: "Ikuti panduan", description: "Screenshot per langkah tersedia." },
  { title: "Daftar & verifikasi", description: "Ikuti instruksi platform." },
  { title: "Siap trading", description: "Akun aktif, kamu bisa mulai." },
];

const LEARN_CARDS: LearnCard[] = [
  { title: "Dasar Trading", description: "Fundamental trading.", icon: BarChart3 },
  {
    title: "Manajemen Risiko",
    description: "Kenapa risiko penting.",
    icon: ShieldCheck,
  },
  {
    title: "Psikologi Trading",
    description: "Disiplin dan emosi.",
    icon: Brain,
  },
  { title: "Glosarium", description: "Istilah umum trading.", icon: BookOpen },
];

const STORAGE_KEY = "thisisocan_progress_v1";

function waLink(message: string): string {
  const number = SITE.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function readProgress(): ProgressState {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as ProgressState;
    }
    return {};
  } catch {
    return {};
  }
}

function writeProgress(state: ProgressState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // abaikan
  }
}

// ============ KONFETTI ============
interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  rotate: number;
  emoji: string;
}

function Confetti({ active }: { active: boolean }) {
  const pieces: ConfettiPiece[] = useMemo(() => {
    const emojis = ["🎉", "🎊", "✨", "⭐", "💫", "🏆", "🔥", "💎"];
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.4,
      rotate: (Math.random() - 0.5) * 720,
      emoji: emojis[i % emojis.length],
    }));
  }, []);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -40, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{
            y: "110vh",
            rotate: p.rotate,
            opacity: [1, 1, 0.8, 0],
          }}
          transition={{
            duration: 2.5 + Math.random() * 1.5,
            delay: p.delay,
            ease: "easeIn",
          }}
          className="absolute top-0 text-2xl"
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}

// ============ TICKER MINI ============
function MiniTicker() {
  const data = [
    { pair: "XAU/USD", price: "2,385.42", change: "+0.84%", up: true },
    { pair: "EUR/USD", price: "1.0842", change: "+0.12%", up: true },
    { pair: "BTC/USD", price: "64,281", change: "-0.31%", up: false },
    { pair: "GBP/JPY", price: "198.72", change: "+0.45%", up: true },
    { pair: "USD/JPY", price: "156.24", change: "-0.08%", up: false },
  ];
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] overflow-hidden border-b border-white/5 bg-black/25 backdrop-blur-md">
      <div className="flex gap-6 whitespace-nowrap px-4 py-1.5 font-mono text-[10px]">
        {[...data, ...data].map((d, i) => (
          <div
            key={`${d.pair}-${i}`}
            className="flex items-center gap-1.5 opacity-90"
          >
            <span className="text-white/60">{d.pair}</span>
            <span className="text-white/90">{d.price}</span>
            <span className={d.up ? "text-emerald-400" : "text-rose-400"}>
              {d.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ KOMPONEN UTAMA ============
export default function HomePage() {
  const [dark, setDark] = useState<boolean>(true);
  const [progress, setProgress] = useState<ProgressState>({});
  const [toast, setToast] = useState<string | null>(null);
  const [celebrate, setCelebrate] = useState<boolean>(false);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [scrollPct, setScrollPct] = useState<number>(0);
  const [showTop, setShowTop] = useState<boolean>(false);

  const platform: Platform = PLATFORMS[0];

  useEffect(() => {
    const saved = window.localStorage.getItem("thisisocan_theme");
    const isDark = saved ? saved === "dark" : true;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("thisisocan_theme", dark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    setProgress(readProgress());
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      setScrollPct(Math.min(100, Math.max(0, scrolled * 100)));
      setShowTop(h.scrollTop > 600);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const completed: string[] = progress[platform.id]?.completed ?? [];
  const pct: number = Math.round(
    (completed.length / platform.steps.length) * 100,
  );

  const toggleStep = useCallback(
    (stepId: string): void => {
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        try {
          navigator.vibrate(20);
        } catch {
          // abaikan
        }
      }

      setProgress((prev) => {
        const current = prev[platform.id]?.completed ?? [];
        const has = current.includes(stepId);
        const next = has
          ? current.filter((item) => item !== stepId)
          : [...current, stepId];

        const updated: ProgressState = {
          ...prev,
          [platform.id]: {
            completed: next,
            updatedAt: new Date().toISOString(),
          },
        };

        writeProgress(updated);

        if (!has) {
          const done = next.length;
          const total = platform.steps.length;
          if (done === total) {
            setCelebrate(true);
            window.setTimeout(() => setCelebrate(false), 4500);
          } else {
            setToast(`+1 Langkah (${done}/${total})`);
          }
        }
        return updated;
      });
    },
    [platform.id, platform.steps.length],
  );

  const resetProgress = useCallback((): void => {
    setProgress((prev) => {
      const updated: ProgressState = { ...prev };
      delete updated[platform.id];
      writeProgress(updated);
      return updated;
    });
    setToast("Progress direset");
  }, [platform.id]);

  const stackLinks: StackLink[] = useMemo(
    () => [
      {
        id: "join",
        title: "Link Pendaftaran",
        description: "Buka halaman pendaftaran resmi",
        href: platform.referralUrl,
        icon: TrendingUp,
        accent: "blue",
        external: true,
        badge: "UTAMA",
      },
      {
        id: "wa",
        title: "WhatsApp Saya",
        description: "Tanya langsung kalau bingung",
        href: waLink("Halo Cangboy!"),
        icon: MessageCircle,
        accent: "green",
        external: true,
      },
      {
        id: "community",
        title: "Join Komunitas Telegram",
        description: "Diskusi & update trading harian",
        href: SITE.socials.telegram,
        icon: Send,
        accent: "indigo",
        external: true,
      },
      {
        id: "mt5",
        title: "Download MT5",
        description: "Aplikasi trading MetaTrader 5",
        href: "https://www.metatrader5.com/",
        icon: Smartphone,
        accent: "cyan",
        external: true,
      },
      {
        id: "ig",
        title: "Instagram",
        description: "Konten harian & insight",
        href: SITE.socials.instagram,
        icon: Camera,
        accent: "rose",
        external: true,
      },
      {
        id: "yt",
        title: "YouTube",
        description: "Tutorial video & review",
        href: SITE.socials.youtube,
        icon: Video,
        accent: "amber",
        external: true,
      },
    ],
    [platform.referralUrl],
  );

  const socialItems: { label: string; href: string; icon: LucideIcon }[] = [
    { label: "Instagram", href: SITE.socials.instagram, icon: Camera },
    { label: "TikTok", href: SITE.socials.tiktok, icon: Music },
    { label: "YouTube", href: SITE.socials.youtube, icon: Video },
    { label: "Telegram", href: SITE.socials.telegram, icon: Send },
    { label: "WhatsApp", href: waLink("Halo Cangboy!"), icon: MessageCircle },
  ];

  return (
    <div
      className={`relative min-h-screen transition-colors ${
        dark ? "bg-[#05070d] text-white" : "bg-[#eef2f8] text-slate-900"
      }`}
    >
      {/* ================= BACKGROUND LAYER ================= */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className={`absolute inset-0 ${
            dark
              ? "bg-[radial-gradient(ellipse_at_top,#0a1428_0%,#05070d_60%)]"
              : "bg-[radial-gradient(ellipse_at_top,#ffffff_0%,#eef2f8_60%)]"
          }`}
        />
        <div
          className={`absolute inset-0 opacity-[0.15] ${
            dark ? "mix-blend-overlay" : "mix-blend-multiply"
          }`}
          style={{
            backgroundImage: dark
              ? "linear-gradient(rgba(96,165,250,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.15) 1px, transparent 1px)"
              : "linear-gradient(rgba(30,64,175,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(30,64,175,0.08) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-blue-500/25 blur-[120px] dark:bg-blue-500/30" />
        <div className="absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-indigo-500/20 blur-[120px] dark:bg-indigo-500/25" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px] dark:bg-cyan-500/20" />
      </div>

      {/* Scroll progress bar */}
      <div className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
        <motion.div
          style={{ width: `${scrollPct}%` }}
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 shadow-[0_0_12px_rgba(59,130,246,0.7)]"
        />
      </div>

      {/* Floating theme toggle */}
      <div className="fixed right-4 top-4 z-50">
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={() => setDark((v: boolean) => !v)}
          aria-label="Ganti tema"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white shadow-xl backdrop-blur-xl transition hover:bg-black/60"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={dark ? "sun" : "moon"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      <main className="mx-auto max-w-md pb-32 sm:max-w-lg lg:max-w-xl">
        {/* ================= HERO BANNER ================= */}
        <section className="relative">
          {/* Background image */}
          <div className="relative h-[200px] w-full overflow-hidden sm:h-[240px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${SITE.heroBackground}')` }}
            />
            {/* Fallback gradient kalau gambar belum ada */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1836] via-[#0b1f4a] to-[#05070d]" />
            {/* Overlay dark + vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-[#05070d]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.75)_100%)]" />
            {/* Chart line overlay */}
            <svg
              className="absolute inset-0 h-full w-full opacity-30"
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,220 C40,210 60,180 100,190 C140,200 160,140 200,150 C240,160 260,110 300,120 C340,130 370,90 400,80"
                stroke="url(#lineGrad)"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            {/* Ticker atas */}
            <MiniTicker />
          </div>

          {/* ================= PROFILE BLOCK ================= */}
          <div className="relative -mt-16 px-4">
            {/* --- Avatar floating (di luar card, tidak terpotong) --- */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="relative z-10 mx-auto h-28 w-28"
            >
              {/* Rotating gradient ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-0.5 rounded-full bg-[conic-gradient(from_0deg,#3b82f6,#8b5cf6,#06b6d4,#3b82f6)] opacity-90 blur-[3px]"
              />
              {/* Ring solid */}
              <div
                className={`absolute inset-0 rounded-full ${
                  dark ? "bg-[#05070d]" : "bg-white"
                }`}
              />
              {/* Foto profil */}
              <div className="absolute inset-[3px] overflow-hidden rounded-full shadow-2xl ring-1 ring-white/10">
                <Image
                  src={SITE.profileImage}
                  alt={SITE.name}
                  fill
                  priority
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              {/* Verified badge */}
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.6,
                  type: "spring",
                  stiffness: 400,
                }}
                className={`absolute -bottom-0.5 -right-0.5 z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 bg-emerald-500 ${
                  dark ? "border-[#05070d]" : "border-white"
                }`}
              >
                <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
              </motion.span>
            </motion.div>

            {/* --- Card profil --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className={`relative -mt-14 rounded-3xl border pt-20 shadow-2xl backdrop-blur-2xl ${
                dark
                  ? "border-white/10 bg-white/[0.04] shadow-black/60"
                  : "border-slate-200/80 bg-white/90 shadow-slate-300/40"
              }`}
            >
              {/* Top accent line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-3xl bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

              <div className="flex flex-col items-center px-5 pb-5 text-center">
                <h1 className="text-xl font-black tracking-tight sm:text-2xl">
                  {SITE.name}
                </h1>
                <p className="mt-1 text-xs font-semibold tracking-wide text-blue-500 dark:text-blue-400">
                  {SITE.handle}
                </p>

                <p
                  className={`mt-3 max-w-sm text-xs font-medium leading-relaxed ${
                    dark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {SITE.tagline}
                </p>
                <p
                  className={`mt-1.5 max-w-sm text-[11px] leading-relaxed ${
                    dark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {SITE.bio}
                </p>

                {/* Status pills */}
                <div className="mt-4 flex flex-wrap justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-500 dark:text-emerald-400">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    ONLINE
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-blue-500 dark:text-blue-400">
                    <Activity className="h-2.5 w-2.5" />
                    ACTIVE TRADER
                  </span>
                </div>

                {/* Social icons */}
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {socialItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.a
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.3 + idx * 0.06,
                          type: "spring",
                        }}
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        className={`flex h-10 w-10 items-center justify-center rounded-full border shadow-sm backdrop-blur transition ${
                          dark
                            ? "border-white/10 bg-white/5 text-slate-300 hover:border-blue-400 hover:text-blue-400"
                            : "border-slate-200 bg-white/80 text-slate-600 hover:border-blue-400 hover:text-blue-600"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= STACK LINKS ================= */}
        <section className="mt-6 space-y-3 px-4">
          {stackLinks.map((link, i) => {
            const Icon = link.icon;
            const accentMap: Record<StackLink["accent"], string> = {
              blue: "from-blue-500 to-indigo-600 shadow-blue-500/30",
              green: "from-emerald-500 to-teal-600 shadow-emerald-500/30",
              indigo: "from-indigo-500 to-violet-600 shadow-indigo-500/30",
              cyan: "from-cyan-500 to-blue-600 shadow-cyan-500/30",
              amber: "from-amber-500 to-orange-600 shadow-amber-500/30",
              rose: "from-rose-500 to-pink-600 shadow-rose-500/30",
            };
            return (
              <motion.a
                key={link.id}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
                whileHover={{ y: -3, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-3.5 shadow-lg backdrop-blur-xl transition ${
                  dark
                    ? "border-white/10 bg-white/[0.05] shadow-black/40 hover:border-blue-400/60"
                    : "border-slate-200/80 bg-white/85 shadow-slate-200/60 hover:border-blue-400/60"
                }`}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span
                  className={`absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b ${accentMap[link.accent]}`}
                />

                <div
                  className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accentMap[link.accent]} text-white shadow-lg`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-bold">{link.title}</p>
                    {link.badge && (
                      <span className="shrink-0 rounded-full bg-blue-500/15 px-2 py-0.5 text-[9px] font-black tracking-wider text-blue-500 dark:text-blue-300">
                        {link.badge}
                      </span>
                    )}
                  </div>
                  <p
                    className={`mt-0.5 truncate text-xs ${
                      dark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {link.description}
                  </p>
                </div>

                <ChevronRight
                  className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-500 ${
                    dark ? "text-slate-500" : "text-slate-400"
                  }`}
                />
              </motion.a>
            );
          })}
        </section>

        <div className="px-4">
          <Divider label="Panduan Lengkap" />
        </div>

        {/* ================= GUIDE ================= */}
        <section id="guide" className="mt-6 px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative overflow-hidden rounded-3xl border p-5 shadow-xl backdrop-blur-xl ${
              dark
                ? "border-white/10 bg-white/[0.05] shadow-black/40"
                : "border-slate-200/80 bg-white/85 shadow-slate-200/60"
            }`}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-500 dark:text-blue-400">
                    Panduan Pendaftaran
                  </span>
                  {platform.recommended && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-black tracking-wider text-emerald-500 dark:text-emerald-400">
                      <CheckCircle2 className="h-2.5 w-2.5" />
                      REKOMENDASI
                    </span>
                  )}
                </div>
                <h2 className="mt-2 text-lg font-black tracking-tight">
                  {platform.name}
                </h2>
                <p
                  className={`mt-1 text-xs leading-relaxed ${
                    dark ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {platform.shortDescription}
                </p>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/40">
                <LineChart className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {platform.tags.map((tag: string) => (
                <span
                  key={tag}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                    dark
                      ? "bg-white/10 text-slate-300"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <StatBox
                label="Registrasi"
                value={`~${platform.estimatedRegistrationTime.split(" ")[0]}`}
                suffix="mnt"
              />
              <StatBox
                label="Progress"
                value={`${pct}`}
                suffix="%"
                highlight
              />
              <StatBox
                label="Langkah"
                value={`${completed.length}/${platform.steps.length}`}
              />
            </div>

            <motion.a
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              href={platform.referralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_100%] px-5 py-3.5 text-sm font-black tracking-wide text-white shadow-xl shadow-blue-600/40 transition-all hover:bg-[position:100%_0]"
            >
              <Zap className="h-4 w-4" />
              DAFTAR SEKARANG
              <ExternalLink className="h-4 w-4" />
            </motion.a>
          </motion.div>

          {/* Progress bar */}
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span
                className={`font-bold ${
                  dark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                Progress:{" "}
                <span className="font-mono text-blue-500 dark:text-blue-400">
                  {completed.length}/{platform.steps.length}
                </span>
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-blue-500 dark:text-blue-400">
                  {pct}%
                </span>
                <button
                  type="button"
                  onClick={resetProgress}
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold transition ${
                    dark
                      ? "border-white/10 text-slate-400 hover:border-red-400 hover:text-red-400"
                      : "border-slate-200 text-slate-500 hover:border-red-400 hover:text-red-500"
                  }`}
                >
                  <RefreshCw className="h-3 w-3" />
                  Reset
                </button>
              </div>
            </div>
            <div
              className={`h-2.5 overflow-hidden rounded-full ${
                dark ? "bg-white/10" : "bg-slate-200"
              }`}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 shadow-[0_0_12px_rgba(59,130,246,0.6)]"
              />
            </div>
          </div>

          {/* Steps */}
          <div className="mt-5 space-y-2.5">
            {platform.steps.map((step: GuideStep, i: number) => {
              const isDone = completed.includes(step.id);
              const isOpen = expandedStep === step.id;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.04 }}
                  className={`overflow-hidden rounded-2xl border backdrop-blur-xl transition ${
                    isDone
                      ? "border-emerald-500/40 bg-emerald-500/[0.04]"
                      : dark
                        ? "border-white/10 bg-white/[0.04]"
                        : "border-slate-200/80 bg-white/80"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedStep((prev) =>
                        prev === step.id ? null : step.id,
                      )
                    }
                    className="flex w-full items-start gap-3 p-4 text-left"
                  >
                    <span
                      role="checkbox"
                      aria-checked={isDone}
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStep(step.id);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleStep(step.id);
                        }
                      }}
                      className={`mt-0.5 flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 transition ${
                        isDone
                          ? "border-emerald-500 bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                          : dark
                            ? "border-white/25 hover:border-blue-400"
                            : "border-slate-300 hover:border-blue-400"
                      }`}
                    >
                      <AnimatePresence>
                        {isDone && (
                          <motion.span
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 20,
                            }}
                          >
                            <Check
                              className="h-4 w-4 text-white"
                              strokeWidth={3}
                            />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span
                          className={`font-mono text-[10px] font-black uppercase tracking-widest ${
                            dark ? "text-slate-500" : "text-slate-400"
                          }`}
                        >
                          STEP {String(i + 1).padStart(2, "0")}
                        </span>
                        {isDone && (
                          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-black text-emerald-500 dark:text-emerald-400">
                            DONE
                          </span>
                        )}
                      </span>
                      <span
                        className={`mt-1 block text-sm font-bold ${
                          isDone
                            ? "text-emerald-600 line-through decoration-emerald-500/40 dark:text-emerald-400"
                            : ""
                        }`}
                      >
                        {step.title}
                      </span>
                      <span
                        className={`mt-1 block text-xs leading-relaxed ${
                          dark ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        {step.description}
                      </span>
                    </span>

                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`mt-1 shrink-0 ${
                        dark ? "text-slate-500" : "text-slate-400"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4">
                          <div
                            className={`relative aspect-[9/16] w-full overflow-hidden rounded-xl border ${
                              dark
                                ? "border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]"
                                : "border-slate-200 bg-gradient-to-br from-slate-100 to-slate-50"
                            }`}
                          >
                            {step.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={step.image}
                                alt={`Screenshot ${step.title}`}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div
                                className={`flex h-full w-full flex-col items-center justify-center gap-2 ${
                                  dark ? "text-slate-500" : "text-slate-400"
                                }`}
                              >
                                <motion.div
                                  animate={{ y: [0, -6, 0] }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                >
                                  <ImageIcon className="h-8 w-8" />
                                </motion.div>
                                <p className="font-mono text-[11px] font-black uppercase tracking-widest">
                                  Screenshot Step{" "}
                                  {String(i + 1).padStart(2, "0")}
                                </p>
                                <p className="text-[10px] opacity-70">
                                  Akan ditampilkan di sini
                                </p>
                              </div>
                            )}
                          </div>

                          {i === 0 && !isDone && (
                            <a
                              href={platform.referralUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-xs font-black tracking-wide text-white shadow-lg shadow-blue-600/40 transition hover:scale-[1.02]"
                            >
                              BUKA LINK PENDAFTARAN
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => toggleStep(step.id)}
                            className={`mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-black tracking-wide transition ${
                              isDone
                                ? "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400"
                                : dark
                                  ? "bg-white/10 text-slate-100 hover:bg-white/15"
                                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {isDone ? (
                              <>
                                <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                SUDAH SELESAI
                              </>
                            ) : (
                              <>
                                <Check className="h-3.5 w-3.5" />
                                TANDAI SELESAI
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            href={waLink(
              `Halo Cangboy, saya sedang mengikuti panduan pendaftaran di thisiscangboy.com.\n\nProgress: ${completed.length}/${platform.steps.length}\n\nSaya butuh bantuan di tahap ini.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-sm font-bold text-emerald-600 transition hover:bg-emerald-500/20 dark:text-emerald-400"
          >
            <MessageCircle className="h-4 w-4" />
            Butuh bantuan? Chat Cangboy
          </motion.a>
        </section>

        <div className="px-4">
          <Divider label="Mulai di Sini" />
        </div>

        {/* ================= START STEPS ================= */}
        <section className="mt-6 px-4">
          <div className="grid grid-cols-2 gap-3">
            {START_STEPS.map(
              (step: { title: string; description: string }, i: number) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -3 }}
                  className={`group relative overflow-hidden rounded-2xl border p-4 shadow-sm backdrop-blur-xl ${
                    dark
                      ? "border-white/10 bg-white/[0.05]"
                      : "border-slate-200/80 bg-white/85"
                  }`}
                >
                  <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-gradient-to-br from-blue-500/15 to-indigo-500/15 transition group-hover:scale-150" />
                  <span className="relative font-mono text-[10px] font-black uppercase tracking-widest text-blue-500 dark:text-blue-400">
                    STEP 0{i + 1}
                  </span>
                  <h3 className="relative mt-2 text-sm font-bold">
                    {step.title}
                  </h3>
                  <p
                    className={`relative mt-1 text-xs ${
                      dark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {step.description}
                  </p>
                </motion.div>
              ),
            )}
          </div>
        </section>

        <div className="px-4">
          <Divider label="Belajar Dulu" />
        </div>

        {/* ================= LEARN ================= */}
        <section className="mt-6 grid grid-cols-2 gap-3 px-4">
          {LEARN_CARDS.map((card: LearnCard, i: number) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className={`rounded-2xl border p-4 shadow-sm backdrop-blur-xl ${
                  dark
                    ? "border-white/10 bg-white/[0.05]"
                    : "border-slate-200/80 bg-white/85"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-500 dark:text-blue-400">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mt-3 text-sm font-bold">{card.title}</h3>
                <p
                  className={`mt-1 text-xs ${
                    dark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </section>

        <div className="px-4">
          <Divider label="Bantuan" />
        </div>

        {/* ================= HELP CTA ================= */}
        <section className="mt-6 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 p-6 text-center text-white shadow-2xl shadow-blue-600/40"
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
            <div className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                <Users className="h-6 w-6" />
              </div>
              <h2 className="mt-3 text-xl font-black">Masih Bingung?</h2>
              <p className="mt-1.5 text-sm text-blue-100">
                Chat saya, nanti saya bantu arahkan langkahnya.
              </p>
              <motion.a
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                href={waLink("Halo Cangboy, saya butuh bantuan.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-blue-700 shadow-lg transition"
              >
                <MessageCircle className="h-4 w-4" />
                CHAT CANGBOY
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* ================= DISCLAIMER ================= */}
        <section className="mt-8 px-4">
          <div
            className={`rounded-2xl border p-4 text-xs backdrop-blur ${
              dark
                ? "border-white/10 bg-white/[0.03]"
                : "border-slate-200/80 bg-white/60"
            }`}
          >
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-500 dark:text-blue-400" />
              <div
                className={`leading-relaxed ${
                  dark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                <p
                  className={`font-bold ${
                    dark ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  Disclaimer
                </p>
                <p className="mt-1.5">
                  Trading berisiko tinggi dan tidak cocok untuk semua orang.
                  Halaman ini hanya menyediakan link referensi dan edukasi
                  umum. Tidak ada jaminan keuntungan.
                </p>
                <p
                  className={`mt-1.5 font-bold ${
                    dark ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  Jangan pernah bagikan password, OTP, atau API key kepada
                  siapa pun.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="mt-8 px-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="relative h-6 w-6 overflow-hidden rounded-lg">
              <Image
                src={SITE.profileImage}
                alt={SITE.name}
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
            <p className="text-xs font-bold">{SITE.name}</p>
          </div>
          <p
            className={`mt-2 font-mono text-[10px] ${
              dark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </footer>
      </main>

      {/* ================= SCROLL TO TOP ================= */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Kembali ke atas"
            className={`fixed bottom-24 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border shadow-xl backdrop-blur-xl transition ${
              dark
                ? "border-white/10 bg-white/10 text-slate-200 hover:bg-white/20"
                : "border-slate-200/80 bg-white/90 text-slate-600 hover:bg-white"
            }`}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ================= STICKY CTA ================= */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center p-3">
        <motion.a
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 1.2,
            type: "spring",
            stiffness: 160,
            damping: 20,
          }}
          whileTap={{ scale: 0.96 }}
          href="#guide"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-xs font-black tracking-wide text-white shadow-2xl shadow-blue-600/50 backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5" />
          LIHAT PANDUAN
          {completed.length > 0 && (
            <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-white/25 px-2 py-0.5 font-mono text-[10px] font-black">
              {completed.length}/{platform.steps.length}
            </span>
          )}
          <ArrowRight className="h-3.5 w-3.5" />
        </motion.a>
      </div>

      {/* ================= TOAST ================= */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed left-1/2 top-20 z-50 -translate-x-1/2 rounded-full border border-emerald-500/40 bg-emerald-500/95 px-4 py-2 text-xs font-black tracking-wide text-white shadow-lg backdrop-blur"
          >
            <span className="inline-flex items-center gap-2">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
              {toast}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= CELEBRATION ================= */}
      <AnimatePresence>
        {celebrate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setCelebrate(false)}
          >
            <Confetti active={celebrate} />
            <motion.div
              initial={{ scale: 0.6, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative mx-4 max-w-sm overflow-hidden rounded-3xl border p-7 text-center shadow-2xl ${
                dark ? "border-white/10 bg-[#0a1225]" : "border-slate-200 bg-white"
              }`}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -5, 5, 0],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg shadow-orange-500/50"
              >
                <Trophy className="h-10 w-10" />
              </motion.div>
              <h3 className="mt-5 text-2xl font-black">Selesai! 🎉</h3>
              <p
                className={`mt-2 text-sm ${
                  dark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Kamu sudah menyelesaikan semua langkah panduan. Tinggal lanjut
                di platform.
              </p>
              <button
                type="button"
                onClick={() => setCelebrate(false)}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-black text-white shadow-lg shadow-blue-600/40 transition hover:scale-[1.03]"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============ KOMPONEN BANTU ============
interface DividerProps {
  label: string;
}

function Divider({ label }: DividerProps) {
  return (
    <div className="mt-8 flex items-center gap-3">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-400/40 to-transparent dark:via-white/15" />
      <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
        {label}
      </span>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-400/40 to-transparent dark:via-white/15" />
    </div>
  );
}

interface StatBoxProps {
  label: string;
  value: string;
  suffix?: string;
  highlight?: boolean;
}

function StatBox({ label, value, suffix, highlight }: StatBoxProps) {
  return (
    <div
      className={`rounded-xl border p-2.5 ${
        highlight
          ? "border-blue-500/30 bg-blue-500/10"
          : "border-white/5 bg-white/[0.03]"
      }`}
    >
      <p className="font-mono text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p
        className={`mt-1 flex items-baseline gap-0.5 font-mono text-sm font-black ${
          highlight ? "text-blue-500 dark:text-blue-400" : ""
        }`}
      >
        {value}
        {suffix && (
          <span className="text-[10px] font-bold opacity-70">{suffix}</span>
        )}
      </p>
    </div>
  );
}