import { motion } from "framer-motion";
import CardAdress from "./CartAdress/CardAdress";
import CartProducts from "./CartProducts/CartProducts";
import CartPayment from "./CartPayment/CartPayment";
import { Typography } from "../../AppForm/Form";
import { ShoppingBasket, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./cart.css";

const Cart = () => {
  const navigate = useNavigate();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-[#FAFAFA] min-h-screen pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-5">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-[var(--main-web-color)] transition-colors text-sm font-bold uppercase tracking-widest mb-2"
            >
              <ArrowLeft size={16} />
             <Typography> Continue Scooping</Typography> 
            </button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[var(--main-web-color)]  text-white rounded-2xl shadow-lg shadow-blue-100">
                <ShoppingBasket size={28} />
              </div>
              <Typography className="text-4xl font-black text-gray-900 tracking-tight">
                Your <span className="text-[var(--main-web-color)] italic">Sweet</span> Bag
              </Typography>
            </div>
          </div>
          
         
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          
          {/* Left Side: Details & Products */}
          <div className="flex flex-col gap-8">
            <motion.div variants={itemVariants}>
               <CardAdress />
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-50 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                 <Typography className="font-black text-gray-800 uppercase text-xs tracking-widest">
                    Order Summary
                 </Typography>
               
              </div>
              <div className="p-4 md:p-8">
                <CartProducts />
              </div>
            </motion.div>

            {/* Mobile Payment View */}
            <motion.div variants={itemVariants} className="lg:hidden">
              <CartPayment />
            </motion.div>
          </div>

          {/* Right Side: Sticky Checkout */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <CartPayment />
                
                {/* Extra Trust Info under Sticky Cart */}
                <div className="mt-6 flex flex-col gap-4 px-2">
                   <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      <Typography className="text-[10px] font-bold text-gray-400 uppercase">
                         Zero Melt Guarantee Applied
                      </Typography>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <Typography className="text-[10px] font-bold text-gray-400 uppercase">
                         Express Cold-Chain Delivery
                      </Typography>
                   </div>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default Cart;