"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  Briefcase,
  Camera,
  Check,
  Compass,
  Heart,
  Lightbulb,
  MessageCircle,
  Quote,
  Send,
  Shield,
  Ship,
  Sparkles,
  Store,
  Target,
  TrendingUp,
  Trophy,
  Tv,
  User,
  Utensils,
  Video,
  Wrench,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ============ KONFIGURASI ============
const SITE = {
  name: "THIS IS CANGBOY",
  short: "CANGBOY",
  handle: "@thisiscangboy",
  profileImage: "/images/thisisocan.jpeg",
  whatsappNumber: "6281241768395",
  socials: {
    instagram: "https://instagram.com/thisiscangboy",
    youtube: "https://youtube.com/@thisiscangboy",
    telegram: "https://t.me/thisiscangboy",
  },
} as const;

// ============ TIPE ============
interface TimelineImage {
  src: string;
  alt: string;
  caption?: string;
}

interface TimelineItem {
  id: string;
  type: "experience" | "insight";
  period: string;
  title: string;
  subtitle?: string;
  description: string;
  icon: LucideIcon;
  tone: "slate" | "amber" | "emerald";
  images?: TimelineImage[];
  tag?: string;
}

interface LessonItem {
  title: string;
  description: string;
}

interface PrincipleItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

// ============ ISI STORY ============
const STORY = {
  intro: {
    eyebrow: "// about_me",
    headline: "Dari Anak Biasa Jadi Trader",
    subhead:
      "Perjalanan saya bukan garis lurus. Ada masa bingung, salah langkah, dan hampir menyerah. Ini ceritanya — lengkap dengan jejak usaha yang saya jalani sebelum akhirnya sampai di dunia trading.",
    quote:
      "Saya dulu pikir trading itu soal keberuntungan. Sekarang saya tahu, ini soal kedisiplinan dan kesabaran.",
  },

  timeline: [
    {
      id: "youtube",
      type: "experience",
      period: "2017 — 2022",
      title: "YouTube",
      subtitle: "Content Creator",
      description:
        "Awalnya cuma iseng bikin video, tapi di sini saya belajar banyak hal: public speaking, edit video, bikin thumbnail, dan yang paling penting — berani tampil apa adanya. Berkat YouTube juga saya belajar bahwa konten yang jujur itu lebih dihargai daripada yang sok sempurna.",
      icon: Video,
      tone: "slate",
      images: [
        {
          src: "/images/about/youtube-1.jpg",
          alt: "Momen YouTube",
          caption: "Salah satu momen saat bikin konten",
        },
      ],
    },
    {
      id: "ldr-tea",
      type: "experience",
      period: "2019 — 2022",
      title: "LDR Tea",
      subtitle: "Business Owner",
      description:
        "Bisnis minuman pertama saya. Dibangun dari nol bareng tim kecil yang solid. Dari sini saya belajar: leadership bukan soal siapa paling pintar, tapi siapa yang paling bisa dipercaya untuk menjaga amanah. Meskipun akhirnya kami tutup, tim-nya tetap jadi saudara sampai sekarang.",
      icon: Store,
      tone: "amber",
      images: [
        {
          src: "/images/about/ldr-tea-1.jpg",
          alt: "LDR Tea store",
          caption: "Outlet pertama LDR Tea",
        },
        {
          src: "/images/about/ldr-tea-team.jpg",
          alt: "Tim LDR Tea",
          caption: "Tim yang luar biasa",
        },
      ],
    },
    {
      id: "kenal-trading",
      type: "insight",
      period: "2019",
      title: "Pertama Kali Kenal Trading",
      subtitle: "Momen kecil yang mengubah arah",
      description:
        "Di tengah sibuknya kerja, saya iseng cari tahu soal trading. Awalnya cuma baca-baca, tidak paham apa-apa. Tapi ada satu hal yang langsung menarik perhatian saya: market itu tidak pandang status. Mau kamu kaya, miskin, pejabat, atau anak kuliahan — aturannya sama. Ini kesetaraan yang tidak saya temukan di tempat kerja biasa.",
      icon: Compass,
      tone: "amber",
    },
    {
      id: "telur-gulung",
      type: "experience",
      period: "2021 — 2023",
      title: "Telur Gulung",
      subtitle: "Street Food Hustle",
      description:
        "Jualan telur gulung keliling pakai motor. Kadang hujan, kadang dagangan tidak laku, kadang pulang jam 2 pagi. Tapi dari sini saya belajar yang namanya 'hustle' sesungguhnya — tidak ada yang namanya gagal, yang ada cuma belum berhasil. Dan alhamdulillah, tim kecil saya sangat kompak.",
      icon: Utensils,
      tone: "amber",
      images: [
        {
          src: "/images/about/telur-gulung-1.jpg",
          alt: "Motor jualan telur gulung",
          caption: "Motor setia jualan telur gulung",
        },
        {
          src: "/images/about/telur-gulung-team-1.jpg",
          alt: "Tim telur gulung 1",
          caption: "Tim jualan",
        },
        {
          src: "/images/about/telur-gulung-team-2.jpg",
          alt: "Tim telur gulung 2",
          caption: "Kompak selalu",
        },
      ],
    },
    {
      id: "kerja",
      type: "experience",
      period: "2023 — 2026",
      title: "Kerja",
      subtitle: "Full-time Employee",
      description:
        "Setelah beberapa usaha berjalan, saya juga sempat kerja sebagai karyawan. Bukan karena gagal, tapi karena saya ingin belajar dari dalam: bagaimana sistem kerja besar dibangun, bagaimana tim profesional bergerak. Pengalaman ini yang bikin saya lebih sabar dan terstruktur.",
      icon: Briefcase,
      tone: "slate",
      images: [
        {
          src: "/images/about/kerja-1.jpg",
          alt: "Momen kerja",
          caption: "Momen di tempat kerja",
        },
      ],
    },
    {
      id: "suruh-apa-saja",
      type: "experience",
      period: "2024 — 2026",
      title: "Suruh Apa Saja",
      subtitle: "Founder — On-Demand Service",
      description:
        "Layanan berbasis permintaan yang saya bangun dari nol — dari angkut barang, renovasi, sampai jasa harian, semua ready 24 jam. Di sini saya belajar manajemen tim lapangan yang sesungguhnya: harus cepat, harus tanggap, dan tidak bisa mengeluh. Tahun 2025 saya juga dipercaya tampil di TV Sulsel Satu untuk bercerita soal perjalanan ini.",
      icon: Wrench,
      tone: "emerald",
      tag: "TV Sulsel 2025",
      images: [
        {
          src: "/images/about/tv-sulsel.jpg",
          alt: "Momen di TV Sulsel",
          caption: "Penampilan di TV Sulsel Satu, 2025",
        },
      ],
    },
    {
      id: "ekspor-impor",
      type: "experience",
      period: "2025 — 2026",
      title: "Ekspor Impor Arang",
      subtitle: "International Trading",
      description:
        "Masuk ke bisnis arang dengan skala yang lebih besar. Belajar manage supplier, dokumentasi ekspor, sampai negosiasi dengan pembeli luar negeri. Dari sini saya makin paham: bisnis yang kuat bukan soal cepat untung, tapi soal sistem yang bisa dipercaya.",
      icon: Ship,
      tone: "emerald",
      images: [
        {
          src: "/images/about/arang-1.jpg",
          alt: "Proses arang",
          caption: "Proses produksi arang",
        },
        {
          src: "/images/about/arang-2.jpg",
          alt: "Pengiriman arang",
          caption: "Persiapan pengiriman ekspor",
        },
      ],
    },
    {
      id: "sekarang",
      type: "insight",
      period: "2026 — Sekarang",
      title: "Fase Sekarang",
      subtitle: "Waktu Bebas • Market Adil • Kontrol Diri",
      description:
        "Setelah semua yang saya jalani, saya sadar trading memberi saya tiga hal yang tidak saya dapatkan di tempat lain: waktu yang bebas (tidak terikat jam kerja), market yang adil (tidak peduli status sosial), dan yang paling penting — kontrol diri. Trading mengajarkan saya sabar, disiplin, dan bertanggung jawab atas setiap keputusan.",
      icon: Target,
      tone: "emerald",
    },
  ] as TimelineItem[],

  lessons: [
    {
      title: "Semua usaha ada waktunya",
      description:
        "Ada usaha yang berjalan lama, ada yang harus ditutup. Yang penting bukan hasilnya, tapi apa yang kamu bawa dari pengalaman itu.",
    },
    {
      title: "Tidak ada jalan pintas",
      description:
        "Semua 'strategi rahasia' yang saya coba di awal ujungnya gagal. Yang bertahan itu disiplin, bukan trik.",
    },
    {
      title: "Kegagalan itu biaya belajar",
      description:
        "Setiap usaha yang gagal mengajarkan saya sesuatu yang tidak bisa dibeli dengan uang — sampai saya akhirnya paham cara memperlakukan uang dengan benar.",
    },
    {
      title: "Kontrol diri mengalahkan modal",
      description:
        "Yang membedakan orang sukses dan tidak bukan besar kecilnya modal, tapi seberapa bisa dia mengendalikan dirinya sendiri.",
    },
  ] as LessonItem[],

  principles: [
    {
      title: "Edukasi Dulu",
      description:
        "Setiap rekomendasi saya sertai panduan lengkap supaya kamu tidak terjun tanpa ilmu.",
      icon: BookOpen,
    },
    {
      title: "Transparan",
      description:
        "Saya tidak menyembunyikan link referensi. Kamu tahu persis apa yang kamu klik.",
      icon: Shield,
    },
    {
      title: "Tanpa Janji Manis",
      description:
        "Tidak ada 'profit pasti' atau 'cepat kaya'. Trading punya risiko, itu fakta.",
      icon: Target,
    },
    {
      title: "Support Seumur Jalan",
      description:
        "Kalau kamu stuck, chat saja. Saya bantu arahkan sampai kamu paham.",
      icon: MessageCircle,
    },
  ] as PrincipleItem[],

  closing: {
    headline: "Kenapa Saya Bikin Halaman Ini",
    paragraphs: [
      "Karena saya pernah di posisi kamu sekarang — bingung, takut salah, dan tidak tahu harus mulai dari mana.",
      "Saya ingin kamu tidak mengulangi kesalahan yang saya lakukan. Semua usaha yang saya jalani sebelum ini mengajarkan satu hal: kalau bisa mulai dengan cara yang lebih benar, kenapa tidak?",
      "Semua link, panduan, dan video di halaman ini saya susun supaya kamu bisa jalan mandiri. Tapi kalau tetap bingung, saya selalu siap bantu.",
    ],
  },
};

// ============ UTIL ============
function waLink(msg: string): string {
  const n = SITE.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${n}?text=${encodeURIComponent(msg)}`;
}

// ============ SECTION HEADER ============
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
        <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">
          {number}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-amber-400/40 to-transparent" />
        <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
          {label}
        </span>
      </div>
      <h2 className="mt-3 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-1 font-mono text-[11px] font-black uppercase tracking-widest text-amber-400">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

// ============ IMAGE SLOT ============
interface ImageSlotProps {
  image: TimelineImage;
  aspect?: "video" | "square" | "portrait";
  index?: number;
}

function ImageSlot({ image, aspect = "video", index = 0 }: ImageSlotProps) {
  const [error, setError] = useState<boolean>(false);

  const aspectClass =
    aspect === "video"
      ? "aspect-video"
      : aspect === "square"
        ? "aspect-square"
        : "aspect-[4/5]";

  const hasImage = image.src.length > 0 && !error;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`group relative overflow-hidden rounded-2xl border ${
        hasImage
          ? "border-white/10"
          : "border-dashed border-white/15 bg-white/[0.02]"
      } ${aspectClass}`}
    >
      {hasImage ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
            onError={() => setError(true)}
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          {image.caption && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-3">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-white/90">
                {image.caption}
              </p>
            </div>
          )}
          <div className="pointer-events-none absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
            <Camera className="h-3 w-3 text-white/70" />
          </div>
        </>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04]"
          >
            <Camera className="h-5 w-5 text-slate-500" />
          </motion.div>
          <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
            Foto {index + 1}
          </p>
          <p className="max-w-[80%] text-[9px] leading-tight text-slate-600">
            {image.caption ?? "Akan ditambahkan"}
          </p>
        </div>
      )}
    </motion.div>
  );
}

// ============ IMAGE GRID ============
interface ImageGridProps {
  images: TimelineImage[];
}

function ImageGrid({ images }: ImageGridProps) {
  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="mt-5">
        <ImageSlot image={images[0]} aspect="video" index={0} />
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="mt-5 grid grid-cols-2 gap-3">
        <ImageSlot image={images[0]} aspect="square" index={0} />
        <ImageSlot image={images[1]} aspect="square" index={1} />
      </div>
    );
  }

  const [first, ...rest] = images;
  return (
    <div className="mt-5 space-y-3">
      <ImageSlot image={first} aspect="video" index={0} />
      <div
        className={`grid gap-3 ${
          rest.length === 1
            ? "grid-cols-1"
            : rest.length === 2
              ? "grid-cols-2"
              : "grid-cols-3"
        }`}
      >
        {rest.map((img, i) => (
          <ImageSlot
            key={`${img.src}-${i}`}
            image={img}
            aspect="square"
            index={i + 1}
          />
        ))}
      </div>
    </div>
  );
}

// ============ INSIGHT CARD ============
function InsightCard({ item }: { item: TimelineItem }) {
  const Icon = item.icon;
  const tone = {
    slate: {
      border: "border-slate-500/20",
      glow: "bg-slate-500/10",
      icon: "text-slate-300",
      accent: "text-slate-300",
      bg: "from-slate-500/[0.06] via-transparent to-slate-500/[0.02]",
    },
    amber: {
      border: "border-amber-400/25",
      glow: "bg-amber-400/15",
      icon: "text-amber-400",
      accent: "text-amber-400",
      bg: "from-amber-500/[0.08] via-transparent to-orange-500/[0.03]",
    },
    emerald: {
      border: "border-emerald-400/25",
      glow: "bg-emerald-400/15",
      icon: "text-emerald-400",
      accent: "text-emerald-400",
      bg: "from-emerald-500/[0.08] via-transparent to-teal-500/[0.03]",
    },
  }[item.tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className={`relative overflow-hidden rounded-3xl border ${tone.border} bg-gradient-to-br ${tone.bg} p-5 sm:p-6`}
    >
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full ${tone.glow} blur-3xl`}
      />

      <div className="relative flex items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${tone.border} bg-black/30`}
        >
          <Icon className={`h-5 w-5 ${tone.icon}`} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`font-mono text-[10px] font-black uppercase tracking-[0.25em] ${tone.accent}`}
            >
              {item.period}
            </span>
            <span className="rounded-sm bg-white/[0.06] px-2 py-0.5 font-mono text-[9px] font-black uppercase tracking-widest text-slate-400">
              Insight
            </span>
          </div>

          <h3 className="mt-2 text-lg font-black uppercase tracking-tight text-white sm:text-xl">
            {item.title}
          </h3>
          {item.subtitle && (
            <p
              className={`mt-0.5 font-mono text-[10px] font-bold uppercase tracking-widest ${tone.accent}`}
            >
              {item.subtitle}
            </p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ============ EXPERIENCE CARD ============
interface ExperienceCardProps {
  item: TimelineItem;
  index: number;
}

function ExperienceCard({ item, index }: ExperienceCardProps) {
  const Icon = item.icon;
  const tone = {
    slate: {
      num: "text-slate-500",
      border: "border-white/[0.06] hover:border-white/20",
      iconBg: "bg-slate-500/10",
      icon: "text-slate-300",
      period: "text-slate-400",
    },
    amber: {
      num: "text-amber-400",
      border: "border-amber-400/15 hover:border-amber-400/40",
      iconBg: "bg-amber-400/10",
      icon: "text-amber-400",
      period: "text-amber-400",
    },
    emerald: {
      num: "text-emerald-400",
      border: "border-emerald-400/15 hover:border-emerald-400/40",
      iconBg: "bg-emerald-400/10",
      icon: "text-emerald-400",
      period: "text-emerald-400",
    },
  }[item.tone];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.04 }}
      className={`group relative overflow-hidden rounded-3xl border bg-white/[0.02] p-5 transition ${tone.border} sm:p-6`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${tone.iconBg}`}
          >
            <Icon className={`h-4 w-4 ${tone.icon}`} />
          </div>
          <div>
            <span
              className={`block font-mono text-[10px] font-black uppercase tracking-[0.25em] ${tone.period}`}
            >
              {item.period}
            </span>
            {item.subtitle && (
              <span className="mt-0.5 block font-mono text-[9px] font-bold uppercase tracking-widest text-slate-500">
                {item.subtitle}
              </span>
            )}
          </div>
        </div>

        <span
          className={`font-mono text-2xl font-black tabular-nums ${tone.num} opacity-40`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-black uppercase leading-tight tracking-tight text-white sm:text-3xl">
        {item.title}
      </h3>

      {item.tag && (
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1">
          <Tv className="h-3 w-3 text-amber-400" />
          <span className="font-mono text-[9px] font-black uppercase tracking-widest text-amber-400">
            {item.tag}
          </span>
        </div>
      )}

      <p className="mt-4 text-sm leading-relaxed text-slate-300">
        {item.description}
      </p>

      {item.images && item.images.length > 0 && (
        <ImageGrid images={item.images} />
      )}
    </motion.article>
  );
}

// ============ TIMELINE ============
function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="mt-6 space-y-4">
      {items.map((item, i) =>
        item.type === "insight" ? (
          <InsightCard key={item.id} item={item} />
        ) : (
          <ExperienceCard key={item.id} item={item} index={i} />
        ),
      )}
    </div>
  );
}

// ============ HALAMAN UTAMA ============
export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#08090c] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at top, rgba(245,158,11,0.08) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(34,211,238,0.06) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 6px)",
          }}
        />
      </div>

      <main className="mx-auto max-w-2xl px-5 py-12 pb-24">
        {/* BACK */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-widest text-amber-400 transition hover:gap-3"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
          Kembali ke Beranda
        </Link>

        {/* HERO PROFIL */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10"
        >
          <div className="flex items-start gap-4">
            <div className="relative h-20 w-20 shrink-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_0deg,#fbbf24,#22d3ee,#fbbf24)] opacity-50 blur-[3px]"
              />
              <div className="absolute inset-[2px] rounded-2xl bg-[#08090c]" />
              <div className="absolute inset-[4px] overflow-hidden rounded-2xl ring-1 ring-white/10">
                <Image
                  src={SITE.profileImage}
                  alt={SITE.short}
                  fill
                  sizes="80px"
                  priority
                  className="object-cover"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#08090c] bg-emerald-500">
                <Check className="h-3 w-3 text-white" strokeWidth={4} />
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-amber-400">
                {STORY.intro.eyebrow}
              </p>
              <h1 className="mt-1 text-2xl font-black uppercase leading-tight tracking-tight sm:text-3xl">
                {SITE.short}
              </h1>
              <p className="text-xs font-semibold text-slate-400">
                {SITE.handle}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-400/5 px-2.5 py-0.5 font-mono text-[9px] font-black uppercase tracking-widest text-amber-400">
                  <Zap className="h-2.5 w-2.5" />
                  Trader
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-2.5 py-0.5 font-mono text-[9px] font-black uppercase tracking-widest text-cyan-400">
                  <Sparkles className="h-2.5 w-2.5" />
                  Educator
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-0.5 font-mono text-[9px] font-black uppercase tracking-widest text-emerald-400">
                  <Heart className="h-2.5 w-2.5" />
                  Creator
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-3xl font-black uppercase leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
              <span className="block bg-gradient-to-br from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                {STORY.intro.headline}
              </span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              {STORY.intro.subhead}
            </p>
          </div>

          <div className="relative mt-8 overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/[0.06] via-transparent to-orange-500/[0.03] p-5">
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-amber-400/10 blur-2xl" />
            <Quote className="relative h-5 w-5 text-amber-400" />
            <p className="relative mt-3 text-sm italic leading-relaxed text-slate-200">
              &ldquo;{STORY.intro.quote}&rdquo;
            </p>
            <p className="relative mt-3 font-mono text-[10px] font-black uppercase tracking-widest text-amber-400">
              — CANGBOY
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
              <p className="font-mono text-2xl font-black text-amber-400">9+</p>
              <p className="mt-1 font-mono text-[9px] font-black uppercase tracking-widest text-slate-500">
                Tahun Usaha
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
              <p className="font-mono text-2xl font-black text-amber-400">6</p>
              <p className="mt-1 font-mono text-[9px] font-black uppercase tracking-widest text-slate-500">
                Bidang
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
              <p className="font-mono text-2xl font-black text-amber-400">
                2026
              </p>
              <p className="mt-1 font-mono text-[9px] font-black uppercase tracking-widest text-slate-500">
                Full Trading
              </p>
            </div>
          </div>
        </motion.section>

        {/* TIMELINE */}
        <SectionHeader
          number="01"
          label="JOURNEY"
          title="Perjalanan Sebelum Jadi Trader"
          subtitle="Dari usaha fisik sampai trading"
        />

        <Timeline items={STORY.timeline} />

        {/* PELAJARAN */}
        <SectionHeader
          number="02"
          label="LESSON LEARNED"
          title="Yang Saya Pelajari"
          subtitle="Dari 9 tahun perjalanan"
        />

        <div className="mt-6 space-y-3">
          {STORY.lessons.map((lesson, i) => (
            <motion.div
              key={lesson.title}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition hover:border-amber-400/20"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-400/10">
                <Lightbulb className="h-4 w-4 text-amber-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black uppercase tracking-wide text-white">
                  {lesson.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  {lesson.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* PRINSIP */}
        <SectionHeader
          number="03"
          label="PRINCIPLES"
          title="Prinsip Saya"
          subtitle="Yang saya pegang sampai sekarang"
        />

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {STORY.principles.map((principle, i) => {
            const Icon = principle.icon;
            return (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition hover:border-amber-400/30"
              >
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-amber-400/[0.06] transition group-hover:scale-150" />
                <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400/10">
                  <Icon className="h-4 w-4 text-amber-400" />
                </div>
                <h3 className="relative mt-3 text-sm font-black uppercase tracking-wide text-white">
                  {principle.title}
                </h3>
                <p className="relative mt-1 text-[11px] leading-relaxed text-slate-400">
                  {principle.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CLOSING */}
        <SectionHeader
          number="04"
          label="CLOSING"
          title={STORY.closing.headline}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-6 space-y-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
        >
          {STORY.closing.paragraphs.map((p, i) => (
            <p
              key={i}
              className={`text-sm leading-relaxed ${
                i === STORY.closing.paragraphs.length - 1
                  ? "text-slate-400"
                  : "text-slate-300"
              }`}
            >
              {p}
            </p>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="relative overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/5 p-6">
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-amber-400/15 blur-3xl" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30">
                <Brain className="h-5 w-5 text-black" />
              </div>

              <h2 className="mt-5 text-2xl font-black uppercase leading-tight tracking-tight sm:text-3xl">
                Ada yang mau ditanya?
              </h2>
              <p className="mt-2 max-w-sm text-xs leading-relaxed text-slate-400">
                Kalau kamu bingung mulai dari mana atau butuh saran personal,
                langsung chat saya. Saya jawab sendiri, bukan bot.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={waLink("Halo Cangboy, saya baca halaman About kamu.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-2.5 font-mono text-[10px] font-black uppercase tracking-widest text-black shadow-lg shadow-amber-500/20 transition hover:shadow-amber-500/40"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Ngobrol
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 font-mono text-[10px] font-black uppercase tracking-widest text-white transition hover:border-amber-400/50 hover:text-amber-400"
                >
                  <Compass className="h-3.5 w-3.5" />
                  Mulai Panduan
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SOCIAL */}
        <section className="mt-10">
          <p className="mb-3 text-center font-mono text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
            {"// ikuti keseharian saya"}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <a
              href={SITE.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 font-mono text-[10px] font-black uppercase tracking-widest text-white transition hover:border-rose-400/50 hover:text-rose-400"
            >
              <Camera className="h-3.5 w-3.5" />
              Instagram
            </a>
            <a
              href={SITE.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 font-mono text-[10px] font-black uppercase tracking-widest text-white transition hover:border-red-400/50 hover:text-red-400"
            >
              <Video className="h-3.5 w-3.5" />
              YouTube
            </a>
            <a
              href={SITE.socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 font-mono text-[10px] font-black uppercase tracking-widest text-white transition hover:border-sky-400/50 hover:text-sky-400"
            >
              <Send className="h-3.5 w-3.5" />
              Telegram
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-16 border-t border-white/[0.06] pt-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="relative h-6 w-6 overflow-hidden rounded-lg ring-1 ring-amber-400/40">
              <Image
                src={SITE.profileImage}
                alt={SITE.short}
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em]">
              THIS IS <span className="text-amber-400">{SITE.short}</span>
            </span>
          </div>
          <p className="mt-2 font-mono text-[10px] text-slate-600">
            © {new Date().getFullYear()} · ALL RIGHTS RESERVED
          </p>
        </footer>
      </main>
    </div>
  );
}