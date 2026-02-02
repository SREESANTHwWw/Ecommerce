import { motion, AnimatePresence } from "framer-motion";
import { CommonImage, Typography } from "../../../../../@All/AppForm/Form";
import { useState } from "react";
import { ChevronDown, Package, Calendar, } from "lucide-react";

const AcOrderDisplay = ({ Orders = [] }: any) => {
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  };

  if (Orders.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
        <Package size={48} className="mx-auto text-gray-300 mb-4" />
        <Typography className="text-lg font-bold text-gray-800">No orders yet</Typography>
        <Typography className="text-sm text-gray-500">When you buy items, they will appear here.</Typography>
      </motion.div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
      {Orders.map((order: any) => {
        const isOpen = openOrderId === order._id;

        return (
          <motion.div
            key={order._id}
            variants={itemAnim}
            className={`group bg-white border transition-all duration-300 rounded-[1.5rem] ${
              isOpen ? "border-indigo-200 shadow-2xl shadow-indigo-100/50" : "border-gray-100 shadow-sm hover:shadow-md"
            }`}
          >
            {/* Header Row */}
            <div className="p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="hidden sm:block p-3 bg-gray-50 rounded-xl group-hover:bg-indigo-50 transition-colors">
                  <Package size={20} className="text-gray-400 group-hover:text-[var(--main-web-color)]" />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Typography className="font-bold text-gray-900">#{order._id.slice(-8)}</Typography>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      order.orderStatus === "DELIVERED" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {order.orderStatus}
                    </span>
                  </div>
                  <Typography className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <Calendar size={12} /> Ordered on {new Date().toLocaleDateString()}
                  </Typography>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right md:flex flex-col gap-2 hidden ">
                  <Typography className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Total Amount</Typography>
                  <Typography className="text-lg font-black text-gray-900">₹{order.totalAmount}</Typography>
                </div>
                
                <motion.button
                  onClick={() => setOpenOrderId(isOpen ? null : order._id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-full cursor-pointer transition-colors ${isOpen ? "bg-[var(--main-web-color)] text-white" : "bg-gray-100 text-gray-500"}`}
                >
                  <ChevronDown size={20} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </motion.button>
              </div>
            </div>

           
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t  border-gray-50 bg-gray-50/30 rounded-b-[1.5rem]"
                >
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {order.items.map((item: any) => (
                        <div key={item._id} className="flex gap-4 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
                          <CommonImage src={item.image} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                          <div className="flex flex-col justify-center">
                            <Typography className="text-sm font-bold text-gray-800 line-clamp-1">{item.name}</Typography>
                            <Typography className="text-xs text-gray-500">Qty: {item.qty} × ₹{item.price}</Typography>
                            <Typography className="text-sm font-bold text-[var(--main-web-color)] mt-1">₹{item.total}</Typography>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-end md:items-center pt-4 border-t border-gray-200/50 gap-4">
                      <div className="flex gap-4">
                         <div className="text-center flex flex-col gap-1">
                           <Typography className="text-[10px] text-gray-400 font-bold uppercase">Subtotal</Typography>
                           <Typography className="font-semibold text-gray-700">₹{order.subtotal}</Typography>
                         </div>
                         <div className="text-center flex flex-col gap-1">
                           <Typography className="text-[10px] text-gray-400 font-bold uppercase">Discount</Typography>
                           <Typography className="font-semibold text-red-500">-₹{order.discount}</Typography>
                         </div>
                      </div>
                      {/* <button className="group flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all">
                        Track Shipment
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button> */}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default AcOrderDisplay;