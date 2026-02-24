import { useEffect, useRef } from "react";
import { motion, useSpring, useTransform, useMotionValue, useInView } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Typography } from "../../../../../../@All/AppForm/Form";

interface StatCardProps {
  title: string;
  value: string | number;
  trend: string;
  icon: LucideIcon;
  isPositive: boolean;
  delay: number;
}

/**
 * Helper component to handle the numeric counter logic
 */
const AnimatedCounter = ({ value, delay }: { value: number; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const count = useMotionValue(0);
  
  // useSpring makes the counting "feel" better than a linear animation
  const springValue = useSpring(count, {
    damping: 30,
    stiffness: 100,
  });

  // Transform the raw number into a formatted string (with commas)
  const displayValue = useTransform(springValue, (latest) => 
    Math.round(latest).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      // Start the count after the card entry animation finishes
      const timeout = setTimeout(() => {
        count.set(value);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [value, count, delay, isInView]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

export const StatCard = ({
  title,
  value,
  trend,
  icon: Icon,
  isPositive,
  delay,
}: StatCardProps) => {
  // Convert string values (like "1,250") to pure numbers for the animation engine
  const numericValue = typeof value === "string" 
    ? parseFloat(value.replace(/[^0-9.-]+/g, "")) 
    : value;

  // Check if the original value had a prefix like "$"
  const prefix = typeof value === "string" && value.startsWith("$") ? "$" : "";
  const suffix = typeof value === "string" && value.endsWith("%") ? "%" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        ease: "easeOut" 
      }}
      className="group rounded-2xl border border-slate-100 p-6 bg-white hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-indigo-50 rounded-xl text-[var(--main-web-color)] group-hover:bg-[var(--main-web-color-2)] group-hover:text-white transition-colors duration-300">
          <Icon size={24} />
        </div>
        
        <div
          className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
            isPositive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-rose-50 text-rose-600"
          }`}
        >
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend}
        </div>
      </div>

      <div className="flex flex-col">
        <Typography className="text-slate-500 text-sm font-medium">
          {title}
        </Typography>
        <Typography className="text-3xl font-black text-slate-900 mt-1">
          {prefix}
          <AnimatedCounter value={numericValue || 0} delay={delay} />
          {suffix}
        </Typography>
      </div>
    </motion.div>
  );
};