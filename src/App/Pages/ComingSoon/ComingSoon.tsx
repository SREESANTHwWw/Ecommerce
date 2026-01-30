import { motion } from "framer-motion";

const ComingSoon = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center text-white bg-[var(--main-web-color)] relative overflow-hidden">

      {/* Glow background */}
      <div className="absolute w-[300px] h-[300px] bg-[var(--grad)] rounded-full blur-3xl animate-pulse"></div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-bold tracking-wide"
      >
        Coming Soon 🚀
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-3 text-slate-300 text-lg"
      >
        This feature is under development
      </motion.p>

      {/* Loader */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="mt-10 w-12 h-12 border-4 border-white/20 border-t-cyan-400 rounded-full"
      />

    </div>
  );
};

export default ComingSoon;
