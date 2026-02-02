import { motion } from "framer-motion";
import { Typography } from "../../../../../@All/AppForm/Form";
import { FaBoxOpen } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FcCancel } from "react-icons/fc";
import { FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


const OrderDisplay = ({Orders}:any) => {
    
    const lengthofOrders = Orders?.length || 0;

  const orderCards = [
  { title: "Orders", count:lengthofOrders , icon: FaBoxOpen, path: "/account/orders" },
  {
    title: "Delivery",
    count: 0,
    icon: TbTruckDelivery,
    path: "/account/orders?status=delivery",
  },
  {
    title: "Cancelled",
    count: 0,
    icon: FcCancel,
    path: "/account/orders?status=cancelled",
  },
  { title: "Recent", count: 0, icon: FiShoppingBag, path: "/account/orders" },
];

  const navigate = useNavigate();

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-6">
      {orderCards.map(({ title, count, icon: Icon, path }, i) => (
        <motion.button
          key={title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -6 }}
          onClick={() => navigate(path)}
          className="bg-white rounded-2xl p-5 shadow  group"
        >
          <div className="flex flex-col items-center space-y-2">
            <Icon className="text-4xl text-[var(--main-web-color)] group-hover:scale-110 transition" />
            <Typography className="font-medium">{title}</Typography>
            <Typography className="text-xl font-bold">{count}</Typography>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default OrderDisplay;
