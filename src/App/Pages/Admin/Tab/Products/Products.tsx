import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, Plus, Search } from "lucide-react"; // Modern icons
import Cardview from "./Tabs/Cardview";
import TableView from "./Tabs/TableView";
import { TextController, Typography } from "../../../../../@All/AppForm/Form";

const Products = () => {
  const [tab, setTab] = useState(0);
  const { control, watch } = useForm({
    defaultValues: { searchData: "" }
  });

  const SearchValue = watch("searchData");

  const tabs = [
    { id: 0, label: "Card View", icon: <LayoutGrid size={16} /> },
    { id: 1, label: "Table View", icon: <List size={16} /> },
  ];

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex flex-col">
          <Typography className="text-3xl font-black text-slate-900 tracking-tight">
            Inventory Management
          </Typography>
          <Typography className="text-slate-500 text-sm mt-1">
            Browse, search, and manage your product listings.
          </Typography>
        </div>

        <div className="flex items-center gap-3">
          {/* Modern Search Input Wrapper */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <Search size={18} />
            </div>
            <TextController
              id="searchData"
              name="searchData"
              control={control}
              type="text"
              placeholder="Search products..."
              // Pass custom class if your TextController supports it, otherwise style the wrapper
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all w-full md:w-64"
            />
          </div>

       
        </div>
      </div>

      {/* --- TAB NAVIGATION --- */}
      <div className="flex p-1 bg-slate-200/50 w-fit rounded-2xl mb-8">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`relative flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-colors duration-300 ${
              tab === t.id ? "text-blue-600" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab === t.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white rounded-xl shadow-sm"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{t.icon}</span>
            <span className="relative z-10">{t.label}</span>
          </button>
        ))}
      </div>

      {/* --- VIEW CONTENT --- */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          {tab === 0 ? (
            <Cardview key="cards" searchData={SearchValue} />
          ) : (
            <TableView key="table" searchData={SearchValue} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Products;