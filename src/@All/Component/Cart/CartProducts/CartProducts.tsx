import {
  useDeleteCartMutation,
  useGetAllCartQuery,
  useUpdateQtyMutation,
} from "../CartApi/CartApi";
import { CommonImage, Typography } from "../../../AppForm/Form";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import StarRating from "../../StarRating/StarRating ";
import { useState } from "react";
import CommonAlert from "../../../AppForm/CommonAlert";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CartProducts = () => {
  const { data: CartProducts } = useGetAllCartQuery();
  const [updateQty, { isLoading }] = useUpdateQtyMutation();
  const [deleteCart] = useDeleteCartMutation();
  const nav = useNavigate();
  const [alert, setAlert] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  // Common Toast Style for the Ice Cream Theme
  const toastStyle = {
    borderRadius: '15px',
    background: '#333',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
  };

  const handleIncrease = async (productId: string, qty: number, name: string) => {
    try {
      await updateQty({ productId, qty: qty + 1 }).unwrap();
      toast.success(`Another scoop of ${name}!`, { style: toastStyle, icon: '🍦' });
    } catch (err) {
      toast.error("Could not update quantity", { style: toastStyle });
    }
  };

  const handleDecrease = async (productId: string, qty: number, name: string) => {
    if (qty <= 1) return;
    try {
      await updateQty({ productId, qty: qty - 1 }).unwrap();
      toast.success(`Removed a scoop of ${name}`, { style: toastStyle });
    } catch (err) {
      toast.error("Could not update quantity", { style: toastStyle });
    }
  };

  const confirmDelete = (productId: string) => {
    setSelectedProduct(productId);
    setAlert(true);
  };

  const onConfirmDelete = async () => {
    try {
      if (!selectedProduct) return;
      await deleteCart(selectedProduct).unwrap();
      toast.success("Flavor removed from bag", { style: toastStyle, icon: '🗑️' });
      setAlert(false);
      setSelectedProduct(null);
    } catch (error) {
      toast.error("Error removing product", { style: toastStyle });
    }
  };

  return (
    <div className="w-full h-full bg-white">
      <div className="max-w-6xl mx-auto space-y-6 p-2">
        <CommonAlert
          isOpen={alert}
          message="Remove this delicious flavor from your bag?"
          onConfirm={onConfirmDelete}
          onCancel={() => {
            setAlert(false);
            setSelectedProduct(null);
          }}
        />

        <AnimatePresence mode="popLayout">
          {CartProducts?.cart?.items?.length > 0 ? (
            CartProducts?.cart?.items?.map((item: any) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -100 }}
                key={item.productId._id}
                className="group relative flex flex-col sm:flex-row gap-6 p-5
                  bg-white rounded-[2rem] border border-gray-100
                  hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)] transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative shrink-0">
                  <CommonImage
                    src={item.productId?.productImage?.[0]}
                    alt={item.productId?.productName}
                    className="w-full h-48 sm:w-32 sm:h-32 object-cover rounded-[1.5rem] bg-blue-50/50 p-1"
                  />
                  <button
                    onClick={() => confirmDelete(item.productId._id)}
                    className="absolute -top-2 -left-2 w-8 h-8 flex items-center cursor-pointer justify-center 
                      bg-white shadow-md rounded-full text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <Typography className="font-black text-lg text-gray-800 tracking-tight">
                        {item.productId?.productName}
                      </Typography>
                      <Typography className="font-black text-xl text-[var(--main-web-color)]">
                        ₹{item.productId?.productPrice * item.qty}
                      </Typography>
                    </div>
                    <Typography className="text-xs text-gray-400 font-medium uppercase tracking-widest">
                      {item.productId?.productCategory || "Artisanal Scoop"}
                    </Typography>
                    <div className="pt-1">
                        <StarRating rating={item.productId?.averageRating} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1">
                        <span className="text-[10px] font-bold text-gray-300 uppercase">Unit Price: ₹{item.productId?.productPrice}</span>
                    </div>

                    {/* Modern Qty Picker */}
                    <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-1">
                      <button
                        onClick={() => handleDecrease(item.productId._id, item.qty, item.productId?.productName)}
                        disabled={item.qty <= 1 || isLoading}
                        className="w-9 h-9 flex items-center justify-center rounded-xl cursor-pointer bg-white shadow-sm
                          text-gray-600 disabled:opacity-30 transition-all active:scale-90"
                      >
                        <FiMinus size={16} />
                      </button>

                      <span className="w-4 text-center text-sm font-black text-gray-700">
                        {item.qty}
                      </span>

                      <button
                        onClick={() => handleIncrease(item.productId._id, item.qty, item.productId?.productName)}
                        disabled={isLoading}
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-[var(--main-web-color)] cursor-pointer hover:bg-[var(--main-web-color-2)] shadow-sm
                          text-white transition-all active:scale-90"
                      >
                        <FiPlus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="w-full py-20 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-200">
                 <FiShoppingBag size={40} />
              </div>
              <div>
                <Typography className="text-2xl font-black text-gray-800">Your bag is empty</Typography>
                <Typography className="text-sm text-gray-400 mt-1">Looks like you haven't picked a flavor yet!</Typography>
              </div>
              <button 
              onClick={()=>nav('/shopall')}
              className="mt-4 px-8 py-3 bg-[var(--main-web-color)] cursor-pointer text-white rounded-2xl font-bold shadow-lg shadow-blue-100 transition-transform active:scale-95">
                Browse Flavors
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CartProducts;