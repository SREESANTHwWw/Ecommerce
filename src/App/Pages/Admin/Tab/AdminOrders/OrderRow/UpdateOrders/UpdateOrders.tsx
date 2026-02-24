import React, { useState, useEffect } from "react";
import {
  useGetOrderByidQuery,
  useUpdateOrderStatusMutation,
} from "../../../../../../../@All/Component/APIs/OrdersApi";
import { Typography } from "../../../../../../../@All/AppForm/Form";

type OrderStatus =
  | "PLACED"
  | "SHIPPED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED"
  | "PROCESSING";

interface Order {
  _id: string;
  userId: { email: string };
  orderStatus: OrderStatus;
  totalAmount: number;
  payment: { method: string; status: string };
  items: any[];
  createdAt: string;
}

/** Map of current status to ALL possible next actions */
const availableTransitions: Record<OrderStatus, OrderStatus[]> = {
  PROCESSING: ["SHIPPED", "CANCELLED"],
  PLACED: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["OUT_FOR_DELIVERY"],
  OUT_FOR_DELIVERY: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

const UpdateOrders: React.FC<{ orderId: string; onClose?: () => void }> = ({
  orderId,
  onClose,
}) => {
  const [order, setOrder] = useState<Order | null>(null);
  const { data, isLoading } = useGetOrderByidQuery(orderId, { skip: !orderId });
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  useEffect(() => {
    if (data?.order) setOrder(data.order);
  }, [data]);

  const handleUpdate = async (status: OrderStatus) => {
    if (!order) return;
    try {
      await updateOrderStatus({ id: orderId, orderStatus: status }).unwrap();
      setOrder((prev) => (prev ? { ...prev, orderStatus: status } : prev));
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (isLoading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <Typography className="font-bold text-slate-600">
            Loading Order...
          </Typography>
        </div>
      </div>
    );

  if (!order) return null;
  const nextOptions = availableTransitions[order.orderStatus];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex justify-center items-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto max-h-[90vh] border border-white/20">
        {/* LEFT PANEL: ORDER SUMMARY */}
        <div className="w-full md:w-5/12 bg-slate-50 p-8 flex flex-col border-r border-slate-100">
          <div className="mb-8 flex flex-col">
            <Typography className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-1">
              Order Ref
            </Typography>
            <Typography className="text-2xl font-black text-slate-800">
              #{order._id.slice(-8).toUpperCase()}
            </Typography>
            <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-black border border-indigo-200 uppercase tracking-wider">
              {order.orderStatus.replace(/_/g, " ")}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-4">
            {order?.items?.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-100"
              >
                <img
                  src={item?.image}
                  alt=""
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div className="flex-1 flex flex-col min-w-0">
                  <Typography className="text-xs font-bold text-slate-800 truncate">
                    {item?.name}
                  </Typography>
                  <Typography className="text-[10px] text-slate-400">
                    Qty: {item?.qty} units
                  </Typography>
                </div>
                <Typography className="text-xs font-black text-slate-900">
                  ₹{item?.total}
                </Typography>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex justify-between items-center">
              <Typography className="text-xl font-black text-slate-900">
                ₹{order?.totalAmount}
              </Typography>
              <div className="flex flex-col gap-2">
                <Typography className="text-[9px] font-bold text-slate-400 uppercase bg-slate-200 px-2 py-1 rounded-md">
                  {order?.payment?.method}
                </Typography>
                <Typography
                  className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${
                    order.payment.status === "SUCCESS"
                      ? "text-emerald-600 bg-emerald-100"
                      : order.payment.status === "PENDING"
                        ? "text-yellow-600 bg-yellow-100"
                        : order.payment.status === "FAILED"
                          ? "text-red-600 bg-red-100"
                          : "text-indigo-600 bg-indigo-100" 
                  }`}
                >
                  {order?.payment?.status}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: INTERACTIVE ACTIONS */}
        <div className="w-full md:w-7/12 p-10 flex flex-col relative bg-white">
          <button
            onClick={onClose}
            className="absolute top-8 right-8 text-slate-400 hover:text-slate-800 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <header className="mb-10 flex flex-col">
            <Typography className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
              Management Console
            </Typography>
            <Typography className="text-xl font-bold text-slate-900">
              {order?.userId?.email}
            </Typography>
          </header>

          <div className="flex-1 space-y-6">
            <div className="flex flex-col gap-2">
              <Typography className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Available Operations
              </Typography>
              <Typography className="text-xs text-slate-400 mb-2">
                Select a status to transition the order lifecycle.
              </Typography>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {nextOptions?.length > 0 ? (
                nextOptions?.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleUpdate(status)}
                    disabled={isUpdating}
                    className={`group flex items-center justify-between p-5 cursor-pointer rounded-[2rem] border-2 transition-all active:scale-[0.98] ${
                      status === "CANCELLED"
                        ? "border-rose-50 hover:border-rose-200 bg-rose-50/30"
                        : "border-slate-50 hover:border-[var(--main-web-color-2)] bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                          status === "CANCELLED"
                            ? "bg-rose-100 text-rose-600 group-hover:bg-rose-600 group-hover:text-white"
                            : "bg-white text-[var(--main-web-color-2)]shadow-sm group-hover:bg-[var(--main-web-color)] group-hover:text-white"
                        }`}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                      <div className="text-left flex flex-col">
                        <Typography className="text-[10px] font-black text-slate-400 uppercase">
                          Change to
                        </Typography>
                        <Typography
                          className={`text-sm font-black ${status === "CANCELLED" ? "text-rose-600" : "text-slate-800"}`}
                        >
                          {status.replace(/_/g, " ")}
                        </Typography>
                      </div>
                    </div>
                    {isUpdating && (
                      <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    )}
                  </button>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 bg-emerald-50 rounded-[3rem] border border-emerald-100">
                  <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-200 mb-4">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <Typography className="text-sm font-black text-emerald-800 uppercase tracking-widest">
                    Process Complete
                  </Typography>
                  <Typography className="text-[10px] text-emerald-600 mt-1 font-bold">
                    No further actions required
                  </Typography>
                </div>
              )}
            </div>
          </div>

          <footer className="mt-8 pt-6 border-t flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-[var(--main-web-color)] text-white font-black rounded-2xl py-4 uppercase tracking-[0.2em] text-[10px] shadow-lg hover:bg-[var(--main-web-color-2)] cursor-pointer transition-colors"
            >
              Close Dashboard
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrders;
