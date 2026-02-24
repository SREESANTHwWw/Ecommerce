import {
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
  Package
} from "lucide-react";
import { TextController, Typography } from "../../../../../@All/AppForm/Form";
import { OrderRow } from "./OrderRow/OrderRow";
import { useGetAllOrderQuery } from "../../../../../@All/Component/APIs/OrdersApi";
import { OrderStatsGrid } from "./OrderStatsGrid/OrderStatsGrid";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useForm } from "react-hook-form";
import { useDebounce } from "../../../../../@All/Functions/Hooks/Debounce";
import FilterPopover from "./FilterOrder/FilterOrder";
import UpdateOrders from "./OrderRow/UpdateOrders/UpdateOrders";

export default function OrderManagement() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const headerRef = useRef(null);
    const [updateModel ,setUpdatemodal] = useState(false)
     const [oderId,setOrderId ] = useState<any>()
  // Initialize Form
  const { control, watch, setValue, reset } = useForm({
    defaultValues: {
      searchOrders: "",
    },
  });

  // Filter State (matching your RTK query params)
  const [filters, setFilters] = useState({
    status: "",
    date: "",
    priceRange: "",
    paymentMethods: "",
    paymentStatus: "",
  });
     console.log(filters.priceRange);
     
  const searchOrders = watch("searchOrders");
  const debouncedSearch = useDebounce(searchOrders, 800);
  console.log(limit);

  // API Query
  const { data: OrderData, isFetching } = useGetAllOrderQuery({
    page,
    limit,
    search: debouncedSearch || undefined,
    status: filters.status || undefined,
    date: filters.date || undefined,
    priceRange: filters.priceRange || undefined,
   paymentMethods: filters.paymentMethods || undefined,
    paymentStatus: filters.paymentStatus || undefined,
  });

  // Reset Logic
  const handleResetAll = () => {
    reset({ searchOrders: "" });
    setFilters({
      status: "",
      date: "",
      priceRange: "",
      paymentMethods: "",
      paymentStatus: "",
    });
    setPage(1);
    setIsFilterOpen(false);
  };

  useEffect(() => {
    gsap.from(headerRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="p-8 min-h-screen bg-[#F8FAFC]">
        {updateModel&&(
          <UpdateOrders  orderId={oderId} onClose={()=>setUpdatemodal(false)}/>
        )}
      {/* Header */}
      <div
        ref={headerRef}
        className="flex flex-col md:flex-row md:items-center justify-between gap-2"
      >
         
        <div className="flex flex-col gap-2">
          <Typography className="text-4xl font-black text-slate-900 tracking-tighter">
            Orders
          </Typography>
          <Typography className="text-slate-500 text-sm font-medium">
            Tracking and managing your store sales.
          </Typography>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Download size={18} /> Export
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
            Create Order
          </button>
        </div>
      </div>

      <div className="mt-2">
        <OrderStatsGrid OrderData={OrderData} />
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 relative">
        <div className="relative flex-1 group">
          <Search
            className="absolute left-4 top-1/3 -translate-y-1/3 text-slate-400 group-focus-within:text-indigo-500 transition-colors z-10"
            size={18}
          />
          <TextController
            type="text"
            control={control}
            id="searchOrders"
            name="searchOrders"
            className="w-full pl-12 pr-12 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all"
            placeholder="Search orders, customers, or items..."
          />
          {searchOrders && (
            <button
              onClick={() => setValue("searchOrders", "")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-rose-500 transition-colors z-10"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`px-6 py-3 rounded-2xl flex cursor-pointer items-center gap-2 font-bold transition-all border ${isFilterOpen || filters.status || filters.priceRange ? "bg-indigo-50 border-indigo-200 text-[var(--main-web-color)]" : "bg-white border-slate-200 text-slate-600 hover:border-indigo-200"}`}
          >
            <Filter size={18} /> Filters
          </button>

          {isFilterOpen && (
            <FilterPopover
              filters={filters}
              setFilters={setFilters}
              onApply={() => setIsFilterOpen(false)}
              onReset={handleResetAll}
            />
          )}
        </div>
      </div>

      {/* Orders List */}
     <div className="space-y-3 min-h-[400px] relative">
  {/* 1. Loading Overlay: Shows over existing data or empty space while fetching */}
  {isFetching && (
    <div className="absolute inset-0 bg-[#F8FAFC]/50 backdrop-blur-[2px] z-20 flex items-center justify-center rounded-3xl transition-all">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-[var(--main-web-color)] border-t-transparent rounded-full animate-spin" />
        <Typography className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Updating List...
        </Typography>
      </div>
    </div>
  )}

  {/* 2. Data List: Map through orders if they exist */}
  {OrderData?.orders && OrderData.orders.length > 0 ? (
    OrderData.orders.map((order: any, index: number) => (
      <OrderRow key={order._id} order={order} index={index} setUpdatemodal={setUpdatemodal}  setOrderId={setOrderId} />
    ))
  ) : (
    /* 3. Enhanced Empty State: Shows only when not loading and array is empty */
    !isFetching && (
      <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100 mt-4">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-indigo-100 rounded-full blur-2xl opacity-40 animate-pulse" />
          <div className="relative p-6 bg-slate-50 rounded-full border border-slate-100">
            <Package size={40} className="text-slate-300" />
          </div>
        </div>
        
        <Typography className="text-xl font-black text-slate-900 tracking-tight">
          No orders found
        </Typography>
        
        <Typography className="text-slate-500 text-sm mt-2 max-w-[280px] text-center font-medium">
          We couldn't find any orders matching your current filters or search query.
        </Typography>

        <button 
          onClick={handleResetAll}
          className="mt-8 px-6 py-2.5 bg-[var(--main-web-color)] cursor-pointer text-white rounded-xl text-xs font-bold hover:bg-[var(--main-web-color-2)] transition-all active:scale-95 shadow-lg shadow-slate-200"
        >
          Clear All Filters
        </button>
      </div>
    )
  )}
</div>

      {/* Pagination Footer */}
      <div className="mt-8 flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-white rounded-[2rem] border border-slate-100 shadow-sm gap-4">
        <div className="flex items-center gap-4">
          <Typography className="text-xs text-slate-500 font-medium">
            Showing{" "}
            <span className="text-slate-900 font-bold">
              {(page - 1) * limit + 1}
            </span>{" "}
            to{" "}
            <span className="text-slate-900 font-bold">
              {Math.min(page * limit, OrderData?.totalOrders || 0)}
            </span>{" "}
            of{" "}
            <span className="text-slate-900 font-bold">
              {OrderData?.totalOrders || 0}
            </span>{" "}
            orders
          </Typography>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="bg-slate-50 border  border-slate-200 rounded-lg px-2 py-1 text-[10px] font-black uppercase text-slate-500 outline-none hover:bg-slate-100 cursor-pointer"
          >
            {[10, 20, 50].map((v) => (
              <option key={v} value={v}>
                {v} Per Page
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={page === 1 || isFetching}
            onClick={() => setPage((p) => p - 1)}
            className="p-2.5 rounded-xl cursor-pointer border border-slate-100 hover:bg-slate-50 text-slate-400 hover:[var(--main-web-color-2)] transition-all disabled:opacity-20"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-1 px-4">
            <Typography className="text-sm font-black text-[var(--main-web-color)]">
              {page}
            </Typography>
            <Typography className="text-xs font-bold text-slate-300">
              /
            </Typography>
            <Typography className="text-xs font-bold text-slate-400">
              {OrderData?.totalPages || 1}
            </Typography>
          </div>
          <button
            disabled={page === OrderData?.totalPages || isFetching}
            onClick={() => setPage((p) => p + 1)}
            className="p-2.5 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-50 text-slate-400 hover:text-[var(--main-web-color-2)] transition-all disabled:opacity-20"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
