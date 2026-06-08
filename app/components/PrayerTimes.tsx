"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function PrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await axios.get(
          "https://api.aladhan.com/v1/timingsByCity?city=Hyderabad&country=India&method=2"
        );

        setPrayerTimes(response.data.data.timings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPrayerTimes();
  }, []);

  if (!prayerTimes) {
    return (
      <div className="text-center text-cyan-400 py-20">
        Loading Prayer Times...
      </div>
    );
  }

const currentHour = new Date().getHours();

const activePrayer = () => {
  if (currentHour < 12) return "Fajr";
  if (currentHour < 15) return "Dhuhr";
  if (currentHour < 18) return "Asr";
  if (currentHour < 19) return "Maghrib";
  return "Isha";
};

  const prayers = [
    { name: "Fajr", time: prayerTimes.Fajr },
    { name: "Dhuhr", time: prayerTimes.Dhuhr },
    { name: "Asr", time: prayerTimes.Asr },
    { name: "Maghrib", time: prayerTimes.Maghrib },
    { name: "Isha", time: prayerTimes.Isha },
  ];

  return (
    <section className="relative z-10 px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center text-5xl font-bold text-cyan-400"
      >
        Daily Prayer Times
      </motion.h2>

      <div className="mt-16 grid gap-6 md:grid-cols-5">
        {prayers.map((prayer, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`rounded-3xl border p-6 text-center backdrop-blur-xl transition-all duration-300 hover:scale-105 ${
                activePrayer() === prayer.name
                    ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_40px_rgba(34,211,238,0.5)] scale-105"
                    : "border-cyan-500/20 bg-white/5"
                }`}
          >
            <h3 className="text-2xl font-bold text-white">
              {prayer.name}
            </h3>

            {activePrayer() === prayer.name && (
                <p className="mt-2 text-xs font-semibold text-cyan-300">
                    Current Prayer
                </p>
                )}

            <p className="mt-4 text-cyan-400 text-3xl font-semibold">
              {prayer.time}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}