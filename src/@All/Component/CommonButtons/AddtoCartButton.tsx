import React from "react";
import { addToCartSlice } from "../Cart/CartStore/CartSlice";
import { useDispatch } from "react-redux";
import { useAddToCartMutation } from "../Cart/CartApi/CartApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Typography } from "../../AppForm/Form";
import { motion } from "framer-motion";
import { ShoppingCart, Loader2 } from "lucide-react";

type AddToCartButtonProps = {
  product: {
    _id: string;
    productPrice: number;
  };
  className?: string;
  text?: string;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  className = "",
  text = "Add to Cart"
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      addToCartSlice({
        productId: product._id,
        price: product.productPrice,
        qty: 1,
      }),
    );

    try {
      const res = await addToCart({
        productId: product._id,
        qty: 1,
      }).unwrap();

      if (res.success) {
        toast.success(res.msg || "Added to your scoop!", {
          icon: '🍦',
          style: {
            borderRadius: '20px',
            background: '#E0F2FE',
            color: '#0369A1',
            fontWeight: 'bold',
            fontSize: '14px' // Slightly smaller toast font for mobile
          },
        });
      }
    } catch (err: any) {
      if (err?.data?.failed) {
        navigate("/login");
      }
      toast.error(err?.data?.err || "Melt down! Try again.", {
        style: {
          borderRadius: '20px',
          background: '#FFF1F2',
          color: '#BE123C',
          fontWeight: 'bold',
        },
      });
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      disabled={isLoading}
      onClick={handleAdd}
     
      className={`relative flex items-center justify-center cursor-pointer gap-1.5 md:gap-2 overflow-hidden 
        px-3 py-2 md:px-6 md:py-3 font-bold transition-all
        bg-[var(--main-web-color)] hover:bg-[var(--main-web-color-2)] text-white rounded-[1rem] md:rounded-[1.2rem] shadow-lg 
        disabled:bg-blue-300 disabled:cursor-not-allowed w-full ${className}`}
    >
    
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="w-4 h-4 md:w-[18px] md:h-[18px]" />
        </motion.div>
      ) : (
      
        <ShoppingCart className="w-4 h-4 ml-1 md:w-[18px] md:h-[18px] transition-transform group-hover:-rotate-12" />
      
      )}

     
      <Typography className="font-black text-[10px] sm:text-xs md:text-sm tracking-tight uppercase whitespace-nowrap">
        {isLoading ? "Scooping..." : text}
      </Typography>

   
      <motion.div
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  );
};

export default React.memo(AddToCartButton);