"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
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
  MessageCircle,
  Moon,
  Music,
  RefreshCw,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  Trophy,
  Users,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ============ KONFIGURASI ============
const SITE = {
  name: "THIS IS O CAN",
  handle: "@thisisocan",
  tagline: "Trading Ecosystem • Community • Lifestyle",
  bio: "Semua link penting, panduan, dan komunitas trading saya di satu tempat.",
  whatsappNumber: "6281234567890",
  socials: {
    instagram: "https://instagram.com/username",
    tiktok: "https://tiktok.com/@username",
    youtube: "https://youtube.com/@username",
    telegram: "https://t.me/username",
  },
} as const;

// ============ TIPE ============
interface GuideStep {
  id: string;
  title: string;
  description: string;
  image?: string; // path screenshot, misal "/steps/step-1.png"
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

// ============ DATA PLATFORM (HANYA 1) ============
const PLATFORMS: Platform[] = [
  {
    id: "exness",
    name: "Exness",
    shortDescription:
      "Broker global dengan eksekusi cepat, spread rendah, dan antarmuka ramah pemula.",
    referralUrl: "https://example.com/ref/exness",
    recommended: true,
    tags: ["Regulasi Ketat", "MT5", "Ramah Pemula"],
    features: ["Web", "Mobile", "MT5", "Deposit Lokal"],
    estimatedRegistrationTime: "5–10 menit",
    steps: [
      {
        id: "s1",
        title: "Klik link registrasi",
        description:
          "Buka link referral di bawah. Anda akan diarahkan ke halaman resmi pendaftaran.",
        // image: "/steps/1-klik-link.png",
      },
      {
        id: "s2",
        title: "Isi email & password",
        description:
          "Gunakan email aktif. Buat password minimal 8 karakter yang kuat.",
        // image: "/steps/2-email.png",
      },
      {
        id: "s3",
        title: "Verifikasi email",
        description:
          "Cek inbox dan klik tautan verifikasi yang dikirim platform.",
        // image: "/steps/3-verifikasi.png",
      },
      {
        id: "s4",
        title: "Lengkapi data profil",
        description:
          "Isi nama sesuai identitas, tanggal lahir, dan nomor telepon aktif.",
        // image: "/steps/4-profil.png",
      },
      {
        id: "s5",
        title: "Verifikasi identitas (KYC)",
        description:
          "Unggah KTP/SIM dan selfie sesuai instruksi platform.",
        // image: "/steps/5-kyc.png",
      },
      {
        id: "s6",
        title: "Akun siap digunakan",
        description:
          "Setelah verifikasi disetujui, akun siap untuk deposit & trading.",
        // image: "/steps/6-selesai.png",
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

// ============ KOMPONEN UTAMA ============
export default function HomePage() {
  const [dark, setDark] = useState<boolean>(true);
  const [progress, setProgress] = useState<ProgressState>({});
  const [toast, setToast] = useState<string | null>(null);
  const [celebrate, setCelebrate] = useState<boolean>(false);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const platform: Platform = PLATFORMS[0];

  // Tema
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

  // Progres
  useEffect(() => {
    setProgress(readProgress());
  }, []);

  // Toast auto close
  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(id);
  }, [toast]);

  const completed: string[] = progress[platform.id]?.completed ?? [];
  const pct: number = Math.round(
    (completed.length / platform.steps.length) * 100,
  );

  const toggleStep = useCallback(
    (stepId: string): void => {
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
            window.setTimeout(() => setCelebrate(false), 3200);
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
        title: "Daftar Exness",
        description: "Link referral resmi — mulai di sini",
        href: platform.referralUrl,
        icon: BarChart3,
        accent: "blue",
        external: true,
        badge: "REKOMENDASI",
      },
      {
        id: "wa",
        title: "WhatsApp Saya",
        description: "Tanya langsung kalau bingung",
        href: waLink("Halo O Can!"),
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
    { label: "WhatsApp", href: waLink("Halo O Can!"), icon: MessageCircle },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f6f8fc] text-slate-900 transition-colors dark:bg-[#060a14] dark:text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -right-24 -top-32 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl dark:bg-blue-500/30" />
        <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl dark:bg-indigo-500/25" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl dark:bg-cyan-500/20" />
      </div>

      {/* Floating Theme Toggle */}
      <div className="fixed right-4 top-4 z-50">
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={() => setDark((v: boolean) => !v)}
          aria-label="Ganti tema"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-600 shadow-lg backdrop-blur-xl transition hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15"
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

      <main className="mx-auto max-w-md px-4 pb-28 pt-10 sm:max-w-lg sm:pt-14 lg:max-w-xl">
        {/* ================= HERO / PROFILE ================= */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="relative mb-5 h-24 w-24"
          >
            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-500 opacity-40 blur-xl" />
            <div className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl font-bold text-white shadow-2xl dark:border-white/10">
              OC
            </div>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 400 }}
              className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-emerald-500 dark:border-[#060a14]"
            >
              <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
            </motion.span>
          </motion.div>

          {/* Name + handle */}
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            {SITE.name}
          </h1>
          <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
            {SITE.handle}
          </p>

          {/* Tagline */}
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {SITE.tagline}
          </p>
          <p className="mt-2 max-w-sm text-xs leading-relaxed text-slate-500 dark:text-slate-500">
            {SITE.bio}
          </p>

          {/* Social icons row */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {socialItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-600 shadow-sm backdrop-blur transition hover:border-blue-400 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              );
            })}
          </div>
        </motion.section>

        {/* ================= STACK LINK BUTTONS ================= */}
        <section className="mt-8 space-y-3">
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
                transition={{ delay: 0.15 + i * 0.06 }}
                whileHover={{ y: -3, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/85 p-3.5 shadow-md shadow-slate-200/50 backdrop-blur-xl transition hover:border-blue-400/60 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.06] dark:shadow-black/30 dark:hover:border-blue-400/50"
              >
                {/* Shine effect */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full dark:via-white/10" />

                {/* Icon badge */}
                <div
                  className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accentMap[link.accent]} text-white shadow-lg`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold">
                      {link.title}
                    </p>
                    {link.badge && (
                      <span className="shrink-0 rounded-full bg-blue-500/15 px-2 py-0.5 text-[9px] font-bold tracking-wider text-blue-600 dark:text-blue-300">
                        {link.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                    {link.description}
                  </p>
                </div>

                <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-500" />
              </motion.a>
            );
          })}
        </section>

        {/* ================= DIVIDER ================= */}
        <Divider label="Panduan Lengkap" />

        {/* ================= PROGRESS / GUIDE ================= */}
        <section id="guide" className="mt-6">
          {/* Header card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
                    Panduan Resmi
                  </span>
                  {platform.recommended && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-2.5 w-2.5" />
                      REKOMENDASI
                    </span>
                  )}
                </div>
                <h2 className="mt-2 text-lg font-bold">{platform.name}</h2>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {platform.shortDescription}
                </p>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-blue-500/30">
                EX
              </div>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {platform.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Meta */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-white/5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Registrasi
                </p>
                <p className="mt-1 font-bold text-slate-700 dark:text-slate-200">
                  ~{platform.estimatedRegistrationTime}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-white/5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Platform
                </p>
                <p className="mt-1 font-bold text-slate-700 dark:text-slate-200">
                  {platform.features.length} pilihan
                </p>
              </div>
            </div>

            {/* Primary CTA */}
            <motion.a
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              href={platform.referralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/30"
            >
              DAFTAR SEKARANG
              <ExternalLink className="h-4 w-4" />
            </motion.a>
          </motion.div>

          {/* Progress bar */}
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-300">
                Progress: {completed.length} dari {platform.steps.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {pct}%
                </span>
                <button
                  type="button"
                  onClick={resetProgress}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-500 transition hover:border-red-400 hover:text-red-500 dark:border-white/10 dark:text-slate-400"
                >
                  <RefreshCw className="h-3 w-3" />
                  Reset
                </button>
              </div>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500"
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
                  className={`overflow-hidden rounded-2xl border bg-white/85 backdrop-blur-xl transition dark:bg-white/[0.06] ${
                    isDone
                      ? "border-emerald-500/40"
                      : "border-slate-200/80 dark:border-white/10"
                  }`}
                >
                  {/* Step header (click to expand) */}
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedStep((prev) =>
                        prev === step.id ? null : step.id,
                      )
                    }
                    className="flex w-full items-start gap-3 p-4 text-left"
                  >
                    {/* Checkbox */}
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
                          ? "border-emerald-500 bg-emerald-500"
                          : "border-slate-300 hover:border-blue-400 dark:border-white/20"
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

                    {/* Text */}
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          Langkah {i + 1}
                        </span>
                        {isDone && (
                          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            Selesai
                          </span>
                        )}
                      </span>
                      <span
                        className={`mt-1 block text-sm font-semibold ${
                          isDone
                            ? "text-emerald-700 line-through decoration-emerald-500/40 dark:text-emerald-300"
                            : ""
                        }`}
                      >
                        {step.title}
                      </span>
                      <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
                        {step.description}
                      </span>
                    </span>

                    {/* Chevron expand */}
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-1 shrink-0 text-slate-400"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>

                  {/* Expandable: screenshot / image placeholder */}
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
                          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-50 dark:border-white/10 dark:from-white/5 dark:to-white/[0.02]">
                            {step.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={step.image}
                                alt={`Screenshot ${step.title}`}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-400">
                                <ImageIcon className="h-8 w-8" />
                                <p className="text-[11px] font-semibold uppercase tracking-widest">
                                  Screenshot Langkah {i + 1}
                                </p>
                                <p className="text-[10px] text-slate-400">
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
                              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-500"
                            >
                              Buka Link Registrasi
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => toggleStep(step.id)}
                            className={`mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                              isDone
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200"
                            }`}
                          >
                            {isDone ? (
                              <>
                                <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                Sudah Selesai
                              </>
                            ) : (
                              <>
                                <Check className="h-3.5 w-3.5" />
                                Tandai Selesai
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

          {/* Contextual WhatsApp */}
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            href={waLink(
              `Halo O Can, saya sedang mengikuti panduan ${platform.name} di thisisocan.com.\n\nProgress: ${completed.length}/${platform.steps.length}\n\nSaya butuh bantuan di tahap ini.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-500/20 dark:text-emerald-300"
          >
            <MessageCircle className="h-4 w-4" />
            Butuh bantuan? Chat O Can
          </motion.a>
        </section>

        {/* ================= DIVIDER ================= */}
        <Divider label="Mulai di Sini" />

        {/* ================= START STEPS ================= */}
        <section className="mt-6">
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
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]"
                >
                  <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 transition group-hover:scale-150" />
                  <span className="relative text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                    0{i + 1}
                  </span>
                  <h3 className="relative mt-2 text-sm font-semibold">
                    {step.title}
                  </h3>
                  <p className="relative mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {step.description}
                  </p>
                </motion.div>
              ),
            )}
          </div>
        </section>

        {/* ================= DIVIDER ================= */}
        <Divider label="Belajar Dulu" />

        {/* ================= LEARN ================= */}
        <section className="mt-6 grid grid-cols-2 gap-3">
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
                className="rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-600 dark:text-blue-300">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mt-3 text-sm font-semibold">{card.title}</h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </section>

        {/* ================= DIVIDER ================= */}
        <Divider label="Bantuan" />

        {/* ================= HELP CTA ================= */}
        <section className="mt-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 p-6 text-center text-white shadow-2xl shadow-blue-600/30"
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                <Users className="h-6 w-6" />
              </div>
              <h2 className="mt-3 text-xl font-bold">Masih Bingung?</h2>
              <p className="mt-1.5 text-sm text-blue-100">
                Chat saya, nanti saya bantu arahkan langkahnya.
              </p>
              <motion.a
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                href={waLink("Halo O Can, saya butuh bantuan.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-lg transition"
              >
                <MessageCircle className="h-4 w-4" />
                Chat O Can
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* ================= DISCLAIMER ================= */}
        <section className="mt-8">
          <div className="rounded-2xl border border-slate-200/80 bg-white/60 p-4 text-xs backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
              <div className="leading-relaxed text-slate-500 dark:text-slate-400">
                <p className="font-semibold text-slate-700 dark:text-slate-200">
                  Disclaimer
                </p>
                <p className="mt-1.5">
                  Trading berisiko tinggi dan tidak cocok untuk semua orang.
                  Halaman ini hanya menyediakan link referensi dan edukasi
                  umum. Tidak ada jaminan keuntungan.
                </p>
                <p className="mt-1.5 font-medium text-slate-700 dark:text-slate-200">
                  Jangan pernah bagikan password, OTP, atau API key kepada
                  siapa pun.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-[10px] font-bold text-white">
              OC
            </div>
            <p className="text-xs font-semibold">{SITE.name}</p>
          </div>
          <p className="mt-2 text-[10px] text-slate-400">
            © {new Date().getFullYear()} {SITE.name}. Hak cipta dilindungi.
          </p>
        </footer>
      </main>

      {/* ================= MOBILE STICKY CTA ================= */}
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
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-2xl shadow-blue-600/40 backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Lihat Panduan
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
            className="fixed left-1/2 top-20 z-50 -translate-x-1/2 rounded-full border border-emerald-500/30 bg-emerald-500/95 px-4 py-2 text-xs font-bold text-white shadow-lg backdrop-blur"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setCelebrate(false)}
          >
            <motion.div
              initial={{ scale: 0.6, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
              className="mx-4 max-w-sm rounded-3xl border border-white/10 bg-white p-7 text-center shadow-2xl dark:bg-[#0d1526]"
            >
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
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg shadow-orange-500/40"
              >
                <Trophy className="h-10 w-10" />
              </motion.div>
              <h3 className="mt-5 text-2xl font-bold">Selesai! 🎉</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Kamu sudah menyelesaikan semua langkah panduan. Tinggal lanjut
                di platform.
              </p>
              <button
                type="button"
                onClick={() => setCelebrate(false)}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
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
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-white/10" />
      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
        {label}
      </span>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-white/10" />
    </div>
  );
}