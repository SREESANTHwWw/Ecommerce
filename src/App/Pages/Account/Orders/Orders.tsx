import { Typography } from "../../../../@All/AppForm/Form";
import AcOrderDisplay from "./OrdersProductDisplay/AcOrderDisplay";
import { useGetMeQuery } from "../../../../@All/Component/APIs/UserApi";
import { motion } from "framer-motion";
import { ShoppingBag,  } from "lucide-react";

const Orders = () => {
  const { data: user, isLoading } = useGetMeQuery(undefined, {
  refetchOnMountOrArgChange: true,
});
  const orders = user?.data?.orders || [];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="w-full min-h-full p-4 md:p-8 mt-6"
    >
      <div className="max-w-6xl mx-auto space-y-8">
       
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[var(--main-web-color)] rounded-2xl text-white shadow-lg shadow-bg-[var(--main-web-color)]">
              <ShoppingBag size={24} />
            </div>
            <div className="flex flex-col ">
              <Typography className="text-2xl font-bold text-gray-800">Order History</Typography>
              <Typography className="text-sm text-gray-500 font-medium">
                Manage and track your {orders.length} recent purchases
              </Typography>
            </div>
          </div>
          
          {/* <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl shadow-sm text-gray-600 hover:bg-gray-50 transition-all text-sm font-semibold">
            <Filter size={16} />
            Filter
          </button> */}
        </div>

        
        <div className="relative">
          {isLoading ? (
            <div className="flex justify-center py-20">
               <div className="w-8 h-8 border-4 border-[var(--main-web-color)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <AcOrderDisplay Orders={orders} />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Orders;