import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import {
  MoreHorizontal,
  Package,
  Calendar,
  User,
  IndianRupee,
} from "lucide-react";
import { format } from "date-fns";

import { Typography } from "../../../../../../@All/AppForm/Form";
import { OrderStatusBadge } from "../OrderStatusBadge/OrderStatusBadge";
import ActionsModal from "./ActionsModal";
import { formatNumber } from "../../../../../../@All/Functions/FormatNumber";

export const OrderRow = ({ order, index ,setUpdatemodal,setOrderId,}: any) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const actionBtnRef = useRef<HTMLButtonElement>(null);

  const [actionOpen, setActionOpen] = useState(false);
  
   
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
  });

  // Row animation
  useEffect(() => {
    if (!rowRef.current) return;

    gsap.fromTo(
      rowRef.current,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.45,
        delay: index * 0.08,
        ease: "power2.out",
      }
    );
  }, [index]);

  // Open actions menu
  const openActions = (id:any) => {
    if (!actionBtnRef.current) return;
           setOrderId(id)
    const rect = actionBtnRef.current.getBoundingClientRect();

    setMenuPosition({
      top: rect.bottom + 8,
      left: rect.right - 190, // menu width adjustment
    });

    setActionOpen(true);
  };

  useEffect(() => {
  if (!actionOpen) return;

  const handleScroll = () => setActionOpen(false);

  window.addEventListener("scroll", handleScroll, true);
  return () => window.removeEventListener("scroll", handleScroll, true);
}, [actionOpen]);

  return (
    <>
      {/* ORDER ROW */}
      <div
        ref={rowRef}
        className="group grid grid-cols-1 md:grid-cols-5 items-center gap-4 p-4 mb-3 bg-white rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300"
      >

     
        {/* Order ID & Product */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-indigo-50 transition-colors">
            <Package
              size={20}
              className="text-slate-400 group-hover:text-[var(--main-web-color)]"
            />
          </div>

          <div className="flex gap-3 items-center">
            <Typography className="text-xs font-bold text-slate-400">
              #{order?._id?.slice(-5).toUpperCase()}
            </Typography>
            <Typography className="text-sm font-black text-slate-900">
              {order?.items?.[0]?.name || "No items"}
            </Typography>
          </div>
        </div>

        {/* Customer */}
        <div className="flex items-center gap-2">
          <User size={14} className="text-slate-300" />
          <Typography className="text-sm text-slate-600 font-medium">
            {order?.userId?.firstname || "Unknown User"}
          </Typography>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-slate-300" />
          <Typography className="text-sm text-slate-500">
            {format(new Date(order.createdAt), "dd MMM yyyy")}
          </Typography>
        </div>

        {/* Status & Price */}
        <div className="flex items-center justify-between md:justify-start gap-4">
          <OrderStatusBadge status={order.orderStatus} />
          <Typography className="text-sm flex font-black text-slate-900">
            <IndianRupee size={13} className="mt-1" />
            {formatNumber(order.totalAmount)}
          </Typography>
        </div>

     
        <div className="flex justify-end">
          <button
            ref={actionBtnRef}
            onClick={()=>openActions(order?._id)}
            className="p-2 hover:bg-slate-100 cursor-pointer rounded-lg text-slate-400"
          >
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

    
      {actionOpen && (
        <ActionsModal
          position={menuPosition}
          onClose={() => setActionOpen(false)}
          setUpdatemodal={setUpdatemodal}
          setOrderId={setOrderId}
      
        />
      )}
    </>
  );
};
