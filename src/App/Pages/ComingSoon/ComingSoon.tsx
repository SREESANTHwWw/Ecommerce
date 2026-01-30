import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center text-white bg-[var(--main-web-color)] relative overflow-hidden">
      <div className=" flex ">
        <button
          className="bg-[var(--main-web-color-2)] w-full h-10 hover:bg-[var(--main-web-color)] p-4 cursor-pointer text-white rounded-md"
          onClick={() => navigate("/")}
        >
          Navigate Home
        </button>
      </div>

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
