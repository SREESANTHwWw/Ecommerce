import { motion } from "framer-motion";
import { Typography } from "../../../../@All/AppForm/Form";
import { FiUser, FiMapPin, FiChevronRight,  } from "react-icons/fi"; // Better icons for these titles
import { useNavigate } from "react-router-dom";

const AccountResponsive = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { title: "Profile ", icon: FiUser, path: "/account/profile" },
    { title: "Addresses", icon: FiMapPin, path: "/account/address" },
    // { title: "Payment Methods", icon: FiCreditCard, path: "/account/payment" },
    // { title: "Notifications", icon: FiBell, path: "/account/notifications" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 w-full  mx-auto p-1">
      {quickLinks.map(({ title, icon: Icon, path }, i) => (
        <motion.button
          key={title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(path)}
          className="flex  cursor-pointer items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-[var(--main-web-color)] transition-all group"
        >
          <div className="flex  items-center space-x-4">
            <div className=" bg-gray-50 rounded group-hover:bg-[var(--main-web-color)] group-hover:bg-opacity-10 transition-colors">
              <Icon className="text-xl text-[var(--main-web-color)]" />
            </div>
            <Typography className="font-bold text-sm text-gray-800 tracking-tight">
              {title}
            </Typography>
          </div>

          <div className="flex items-center text-gray-400 group-hover:text-[var(--main-web-color)] transition-colors">
            <FiChevronRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default AccountResponsive;