import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Typography } from "../../../../../../@All/AppForm/Form";
import { useGetAllOrderQuery } from "../../../../../../@All/Component/APIs/OrdersApi";
import { useEffect, useState } from "react";



export const ChartSection = () => {

    const {
      data,
       
    } = useGetAllOrderQuery({});
 

const getDayName = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short", 
  });
};

  const [chartData ,setChartData] = useState<any>([])

useEffect(() => {
  if (!data?.orders) return;

  const revenueMap: Record<string, number> = {
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0,
  };

  data.orders.forEach((order: any) => {
   
    if (order.payment?.status === "SUCCESS") {
      const day = getDayName(order.createdAt);
      revenueMap[day] += order.totalAmount;
    }
    console.log(revenueMap);
    
  });
  

  const formattedData = Object.keys(revenueMap).map((day) => ({
    name: day,
    revenue: revenueMap[day],
  }));

  setChartData(formattedData);
}, [data]);


 return(
  
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.5 }}
    className="rounded-3xl border border-slate-100 p-8 bg-white shadow-sm"
  >
    <div className="flex justify-between items-center mb-8">
      <div className="flex flex-col">
        <Typography className="text-xl font-bold text-slate-900">Revenue Analytics</Typography>
        <Typography className="text-sm text-slate-500">Weekly performance metrics</Typography>
      </div>
    
    </div>

    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
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
  </motion.div>)
};