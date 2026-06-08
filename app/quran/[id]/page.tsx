"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

type Ayah = {
  number: number;
  text: string;
  audio: string;
  translation: string;
};

type Surah = {
  englishName: string;
  englishNameTranslation: string;
  name: string;
  ayahs: Ayah[];
};

export default function SurahPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState("");

  const [surah, setSurah] = useState<Surah | null>(null);

  const [currentAyah, setCurrentAyah] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const [showTranslation, setShowTranslation] = useState(true);

  const [repeat, setRepeat] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // FIX FOR NEXTJS 16 PARAMS
  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };

    loadParams();
  }, [params]);

  // FETCH SURAH
  useEffect(() => {
    if (!id) return;

    const fetchSurah = async () => {
      try {
        const [arabicRes, englishRes] = await Promise.all([
          axios.get(
            `https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`
          ),
          axios.get(
            `https://api.alquran.cloud/v1/surah/${id}/en.asad`
          ),
        ]);

        const arabicAyahs = arabicRes.data.data.ayahs;

        const englishAyahs = englishRes.data.data.ayahs;

        const mergedAyahs = arabicAyahs.map(
          (ayah: any, index: number) => ({
            number: ayah.number,
            text: ayah.text,
            audio: ayah.audio,
            translation: englishAyahs[index]?.text || "",
          })
        );

        setSurah({
          englishName: arabicRes.data.data.englishName,
          englishNameTranslation:
            arabicRes.data.data.englishNameTranslation,
          name: arabicRes.data.data.name,
          ayahs: mergedAyahs,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchSurah();
  }, [id]);

  // AUTO SCROLL
  useEffect(() => {
    const element = document.getElementById(
      `ayah-${currentAyah}`
    );

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentAyah]);

  // PLAY AYAH
  const playAyah = (index: number) => {
    setCurrentAyah(index);

    setTimeout(() => {
      audioRef.current?.play();
      setIsPlaying(true);
    }, 100);
  };

  // PLAY / PAUSE
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // NEXT AYAH
  const nextAyah = () => {
    if (!surah) return;

    if (currentAyah < surah.ayahs.length - 1) {
      playAyah(currentAyah + 1);
    }
  };

  // PREVIOUS AYAH
  const prevAyah = () => {
    if (currentAyah > 0) {
      playAyah(currentAyah - 1);
    }
  };

  if (!surah) {
    return (
      <div className="min-h-screen bg-black text-cyan-400 flex items-center justify-center text-3xl">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      {/* TITLE */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold text-cyan-400">
          {surah.englishName}
        </h1>

        <p className="mt-3 text-gray-300 text-xl">
          {surah.englishNameTranslation}
        </p>
      </motion.div>

      {/* CONTROLS */}
      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <button
          onClick={prevAyah}
          className="bg-cyan-500 text-black px-6 py-3 rounded-xl font-bold"
        >
          Previous
        </button>

        <button
          onClick={togglePlay}
          className="bg-white text-black px-6 py-3 rounded-xl font-bold"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button
          onClick={nextAyah}
          className="bg-cyan-500 text-black px-6 py-3 rounded-xl font-bold"
        >
          Next
        </button>

        <button
          onClick={() => setRepeat(!repeat)}
          className="border border-cyan-400 px-6 py-3 rounded-xl"
        >
          Repeat: {repeat ? "ON" : "OFF"}
        </button>

        <button
          onClick={() =>
            setShowTranslation(!showTranslation)
          }
          className="border border-cyan-400 px-6 py-3 rounded-xl"
        >
          Translation:{" "}
          {showTranslation ? "ON" : "OFF"}
        </button>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden mt-10 mb-10">
        <div
          className="h-full bg-cyan-400 transition-all duration-500"
          style={{
            width: `${
              ((currentAyah + 1) /
                surah.ayahs.length) *
              100
            }%`,
          }}
        />
      </div>

      {/* AUDIO */}
      <audio
        ref={audioRef}
        src={surah.ayahs[currentAyah]?.audio}
        onEnded={() => {
          if (repeat) {
            playAyah(currentAyah);
          } else {
            nextAyah();
          }
        }}
      />

      {/* AYAH LIST */}
      <div className="space-y-10">
        {surah.ayahs.map((ayah, index) => (
          <motion.div
            id={`ayah-${index}`}
            key={ayah.number}
            whileHover={{ scale: 1.01 }}
            className={`rounded-3xl border p-8 transition-all duration-300 ${
              currentAyah === index
                ? "border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.6)]"
                : "border-cyan-500/20"
            }`}
          >
            <div className="flex justify-between items-center">
              <p className="text-cyan-400 font-bold">
                Verse {index + 1}
              </p>

              <button
                onClick={() => playAyah(index)}
                className="w-12 h-12 rounded-full border border-cyan-400 text-cyan-400"
              >
                {index + 1}
              </button>
            </div>

            {/* ARABIC */}
            <p className="text-5xl leading-[90px] text-right mt-10">
              {ayah.text}
            </p>

            {/* TRANSLATION */}
            {showTranslation && (
              <p className="mt-8 text-gray-300 text-xl leading-10">
                {ayah.translation}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </main>
  );
}