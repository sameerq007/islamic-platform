"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";

type Surah = {
  number: number;
  englishName: string;
  englishNameTranslation: string;
  name: string;
  numberOfAyahs: number;
};

export default function QuranPage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get(
          "https://api.alquran.cloud/v1/surah"
        );

        setSurahs(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSurahs();
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white overflow-hidden">

      {/* TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-center text-5xl md:text-6xl font-extrabold text-cyan-400">
          Holy Quran
        </h1>

        <p className="mt-4 text-center text-gray-400 text-lg">
          Read, Explore & Listen to the Quran
        </p>
      </motion.div>

      {/* SEARCH */}
      <div className="mt-12 flex justify-center">
        <input
          type="text"
          placeholder="Search Surah..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-2xl rounded-2xl border border-cyan-500/20 bg-white/5 px-6 py-4 text-white outline-none backdrop-blur-xl placeholder:text-gray-500 focus:border-cyan-400 transition"
        />
      </div>

      {/* SURAH GRID */}
      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {surahs
          .filter((surah) =>
            surah.englishName
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((surah) => (
            <Link
              key={surah.number}
              href={`/quran/${surah.number}`}
            >
              <motion.div
                whileHover={{
                  scale: 1.04,
                  y: -6,
                }}
                transition={{ duration: 0.25 }}
                className="group rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-white/5 to-white/[0.02] p-7 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_50px_rgba(34,211,238,0.35)]"
              >

                {/* TOP */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-cyan-400">
                    {surah.englishName}
                  </h2>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400 text-cyan-400">
                    {surah.number}
                  </div>
                </div>

                {/* TRANSLATION */}
                <p className="mt-3 text-gray-400">
                  {surah.englishNameTranslation}
                </p>

                {/* ARABIC */}
                <p className="mt-8 text-right text-4xl leading-loose text-white">
                  {surah.name}
                </p>

                {/* VERSES */}
                <div className="mt-8 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    {surah.numberOfAyahs} Verses
                  </p>

                  <div className="rounded-full bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300">
                    Open →
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
      </div>

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

        <div className="mt-8 flex flex-wrap justify-center gap-4">

          <a
            href="https://github.com/sameerq007"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-cyan-400 px-6 py-3 text-cyan-300 transition hover:bg-cyan-400 hover:text-black"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-cyan-400 px-6 py-3 text-cyan-300 transition hover:bg-cyan-400 hover:text-black"
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