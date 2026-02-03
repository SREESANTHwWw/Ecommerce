import { useEffect, useState } from "react";
import { FaTruck, FaShieldAlt, FaLock } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Hooks and Components
import { useCreateOrderMutation, useVerifyPaymentMutation } from "./CheckOutAPi";
import { useGetAllCartQuery } from "../../CartApi/CartApi";
import { useDefaultAddressQuery } from "../../../Addresses/AddressesApi";
import { Typography } from "../../../../AppForm/Form";
import PaymentSuccessNotification from "../../../../AppForm/SuccessNotification";
import SpinnerLoading from "../../../Loading/SpinnerLoading";

type PaymentMethod = "COD" | "RAZORPAY";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckOut = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');
  const [total, setTotal] = useState<number>(0);
  const [finalTotal, setFinal] = useState<number>(0);
  const [notification, setNotification] = useState(false);

  // API Queries
  const { data: CartProducts } = useGetAllCartQuery();
  const { data: DefaultAddress } = useDefaultAddressQuery();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  const items = CartProducts?.cart?.items;
  const address = DefaultAddress?.address;

  const deliveryFee = 20;
  const discount = 100;

  useEffect(() => {
    if (!CartProducts?.cart?.items) return;

    const result = CartProducts.cart.items.reduce(
      (acc: number, val: any) =>
        acc + (val.productId?.productPrice || 0) * (val.qty || 1),
      0,
    );
    
    setTotal(result);
    setFinal(result + deliveryFee - discount);
  }, [CartProducts]);

  const loadRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    try {
      const loaded = await loadRazorpay();
      if (!loaded) {
        toast.error("Razorpay SDK failed to load");
        return;
      }

      const res = await createOrder({
        items,
        address,
        paymentMethod,
        deliveryFee,
        discount,
      }).unwrap();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: res.amount,
        currency: res.currency,
        name: "Groviya Ice Cream",
        description: "Artisanal Scoops Payment",
        order_id: res.razorpayOrderId,
        handler: async (response: any) => {
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }).unwrap();

          setNotification(true);
          setTimeout(() => navigate("/"), 3000);
        },
        prefill: {
          contact: address?.phone || "",
          email: address?.email || "",
        },
        theme: { color: "#3B82F6" }, // Modern Blue
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err: any) {
      toast.error(err?.data?.message || "Payment Initialization Failed");
    }
  };

  const handleCod = async () => {
    try {
      await createOrder({
        items,
        address,
        paymentMethod,
        deliveryFee,
        discount,
      }).unwrap();
      
      setNotification(true);
      setTimeout(() => navigate("/"), 3000);
    } catch (error: any) {
      toast.error(error?.data?.message || "Checkout Failed");
    }
  };

  return (
    <div className="bg-[var(--main-web-color)] ">
      {/* Success Overlay */}
      <AnimatePresence>
        {notification && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
             <PaymentSuccessNotification onClose={() => setNotification(false)} />
          </div>
        )}
      </AnimatePresence>

      {isLoading && <SpinnerLoading />}

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
          
          {/* LEFT SECTION: PAYMENT METHODS */}
          <div className="space-y-8 flex flex-col">
            <header className=" flex flex-col" >
              <Typography className="text-4xl md:text-5xl font-black text-[var(--main-bg-color)] tracking-tighter">
                Final <span className="text-[var(--main-web-color-2)]">Scoop.</span>
              </Typography>
              <Typography className="text-gray-400 font-medium mt-2">
                Choose your preferred way to pay for your treats.
              </Typography>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { id: "RAZORPAY", title: "Online", sub: "Cards, UPI, Netbanking", icon: <SiRazorpay size={24} /> },
                { id: "COD", title: "Cash on Delivery", sub: "Pay at your doorstep", icon: <FaTruck size={24} /> }
              ].map((method) => (
                <motion.div
                  key={method.id}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                  className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300
                    ${paymentMethod === method.id 
                      ? "border-[var(--main-web-color-2)] bg-white shadow-2xl shadow-var(--main-web-color-2)" 
                      : "border-transparent bg-white shadow-sm hover:shadow-md"}`}
                >
                  <div className="flex flex-col gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors
                      ${paymentMethod === method.id ? "bg-[var(--main-web-color-2)] text-white" : "bg-gray-100 text-gray-400"}`}>
                      {method.icon}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Typography className="text-lg font-black text-gray-900 leading-none">{method.title}</Typography>
                      <Typography className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">{method.sub}</Typography>
                    </div>
                  </div>
                  {paymentMethod === method.id && (
                    <div className="absolute top-4 right-4 w-3 h-3 bg-[var(--main-web-color)] rounded-full animate-pulse" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Address Preview Card */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[var(--main-web-color)]">
                  <FaShieldAlt size={20} />
                </div>
                <div>
                  <Typography className="text-xs font-black text-gray-400 uppercase tracking-widest">Delivering To</Typography>
                  <Typography className="font-bold text-gray-800 line-clamp-1">
                    {address ? `${address.street}, ${address.city}` : "No Address Selected"}
                  </Typography>
                </div>
              </div>
              <button onClick={() => navigate("/cart")} className="text-[var(--main-web-color)] font-black text-[12px] cursor-pointer uppercase underline tracking-widest"><Typography>Change</Typography></button>
            </div>
          </div>

          {/* RIGHT SECTION: ORDER SUMMARY */}
          <div className="relative">
            <aside className="sticky top-24 bg-white rounded-[3rem] p-8 md:p-10 shadow-2xl shadow-blue-900/5 border border-blue-50/50">
              <div className="flex items-center justify-between mb-8">
                <Typography className="text-xl font-black text-gray-900 tracking-tight">Summary</Typography>
                <FaLock className="text-gray-300" />
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-center">
                  <Typography className="text-sm font-bold text-gray-400 uppercase tracking-widest">Bag Total</Typography>
                  <Typography className="font-bold text-gray-900">₹{total}</Typography>
                </div>
                <div className="flex justify-between items-center">
                  <Typography className="text-sm font-bold text-gray-400 uppercase tracking-widest">Delivery</Typography>
                  <Typography className="font-bold text-gray-900">₹{deliveryFee}</Typography>
                </div>
                <div className="flex justify-between items-center">
                  <Typography className="text-sm font-bold text-emerald-500 uppercase tracking-widest">Discount</Typography>
                  <Typography className="font-bold text-emerald-500">-₹{discount}</Typography>
                </div>
                
                <div className="h-px bg-gray-100 my-6" />
                
                <div className="flex justify-between items-end">
                  <Typography className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total to pay</Typography>
                  <Typography className="text-5xl font-black text-[var(--main-web-color)] tracking-tighter">₹{finalTotal}</Typography>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => paymentMethod === "RAZORPAY" ? handleRazorpayPayment() : handleCod()}
                className="w-full bg-[var(--main-web-color)] py-5 rounded-[2rem] text-white font-black uppercase tracking-[0.2em] text-[10px] cursor-pointer shadow-xl shadow-[var(--main-web-color-2)]transition-all hover:bg-[var(--main-web-color-2)]"
              >
                {paymentMethod === "COD" ? "Place Order" : "Pay Securely"}
              </motion.button>

              <div className="mt-8 flex items-center justify-center gap-2 opacity-40">
                <FaShieldAlt size={14} />
                <Typography className="text-[10px] font-bold uppercase tracking-widest">Zero Melt Guarantee Included</Typography>
              </div>
            </aside>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckOut;