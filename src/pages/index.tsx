"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowUp,
  Award,
  BarChart3,
  BookOpen,
  Brain,
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  Download,
  ExternalLink,
  Lightbulb,
  MessageCircle,
  Moon,
  Music,
  Play,
  RefreshCw,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  Trophy,
  User,
  Users,
  Video,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

// ============ KONFIGURASI ============
const SITE = {
  name: "THIS IS CANGBOY",
  short: "CANGBOY",
  handle: "@thisiscangboy",
  tagline: "Trading Ecosystem • Community • Lifestyle",
  bio: "Semua link penting, panduan, dan komunitas trading saya di satu tempat.",
  whatsappNumber: "6281241768395",
  profileImage: "/images/thisisocan.jpeg",
  heroBackground: "/hero-bg.jpg",
  about: {
    title: "Tentang Cangboy",
    p1: "Halo, saya Cangboy. Setelah 9 tahun coba berbagai usaha — dari YouTube, bisnis minuman, telur gulung, sampai ekspor arang — akhirnya saya menemukan rumah di trading.",
    p2: "Lewat halaman ini, saya kumpulkan semua link, panduan, dan komunitas yang saya pakai sehari-hari — supaya kamu tidak perlu bingung mulai dari mana.",
    p3: "Kalau kamu baru mulai, saya sudah siapkan panduan lengkap dari daftar akun sampai tersambung ke MetaTrader 5. Tinggal ikuti, tidak perlu bingung.",
  },
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
  tips?: string;
  warning?: string;
}

interface Phase {
  id: string;
  number: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  videoId?: string;
  videoTitle?: string;
  steps: GuideStep[];
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
  phases: Phase[];
}

interface ProgressState {
  [phaseId: string]: {
    completed: string[];
    updatedAt: string;
  };
}

interface LearnCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface BigLink {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent: string;
  badge?: string;
}

interface SmallLink {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  accent: string;
  external?: boolean;
}

// ============ DATA PLATFORM ============
const PLATFORMS: Platform[] = [
  {
    id: "broker",
    name: "Link Pendaftaran",
    shortDescription:
      "Pendaftaran akun trading resmi + panduan lengkap sampai tersambung ke MetaTrader 5.",
    referralUrl:
      "https://sc.myuserhub.com/welcome?returnUrl=%2Faccounts&pt=225883",
    recommended: true,
    tags: ["Regulasi Ketat", "MT5", "Ramah Pemula"],
    features: ["Web", "Mobile", "MT5", "Deposit Lokal"],
    estimatedRegistrationTime: "10–15 menit",
    phases: [
      {
        id: "phase-registration",
        number: "01",
        name: "Registrasi Akun",
        tagline: "Daftar, deposit, & verifikasi grup",
        icon: Zap,
        videoId: "xbkZudTmOh8",
        videoTitle: "Tutorial Daftar Akun Trading",
        steps: [
          {
            id: "r1",
            title: "Klik link registrasi",
            description:
              "Buka link pendaftaran resmi di bawah. Anda akan diarahkan ke halaman pembuatan akun.",
            tips: "Buka di browser utama (Chrome/Safari), bukan dari in-app browser WhatsApp.",
          },
          {
            id: "r2",
            title: "Isi email & password",
            description:
              "Gunakan email aktif yang Anda akses setiap hari. Buat password minimal 8 karakter.",
            tips: "Kombinasikan huruf besar, kecil, angka, dan simbol. Jangan pakai password yang sama dengan akun lain.",
          },
          {
            id: "r3",
            title: "Verifikasi email",
            description:
              "Cek inbox email Anda, buka pesan dari platform, dan klik tautan verifikasi.",
            warning: "Jika tidak ada di inbox, cek folder Spam/Promosi.",
          },
          {
            id: "r4",
            title: "Lengkapi data profil",
            description:
              "Isi nama sesuai KTP, tanggal lahir, dan nomor telepon aktif.",
            tips: "Data yang diisi harus PERSIS sama dengan dokumen identitas. Nama berbeda bisa bikin verifikasi KYC ditolak.",
          },
          {
            id: "r5",
            title: "Verifikasi identitas (KYC)",
            description:
              "Unggah foto KTP/SIM dan selfie dengan pencahayaan yang jelas.",
            warning:
              "Foto harus jelas, tidak terpotong, dan tidak menggunakan filter.",
          },
          {
            id: "r6",
            title: "Akun siap digunakan",
            description:
              "Setelah verifikasi disetujui, Anda akan menerima email berisi nomor akun & detail login MT5.",
            tips: "SIMPAN email ini. Anda akan membutuhkannya untuk fase berikutnya.",
          },
          {
            id: "r7",
            title: "Deposit minimal $20",
            description:
              "Lakukan deposit pertama minimal $20 USD untuk mengaktifkan akun dan membuka akses verifikasi grup komunitas.",
            tips: "Metode deposit lokal tersedia (bank transfer, e-wallet, crypto). Pilih yang paling nyaman buat kamu.",
            warning:
              "Pastikan nama pengirim SAMA dengan nama akun trading kamu. Deposit dari nama berbeda bisa ditolak atau tertahan.",
          },
          {
            id: "r8",
            title: "Screenshot profil & halaman akun",
            description:
              "Buka halaman profil dan halaman akun di dashboard. Screenshot yang menampilkan USER ID dan SALDO deposit kamu dengan jelas.",
            tips: "Pastikan USER ID dan angka saldo terbaca jelas di screenshot. Bukti ini yang akan dipakai Cangboy untuk verifikasi grup.",
            warning:
              "Jangan sensor User ID-nya — itu bagian yang paling penting untuk verifikasi. Yang boleh disensor hanya email atau nama lengkap kalau kamu mau.",
          },
          {
            id: "r9",
            title: "Kirim bukti via WhatsApp",
            description:
              "Balik ke thisiscangboy.com, klik tombol WhatsApp Saya di halaman utama. Kirim 2 screenshot tadi (profil & saldo) ke Cangboy untuk diproses masuk grup komunitas.",
            tips: "Tulis pesan singkat: 'Halo Cangboy, saya sudah daftar dan deposit. Ini bukti User ID & saldo saya.' Lalu attach screenshot.",
            warning:
              "JANGAN pernah kirim password, OTP, atau kode verifikasi ke siapa pun — termasuk ke Cangboy. Cangboy tidak akan pernah minta itu.",
          },
        ],
      },
      {
        id: "phase-mt5",
        number: "02",
        name: "Hubungkan ke MT5",
        tagline: "Sambungkan akun & setup XAUUSD",
        icon: Activity,
        videoId: "xF5ANln4RsA",
        videoTitle: "Tutorial Connect Akun ke MetaTrader 5",
        steps: [
          {
            id: "m1",
            title: "Download MetaTrader 5",
            description:
              "Unduh MT5 untuk perangkat Anda: Windows, macOS, Android, atau iOS.",
            tips: "Untuk PC, download dari situs resmi metatrader5.com. Untuk HP, cari 'MetaTrader 5' di Play Store atau App Store.",
          },
          {
            id: "m2",
            title: "Buka MT5 & pilih 'Login ke Akun Trading'",
            description:
              "Saat pertama buka, MT5 menawarkan beberapa opsi. Pilih 'Login ke Akun Trading' (BUKAN 'Buka Akun Demo').",
            warning:
              "Jangan pilih 'Buka Akun Baru' — itu akan membuat akun demo yang berbeda.",
          },
          {
            id: "m3",
            title: "Masukkan kredensial dari email",
            description:
              "Isi nomor akun, password MT5, dan nama server yang dikirim platform via email.",
            warning:
              "Server harus PERSIS sama dengan yang tertulis di email. Salah server = gagal login.",
          },
          {
            id: "m4",
            title: "Cek koneksi di pojok kanan bawah",
            description:
              "Lihat indikator koneksi di pojok kanan bawah MT5. Harus berwarna hijau dengan angka (bukan merah).",
            tips: "Jika merah, cek nama server di email — biasanya di situ masalahnya.",
          },
          {
            id: "m5",
            title: "Akun MT5 tersambung",
            description:
              "Nama akun dan saldo sudah muncul di panel MT5 Anda. Siap untuk mulai trading.",
            tips: "Coba buka 1 chart (misal XAUUSD) untuk memastikan data harga masuk normal.",
          },
          {
            id: "m6",
            title: "Tambah pair XAUUSD",
            description:
              "Klik kanan di panel Market Watch → pilih Symbols (atau tekan Ctrl+U). Cari 'XAUUSD' → klik Show. Pair akan muncul di Market Watch.",
            tips: "XAUUSD = Gold (Emas) terhadap US Dollar. Pair ini yang paling direkomendasikan untuk pemula karena volatilitasnya stabil dan spread-nya kecil.",
          },
          {
            id: "m7",
            title: "Hapus pair selain XAUUSD",
            description:
              "Klik kanan pada setiap pair lain di Market Watch → pilih Hide. Sisakan hanya XAUUSD supaya panel dan chart bersih.",
            tips: "Fokus 1 pair dulu lebih baik daripada banyak pair tapi tidak paham. Setelah terbiasa, kamu bisa tambah pair lain.",
          },
        ],
      },
    ],
  },
];

const LEARN_CARDS: LearnCard[] = [
  {
    title: "Dasar Trading",
    description: "Fundamental trading.",
    icon: BarChart3,
  },
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

const START_STEPS: { title: string; description: string }[] = [
  { title: "Daftar & deposit", description: "Fase 01 · 9 langkah." },
  { title: "Hubungkan MT5", description: "Fase 02 · 7 langkah." },
  { title: "Setup XAUUSD", description: "Pair fokus trading." },
  { title: "Siap trading", description: "Mulai dengan disiplin." },
];

const STORAGE_KEY = "thisisocan_progress_v2";

// ============ UTIL ============
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

// ============ VIDEO EMBED (click-to-play, no autoplay) ============
interface VideoEmbedProps {
  videoId: string;
  title: string;
  dark: boolean;
}

function VideoEmbed({ videoId, title, dark }: VideoEmbedProps) {
  const [playing, setPlaying] = useState<boolean>(false);
  const [thumbError, setThumbError] = useState<boolean>(false);

  const thumbnail = thumbError
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (playing) {
    return (
      <div
        className={`relative aspect-video w-full overflow-hidden rounded-2xl border ${
          dark ? "border-white/10 bg-black" : "border-slate-200 bg-black"
        }`}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Putar video: ${title}`}
      className={`group relative aspect-video w-full overflow-hidden rounded-2xl border ${
        dark ? "border-white/10" : "border-slate-200"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnail}
        alt={title}
        onError={() => setThumbError(true)}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.94 }}
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-2xl shadow-red-600/40"
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-red-600/60"
          />
          <Play className="relative h-6 w-6 fill-white text-white" />
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 text-left">
        <div className="flex items-center gap-2">
          <span className="flex h-5 items-center rounded bg-red-600 px-1.5 font-mono text-[9px] font-black uppercase tracking-wider text-white">
            VIDEO
          </span>
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-white/70">
            Klik untuk putar
          </span>
        </div>
        <p className="mt-1.5 text-sm font-black uppercase tracking-wide text-white">
          {title}
        </p>
      </div>
    </button>
  );
}

// ============ KOMPONEN UTAMA ============
type CelebrateMode = "phase" | "all" | null;

export default function HomePage() {
  const [dark, setDark] = useState<boolean>(true);
  const [progress, setProgress] = useState<ProgressState>({});
  const [toast, setToast] = useState<string | null>(null);
  const [celebrate, setCelebrate] = useState<CelebrateMode>(null);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [scrollPct, setScrollPct] = useState<number>(0);
  const [showTop, setShowTop] = useState<boolean>(false);
  const [booted, setBooted] = useState<boolean>(false);

  const platform: Platform = PLATFORMS[0];

  // Boot splash
  useEffect(() => {
    const id = window.setTimeout(() => setBooted(true), 900);
    return () => window.clearTimeout(id);
  }, []);

  // Theme
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

  // Progress
  useEffect(() => {
    setProgress(readProgress());
  }, []);

  // Toast
  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(id);
  }, [toast]);

  // Scroll
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

  const totalSteps: number = useMemo(
    () => platform.phases.reduce((sum, p) => sum + p.steps.length, 0),
    [platform.phases],
  );
  const totalDone: number = useMemo(
    () =>
      platform.phases.reduce(
        (sum, p) => sum + (progress[p.id]?.completed?.length ?? 0),
        0,
      ),
    [platform.phases, progress],
  );
  const totalPct: number = Math.round((totalDone / totalSteps) * 100);

  const phaseStats = useMemo(
    () =>
      platform.phases.map((phase) => {
        const done = progress[phase.id]?.completed?.length ?? 0;
        const total = phase.steps.length;
        const complete = done === total;
        return { id: phase.id, done, total, complete };
      }),
    [platform.phases, progress],
  );

  const activePhaseId: string = useMemo(() => {
    const firstIncomplete = phaseStats.find((s) => !s.complete);
    return firstIncomplete?.id ?? phaseStats[phaseStats.length - 1]?.id ?? "";
  }, [phaseStats]);

  const toggleStep = useCallback(
    (phase: Phase, stepId: string): void => {
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        try {
          navigator.vibrate(20);
        } catch {
          // abaikan
        }
      }
      setProgress((prev) => {
        const current = prev[phase.id]?.completed ?? [];
        const has = current.includes(stepId);
        const next = has
          ? current.filter((item) => item !== stepId)
          : [...current, stepId];

        const updated: ProgressState = {
          ...prev,
          [phase.id]: {
            completed: next,
            updatedAt: new Date().toISOString(),
          },
        };

        writeProgress(updated);

        if (!has) {
          const done = next.length;
          const total = phase.steps.length;
          if (done === total) {
            const isLastPhase =
              platform.phases[platform.phases.length - 1].id === phase.id;
            setCelebrate(isLastPhase ? "all" : "phase");
            window.setTimeout(() => setCelebrate(null), 4500);
          } else {
            setToast(`+1 Langkah (${done}/${total})`);
          }
        }
        return updated;
      });
    },
    [platform.phases],
  );

  const resetProgress = useCallback((): void => {
    setProgress((prev) => {
      const updated: ProgressState = { ...prev };
      for (const p of platform.phases) {
        delete updated[p.id];
      }
      writeProgress(updated);
      return updated;
    });
    setToast("Progress direset");
  }, [platform.phases]);

  const bigLinks: BigLink[] = useMemo(
    () => [
      {
        id: "join",
        title: "Link Pendaftaran",
        description: "Buka halaman pendaftaran resmi",
        href: platform.referralUrl,
        icon: Zap,
        accent: "amber",
        badge: "UTAMA",
      },
      {
        id: "wa",
        title: "WhatsApp",
        description: "Kirim bukti & tanya langsung",
        href: waLink("Halo Cangboy!"),
        icon: MessageCircle,
        accent: "emerald",
      },
    ],
    [platform.referralUrl],
  );

  const smallLinks: SmallLink[] = useMemo(
    () => [
      {
        id: "about",
        title: "Tentang",
        href: "#about",
        icon: User,
        accent: "amber",
        external: false,
      },
      {
        id: "tg",
        title: "Telegram",
        href: SITE.socials.telegram,
        icon: Send,
        accent: "sky",
        external: true,
      },
      {
        id: "mt5",
        title: "MT5",
        href: "https://www.metatrader5.com/",
        icon: Smartphone,
        accent: "violet",
        external: true,
      },
      {
        id: "ig",
        title: "Instagram",
        href: SITE.socials.instagram,
        icon: Camera,
        accent: "rose",
        external: true,
      },
      {
        id: "yt",
        title: "YouTube",
        href: SITE.socials.youtube,
        icon: Video,
        accent: "red",
        external: true,
      },
    ],
    [],
  );

  const bigAccentMap: Record<string, string> = {
    amber: "from-amber-400 to-orange-500 shadow-amber-500/30",
    emerald: "from-emerald-400 to-teal-500 shadow-emerald-500/30",
  };
  const smallAccentMap: Record<string, string> = {
    amber: "text-amber-400 group-hover:bg-amber-500/10",
    sky: "text-sky-400 group-hover:bg-sky-500/10",
    violet: "text-violet-400 group-hover:bg-violet-500/10",
    rose: "text-rose-400 group-hover:bg-rose-500/10",
    red: "text-red-400 group-hover:bg-red-500/10",
  };

  return (
    <>
      {/* ================= BOOT SPLASH ================= */}
      <AnimatePresence>
        {!booted && (
          <motion.div
            key="boot-splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="fixed inset-0 z-[100]"
          >
            <LoadingSpinner
              fullscreen
              variant="dual-ring"
              size="lg"
              tone="amber"
              label="Menyiapkan halaman..."
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MAIN APP ================= */}
      <div
        className={`relative min-h-screen transition-colors ${
          dark ? "bg-[#08090c] text-white" : "bg-[#f5f6f8] text-slate-900"
        }`}
      >
        {/* ================= BACKGROUND ================= */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div
            className={`absolute inset-0 ${
              dark
                ? "bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.06)_0%,transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.05)_0%,transparent_50%)]"
                : "bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08)_0%,transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.06)_0%,transparent_50%)]"
            }`}
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: dark
                ? "repeating-linear-gradient(45deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 6px)"
                : "repeating-linear-gradient(45deg, #000000 0px, #000000 1px, transparent 1px, transparent 6px)",
            }}
          />
        </div>

        {/* Scroll progress */}
        <div className="fixed inset-x-0 top-0 z-[60] h-[2px]">
          <motion.div
            style={{ width: `${scrollPct}%` }}
            className="h-full bg-gradient-to-r from-amber-400 via-cyan-400 to-amber-400"
          />
        </div>

        {/* ================= TOP BAR ================= */}
        <header
          className={`sticky top-0 z-40 border-b backdrop-blur-xl ${
            dark
              ? "border-white/[0.06] bg-[#08090c]/80"
              : "border-slate-200/60 bg-white/80"
          }`}
        >
          <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-3">
            <div className="flex items-center gap-2">
              <div className="relative h-7 w-7 overflow-hidden rounded-lg ring-1 ring-amber-400/40">
                <Image
                  src={SITE.profileImage}
                  alt={SITE.name}
                  fill
                  sizes="28px"
                  priority
                  className="object-cover"
                />
              </div>
              <span className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                THIS IS <span className="text-amber-400">{SITE.short}</span>
              </span>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => setDark((v: boolean) => !v)}
              aria-label="Ganti tema"
              className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                dark
                  ? "border-white/10 text-slate-300 hover:bg-white/5"
                  : "border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={dark ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {dark ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </header>

        <main className="mx-auto max-w-2xl px-5 pb-32 pt-10">
          {/* ================= HERO ================= */}
          <section className="relative">
            <div className="pointer-events-none absolute -inset-x-5 -top-10 -bottom-8 -z-10 overflow-hidden rounded-b-[3rem] opacity-40">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${SITE.heroBackground}')` }}
              />
              <div
                className={`absolute inset-0 ${
                  dark
                    ? "bg-gradient-to-b from-[#08090c]/70 via-[#08090c]/95 to-[#08090c]"
                    : "bg-gradient-to-b from-white/70 via-white/95 to-[#f5f6f8]"
                }`}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="relative h-12 w-12 shrink-0">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#fbbf24,#22d3ee,#fbbf24)] opacity-60 blur-[4px]"
                />
                <div
                  className={`absolute inset-[2px] rounded-full ${
                    dark ? "bg-[#08090c]" : "bg-white"
                  }`}
                />
                <div className="absolute inset-[3px] overflow-hidden rounded-full ring-1 ring-white/10">
                  <Image
                    src={SITE.profileImage}
                    alt={SITE.name}
                    fill
                    sizes="48px"
                    priority
                    className="object-cover"
                  />
                </div>
                <span
                  className={`absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-emerald-500 ${
                    dark ? "border-[#08090c]" : "border-white"
                  }`}
                >
                  <Check className="h-2 w-2 text-white" strokeWidth={4} />
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="flex items-center gap-1.5 font-mono text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-emerald-500">ONLINE</span>
                </span>
                <span
                  className={`text-[11px] font-semibold ${
                    dark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {SITE.handle}
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-8 text-[3.5rem] font-black uppercase leading-[0.9] tracking-[-0.04em] sm:text-6xl md:text-7xl"
            >
              <span
                className={`block font-mono text-xs font-black uppercase tracking-[0.35em] ${
                  dark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Trading •
              </span>
              <span className="mt-3 block bg-gradient-to-br from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                {SITE.short}
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-md"
            >
              <p
                className={`text-sm font-medium leading-relaxed ${
                  dark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                {SITE.tagline}
              </p>
              <p
                className={`mt-2 text-xs leading-relaxed ${
                  dark ? "text-slate-500" : "text-slate-500"
                }`}
              >
                {SITE.bio}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-5 flex flex-wrap gap-2"
            >
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] font-black uppercase tracking-wider ${
                  dark
                    ? "border-amber-400/20 bg-amber-400/5 text-amber-400"
                    : "border-amber-500/30 bg-amber-500/5 text-amber-600"
                }`}
              >
                <Activity className="h-3 w-3" />
                ACTIVE TRADER
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] font-black uppercase tracking-wider ${
                  dark
                    ? "border-cyan-400/20 bg-cyan-400/5 text-cyan-400"
                    : "border-cyan-500/30 bg-cyan-500/5 text-cyan-600"
                }`}
              >
                <Zap className="h-3 w-3" />
                VERIFIED
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-col gap-2 sm:flex-row"
            >
              <a
                href={platform.referralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-1 items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 via-amber-400 to-orange-500 px-5 py-4 font-black uppercase tracking-wider text-black shadow-xl shadow-amber-500/20 transition hover:shadow-amber-500/40"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative flex items-center gap-2 text-[13px]">
                  <Zap className="h-4 w-4" />
                  DAFTAR SEKARANG
                </span>
                <ArrowRight className="relative h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a
                href={waLink("Halo Cangboy!")}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-1 items-center justify-between rounded-2xl border px-5 py-4 font-black uppercase tracking-wider transition ${
                  dark
                    ? "border-white/10 bg-white/[0.03] text-white hover:border-emerald-400/50 hover:bg-emerald-400/5 hover:text-emerald-400"
                    : "border-slate-200 bg-white text-slate-900 hover:border-emerald-500/50 hover:text-emerald-600"
                }`}
              >
                <span className="flex items-center gap-2 text-[13px]">
                  <MessageCircle className="h-4 w-4" />
                  WHATSAPP
                </span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className={`mt-6 flex items-center justify-between border-t pt-4 ${
                dark ? "border-white/[0.06]" : "border-slate-200/60"
              }`}
            >
              <span
                className={`font-mono text-[10px] font-black uppercase tracking-[0.2em] ${
                  dark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                SOSIAL
              </span>
              <div className="flex gap-1">
                {[
                  { href: SITE.socials.instagram, icon: Camera, label: "IG" },
                  { href: SITE.socials.tiktok, icon: Music, label: "TT" },
                  { href: SITE.socials.youtube, icon: Video, label: "YT" },
                  { href: SITE.socials.telegram, icon: Send, label: "TG" },
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.05 }}
                      whileHover={{ y: -2, scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                        dark
                          ? "text-slate-400 hover:bg-white/5 hover:text-white"
                          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </section>

          {/* ================= ABOUT SECTION ================= */}
          <section id="about" className="scroll-mt-24">
            <SectionHeader number="00" label="PROFIL" title={SITE.about.title} />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className={`relative mt-6 overflow-hidden rounded-3xl border p-6 ${
                dark
                  ? "border-white/[0.06] bg-white/[0.02]"
                  : "border-slate-200/80 bg-white"
              }`}
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />

              <div className="relative flex items-start gap-4">
                <div className="relative h-14 w-14 shrink-0">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_0deg,#fbbf24,#22d3ee,#fbbf24)] opacity-50 blur-[3px]"
                  />
                  <div
                    className={`absolute inset-[2px] rounded-2xl ${
                      dark ? "bg-[#08090c]" : "bg-white"
                    }`}
                  />
                  <div className="absolute inset-[4px] overflow-hidden rounded-2xl">
                    <Image
                      src={SITE.profileImage}
                      alt={SITE.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-amber-400">
                    {"// about_me"}
                  </p>
                  <h3 className="mt-1 text-lg font-black uppercase tracking-tight">
                    {SITE.short}
                  </h3>
                  <p
                    className={`text-[11px] font-semibold ${
                      dark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {SITE.handle}
                  </p>
                </div>
              </div>

              <div className="relative mt-5 space-y-3">
                <p
                  className={`text-xs leading-relaxed ${
                    dark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {SITE.about.p1}
                </p>
                <p
                  className={`text-xs leading-relaxed ${
                    dark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {SITE.about.p2}
                </p>
                <p
                  className={`text-xs leading-relaxed ${
                    dark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {SITE.about.p3}
                </p>
              </div>

              <div className="relative mt-5 flex flex-wrap gap-2">
                <a
                  href={waLink("Halo Cangboy!")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-2 font-mono text-[10px] font-black uppercase tracking-widest text-emerald-600 transition hover:bg-emerald-500/20 dark:text-emerald-400"
                >
                  <MessageCircle className="h-3 w-3" />
                  Ngobrol
                </a>
                <a
                  href={SITE.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-rose-500/10 px-3 py-2 font-mono text-[10px] font-black uppercase tracking-widest text-rose-600 transition hover:bg-rose-500/20 dark:text-rose-400"
                >
                  <Camera className="h-3 w-3" />
                  Instagram
                </a>
                <a
                  href={SITE.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/10 px-3 py-2 font-mono text-[10px] font-black uppercase tracking-widest text-red-600 transition hover:bg-red-500/20 dark:text-red-400"
                >
                  <Video className="h-3 w-3" />
                  YouTube
                </a>
              </div>

              {/* Lihat Profil Lengkap */}
              <div
                className={`relative mt-5 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between ${
                  dark ? "border-white/[0.06]" : "border-slate-200/60"
                }`}
              >
                <p
                  className={`font-mono text-[10px] uppercase tracking-widest ${
                    dark ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {"// mau kenal lebih dekat?"}
                </p>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-2.5 font-mono text-[10px] font-black uppercase tracking-widest text-black shadow-lg shadow-amber-500/20 transition hover:shadow-amber-500/40"
                >
                  <User className="h-3.5 w-3.5" />
                  Lihat Profil Lengkap
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>
          </section>

          {/* ================= SECTION 01: LINKS ================= */}
          <SectionHeader number="01" label="LINK" title="Akses Cepat" />

          <section className="mt-6 space-y-3">
            {bigLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-4 transition ${
                    dark
                      ? "border-white/[0.06] bg-white/[0.02] hover:border-white/20"
                      : "border-slate-200/80 bg-white hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${bigAccentMap[link.accent]} shadow-lg`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-black uppercase tracking-wide">
                        {link.title}
                      </p>
                      {link.badge && (
                        <span className="shrink-0 rounded-sm bg-amber-400/15 px-1.5 py-0.5 font-mono text-[9px] font-black tracking-widest text-amber-400">
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
                  <ArrowRight
                    className={`h-4 w-4 shrink-0 transition group-hover:translate-x-1 ${
                      dark ? "text-slate-500" : "text-slate-400"
                    }`}
                  />
                </motion.a>
              );
            })}

            <div className="grid grid-cols-2 gap-3">
              {smallLinks.map((link, i) => {
                const Icon = link.icon;
                const isExternal = link.external !== false;
                return (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className={`group flex items-center gap-3 rounded-2xl border p-3.5 transition ${
                      dark
                        ? "border-white/[0.06] bg-white/[0.02] hover:border-white/20"
                        : "border-slate-200/80 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${smallAccentMap[link.accent]} ${
                        dark ? "" : "bg-slate-100"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="truncate text-xs font-black uppercase tracking-wider">
                      {link.title}
                    </p>
                  </motion.a>
                );
              })}
            </div>
          </section>

          {/* ================= SECTION 02: GUIDE ================= */}
          <SectionHeader
            number="02"
            label="PANDUAN"
            title="Cara Daftar Lengkap"
            subtitle={`2 Fase · ${totalSteps} Langkah`}
          />

          {/* Total progress overview */}
          <section className="mt-6">
            <div
              className={`relative overflow-hidden rounded-2xl border p-4 ${
                dark
                  ? "border-white/[0.06] bg-white/[0.02]"
                  : "border-slate-200/80 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`font-mono text-[10px] font-black uppercase tracking-widest ${
                      dark ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    TOTAL PROGRESS
                  </p>
                  <p className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-mono text-3xl font-black text-amber-400">
                      {totalPct}
                    </span>
                    <span
                      className={`font-mono text-xs font-black ${
                        dark ? "text-slate-500" : "text-slate-400"
                      }`}
                    >
                      %
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-mono text-[10px] font-black uppercase tracking-widest ${
                      dark ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    STEP
                  </p>
                  <p className="mt-1 font-mono text-sm font-black">
                    {totalDone}
                    <span
                      className={dark ? "text-slate-500" : "text-slate-400"}
                    >
                      /{totalSteps}
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetProgress}
                  aria-label="Reset progress"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
                    dark
                      ? "border-white/10 text-slate-400 hover:border-red-400/50 hover:text-red-400"
                      : "border-slate-200 text-slate-500 hover:border-red-400 hover:text-red-500"
                  }`}
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 flex gap-1">
                {platform.phases.map((phase, phaseIdx) => {
                  const stat = phaseStats[phaseIdx];
                  return (
                    <div
                      key={phase.id}
                      className="flex-1"
                      title={`Fase ${phase.number}: ${phase.name}`}
                    >
                      <div className="flex gap-1">
                        {phase.steps.map((step) => {
                          const isDone = (
                            progress[phase.id]?.completed ?? []
                          ).includes(step.id);
                          return (
                            <div
                              key={step.id}
                              className={`h-1.5 flex-1 rounded-full transition-colors ${
                                isDone
                                  ? "bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                                  : dark
                                    ? "bg-white/10"
                                    : "bg-slate-200"
                              }`}
                            />
                          );
                        })}
                      </div>
                      <p
                        className={`mt-2 text-center font-mono text-[9px] font-black uppercase tracking-widest ${
                          stat.complete
                            ? "text-amber-400"
                            : dark
                              ? "text-slate-600"
                              : "text-slate-400"
                        }`}
                      >
                        FASE {phase.number}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ================= PHASES ================= */}
          {platform.phases.map((phase, phaseIdx) => {
            const stat = phaseStats[phaseIdx];
            const phasePct = Math.round((stat.done / stat.total) * 100);
            const PhaseIcon = phase.icon;
            const isActive = phase.id === activePhaseId;
            const isLastPhase = phaseIdx === platform.phases.length - 1;

            return (
              <div key={phase.id} id={phase.id}>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="mt-12"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition ${
                        stat.complete
                          ? "bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/40"
                          : dark
                            ? "border border-white/10 bg-white/[0.03]"
                            : "border border-slate-200 bg-white"
                      }`}
                    >
                      {stat.complete ? (
                        <Check className="h-5 w-5 text-black" strokeWidth={3} />
                      ) : (
                        <PhaseIcon
                          className={`h-5 w-5 ${
                            isActive
                              ? "text-amber-400"
                              : dark
                                ? "text-slate-400"
                                : "text-slate-500"
                          }`}
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-[10px] font-black uppercase tracking-[0.25em] ${
                            stat.complete
                              ? "text-amber-400"
                              : dark
                                ? "text-slate-500"
                                : "text-slate-400"
                          }`}
                        >
                          FASE {phase.number}
                        </span>
                        {stat.complete && (
                          <span className="rounded-sm bg-amber-400/15 px-1.5 py-0.5 font-mono text-[9px] font-black tracking-widest text-amber-400">
                            SELESAI
                          </span>
                        )}
                        {isActive && !stat.complete && (
                          <span className="relative flex items-center gap-1 rounded-sm bg-amber-400/10 px-1.5 py-0.5 font-mono text-[9px] font-black tracking-widest text-amber-400">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                            </span>
                            AKTIF
                          </span>
                        )}
                      </div>
                      <h3 className="mt-1 text-xl font-black uppercase tracking-tight sm:text-2xl">
                        {phase.name}
                      </h3>
                      <p
                        className={`mt-0.5 text-[11px] ${
                          dark ? "text-slate-500" : "text-slate-500"
                        }`}
                      >
                        {phase.tagline} · {stat.done}/{stat.total} langkah
                      </p>
                    </div>
                  </div>

                  <div
                    className={`mt-3 h-1 overflow-hidden rounded-full ${
                      dark ? "bg-white/[0.06]" : "bg-slate-200"
                    }`}
                  >
                    <motion.div
                      animate={{ width: `${phasePct}%` }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 20,
                      }}
                      className={`h-full rounded-full ${
                        stat.complete
                          ? "bg-gradient-to-r from-amber-400 to-orange-500"
                          : "bg-gradient-to-r from-amber-400/80 to-orange-500/80"
                      }`}
                    />
                  </div>
                </motion.div>

                {/* ===== VIDEO TUTORIAL ===== */}
                {phase.videoId && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="mt-6"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-5 items-center gap-1 rounded bg-red-500/10 px-2 font-mono text-[9px] font-black uppercase tracking-widest text-red-500 dark:text-red-400">
                        <Video className="h-2.5 w-2.5" />
                        Video
                      </span>
                      <span
                        className={`font-mono text-[10px] font-black uppercase tracking-widest ${
                          dark ? "text-slate-500" : "text-slate-400"
                        }`}
                      >
                        Tonton sambil ceklis langkah
                      </span>
                    </div>
                    <VideoEmbed
                      videoId={phase.videoId}
                      title={phase.videoTitle ?? "Video Tutorial"}
                      dark={dark}
                    />
                    <p
                      className={`mt-2 text-center font-mono text-[10px] ${
                        dark ? "text-slate-500" : "text-slate-400"
                      }`}
                    >
                      ↓ Ceklis langkah di bawah sambil nonton
                    </p>
                  </motion.div>
                )}

                <section className="relative mt-6">
                  {phase.steps.map((step: GuideStep, i: number) => {
                    const isDone = (
                      progress[phase.id]?.completed ?? []
                    ).includes(step.id);
                    const isOpen = expandedStep === step.id;
                    const isLastStep = i === phase.steps.length - 1;
                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ delay: i * 0.04 }}
                        className="relative flex gap-4"
                      >
                        <div className="relative flex w-8 shrink-0 flex-col items-center">
                          <button
                            type="button"
                            onClick={() => toggleStep(phase, step.id)}
                            aria-label={`Tandai langkah ${i + 1}`}
                            className={`relative z-10 mt-1 flex h-8 w-8 items-center justify-center rounded-full border-2 transition ${
                              isDone
                                ? "border-amber-400 bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_0_16px_rgba(251,191,36,0.5)]"
                                : dark
                                  ? "border-white/15 bg-[#08090c] hover:border-amber-400/50"
                                  : "border-slate-300 bg-white hover:border-amber-500"
                            }`}
                          >
                            <AnimatePresence mode="wait" initial={false}>
                              {isDone ? (
                                <motion.span
                                  key="check"
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
                                    className="h-4 w-4 text-black"
                                    strokeWidth={3.5}
                                  />
                                </motion.span>
                              ) : (
                                <motion.span
                                  key="num"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                  className="font-mono text-[10px] font-black text-slate-500"
                                >
                                  {String(i + 1).padStart(2, "0")}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </button>
                          {!isLastStep && (
                            <div
                              className={`mt-1 w-px flex-1 ${
                                isDone
                                  ? "bg-gradient-to-b from-amber-400 to-amber-400/20"
                                  : dark
                                    ? "bg-white/10"
                                    : "bg-slate-200"
                              }`}
                            />
                          )}
                        </div>

                        <div
                          className={`flex-1 ${isLastStep ? "pb-0" : "pb-6"}`}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedStep((prev) =>
                                prev === step.id ? null : step.id,
                              )
                            }
                            className="group flex w-full items-start justify-between gap-3 text-left"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`font-mono text-[10px] font-black uppercase tracking-widest ${
                                    isDone
                                      ? "text-amber-400"
                                      : dark
                                        ? "text-slate-500"
                                        : "text-slate-400"
                                  }`}
                                >
                                  STEP {String(i + 1).padStart(2, "0")}
                                </span>
                                {isDone && (
                                  <span className="rounded-sm bg-amber-400/10 px-1.5 py-0.5 font-mono text-[9px] font-black tracking-widest text-amber-400">
                                    DONE
                                  </span>
                                )}
                              </div>
                              <h4
                                className={`mt-1.5 text-base font-black leading-tight transition ${
                                  isDone
                                    ? dark
                                      ? "text-slate-500 line-through decoration-amber-400/50"
                                      : "text-slate-400 line-through decoration-amber-500/50"
                                    : ""
                                }`}
                              >
                                {step.title}
                              </h4>
                              <p
                                className={`mt-1 text-xs leading-relaxed ${
                                  dark ? "text-slate-400" : "text-slate-500"
                                }`}
                              >
                                {step.description}
                              </p>
                            </div>
                            <motion.span
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className={`mt-1 shrink-0 ${
                                dark
                                  ? "text-slate-500 group-hover:text-slate-300"
                                  : "text-slate-400 group-hover:text-slate-600"
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
                                <div className="pt-4 space-y-2">
                                  {step.tips && (
                                    <div
                                      className={`flex items-start gap-2.5 rounded-xl border p-3 ${
                                        dark
                                          ? "border-cyan-400/20 bg-cyan-400/[0.04]"
                                          : "border-cyan-500/30 bg-cyan-50"
                                      }`}
                                    >
                                      <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-500 dark:text-cyan-400" />
                                      <div>
                                        <p className="font-mono text-[9px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                                          TIPS
                                        </p>
                                        <p
                                          className={`mt-1 text-[11px] leading-relaxed ${
                                            dark
                                              ? "text-slate-300"
                                              : "text-slate-600"
                                          }`}
                                        >
                                          {step.tips}
                                        </p>
                                      </div>
                                    </div>
                                  )}

                                  {step.warning && (
                                    <div
                                      className={`flex items-start gap-2.5 rounded-xl border p-3 ${
                                        dark
                                          ? "border-rose-400/20 bg-rose-400/[0.04]"
                                          : "border-rose-500/30 bg-rose-50"
                                      }`}
                                    >
                                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-500 dark:text-rose-400" />
                                      <div>
                                        <p className="font-mono text-[9px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">
                                          PERHATIAN
                                        </p>
                                        <p
                                          className={`mt-1 text-[11px] leading-relaxed ${
                                            dark
                                              ? "text-slate-300"
                                              : "text-slate-600"
                                          }`}
                                        >
                                          {step.warning}
                                        </p>
                                      </div>
                                    </div>
                                  )}

                                  <div className="flex flex-col gap-2 pt-1 sm:flex-row">
                                    {phase.id === "phase-registration" &&
                                      i === 0 &&
                                      !isDone && (
                                        <a
                                          href={platform.referralUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-3 font-mono text-[11px] font-black uppercase tracking-wider text-black shadow-lg shadow-amber-500/30 transition hover:shadow-amber-500/50"
                                        >
                                          BUKA LINK
                                          <ExternalLink className="h-3.5 w-3.5" />
                                        </a>
                                      )}
                                    {phase.id === "phase-registration" &&
                                      step.id === "r9" &&
                                      !isDone && (
                                        <a
                                          href={waLink(
                                            "Halo Cangboy, saya sudah daftar dan deposit. Ini bukti User ID & saldo saya.",
                                          )}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-4 py-3 font-mono text-[11px] font-black uppercase tracking-wider text-black shadow-lg shadow-emerald-500/30 transition hover:shadow-emerald-500/50"
                                        >
                                          KIRIM BUKTI
                                          <MessageCircle className="h-3.5 w-3.5" />
                                        </a>
                                      )}
                                    {phase.id === "phase-mt5" &&
                                      i === 0 &&
                                      !isDone && (
                                        <a
                                          href="https://www.metatrader5.com/en/download"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-3 font-mono text-[11px] font-black uppercase tracking-wider text-black shadow-lg shadow-cyan-500/30 transition hover:shadow-cyan-500/50"
                                        >
                                          DOWNLOAD MT5
                                          <Download className="h-3.5 w-3.5" />
                                        </a>
                                      )}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        toggleStep(phase, step.id)
                                      }
                                      className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-4 py-3 font-mono text-[11px] font-black uppercase tracking-wider transition ${
                                        isDone
                                          ? dark
                                            ? "border-amber-400/40 bg-amber-400/10 text-amber-400"
                                            : "border-amber-500/40 bg-amber-500/10 text-amber-600"
                                          : dark
                                            ? "border-white/10 text-slate-300 hover:border-amber-400/40 hover:text-amber-400"
                                            : "border-slate-200 text-slate-600 hover:border-amber-500/50 hover:text-amber-600"
                                      }`}
                                    >
                                      <Check
                                        className="h-3.5 w-3.5"
                                        strokeWidth={3}
                                      />
                                      {isDone
                                        ? "SUDAH SELESAI"
                                        : "TANDAI SELESAI"}
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })}
                </section>

                <AnimatePresence>
                  {stat.complete && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-6"
                    >
                      <div className="relative overflow-hidden rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/[0.08] via-transparent to-orange-500/[0.05] p-5">
                        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-amber-400/15 blur-3xl" />
                        <div className="relative flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/40">
                            <Award className="h-6 w-6 text-black" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-amber-400">
                              FASE {phase.number} SELESAI
                            </p>
                            <h4 className="mt-1 text-lg font-black uppercase tracking-tight">
                              {phase.id === "phase-registration"
                                ? "Akun & verifikasi grup beres ✅"
                                : "Setup MT5 selesai! 🏆"}
                            </h4>
                            <p
                              className={`mt-1.5 text-xs leading-relaxed ${
                                dark ? "text-slate-400" : "text-slate-600"
                              }`}
                            >
                              {phase.id === "phase-registration"
                                ? "Sekarang lanjut ke fase berikutnya: hubungkan akun ke MetaTrader 5 dan setup XAUUSD."
                                : "Akun MT5 sudah tersambung dan XAUUSD siap. Waktunya mulai trading dengan disiplin."}
                            </p>
                            {!isLastPhase && (
                              <a
                                href={`#${platform.phases[phaseIdx + 1].id}`}
                                className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] font-black uppercase tracking-widest text-amber-400 transition hover:gap-2"
                              >
                                Lanjut ke Fase{" "}
                                {platform.phases[phaseIdx + 1].number}
                                <ArrowRight className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            href={waLink(
              `Halo Cangboy, saya sedang mengikuti panduan pendaftaran di thisiscangboy.com.\n\nProgress: ${totalDone}/${totalSteps}\n\nSaya butuh bantuan di tahap ini.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-8 flex w-full items-center justify-between gap-3 rounded-2xl border px-5 py-4 transition ${
              dark
                ? "border-emerald-400/20 bg-emerald-400/[0.04] hover:bg-emerald-400/[0.08]"
                : "border-emerald-500/30 bg-emerald-50 hover:bg-emerald-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15">
                <MessageCircle className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
              </div>
              <div className="text-left">
                <p className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Butuh bantuan?
                </p>
                <p
                  className={`text-[11px] ${
                    dark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Chat langsung ke Cangboy
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
          </motion.a>

          {/* ================= SECTION 03: LEARN ================= */}
          <SectionHeader number="03" label="EDUKASI" title="Belajar Dulu" />

          <section className="mt-6 grid grid-cols-2 gap-3">
            {LEARN_CARDS.map((card: LearnCard) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className={`group relative overflow-hidden rounded-2xl border p-4 transition ${
                    dark
                      ? "border-white/[0.06] bg-white/[0.02] hover:border-white/20"
                      : "border-slate-200/80 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-amber-400/[0.06] transition group-hover:scale-150" />
                  <div
                    className={`relative flex h-9 w-9 items-center justify-center rounded-lg ${
                      dark ? "bg-white/[0.04]" : "bg-slate-100"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                  </div>
                  <h3 className="relative mt-3 text-sm font-black uppercase tracking-wide">
                    {card.title}
                  </h3>
                  <p
                    className={`relative mt-1 text-[11px] leading-relaxed ${
                      dark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </section>

          {/* ================= SECTION 04: START ================= */}
          <SectionHeader number="04" label="LANGKAH" title="Mulai dari Sini" />

          <section className="mt-6 space-y-2">
            {START_STEPS.map(
              (step: { title: string; description: string }, i: number) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className={`group flex items-center gap-4 rounded-xl border px-4 py-3 transition ${
                    dark
                      ? "border-white/[0.06] bg-white/[0.02] hover:border-white/20"
                      : "border-slate-200/80 bg-white hover:border-slate-300"
                  }`}
                >
                  <span className="font-mono text-2xl font-black text-amber-500 dark:text-amber-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-black uppercase tracking-wider">
                      {step.title}
                    </p>
                    <p
                      className={`mt-0.5 text-[11px] ${
                        dark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                  <ChevronRight
                    className={`h-4 w-4 transition group-hover:translate-x-0.5 ${
                      dark ? "text-slate-600" : "text-slate-400"
                    }`}
                  />
                </motion.div>
              ),
            )}
          </section>

          {/* ================= HELP CTA ================= */}
          <section className="mt-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/5 p-8"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-amber-400/20 blur-3xl" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30">
                  <Users className="h-5 w-5 text-black" />
                </div>
                <h2 className="mt-5 text-3xl font-black uppercase leading-tight tracking-tight">
                  Masih bingung?
                  <br />
                  <span className="text-amber-500 dark:text-amber-400">
                    Chat saya.
                  </span>
                </h2>
                <p
                  className={`mt-3 max-w-sm text-xs leading-relaxed ${
                    dark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Saya bantu arahkan dari pemilihan platform, pendaftaran,
                  deposit, verifikasi grup, sampai koneksi ke MT5 & setup
                  XAUUSD.
                </p>
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href={waLink("Halo Cangboy, saya butuh bantuan.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-3 font-mono text-[11px] font-black uppercase tracking-wider text-black shadow-lg shadow-amber-500/30 transition hover:shadow-amber-500/50"
                >
                  <MessageCircle className="h-4 w-4" />
                  CHAT CANGBOY
                  <ArrowRight className="h-3.5 w-3.5" />
                </motion.a>
              </div>
            </motion.div>
          </section>

          {/* ================= DISCLAIMER ================= */}
          <section className="mt-12">
            <div
              className={`flex items-start gap-3 rounded-xl border p-4 text-[11px] ${
                dark
                  ? "border-white/[0.06] bg-white/[0.02] text-slate-500"
                  : "border-slate-200/80 bg-white text-slate-500"
              }`}
            >
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500 dark:text-amber-400" />
              <div className="leading-relaxed">
                <p className="font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Disclaimer
                </p>
                <p className="mt-1.5">
                  Trading berisiko tinggi dan tidak cocok untuk semua orang.
                  Halaman ini hanya menyediakan link referensi dan edukasi
                  umum. Tidak ada jaminan keuntungan.
                </p>
                <p className="mt-1.5 font-bold text-slate-600 dark:text-slate-400">
                  Jangan pernah bagikan password, OTP, atau API key kepada
                  siapa pun.
                </p>
              </div>
            </div>
          </section>

          {/* ================= FOOTER ================= */}
          <footer className="mt-12 flex flex-col items-center gap-3 border-t border-white/[0.06] pt-8">
            <div className="flex items-center gap-2">
              <div className="relative h-6 w-6 overflow-hidden rounded-lg ring-1 ring-amber-400/40">
                <Image
                  src={SITE.profileImage}
                  alt={SITE.name}
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </div>
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em]">
                THIS IS <span className="text-amber-400">{SITE.short}</span>
              </span>
            </div>
            <p
              className={`font-mono text-[10px] ${
                dark ? "text-slate-600" : "text-slate-400"
              }`}
            >
              © {new Date().getFullYear()} · ALL RIGHTS RESERVED
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
              className={`fixed bottom-24 right-5 z-30 flex h-10 w-10 items-center justify-center rounded-full border shadow-xl backdrop-blur-xl transition ${
                dark
                  ? "border-white/10 bg-[#08090c]/90 text-slate-300 hover:bg-[#0f1116]"
                  : "border-slate-200 bg-white/90 text-slate-600 hover:bg-white"
              }`}
            >
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* ================= STICKY CTA ================= */}
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-4">
          <motion.a
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 1.2,
              type: "spring",
              stiffness: 160,
              damping: 20,
            }}
            whileTap={{ scale: 0.97 }}
            href={`#${activePhaseId}`}
            className="pointer-events-auto flex w-full max-w-md items-center justify-between gap-2 rounded-full border border-amber-400/30 bg-[#08090c]/90 px-2 py-2 pl-5 shadow-2xl shadow-amber-500/20 backdrop-blur-xl"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span className="font-mono text-[11px] font-black uppercase tracking-wider text-white">
                {totalPct === 100 ? "SEMUA SELESAI" : "LANJUT PANDUAN"}
              </span>
            </span>
            <span className="flex items-center gap-2">
              {totalDone > 0 && (
                <span className="rounded-full bg-amber-400/15 px-2.5 py-1 font-mono text-[10px] font-black text-amber-400">
                  {totalDone}/{totalSteps}
                </span>
              )}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-black">
                <ArrowRight className="h-4 w-4" />
              </span>
            </span>
          </motion.a>
        </div>

        {/* ================= TOAST ================= */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="fixed left-1/2 top-20 z-50 -translate-x-1/2 rounded-full border border-amber-400/40 bg-[#08090c] px-4 py-2 shadow-2xl shadow-amber-500/20"
            >
              <span className="flex items-center gap-2 font-mono text-[11px] font-black uppercase tracking-wider text-amber-400">
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
              onClick={() => setCelebrate(null)}
            >
              <Confetti active={!!celebrate} />
              <motion.div
                initial={{ scale: 0.6, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                onClick={(e) => e.stopPropagation()}
                className={`relative mx-4 max-w-sm overflow-hidden rounded-3xl border p-8 text-center shadow-2xl ${
                  celebrate === "all"
                    ? "border-cyan-400/30 bg-[#08090c]"
                    : "border-amber-400/30 bg-[#08090c]"
                }`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
                    celebrate === "all" ? "via-cyan-400" : "via-amber-400"
                  }`}
                />
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
                  className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full shadow-lg ${
                    celebrate === "all"
                      ? "bg-gradient-to-br from-cyan-400 to-blue-500 shadow-cyan-500/50"
                      : "bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-500/50"
                  }`}
                >
                  <Trophy className="h-10 w-10 text-black" />
                </motion.div>
                <p
                  className={`mt-5 font-mono text-[10px] font-black uppercase tracking-[0.25em] ${
                    celebrate === "all" ? "text-cyan-400" : "text-amber-400"
                  }`}
                >
                  {celebrate === "all"
                    ? "// mission_complete"
                    : "// phase_cleared"}
                </p>
                <h3 className="mt-2 text-2xl font-black uppercase tracking-tight text-white">
                  {celebrate === "all"
                    ? "Semua Selesai! 🏆"
                    : "Fase Selesai! 🎉"}
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  {celebrate === "all"
                    ? "Akun MT5 sudah tersambung & XAUUSD siap. Waktunya mulai trading dengan disiplin."
                    : "Registrasi, deposit, dan verifikasi grup selesai. Lanjut ke fase berikutnya: hubungkan ke MT5."}
                </p>
                <button
                  type="button"
                  onClick={() => setCelebrate(null)}
                  className={`mt-5 inline-flex items-center gap-2 rounded-xl px-6 py-2.5 font-mono text-[11px] font-black uppercase tracking-wider text-black shadow-lg transition hover:scale-[1.03] ${
                    celebrate === "all"
                      ? "bg-gradient-to-r from-cyan-400 to-blue-500 shadow-cyan-500/40"
                      : "bg-gradient-to-r from-amber-400 to-orange-500 shadow-amber-500/40"
                  }`}
                >
                  OK
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

// ============ KOMPONEN BANTU ============
interface SectionHeaderProps {
  number: string;
  label: string;
  title: string;
  subtitle?: string;
}

function SectionHeader({ number, label, title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      className="mt-16"
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 dark:text-amber-400">
          {number}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-amber-400/40 to-transparent" />
        <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          {label}
        </span>
      </div>
      <h2 className="mt-3 text-2xl font-black uppercase tracking-tight sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-1 font-mono text-[11px] font-black uppercase tracking-widest text-amber-500 dark:text-amber-400">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}