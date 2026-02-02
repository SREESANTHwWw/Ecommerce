
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  CreditCard, 
  Download, 
  Receipt, 
  ShieldCheck, 
 
  ArrowLeft,
  Printer
} from "lucide-react";
import { Typography } from "../../../../@All/AppForm/Form";

const AccountPayment = ({ order }: any) => {
  // Mock data if order prop is empty
  const details = order || {
    id: "PAY-992817",
    orderId: "ORD-5521",
    date: "Feb 02, 2026",
    time: "02:30 PM",
    method: "Mastercard •••• 8812",
    status: "Completed",
    amount: 1450.00,
    tax: 120.00,
    discount: 50.00,
    product: {
      name: "Premium Wireless Headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200",
      qty: 1
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Top Navigation */}
        <motion.button 
          whileHover={{ x: -5 }}
          className="flex items-center gap-2 text-gray-500 font-semibold text-sm mb-8"
        >
          <ArrowLeft size={16} /> Back to Orders
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content: Receipt Details */}
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <Typography className="text-2xl font-black text-gray-900 leading-tight">
                      Payment Successful
                    </Typography>
                    <Typography className="text-gray-400 text-sm font-medium">
                      Transaction ID: {details.id}
                    </Typography>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-indigo-600 transition-colors">
                    <Printer size={20} />
                  </button>
                  <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-indigo-600 transition-colors">
                    <Download size={20} />
                  </button>
                </div>
              </div>

              {/* Product Info Row */}
              <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                <img src={details.product.image} className="w-20 h-20 rounded-2xl object-cover shadow-sm" alt="" />
                <div className="flex-1">
                  <Typography className="font-bold text-gray-900">{details.product.name}</Typography>
                  <Typography className="text-xs text-gray-500">Quantity: {details.product.qty}</Typography>
                </div>
                <div className="text-right">
                  <Typography className="text-sm font-bold text-gray-400">ORDER ID</Typography>
                  <Typography className="font-bold text-gray-900">#{details.orderId}</Typography>
                </div>
              </div>

              {/* Payment Info Grid */}
              <div className="grid grid-cols-2 gap-8 mt-10 px-2">
                <div>
                  <Typography className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Payment Method</Typography>
                  <div className="flex items-center gap-3">
                    <CreditCard size={18} className="text-indigo-600" />
                    <Typography className="font-bold text-gray-800">{details.method}</Typography>
                  </div>
                </div>
                <div>
                  <Typography className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Date & Time</Typography>
                  <Typography className="font-bold text-gray-800">{details.date}, {details.time}</Typography>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="flex items-center gap-4 p-5 bg-indigo-600 rounded-[2rem] text-white shadow-lg shadow-indigo-200">
              <ShieldCheck size={24} className="shrink-0 opacity-80" />
              <Typography className="text-sm font-medium">
                This transaction is secured with 256-bit SSL encryption. Your data is protected.
              </Typography>
            </div>
          </motion.div>

          {/* Sidebar: Billing Summary */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200 border border-indigo-50 sticky top-8">
              <div className="flex items-center gap-2 mb-8">
                <Receipt size={20} className="text-indigo-600" />
                <Typography className="font-black text-gray-900 tracking-tight">Payment Summary</Typography>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Typography className="text-gray-400 text-sm font-medium">Subtotal</Typography>
                  <Typography className="font-bold text-gray-800">₹{details.amount.toFixed(2)}</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography className="text-gray-400 text-sm font-medium">Estimated Tax</Typography>
                  <Typography className="font-bold text-gray-800">₹{details.tax.toFixed(2)}</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography className="text-gray-400 text-sm font-medium">Discount</Typography>
                  <Typography className="font-bold text-emerald-500">-₹{details.discount.toFixed(2)}</Typography>
                </div>
                
                <div className="pt-6 mt-6 border-t-2 border-dashed border-gray-100 flex justify-between items-center">
                  <Typography className="text-lg font-black text-gray-900">Paid Total</Typography>
                  <Typography className="text-2xl font-black text-indigo-600">
                    ₹{(details.amount + details.tax - details.discount).toFixed(2)}
                  </Typography>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-10 py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-xl hover:bg-black transition-all"
              >
                Track Shipment
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AccountPayment;