
import { motion } from "framer-motion";
import { Typography } from "../../../../@All/AppForm/Form";
import { useDispatch } from "react-redux";
import { logout } from "../../../../AuthSlice/AuthSlice";
import { useNavigate } from "react-router-dom";

const AccountdropDown = ({ user }: any) => {

    const dispatch = useDispatch();
    const  navigate =useNavigate()

const handleLogout = () => {
  dispatch(logout());
 
};
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-10 right-0 z-50 w-64 rounded-xl bg-white shadow-xl"
    >
      {/* User Info */}
      <div className="px-4 py-3 flex flex-col border-b border-gray-200">
        <Typography className="font-semibold text-[var(--main-web-color)] ">
          Hello {user?.name || "User"}
        </Typography>
        <Typography className="text-sm text-gray-500">
          {user?.email || "email@example.com"}
        </Typography>
      </div>

      {/* Menu */}
      <div className="flex flex-col py-2">
        {["Orders", "Coupon", "Address", "Rewards"].map((item) => (
          <button
            key={item}
            onClick={()=>navigate(`/account/${item.toLowerCase()}`)}
            className="px-4 py-2 text-left  hover:bg-gray-100 transition cursor-pointer"
          >
            <Typography className="text-[var(--main-web-color)]">{item}</Typography>
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="border-t border-gray-200 py-2">
        <button className="px-4 py-2 w-full text-left hover:bg-gray-100 cursor-pointer">
          <Typography  className="text-[var(--main-web-color)]">Edit Profile</Typography>
        </button>
        <button
            onClick={handleLogout}
          className="px-4 py-2 w-full text-left hover:bg-red-50 text-red-600 cursor-pointer"
        >
          <Typography>Logout</Typography>
        </button>
      </div>
    </motion.div>
  );
};

export default AccountdropDown;
