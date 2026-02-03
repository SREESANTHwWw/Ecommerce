import { motion } from "framer-motion";
import { Typography } from "../../AppForm/Form";

const SpinnerLoading = () => {
  // Common transition for the rings
  const ringTransition = {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/40 dark:bg-black/20 z-50">
      <div className="flex flex-col items-center gap-8">
     
        <div className="relative flex items-center justify-center w-24 h-24">
     
          <motion.div
            className="absolute w-full h-full border-[3px] border-[var(--main-web-color-2)] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-20"
            animate={{
              rotate: 360,
              borderRadius: [
                "40% 60% 70% 30%",
                "60% 40% 30% 70%",
                "40% 60% 70% 30%",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

       
          <motion.div
            className="absolute w-16 h-16 border-t-4 border-r-4 border-[var(--main-web-color-2)] rounded-full"
            animate={{ rotate: -360 }}
            transition={{ ...ringTransition, duration: 1.5, ease: "linear" }}
          />

       
          <motion.div
            className="w-4 h-4 bg-[var(--main-web-color-2)] rounded-full shadow-[0_0_20px_var(--main-web-color-2)]"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>

  
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography className="text-xs font-bold tracking-[0.3em] uppercase text-gray-800 dark:text-gray-100">
              Preparing your experience…
            </Typography>
          </motion.div>

        
          <motion.div
            className="h-[2px] bg-[var(--main-web-color-2)] mt-2 mx-auto"
            animate={{ width: [0, 80, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SpinnerLoading;
