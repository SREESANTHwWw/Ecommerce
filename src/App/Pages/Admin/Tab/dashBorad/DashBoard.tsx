import { useEffect, useState } from "react";
import { socket } from "../../../../../@All/Component/APIs/Socket"; // adjust path
import { useGetAllOrderQuery } from "../../../../../@All/Component/APIs/OrdersApi";
import { useGetAllUsersQuery } from "../../../../../@All/Component/APIs/UserApi";
import { Users, Package, ShoppingBag,  IndianRupee} from "lucide-react";
import { Typography } from "../../../../../@All/AppForm/Form";
import { StatCard } from "./StatCard/StaCard";
import { ChartSection } from "./ChartSection/CharSection";
import { formatNumber } from "../../../../../@All/Functions/FormatNumber";

const DashBord = () => {
  const {
    data,
    refetch,   
  } = useGetAllOrderQuery({});

  const { data: UsersData } = useGetAllUsersQuery({});
 const [revenue, setRevenue] = useState<string>("0");

    console.log(UsersData);
    
  const totalOrders = data?.totalOrders

  useEffect(() => {
    const totalRevenue =
      data?.orders?.reduce(
        (sum: number, order: any) => sum + order.totalAmount,
        0
      ) || 0;

    setRevenue( formatNumber(totalRevenue) );
  }, [data]);

  // 🔔 SOCKET LISTENER
  useEffect(() => {
    socket.connect();
    socket.emit("join-admin");

    socket.on("new-order", (order:any) => {
      console.log("New order arrived:", order);

      refetch(); // ✅ THIS updates count + revenue instantly
    });

    return () => {
      socket.off("new-order");
      socket.disconnect();
    };
  }, [refetch]);

  return (
    <div className="p-8 min-h-screen bg-[#F8FAFC]">
      <header className="mb-8 flex flex-col">
        <Typography className="text-3xl font-black text-slate-900">
          Overview
        </Typography>
        <Typography className="text-slate-500 text-sm mt-1">
          Welcome back, here's what's happening today.
        </Typography>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          isPositive={true}
         trend=""
          title="Total Users"
          value={UsersData?.users?.length}
          icon={Users}
          delay={0.1}
        />
        <StatCard
          isPositive={true}
         trend=""
          title="Active Products"
          value="342"
          icon={Package}
          delay={0.2}
        />
        <StatCard
          isPositive={true}
         trend=""
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          delay={0.3}
        />
        <StatCard
          isPositive={true}
         trend=""
          title="Revenue"
          value={revenue}
          icon={IndianRupee}
          delay={0.4}
        />
      </div>

      <ChartSection />
    </div>
  );
};

export default DashBord;
