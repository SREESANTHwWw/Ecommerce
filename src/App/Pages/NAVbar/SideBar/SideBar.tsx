import { motion } from "framer-motion";
import { Typography } from "../../../../@All/AppForm/Form";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../AuthSlice/AuthSlice";

const menuVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35 },
  },
};

const SideBar = ({ onClose }: any) => {
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.userAuth.token);
  const dispatch = useDispatch()
  const goTo = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    dispatch(logout());
   
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 h-screen bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="h-screen w-72 bg-white  shadow-2xl"
      >
        {/* Close */}
        <div className="flex justify-between items-center p-4">
             <button
          onClick={onClose}
          className="  px-3 rounded-full hover:bg-gray-100 transition"
        >
          <IoClose size={26} className="text-[var(--main-web-color)]" />
        </button>
             {!token ? (
            <motion.div variants={itemVariants} className="w-[40%]" >
              <button
                onClick={() => goTo("/login")}
                className="w-full h-9 rounded-xl bg-gradient-to-r from-[var(--main-web-color)] to-[var(--main-web-color-2)]
                text-white font-semibold shadow-md hover:shadow-lg transition"
              >
                <Typography>Login</Typography>
              </button>
            </motion.div>
          ):(
               <motion.div variants={itemVariants} className="w-[40%]">
              <button
                onClick={handleLogout}
                className="w-full h-9 rounded-xl bg-gradient-to-r from-[var(--main-web-color)] to-[var(--main-web-color-2)]
                text-white font-semibold shadow-md hover:shadow-lg transition"
              >
                <Typography>Logout</Typography>
              </button>
            </motion.div>

          )}
        </div>
     

        {/* Content */}
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-1  px-4"
        >
          {[
            { label: "Account", path: "/account" },
            { label: "Shop All", path: "/shopall" },
            { label: "About", path: "/about" },
            { label: "Contact", path: "/contact" },
          ].map((item) => (
            <motion.button
              key={item.label}
              variants={itemVariants}
              whileTap={{ scale: 0.97 }}
              whileHover={{ x: 4 }}
              onClick={() => goTo(item.path)}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              <Typography className="text-base font-medium">
                {item.label}
              </Typography>
            </motion.button>
          ))}

     

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="my-6 border-t"
          />

          {/* Social */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-6 pb-6"
          >
            {[FaFacebookF, FaInstagram].map((Icon, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <Icon size={18} />
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SideBar;
