import { motion } from "framer-motion";
import { FiAlertTriangle, FiSave } from "react-icons/fi";
import { Typography, CommonImage } from "../../../AppForm/Form"; // Assuming CommonImage is available

interface StockValidationModalProps {
  isOpen: boolean;
  outOfStockItems: any[];
  onClose: () => void;
onMoveToSaveLater: (productIds: string[]) => Promise<void>; //// Removed productId param as we move all
  isProcessing: boolean;
}

const StockValidationModal = ({
  isOpen,
  outOfStockItems,
  onClose,
  onMoveToSaveLater,
  isProcessing,
}: StockValidationModalProps) => {
  if (!isOpen) return null;
  console.log(outOfStockItems);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl border border-red-50 relative overflow-hidden"
      >
        {/* Added Image Section */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute -bottom-2 -right-2 bg-red-500 text-white p-2 rounded-full shadow-lg">
              <FiAlertTriangle size={20} />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex flex-col">
            <Typography className="text-xl font-black text-gray-800">
              Stock Availability Issue
            </Typography>
            <Typography className="text-sm text-gray-500 mt-2">
              Some flavors in your bag melted away! They are no longer available
              in the requested quantity.
            </Typography>
          </div>

          <div className="w-full bg-gray-50 rounded-2xl p-4 space-y-3 max-h-48 overflow-y-auto border border-gray-100">
            {outOfStockItems.map((item) => (
              <div
                key={item.productId._id}
                className="flex justify-between items-center text-left"
              >
                <div className="flex items-center gap-3">
                
                  <CommonImage
                    src={item.image || item.productId?.productImage?.[0]}
                    className="w-8 h-8 rounded-lg object-cover bg-white"
                    alt=""
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-700 leading-tight">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-red-500 font-bold uppercase">
                      Available: {item.availableStock || 0}
                    </p>
                  </div>
                </div>
                <div className="text-xs font-medium text-gray-400">
                  Req: {item.requestedQty}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col w-full gap-3 pt-4">
            <button
              onClick={(e) => {
                e.preventDefault();

                const productIds = outOfStockItems.map(
                  (item) => item.productId,
                );
                 console.log(productIds);
                 

                onMoveToSaveLater(productIds);
              }}
              disabled={isProcessing}
              className="flex items-center justify-center gap-2 w-full py-4 bg-[var(--main-web-color)] text-white rounded-2xl font-bold shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSave />
              {isProcessing
                ? "Moving Items..."
                : "Move Unavailable to Save Later"}
            </button>

            <button
              onClick={onClose}
              className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
            >
              Back to Bag
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StockValidationModal;
