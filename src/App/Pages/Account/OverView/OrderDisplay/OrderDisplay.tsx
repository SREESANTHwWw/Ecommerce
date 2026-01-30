import { Typography } from "../../../../../@All/AppForm/Form";
import { FaBoxOpen } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FcCancel } from "react-icons/fc";
import { FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const orderCards = [
  {
    title: "Orders",
    count: 0,
    icon: FaBoxOpen,
    path: "/account/orders",
  },
  {
    title: "Delivery Orders",
    count: 0,
    icon: TbTruckDelivery,
    path: "/account/orders?status=delivery",
  },
  {
    title: "Cancel Orders",
    count: 0,
    icon: FcCancel,
    path: "/account/orders?status=cancelled",
  },
  {
    title: "Recent Orders",
    count: 0,
    icon: FiShoppingBag,
    path: "/account/orders",
  },
];

const OrderDisplay = () => {
  const navigate = useNavigate();

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-3 mt-4">
      {orderCards.map(({ title, count, icon: Icon, path }) => (
        <button
          key={title}
          onClick={() => navigate(path)}
          className="group cursor-pointer  hover:text-[var(--main-bg-color)]"
        >
          <div className="flex flex-col items-center bg-[var(--main-bg-color)]  hover:text-[var(--main-bg-color)]
            hover:bg-[var(--main-web-color-2)] transition p-4 rounded shadow-xl">
            
            <Icon className="text-4xl text-[var(--main-web-color-2)] group-hover:scale-110  group-hover:text-[var(--main-bg-color)] transition" />
            
            <Typography className="mt-1">{title}</Typography>
            <Typography className="font-semibold">{count}</Typography>
          </div>
        </button>
      ))}
    </div>
  );
};

export default OrderDisplay;
