import { useEffect } from "react";
import { motion,  } from "framer-motion";
import { Check, Package,  PartyPopper } from "lucide-react";

const SuccessNotification = ({ onClose, orderId = "ORD-7721" }: { onClose?: () => void, orderId?: string }) => {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
      {/* Ultra-dark backdrop with heavy blur */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-xl"
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 40 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="relative bg-white rounded-[3rem] w-full max-w-sm overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)]"
      >
        {/* Animated Success Background */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-50 to-white" />

        <div className="relative pt-12 pb-8 px-8 text-center">
          {/* Main Success Icon with Pulse */}
          <div className="relative mx-auto w-24 h-24 mb-6">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              className="relative z-10 flex items-center justify-center w-full h-full rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-200"
            >
              <Check size={48} strokeWidth={3} />
            </motion.div>
            
            {/* Soft decorative rings */}
            {[1, 1.2, 1.4].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: [0.4, 0], scale: s + 0.5 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                className="absolute inset-0 rounded-full bg-emerald-200 -z-0"
              />
            ))}
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Woohoo!</h2>
            <p className="text-gray-500 font-medium mt-1">Payment & Order Confirmed</p>
          </motion.div>

          {/* Order Details Mini-Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Package size={18} className="text-indigo-600" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order ID</p>
                <p className="text-sm font-bold text-gray-800">#{orderId}</p>
              </div>
            </div>
            <PartyPopper size={20} className="text-amber-400" />
          </motion.div>

          {/* Action Button */}
          
          
          <button 
            onClick={onClose}
            className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors"
          >
            Dismiss
          </button>
        </div>

        {/* Confetti Elements using Framer Motion */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                top: "50%", 
                left: "50%", 
                opacity: 1, 
                scale: 0 
              }}
              animate={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                opacity: 0,
                scale: Math.random() * 1.5,
                rotate: 360
              }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className={`absolute w-2 h-2 rounded-sm ${
                ["bg-blue-400", "bg-emerald-400", "bg-amber-400", "bg-rose-400"][i % 4]
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessNotification;