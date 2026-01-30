import { useEffect, useState } from "react";
import { Typography } from "../../../@All/AppForm/Form";
import { motion, AnimatePresence } from "framer-motion";
import vegpick from '../../../assets/vegpick.webp'

const slides = [
  {
    title: "Spicy delicious chicken wings",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: vegpick, // ✅ NOT {vegpick}
  },
  {
    title: "Grilled chicken special",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: vegpick, // or another image
  },
  {
    title: "New tasty chicken combo",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: vegpick,
  },
];


export default function HomeCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <motion.div
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      className="relative w-full overflow-hidden rounded-3xl p-6 bg-[var(--bg-color-ca)]"
    >
      <div className="relative h-[450px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-full h-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 p-10 items-center h-full">
              <div className="space-y-7">
                <Typography className="text-5xl text-white font-bold">
                  {slides[current].title}
                </Typography>

                <Typography className="text-white">
                  {slides[current].desc}
                </Typography>

                <div className="flex gap-4 text-white">
                  <Typography className="text-red-700 text-2xl line-through">
                    1000
                  </Typography>
                  <Typography className="text-2xl">700</Typography>
                </div>

                <button className="mt-5 bg-black text-white px-6 py-3 rounded-full">
                  View
                </button>
              </div>

              <div className="flex justify-center w-full h-full">
                <img
                  src={slides[current].img}
                  className="w-full h-full rounded-2xl object-cover"
                  alt="carousel"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 p-3 rounded-full shadow text-white text-3xl"
      >
        ‹
      </button>

      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 p-3 rounded-full shadow text-white text-3xl"
      >
        ›
      </button>
    </motion.div>
  );
}
