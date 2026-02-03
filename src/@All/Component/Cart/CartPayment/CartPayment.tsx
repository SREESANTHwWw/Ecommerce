import { useEffect, useState } from "react";
import { useGetAllCartQuery } from "../CartApi/CartApi";
import SpinnerLoading from "../../Loading/SpinnerLoading";
import { Typography } from "../../../AppForm/Form";
import { useGetAddressQuery } from "../../Addresses/AddressesApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { CreditCard, Truck, ShieldCheck } from "lucide-react";

const CartPayment = () => {
  const { data: CartProducts, isLoading } = useGetAllCartQuery();
  const [total, setTotal] = useState<number>(0);
  const { data: address } = useGetAddressQuery();
  const navigate = useNavigate();

  const deliveryFee = 20;

  useEffect(() => {
    if (!CartProducts?.cart?.items) return;

    const result = CartProducts.cart.items.reduce(
      (acc: number, val: any) =>
        acc + (val.productId?.productPrice || 0) * (val.qty || 1),
      0,
    );

    setTotal(result);
  }, [CartProducts]);

 const handleCheckout = () => {
  // address check
  if (!address?.addresses || address.addresses.length === 0) {
    toast("Please set a delivery address first!", {
      icon: "🍦",
      style: {
        borderRadius: "15px",
        background: "#333",
        color: "#fff",
      },
    });
    return;
  }

  // cart check
  if (!CartProducts?.cart?.items || CartProducts.cart.items.length === 0) {
    toast("Please add a product to cart!", {
      icon: "🍧",
      style: {
        borderRadius: "15px",
        background: "#333",
        color: "#fff",
      },
    });
    return;
  }

  // all good
  navigate("/cart/checkout");
};


  if (isLoading) return <SpinnerLoading />;

  return (
    <div className="w-full bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-6 md:p-8 flex flex-col gap-6">
      
      {/* Title with Icon */}
      <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
        <div className="p-2 bg-[var(--main-web-color)]/30 rounded-lg text-[var(--main-web-color)]">
          <CreditCard size={20} />
        </div>
        <Typography className="text-lg font-black text-gray-900 tracking-tight">
          Payment Summary
        </Typography>
      </div>

      {/* Price Details */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Typography className="text-sm font-medium text-gray-400 uppercase tracking-widest">
            Subtotal
          </Typography>
          <Typography className="font-black text-gray-700 text-lg">
            ₹{total}
          </Typography>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Typography className="text-sm font-medium text-gray-400 uppercase tracking-widest">
              Delivery
            </Typography>
            <Truck size={14} className="text-[var(--main-web-color)]" />
          </div>
          <Typography className="font-black text-gray-700 text-lg">
            ₹{deliveryFee}
          </Typography>
        </div>

        {/* Promo/Savings Tag (Optional/Visual) */}
        {total > 500 && (
           <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-50 p-3 rounded-2xl flex justify-between items-center border border-emerald-100"
           >
              <Typography className="text-[10px] font-black text-emerald-600 uppercase">
                Scoop Discount Applied
              </Typography>
              <Typography className="text-xs font-black text-emerald-600">
                -₹20
              </Typography>
           </motion.div>
        )}
      </div>

      {/* Total Amount Section */}
      <div className="rounded-[2rem] justify-center p-6 flex flex-col gap-1">
        <div className="flex justify-between items-end">
          <Typography className="text-xs font-black text-gray-400 uppercase tracking-widest">
            Total to Pay
          </Typography>
          <Typography className="text-3xl font-black text-[var(--main-web-color)] tracking-tighter">
            ₹{total + deliveryFee}
          </Typography>
        </div>
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCheckout}
        className="w-full bg-[var(--main-web-color)] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs cursor-pointer shadow-xl shadow-gray-200 transition-all hover:bg-[var(--main-web-color-2)] flex items-center justify-center gap-2 group"
      >
        Complete My Order
        <ShieldCheck size={16} className="group-hover:animate-pulse" />
      </motion.button>

      {/* Trust Badge */}
      <div className="flex items-center justify-center gap-2 opacity-40 grayscale group-hover:grayscale-0 transition-all">
        <Typography className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter text-center leading-tight">
          Secure Cold-Chain Payment <br /> Powered by Razorpay
        </Typography>
      </div>
    </div>
  );
};

export default CartPayment;