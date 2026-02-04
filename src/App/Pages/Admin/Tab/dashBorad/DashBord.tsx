import { motion } from "framer-motion";
import { Users, Package, ShoppingBag, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Typography } from "../../../../../@All/AppForm/Form";

// Mock Data for the Chart
const data = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

const StatCard = ({ title, value, trend, icon: Icon, isPositive, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="group rounded-2xl border border-slate-100 p-6 bg-white hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {trend}
      </div>
    </div>
    <Typography className="text-slate-500 text-sm font-medium">{title}</Typography>
    <Typography className="text-3xl font-black text-slate-900 mt-1">{value}</Typography>
  </motion.div>
);

function Dashboard() {
  return (
    <div className="p-8 min-h-screen bg-[#F8FAFC]">
      <header className="mb-8">
        <Typography className="text-3xl font-black text-slate-900 tracking-tight">Overview</Typography>
        <Typography className="text-slate-500 text-sm mt-1">Welcome back, here's what's happening today.</Typography>
      </header>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" value="1,245" trend="12%" icon={Users} isPositive={true} delay={0.1} />
        <StatCard title="Active Products" value="342" trend="3%" icon={Package} isPositive={false} delay={0.2} />
        <StatCard title="Total Orders" value="876" trend="8%" icon={ShoppingBag} isPositive={true} delay={0.3} />
        <StatCard title="Revenue" value="$12,340" trend="5%" icon={DollarSign} isPositive={true} delay={0.4} />
      </div>

      {/* --- CHART SECTION --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="rounded-3xl border border-slate-100 p-8 bg-white shadow-sm"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <Typography className="text-xl font-bold text-slate-900">Revenue Analytics</Typography>
            <Typography className="text-sm text-slate-500">Weekly performance metrics</Typography>
          </div>
          <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-2 outline-none">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 12}}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 12}}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#4f46e5" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;