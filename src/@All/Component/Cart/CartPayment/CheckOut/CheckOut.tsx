import { useEffect, useState } from "react";
import {  FaTruck } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";
import { useCreateOrderMutation, useVerifyPaymentMutation } from "./CheckOutAPi";
import { useGetAllCartQuery } from "../../CartApi/CartApi";
import { useDefaultAddressQuery } from "../../../Addresses/AddressesApi";
import { toast } from "react-toastify";
import { Typography } from "../../../../AppForm/Form";
import PaymentSuccessNotification from "../../../../AppForm/SuccessNotification";
import { useNavigate } from "react-router-dom";
import SpinnerLoading from "../../../Loading/SpinnerLoading";

type PaymentMethod = "CARD" | "UPI" | "COD" | "RAZORPAY";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckOut = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CARD");
  const { data: CartProducts } = useGetAllCartQuery();
  const { data: DefaultAddress } = useDefaultAddressQuery();
  const [createOrder,{isLoading}] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [total, setTotal] = useState<number>(0);
  const [finaltotal ,setFinal ] =useState<number>(0)
  const [notification,setNotification] = useState(false)
  const navigate = useNavigate()
  const items = CartProducts?.cart?.items
    const address = DefaultAddress?.address;
  const methods = [
    // {
    //   id: "CARD",
    //   title: "Credit / Debit Card",
    //   icon: <FaCreditCard size={20} />,
    // },
    {
      id: "RAZORPAY",
      title: "Pay with Razorpay",
      icon: <SiRazorpay size={22} />,
    },
    // {
    //   id: "UPI",
    //   title: "UPI Payment",
    //   icon: <FaMobileAlt size={20} />,
    // },
    {
      id: "COD",
      title: "Cash on Delivery",
      icon: <FaTruck size={20} />,
    },
  ];

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
      alert("Razorpay SDK failed to load");
      return;
    }

    // 1️⃣ Create backend order
    const res = await createOrder({
      items,
      address,
      paymentMethod,
      deliveryFee: 50,
      discount: 100,
    }).unwrap();

    // 2️⃣ Razorpay options
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: res.amount,
      currency: res.currency,
      name: "Your Store",
      description: "Order Payment",
      order_id: res.razorpayOrderId,

      handler: async (response: any) => {
        await verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }).unwrap();

       
        setNotification(true)
        setTimeout(() => {
          navigate("/")
        }, 1000);
        
      },

      prefill: {
        contact: address.phone,
      },

      theme: { color: "#000" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (err) {
    console.error(err);
    toast.error("Payment failed ❌");
  }
};

  useEffect(() => {
    if (!CartProducts?.cart?.items) return;

    const result = CartProducts.cart.items.reduce(
      (acc: number, val: any) =>
        acc + (val.productId?.productPrice || 0) * (val.qty || 1),
      0
    );
     const finaltotal = result + 50 - 100
setFinal(finaltotal)
    setTotal(result);
  }, [CartProducts]);

 const handlerCod = async ()=>{
  try {
        await createOrder({
      items,
      address,
      paymentMethod,
      deliveryFee: 50,
      discount: 100,
    }).unwrap();
    setNotification(true)
      setTimeout(() => {
          navigate("/")
        }, 3000);
    
  } catch (error:any) {
     console.log(error);
     toast.error(error)
     
  }

 }



  return (
    <div className="  px-4 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
       { notification && <PaymentSuccessNotification  onClose={() => setNotification(false)}/>}
        {isLoading && <SpinnerLoading/>}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <Typography className="text-xl font-semibold mb-6">Select Payment Method</Typography>

          <div className="flex flex-col gap-4">
            {methods.map((method: any) => (
              <div
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition
        ${
          paymentMethod === method.id
            ? "border-[var(--main-web-color)] bg-blue-50"
            : "border-gray-200 hover:border-gray-400"
        }`}
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full
          ${
            paymentMethod === method.id
              ? "bg-[var(--main-web-color)] text-white"
              : "bg-gray-100 text-gray-600"
          }`}
                >
                  {method.icon}
                </div>

                <Typography className="font-medium">{method.title}</Typography>
              </div>
            ))}
          </div>

         
          {/* {paymentMethod === "CARD" && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input className="input" placeholder="Card Number" />
              <input className="input" placeholder="Name on Card" />
              <input className="input" placeholder="Expiry (MM/YY)" />
              <input className="input" placeholder="CVV" />
            </div>
          )}

          {paymentMethod === "UPI" && (
            <div className="mt-6">
              <input
                className="input"
                placeholder="Enter UPI ID (example@upi)"
              />
            </div>
          )} */}

          {paymentMethod === "COD" && (
            <Typography className="mt-6 text-gray-600">
              Pay with cash when your order is delivered.
            </Typography>
          )}
        </div>

    
        <div className="bg-white rounded-2xl p-6 shadow-sm h-fit sticky top-24">
          <Typography className="text-lg font-semibold mb-4">Order Summary</Typography>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <Typography>Subtotal</Typography>
              <Typography>{total}</Typography>
            </div>
            <div className="flex justify-between">
              <Typography>Delivery</Typography>
              <Typography>₹50</Typography>
            </div>
            <div className="flex justify-between">
              <Typography>Discount</Typography>
              <Typography>-₹100</Typography>
            </div>

            <hr />

            <div className="flex justify-between font-semibold text-base">
              <Typography>Total</Typography>
              <Typography>{finaltotal}</Typography>
            </div>
          </div>

          <button
            onClick={() => {
              if (paymentMethod === "RAZORPAY") {
                handleRazorpayPayment();
              } else {
                handlerCod()
              }
            }}
            className="mt-6 w-full bg-[var(--main-web-color)] text-white py-3 rounded-xl cursor-pointer
    font-semibold hover:opacity-90 transition"
          >
         <Typography>   {paymentMethod === "COD" ? "Place Order" : "Pay Now"}</Typography>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
