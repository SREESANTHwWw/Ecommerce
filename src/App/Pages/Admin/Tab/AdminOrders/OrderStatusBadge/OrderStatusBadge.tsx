import { motion } from "framer-motion";
import { Typography } from "../../../../../../@All/AppForm/Form";

// Define the valid status types based on your backend Schema
type OrderStatus = 
  | "PLACED" 
  | "PROCESSING" 
  | "SHIPPED" 
  | "OUT_FOR_DELIVERY" 
  | "DELIVERED" 
  | "CANCELLED" 
  | "RETURNED";

interface BadgeConfig {
  bg: string;
  text: string;
  dot: string;
  label: string;
}

export const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  // Configuration mapping backend keys to frontend styles and display labels
  const config: Record<OrderStatus, BadgeConfig> = {
    PLACED: { 
      bg: "bg-slate-50", 
      text: "text-slate-700", 
      dot: "bg-slate-400", 
      label: "Placed" 
    },
    PROCESSING: { 
      bg: "bg-amber-50", 
      text: "text-amber-700", 
      dot: "bg-amber-500", 
      label: "Processing" 
    },
    SHIPPED: { 
      bg: "bg-blue-50", 
      text: "text-blue-700", 
      dot: "bg-blue-500", 
      label: "Shipped" 
    },
    OUT_FOR_DELIVERY: { 
      bg: "bg-indigo-50", 
      text: "text-indigo-700", 
      dot: "bg-indigo-500", 
      label: "Out for Delivery" 
    },
    DELIVERED: { 
      bg: "bg-emerald-50", 
      text: "text-emerald-700", 
      dot: "bg-emerald-500", 
      label: "Delivered" 
    },
    CANCELLED: { 
      bg: "bg-rose-50", 
      text: "text-rose-700", 
      dot: "bg-rose-500", 
      label: "Cancelled" 
    },
    RETURNED: { 
      bg: "bg-purple-50", 
      text: "text-purple-700", 
      dot: "bg-purple-500", 
      label: "Returned" 
    },
  };

  const style = config[status] || config.PLACED;

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/50 shadow-sm transition-colors duration-200 ${style.bg} ${style.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot} ${status === 'PROCESSING' || status === 'OUT_FOR_DELIVERY' ? 'animate-pulse' : ''}`} />
      <Typography className="text-[10px] font-black uppercase tracking-wider whitespace-nowrap">
        {style.label}
      </Typography>
    </motion.div>
  ); 
};