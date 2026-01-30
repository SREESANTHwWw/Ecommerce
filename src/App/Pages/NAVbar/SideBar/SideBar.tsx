import { motion } from "framer-motion";
import { Typography } from "../../../../@All/AppForm/Form";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const SideBar = ({ onClose }: any) => {
  const navigate = useNavigate();

  const handleShopAll = () => {
    navigate("/shopall");
    onClose();
  };
  const handleLoginBtn =()=>{
     navigate("/login");
    onClose();
  }
  const hadnlerAccount = ()=>{
     navigate("/account");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute top-0 left-0 h-full w-64 bg-white shadow-xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4">
          <IoClose size={30} className="text-[var(--main-web-color)]" />
        </button>

        <div className="flex flex-col gap-2 mt-16">
          <button
            onClick={hadnlerAccount}
            className="w-full text-left px-4 py-3 hover:bg-gray-100"
          >
            <Typography>Account</Typography>
          </button>

          <button
            onClick={handleShopAll}
            className="w-full text-left px-4 py-3 hover:bg-gray-100"
          >
            <Typography>Shop All</Typography>
          </button>

          <button
            onClick={onClose}
            className="w-full text-left px-4 py-3 hover:bg-gray-100"
          >
            <Typography>About</Typography>
          </button>

          <button
            onClick={onClose}
            className="w-full text-left px-4 py-3 hover:bg-gray-100"
          >
            <Typography>Contact</Typography>
          </button>
          <div className="px-4 mt-4">
            <button
              className="bg-[var(--main-web-color-2)] w-full h-10 hover:bg-[var(--main-web-color)] cursor-pointer text-white rounded-md"
              onClick={handleLoginBtn}
            >
              Login
            </button>
          </div>

          <div className="my-4 border-t mx-4"></div>

          <div className="flex justify-center gap-6 pb-6">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              <FaFacebookF size={18} className="text-blue-600" />
            </button>

            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              <FaInstagram size={18} className="text-pink-500" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SideBar;
