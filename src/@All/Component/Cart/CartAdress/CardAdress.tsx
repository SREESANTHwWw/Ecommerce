import { Typography } from "../../../AppForm/Form";
import { FiMapPin, FiEdit2, FiPlus, FiHome } from "react-icons/fi";
import { useDefaultAddressQuery } from "../../Addresses/AddressesApi";
import { useState } from "react";
import AddressForm from "../../Addresses/AddressForm/AddressForm";
import ChangeAddressForm from "../../Addresses/AddressForm/ChangeAddressForm";
import { motion, AnimatePresence } from "framer-motion";

const CardAdress = () => {
  const { data: DefaultAddress } = useDefaultAddressQuery();

  const [showAddForm, setshowAddForm] = useState(false);
  const [showChangeform, setChangeFrom] = useState(false);
  const addressDefault = DefaultAddress?.address;

  return (
    <div className="w-full bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 p-5 sm:p-7 relative overflow-hidden">
      
      {/* Subtle Background Icon Decoration */}
      <FiMapPin className="absolute -right-4 -bottom-4 text-blue-50/50 size-32 -rotate-12" />

      <AnimatePresence>
        {showAddForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <AddressForm setshowAddForm={setshowAddForm} />
          </motion.div>
        )}
        {showChangeform && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <ChangeAddressForm setChangeFrom={setChangeFrom} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--main-web-color)] animate-pulse" />
            <Typography className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              Shipping Destination
            </Typography>
          </div>
          {addressDefault && (
            <span className="text-[10px] font-bold bg-blue-50 text-[var(--main-web-color)] px-3 py-1 rounded-full flex items-center gap-1">
              <FiHome size={10} /> DEFAULT
            </span>
          )}
        </div>

        {addressDefault ? (
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-blue-50 text-bg-[var(--main-web-color)]">
                <FiMapPin size={22} />
              </div>

              <div className="space-y-1 flex flex-col">
                <Typography className="font-black text-lg text-gray-800 leading-tight">
                  {addressDefault?.street}
                </Typography>
                <Typography className="text-sm text-gray-500 font-medium">
                  {addressDefault?.city}, {addressDefault?.state} — {addressDefault?.pincode}
                </Typography>
                <Typography className="text-xs text-gray-400 font-bold uppercase tracking-widest pt-1">
                  {addressDefault?.country}
                </Typography>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setChangeFrom(true)}
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl bg-[var(--main-web-color)] text-white cursor-pointer hover:bg-[var(--main-web-color-2)] transition-all text-sm font-bold shadow-lg shadow-gray-200"
              >
                <FiEdit2 size={14} />
               <Typography>Change</Typography> 
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setshowAddForm(true)}
                className="inline-flex items-center justify-center w-12 h-12 rounded-2xl border-2 border-gray-100 cursor-pointer text-gray-400 hover:border-[var(--main-web-color)] hover:text-[var(--main-web-color)] transition-all"
              >
                <FiPlus size={20} />
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:items-center gap-6 py-2">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                <FiMapPin size={22} />
              </div>
              <div className="space-y-1 flex flex-col">
                <Typography className="font-black text-lg text-gray-800">
                  Where should we send the ice cream?
                </Typography>
                <Typography className="text-sm text-gray-400">
                  No delivery address found in your records.
                </Typography>
              </div>
            </div>

            <motion.button
              whileHover={{ x: 5 }}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl cursor-pointer bg-[var(--main-web-color)] text-white font-black text-sm shadow-xl  transition-all"
              onClick={() => setshowAddForm(true)}
            >
             <Typography>Add New Address</Typography>  
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardAdress;