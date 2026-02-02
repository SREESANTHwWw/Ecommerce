import { motion } from "framer-motion";
import { Typography } from "../../../../../@All/AppForm/Form";
import { FaBoxOpen } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FcCancel } from "react-icons/fc";
import { FiShoppingBag, FiChevronRight } from "react-icons/fi"; 
import { useNavigate } from "react-router-dom";

const OrderDisplay = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { title: "My Orders", icon: FaBoxOpen, path: "/account/orders" },
    { title: "Track Delivery", icon: TbTruckDelivery, path: "/account/orders?status=delivery" },
    { title: "Cancelled Orders", icon: FcCancel, path: "/account/orders?status=cancelled" },
    { title: "Order History", icon: FiShoppingBag, path: "/account/orders" },
  ];

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-6">
      {quickLinks.map(({ title, icon: Icon, path }, i) => (
        <motion.button
          key={title}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(path)}
          className="flex cursor-pointer items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-[var(--main-web-color)] transition-colors group"
        >
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-orange-50 transition-colors">
              <Icon className="text-2xl text-[var(--main-web-color)]" />
            </div>
            <Typography className="font-semibold text-gray-700">{title}</Typography>
          </div>
          
          <FiChevronRight className="text-gray-400 group-hover:text-[var(--main-web-color)] transition-all transform group-hover:translate-x-1" />
        </motion.button>
      ))}
    </div>
  );
};

export default OrderDisplay;