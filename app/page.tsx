"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import MoonScene from "./components/MoonScene";
import PrayerTimes from "./components/PrayerTimes";
import VerseCard from "./components/VerseCard";

export default function Home() {
    const particles = Array.from({ length: 40 }).map((_, index) => ({
  id: index,
  left: `${(index * 13) % 100}%`,
  top: `${(index * 17) % 100}%`,
  duration: 3 + (index % 5),
}));
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Background Glow */}
            {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute h-1 w-1 rounded-full bg-cyan-400 opacity-40"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,200,0.15),transparent_40%)]" />

      {/* Floating Blur */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <h1 className="text-2xl font-bold tracking-wide text-cyan-400">
          NoorVerse
        </h1>

        <div className="flex gap-6 text-sm text-gray-300">
          <a href="/quran" className="transition hover:text-cyan-400">
             Quran
            </a>
          <a href="#" className="transition hover:text-cyan-400">
             Goals
            </a>
          <a href="#" className="transition hover:text-cyan-400">
             Challenges
            </a>
          <a href="#" className="transition hover:text-cyan-400">
             Leaderboard
            </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex min-h-[75vh] flex-col items-center justify-center text-center px-6">

      
          <div className="mb-6">
            <MoonScene />
          </div>
        

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl text-5xl md:text-7xl font-extrabold leading-tight"
        >
          Elevate Your <span className="text-cyan-400">Iman</span> Through
          Technology
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 max-w-2xl text-lg text-gray-400"
        >
          Build Quran habits, track your worship, join challenges,
          maintain streaks, and explore Islamic knowledge in a futuristic
          immersive experience.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex gap-4"
        >
          <button className="rounded-full bg-cyan-400 px-8 py-4 font-semibold text-black transition hover:scale-105 hover:bg-cyan-300">
            Start Journey
          </button>

          <button className="rounded-full border border-cyan-400 px-8 py-4 font-semibold text-cyan-400 transition hover:bg-cyan-400 hover:text-black">
            Explore Quran
          </button>
        </motion.div>

        {/* Floating Stars */}
        <Star className="absolute left-20 top-40 text-cyan-400 opacity-40" />
        <Star className="absolute right-32 bottom-40 text-emerald-400 opacity-40" />
                {/* Feature Cards */}
        <div className="mt-28 grid gap-8 md:grid-cols-4">

          <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]">
            <h3 className="text-xl font-semibold text-cyan-400">
              Quran Tracking
            </h3>

            <p className="mt-3 text-gray-400">
              Track verses, pages, and daily Quran recitation progress.
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-500/20 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <h3 className="text-xl font-semibold text-emerald-400">
              Daily Streaks
            </h3>

            <p className="mt-3 text-gray-400">
              Maintain worship streaks and stay consistent every day.
            </p>
          </div>

          <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-400">
            <h3 className="text-xl font-semibold text-cyan-400">
              Challenges
            </h3>

            <p className="mt-3 text-gray-400">
              Join community challenges and improve your iman together.
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-500/20 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-emerald-400">
            <h3 className="text-xl font-semibold text-emerald-400">
              Leaderboard
            </h3>

            <p className="mt-3 text-gray-400">
              Stay motivated through healthy and inspiring competition.
            </p>
          </div>

        </div>
      </section>
      <PrayerTimes />
      <VerseCard />
       {/* FOOTER */}
<div className="mt-28 border-t border-cyan-500/20 pt-14 pb-20 text-center">

  <h2 className="text-2xl font-bold text-cyan-400">
    Developed & Designed By
  </h2>

  <p className="mt-5 text-4xl font-extrabold text-white">
    Mohammed Sameer Ali Qureshi
  </p>

  <p className="mt-3 text-lg text-gray-400">
    Full Stack Web Developer
  </p>

  <div className="mt-8 flex flex-wrap justify-center gap-4 relative z-50">

    <a
      href="https://github.com/sameerq007"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-2xl border border-cyan-400 px-6 py-3 text-cyan-300 transition hover:bg-cyan-400 hover:text-black cursor-pointer"
    >
      GitHub
    </a>

    <a
      href="https://linkedin.com"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-2xl border border-cyan-400 px-6 py-3 text-cyan-300 transition hover:bg-cyan-400 hover:text-black cursor-pointer"
    >
      LinkedIn
    </a>

  </div>

  <p className="mt-10 text-sm text-gray-600">
    © 2026 Islamic Platform. All Rights Reserved.
  </p>

</div>
    </main>
  );
}