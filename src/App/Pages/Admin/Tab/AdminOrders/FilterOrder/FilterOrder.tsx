import {
  RotateCcw,
  Check,
  DollarSign,
  Calendar,
  CreditCard,
  Activity,
} from "lucide-react";
import { Typography } from "../../../../../../@All/AppForm/Form";
import { motion } from "framer-motion";

const FilterPopover = ({ onApply, onReset, setFilters, filters }: any) => {
  const statuses = [
    { label: "Placed", value: "PLACED" },
    { label: "Processing", value: "PROCESSING" },
    { label: "Shipped", value: "SHIPPED" },
    { label:"Out of Delivery", value:"OUT_FOR_DELIVERY"} ,
    { label: "Delivered", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELLED" },
  ];

  // New Payment Filter Options
  const paymentMethods = [
    { label: "COD", value: "COD" },
    { label: "Card", value: "CARD" },
    { label: "UPI", value: "UPI" },
    { label: "Wallet", value: "WALLET" },
    { label: "Razorpay", value: "RAZORPAY" },
  ];

  const paymentStatuses = [
    { label: "Pending", value: "PENDING" },
    { label: "Success", value: "SUCCESS" },
    { label: "Failed", value: "FAILED" },
    { label: "Refunded", value: "REFUNDED" },
  ];

  const updateRange = (
    key: "priceRange" | "date",
    index: number,
    val: string,
  ) => {
    const current = filters[key] ? filters[key].split(",") : ["", ""];
    current[index] = val;
    setFilters({ ...filters, [key]: current.join(",") });
  };

  const [minPrice, maxPrice] = filters.priceRange?.split(",") || ["", ""];
  const [startDate, endDate] = filters.date?.split(",") || ["", ""];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute right-0 mt-3 w-80 bg-white rounded-3xl border border-slate-200 shadow-2xl z-50 p-5 space-y-6 max-h-[100vh] "
    >
      {/* 1. Order Status */}
      <div>
        <Typography className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
          Order Status
        </Typography>
        <div className="grid grid-cols-2 gap-1.5">
          {statuses.map((s) => (
            <button
              key={s.value}
              onClick={() =>
                setFilters({
                  ...filters,
                  status: filters.status === s.value ? "" : s.value,
                })
              }
              className={`flex items-center cursor-pointer justify-between px-3 py-2 rounded-xl border text-[11px] font-bold transition-all ${filters.status === s.value ? "bg-slate-900 border-slate-900 text-white" : "bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100"}`}
            >
              {s.label} {filters.status === s.value && <Check size={10} />}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Payment Method (NEW) */}
      <div>
        <div className="flex items-center gap-1 mb-3 px-1">
          <CreditCard size={12} className="text-slate-400" />
          <Typography className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Payment Method
          </Typography>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {paymentMethods.map((m) => (
            <button
              key={m.value}
              // Changed 'method' to 'paymentMethods' to match your parent state
              onClick={() =>
                setFilters({
                  ...filters,
                  paymentMethods:
                    filters.paymentMethods === m.value ? "" : m.value,
                })
              }
              className={`flex items-center cursor-pointer justify-between px-3 py-2 rounded-xl border text-[11px] font-bold transition-all ${
                filters.paymentMethods === m.value
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : "bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100"
              }`}
            >
              {m.label}{" "}
              {filters.paymentMethods === m.value && <Check size={10} />}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Payment Status (NEW) */}
      <div>
        <div className="flex items-center gap-1 mb-3 px-1">
          <Activity size={12} className="text-slate-400" />
          <Typography className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Payment Status
          </Typography>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {paymentStatuses.map((ps) => (
            <button
              key={ps.value}
              onClick={() =>
                setFilters({
                  ...filters,
                  paymentStatus:
                    filters.paymentStatus === ps.value ? "" : ps.value,
                })
              }
              className={`flex items-center cursor-pointer justify-between px-3 py-2 rounded-xl border text-[11px] font-bold transition-all ${filters.paymentStatus === ps.value ? "bg-emerald-600 border-emerald-600 text-white" : "bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100"}`}
            >
              {ps.label}{" "}
              {filters.paymentStatus === ps.value && <Check size={10} />}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Date Range */}
      <div>
        <div className="flex items-center gap-1 mb-3 px-1">
          <Calendar size={12} className="text-slate-400" />
          <Typography className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Date Range
          </Typography>
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => updateRange("date", 0, e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 cursor-pointer rounded-lg px-2 py-1.5 text-[11px] font-medium outline-none focus:border-indigo-300 text-slate-600"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => updateRange("date", 1, e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-lg px-2 py-1.5 text-[11px] font-medium outline-none focus:border-indigo-300 text-slate-600"
          />
        </div>
      </div>

      {/* 5. Price Range */}
      <div>
        <div className="flex items-center gap-1 mb-3 px-1">
          <DollarSign size={12} className="text-slate-400"/>
          <Typography className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price Range</Typography>
        </div>
        <div className="flex items-center gap-2">
          <input 
            type="number" placeholder="Min" value={minPrice} 
            onChange={e => updateRange('priceRange', 0, e.target.value)} 
            className="w-full bg-slate-50 border border-slate-100 rounded-lg px-2 py-1.5 text-[11px] outline-none focus:border-indigo-300"
          />
          <div className="h-[1px] w-4 bg-slate-200" />
          <input 
            type="number" placeholder="Max" value={maxPrice} 
            onChange={e => updateRange('priceRange', 1, e.target.value)} 
            className="w-full bg-slate-50 border border-slate-100 rounded-lg px-2 py-1.5 text-[11px] outline-none focus:border-indigo-300"
          />
        </div>
      </div>

      {/* 6. Footer Actions */}
      <div className="flex gap-2 pt-2">
        <button
          onClick={onReset}
          className="flex-1 cursor-pointer bg-slate-100 text-slate-600 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-200 flex items-center justify-center gap-2"
        >
          <RotateCcw size={14} /> Reset
        </button>
        <button
          onClick={onApply}
          className="flex-[2] cursor-pointer bg-[var(--main-web-color)] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[var(--main-web-color-2)] shadow-lg shadow-indigo-100 transition-all active:scale-95"
        >
          Apply
        </button>
      </div>
    </motion.div>
  );
};

export default FilterPopover;
