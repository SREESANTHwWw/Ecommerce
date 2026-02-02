import { motion } from "framer-motion";
import { Typography } from "../../../../../@All/AppForm/Form";
import { RiCoupon3Line } from "react-icons/ri";
import { MdStars } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const rewardCouponCards = [
  { title: "Coupons", count: 3, icon: RiCoupon3Line, path: "/account/coupons" },
  { title: "Rewards", count: 250, icon: MdStars, path: "/account/rewards" },
];

const RewardCouponDisplay = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {rewardCouponCards.map(({ title, count, icon: Icon, path }, i) => (
        <motion.button
          key={title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.15 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate(path)}
          className="bg-gradient-to-br from-white to-gray-50
             rounded-2xl p-6  group"
        >
          <div className="flex flex-col items-center space-y-2">
            <Icon className="text-4xl text-yellow-500 group-hover:rotate-6 transition" />
            <Typography className="font-medium">{title}</Typography>
            <Typography className="text-xl font-bold">{count}</Typography>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default RewardCouponDisplay;
