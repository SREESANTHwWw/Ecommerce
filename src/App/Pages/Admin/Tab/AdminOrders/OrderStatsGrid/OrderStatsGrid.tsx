import { Layers, RefreshCcw, Truck, CheckCircle2, XCircle, } from "lucide-react";
import { Typography } from "../../../../../../@All/AppForm/Form";

export const OrderStatsGrid = ({ OrderData }: any) => {
  const statusCounts = OrderData?.statusCounts || {};
  

  const STATS_CONFIG = [
    { label: "All Orders", value: OrderData?.totalOrders || 0, icon: Layers, color: "text-[var(--main-web-color)]", bg: "bg-indigo-50" },
    { label: "Placed", value: statusCounts?.PLACED || 0, icon: RefreshCcw, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Processing", value: statusCounts?.PROCESSING || 0, icon: RefreshCcw, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Shipped", value: statusCounts?.SHIPPED || 0, icon: Truck, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Out of DELIVERY", value: statusCounts?.OUT_FOR_DELIVERY || 0, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-lime-50" },
    { label: "Delivered", value: statusCounts?.DELIVERED || 0, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
     
    { label: "Cancelled", value: statusCounts?.CANCELLED || 0, icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
   
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {STATS_CONFIG.map((stat) => (
        <div
          key={stat.label}
          className="stat-card group relative overflow-hidden bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500"
        >
          <stat.icon className="absolute -right-2 -bottom-2 w-20 h-20 opacity-[0.03] group-hover:scale-110 transition-transform duration-700" />

          <div className="flex flex-col h-full justify-between gap-4">
            <div className="flex justify-between items-start">
              <div className={`p-2.5 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg">
                Live
              </span>
            </div>

            <div>
              <Typography className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {stat.label}
              </Typography>
              <div className="flex items-baseline gap-1">
                <Typography className="text-3xl font-black text-slate-900 mt-1">
                  {stat.value}
                </Typography>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
