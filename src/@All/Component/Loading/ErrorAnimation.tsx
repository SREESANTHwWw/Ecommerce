import { motion } from "framer-motion";
import { Typography } from "../../AppForm/Form";
import { AlertCircle, RefreshCcw } from "lucide-react"; // Optional: Use Lucide icons if available

const ErrorAnimation = ({ onRetry }: { onRetry?: () => void }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md  z-50">
      <div className="flex flex-col items-center max-w-sm p-8 text-center bg-[var(--main-web-color)]  shadow-2xl rounded-3xl border border-red-100 dark:border-red-900/30">
        
     
        <div className="relative mb-6">
       
          <motion.div
            className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-20"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          
      
          <motion.div
            className="relative w-20 h-20 bg-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg"
            animate={{ 
              x: [0, -4, 4, -4, 4, 0],
              rotate: [0, -2, 2, -2, 2, 0] 
            }}
            transition={{ repeat: Infinity, duration: 0.5, repeatDelay: 2 }}
          >
            <AlertCircle size={40} strokeWidth={2.5} />
          </motion.div>
        </div>

      
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col"
        >
           
          <Typography className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Something went sideways
          </Typography>
          <Typography className="text-sm text-gray-500 dark:text-gray-400 mb-8 px-4 leading-relaxed">
            The free server might have timed out or had a hiccup. It happens to the best of us!
          </Typography>
           
        </motion.div>
       

     
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry || (() => window.location.reload())}
          className="flex items-center cursor-pointer gap-2 px-6 py-3 bg-[var(--main-web-color-2)] text-white rounded-xl font-semibold shadow-md transition-colors hover:bg-opacity-90"
        >
          <RefreshCcw size={18} />
          Try Again
        </motion.button>
        
        <Typography className="mt-4 text-[10px] text-gray-400 uppercase tracking-widest">
          Error Code: 503 Service Unavailable
        </Typography>
      </div>
    </div>
  );
};

export default ErrorAnimation;