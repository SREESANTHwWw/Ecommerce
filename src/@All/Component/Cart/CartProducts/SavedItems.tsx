import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { CommonImage, Typography } from "../../../AppForm/Form";

const SavedItems = ({ items, onMoveToCart, onRemove }: any) => {
  // Check if items exists and has length
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-12 border-t border-dashed border-gray-200 pt-10">
      <div className="flex items-center gap-2 mb-6 px-2">
        <FiHeart className="text-pink-400" fill="currentColor" />
        <Typography className="text-xl font-black text-gray-800">
          Saved for Later <span className="text-gray-300">({items.length})</span>
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {items.map((item: any) => {
            // Destructure the nested product data
            const product = item.productId;
            const savedId = item._id; // The ID of the saved item entry
             console.log(item.productId);
             
            return (
              <motion.div
                key={savedId}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex gap-4 p-4 bg-gray-50/50 rounded-[1.5rem] border border-gray-100 hover:bg-white hover:shadow-sm transition-all"
              >
                <CommonImage
                  src={product?.productImage?.[0]}
                  alt={product?.productName}
                  className="w-20 h-20 object-cover rounded-2xl bg-white shadow-sm"
                />

                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex flex-col gap-2">
                    <Typography className="font-bold text-gray-800 leading-tight">
                      {product?.productName}
                    </Typography>
                    <Typography className="text-sm font-black text-[var(--main-web-color)]">
                      ₹{product?.productPrice}
                    </Typography>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => onMoveToCart(item.productId)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:border-[var(--main-web-color)] hover:text-[var(--main-web-color)] transition-all active:scale-95 cursor-pointer"
                    >
                      <FiShoppingCart size={14} /> Add to Bag
                    </button>
                    <button
                      onClick={() => onRemove(item.productId._id)}
                      className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-100 transition-all active:scale-95 cursor-pointer"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SavedItems;