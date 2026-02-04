import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Typography } from "../../AppForm/Form";

const messages = [
  "Waking up the server...",
  "Powering on free hosting...",
  "Almost there, stay with us!",
  "Brewing some digital coffee..."
];

const AnimationLoading = () => {
  const [index, setIndex] = useState(0);

  // Cycle through messages while waiting
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xl bg-[var(--main-web-color)] z-50">
      <div className="flex flex-col items-center gap-8">
        
      
        <div className="relative h-24 w-24">
        
          <motion.div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/10 dark:bg-white/10 rounded-full blur-md"
            animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
          
       
          <motion.div
            className="w-16 h-16 bg-[var(--main-bg-color)] rounded-2xl mx-auto flex items-center justify-center relative shadow-lg"
            animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
           
            <div className="flex gap-2">
              <motion.div 
                className="w-2 h-2 bg-[var(--main-web-color-2)] rounded-full" 
                animate={{ scaleY: [1, 0.1, 1] }} 
                transition={{ repeat: Infinity, duration: 2, times: [0, 0.1, 0.2] }}
              />
              <motion.div 
                className="w-2 h-2 bg-[var(--main-web-color-2)] rounded-full" 
                animate={{ scaleY: [1, 0.1, 1] }} 
                transition={{ repeat: Infinity, duration: 2, times: [0, 0.1, 0.2] }}
              />
            </div>
            
           
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-4 bg-gray-400">
               <motion.div 
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-400 rounded-full"
                animate={{ backgroundColor: ["#f87171", "#60a5fa", "#f87171"] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
               />
            </div>
          </motion.div>
        </div>

        
        <div className="h-12 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={messages[index]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <Typography className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {messages[index]}
              </Typography>
            </motion.div>
          </AnimatePresence>
          
          <Typography className="text-2xl text-gray-400 mt-2 uppercase tracking-tighter">
            Free tier hosting might take 10-15s to spin up
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default AnimationLoading;