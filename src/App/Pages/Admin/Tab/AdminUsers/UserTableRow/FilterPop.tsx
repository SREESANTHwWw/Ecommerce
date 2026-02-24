import {
  RotateCcw,
  Shield,
  User as UserIcon,
  Check,
  Filter,
} from "lucide-react";
import { Typography } from "../../../../../../@All/AppForm/Form";
import { motion } from "framer-motion";

const FilterPopover = ({ onApply, onReset, setFilters, filters }: any) => {
  const roles = [
    { label: "Admin", value: "admin", icon: Shield },
    { label: "User", value: "user", icon: UserIcon },
    { label: "All", value: "", icon: Filter },
  ];

  const statuses = [
    { label: "Active", value: "active" },
    { label: "Pending", value: "pending" },
    { label: "Suspended", value: "suspended" },
    { label: "all", value: "" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 5, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden"
    >
      <div className="p-4 space-y-5">
        {/* Compact Role Selection */}
        <div>
          <div className="flex justify-between items-center mb-2 px-1">
            <Typography className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Role
            </Typography>
            <button
              onClick={onReset}
              className="text-slate-400 hover:text-indigo-600 transition-colors"
            >
              <RotateCcw size={12} />
            </button>
          </div>
          <div className="flex gap-1.5">
            {roles.map((role) => (
              <button
                key={role.label}
                onClick={() => setFilters({ ...filters, role: role.value })}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border text-[11px] font-bold transition-all ${
                  filters.role === role.value
                    ? "bg-[var(--main-web-color)] border-[var(--main-web-color-2)] text-white"
                    : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <role.icon size={12} />
                {role.label}
              </button>
            ))}
          </div>
        </div>

        {/* Minimal Status Selection */}
        <div>
          <Typography className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
            Status
          </Typography>
          <div className="grid grid-cols-2 gap-1.5">
            {statuses.map((status) => {
              
              const isActive = filters.status === status.value;

              return (
                <button
                  key={status.value}
                  onClick={() =>
                    setFilters({ ...filters, status: status.value })
                  }
                  className={`flex items-center cursor-pointer justify-between px-3 py-1.5 rounded-lg border text-xs capitalize transition-all ${
                    isActive
                      ? "bg-[var(--main-web-color)] border-slate-900 text-white"
                      : "bg-white border-slate-100 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  {status.label}
                  {isActive && <Check size={10} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Small Action Footer */}
      <button
        onClick={() => onApply(filters)}
        className="w-full bg-[var(--main-web-color)] hover:bg-[var(--main-web-color-2)] hover:text-[var(--main-bg-color)] cursor-pointer text-gray-200 py-2.5 text-xs font-bold border-t border-slate-100 transition-all"
      >
        Apply Filter Settings
      </button>
    </motion.div>
  );
};

export default FilterPopover;
