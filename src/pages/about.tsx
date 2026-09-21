"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  Briefcase,
  Camera,
  Check,
  ChevronDown,
  Compass,
  GraduationCap,
  Heart,
  Lightbulb,
  MessageCircle,
  Quote,
  Send,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Video,
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
interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tone: "slate" | "amber" | "emerald";
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

// ============ ISI STORY (EDIT DI SINI) ============
const STORY = {
  intro: {
    eyebrow: "// about_me",
    headline: "Dari Anak Biasa Jadi Trader",
    subhead:
      "Perjalanan saya bukan garis lurus. Ada masa bingung, salah langkah, dan hampir menyerah. Ini ceritanya.",
  },

  // Timeline sebelum jadi trader
  timeline: [
    {
      year: "2016",
      title: "Lulus SMA, Bingung Mau Ke Mana",
      description:
        "Saya lulus dengan nilai standar. Tidak punya bayangan mau kerja apa. Sementara teman-teman sudah punya rencana jelas, saya masih bingung arah.",
      icon: GraduationCap,
      tone: "slate",
    },
    {
      year: "2017",
      title: "Kerja Serabutan",
      description:
        "Coba berbagai kerjaan: bantu toko, jasa antar, sampai jadi admin online shop. Gaji pas-pasan, capek fisik, tapi tetap tidak cukup. Saya sadar: kalau begini terus, 5 tahun lagi saya di posisi yang sama.",
      icon: Briefcase,
      tone: "slate",
    },
    {
      year: "2018",
      title: "Kenal Dunia Trading dari Teman",
      description:
        "Seorang teman menunjukkan chart di HP-nya. Dalam sehari katanya bisa dapat lebih dari gaji saya seminggu. Saya skeptis, tapi penasaran. Malam itu saya pulang dan mulai cari-cari di internet.",
      icon: Compass,
      tone: "amber",
    },
    {
      year: "2019",
      title: "Terjun Tanpa Ilmu — Dan Kehilangan Modal",
      description:
        "Saya buka akun, deposit, dan langsung trading tanpa belajar. Hasilnya? Modal habis dalam 2 minggu. Saya frustrasi, hampir menyerah, dan sempat berhenti total 3 bulan.",
      icon: AlertTriangle,
      tone: "amber",
    },
    {
      year: "2020",
      title: "Mulai dari Nol — Kali Ini Serius",
      description:
        "Saya mulai belajar beneran. Baca buku, ikut kelas dasar, latihan di akun demo selama 6 bulan tanpa deposit sama sekali. Saya disiplin dengan risk management dan jurnal trading.",
      icon: BookOpen,
      tone: "amber",
    },
    {
      year: "2021",
      title: "Konsisten di Akun Real",
      description:
        "Setelah 6 bulan di demo, saya coba lagi di akun real dengan modal kecil. Kali ini hasilnya beda. Bukan karena saya jadi hebat, tapi karena saya disiplin. Saya paham: trading bukan soal menang cepat, tapi soal bertahan lama.",
      icon: TrendingUp,
      tone: "emerald",
    },
    {
      year: "2023",
      title: "Mulai Bagi Ilmu",
      description:
        "Makin banyak yang tanya cara mulai. Saya sadar, kebanyakan pemula mengulangi kesalahan saya dulu: terjun tanpa ilmu. Akhirnya saya mulai bikin konten edukasi sederhana untuk membantu mereka.",
      icon: Heart,
      tone: "emerald",
    },
  ] as TimelineItem[],

  // Pelajaran dari perjalanan
  lessons: [
    {
      title: "Modal bukan yang utama",
      description:
        "Yang bikin beda bukan besar kecilnya modal, tapi seberapa paham kamu dengan apa yang kamu lakukan.",
    },
    {
      title: "Tidak ada jalan pintas",
      description:
        "Semua 'strategi rahasia' yang saya coba di awal ujungnya gagal. Yang bertahan itu disiplin, bukan trik.",
    },
    {
      title: "Belajar itu investasi, bukan biaya",
      description:
        "Uang yang saya pakai buat kelas dasar dan buku justru menyelamatkan sisa modal saya dari kerugian lebih besar.",
    },
    {
      title: "Fokus proses, bukan hasil",
      description:
        "Begitu saya berhenti mengejar profit cepat dan mulai fokus ke proses yang benar, hasilnya justru mengikuti.",
    },
  ] as LessonItem[],

  // Prinsip
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
      "Saya ingin kamu tidak mengulangi kesalahan yang saya lakukan. Kalau kamu bisa mulai dengan cara yang lebih benar, kenapa tidak?",
      "Semua link, panduan, dan video di halaman ini saya susun supaya kamu bisa jalan mandiri. Tapi kalau tetap bingung, saya selalu siap bantu.",
    ],
  },
};

// ============ UTIL ============
function waLink(msg: string): string {
  const n = SITE.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${n}?text=${encodeURIComponent(msg)}`;
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

// ============ TIMELINE ============
function Timeline({ items }: { items: TimelineItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toneMap: Record<
    TimelineItem["tone"],
    { dot: string; ring: string; badge: string; line: string }
  > = {
    slate: {
      dot: "bg-slate-600",
      ring: "border-slate-600",
      badge: "bg-slate-500/15 text-slate-300",
      line: "bg-gradient-to-b from-slate-600 to-slate-600/20",
    },
    amber: {
      dot: "bg-gradient-to-br from-amber-400 to-orange-500",
      ring: "border-amber-400",
      badge: "bg-amber-400/15 text-amber-300",
      line: "bg-gradient-to-b from-amber-400 to-amber-400/20",
    },
    emerald: {
      dot: "bg-gradient-to-br from-emerald-400 to-teal-500",
      ring: "border-emerald-400",
      badge: "bg-emerald-400/15 text-emerald-300",
      line: "bg-gradient-to-b from-emerald-400 to-emerald-400/20",
    },
  };

  return (
    <div className="mt-8">
      {items.map((item, i) => {
        const Icon = item.icon;
        const isLast = i === items.length - 1;
        const isOpen = openIndex === i;
        const tone = toneMap[item.tone];

        return (
          <motion.div
            key={`${item.year}-${item.title}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: i * 0.05 }}
            className="relative flex gap-4"
          >
            {/* Timeline column */}
            <div className="relative flex w-10 shrink-0 flex-col items-center">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-label={`Lihat detail ${item.year}`}
                className={`relative z-10 mt-1 flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                  isOpen
                    ? `${tone.ring} ${tone.dot}`
                    : `border-white/10 bg-[#08090c] hover:${tone.ring}`
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    isOpen ? "text-black" : "text-slate-400"
                  }`}
                />
              </button>
              {!isLast && (
                <div className={`mt-1 w-px flex-1 ${tone.line}`} />
              )}
            </div>

            {/* Content */}
            <div className={`flex-1 ${isLast ? "pb-0" : "pb-8"}`}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="group flex w-full items-start justify-between gap-3 text-left"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-sm px-2 py-0.5 font-mono text-[10px] font-black tracking-widest ${tone.badge}`}
                    >
                      {item.year}
                    </span>
                  </div>
                  <h3 className="mt-2 text-base font-black uppercase tracking-tight text-white sm:text-lg">
                    {item.title}
                  </h3>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 shrink-0 text-slate-500 group-hover:text-slate-300"
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
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {item.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ============ HALAMAN UTAMA ============
export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#08090c] text-white">
      {/* Background */}
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
        {/* ================= BACK ================= */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-widest text-amber-400 transition hover:gap-3"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
          Kembali ke Beranda
        </Link>

        {/* ================= HERO PROFIL ================= */}
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

          {/* Headline */}
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

          {/* Quote */}
          <div className="mt-8 rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/[0.06] via-transparent to-orange-500/[0.03] p-5">
            <Quote className="h-5 w-5 text-amber-400" />
            <p className="mt-3 text-sm italic leading-relaxed text-slate-200">
              &ldquo;Saya dulu pikir trading itu soal keberuntungan. Sekarang
              saya tahu, ini soal kedisiplinan dan kesabaran.&rdquo;
            </p>
            <p className="mt-3 font-mono text-[10px] font-black uppercase tracking-widest text-amber-400">
              — CANGBOY
            </p>
          </div>
        </motion.section>

        {/* ================= TIMELINE ================= */}
        <SectionHeader
          number="01"
          label="JOURNEY"
          title="Perjalanan Sebelum Jadi Trader"
          subtitle="Dari bingung sampai konsisten"
        />

        <Timeline items={STORY.timeline} />

        {/* ================= PELAJARAN ================= */}
        <SectionHeader
          number="02"
          label="LESSON LEARNED"
          title="Yang Saya Pelajari"
          subtitle="Dari pengalaman pahit"
        />

        <div className="mt-6 space-y-3">
          {STORY.lessons.map((lesson, i) => (
            <motion.div
              key={lesson.title}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
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

        {/* ================= PRINSIP ================= */}
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

        {/* ================= CLOSING ================= */}
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
              className="text-sm leading-relaxed text-slate-300 last:text-slate-400"
            >
              {p}
            </p>
          ))}
        </motion.div>

        {/* ================= CTA ================= */}
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

        {/* ================= SOCIAL ================= */}
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

        {/* ================= FOOTER ================= */}
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