"use client";

import { motion } from "framer-motion";

export default function VerseCard() {
  return (
    <section className="relative z-10 px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mx-auto max-w-4xl rounded-3xl border border-cyan-500/20 bg-white/5 p-10 text-center backdrop-blur-xl hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]"
      >
        <h2 className="text-4xl font-bold text-cyan-400">
          Verse of the Day
        </h2>

        <p className="mt-10 text-5xl leading-loose text-white">
          إِنَّ ٱللَّهَ مَعَ ٱلصَّـٰبِرِينَ
        </p>

        <p className="mt-6 text-lg text-gray-300">
          “Indeed, Allah is with the patient.”
        </p>

        <p className="mt-4 text-cyan-400">
          — Surah Al-Baqarah 2:153
        </p>
      </motion.div>
    </section>
  );
}