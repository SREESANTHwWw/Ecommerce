import { motion } from "framer-motion";
import { Typography } from "../../../../@All/AppForm/Form";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SideBar = ({ onClose, }: any) => {
  const navigate = useNavigate();

  const handleShopAll = () => {
    navigate("/shopall");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute top-0 left-0 h-full w-64 bg-white shadow-xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <IoClose size={30} className="text-[var(--main-web-color)]" />
        </button>

        {/* Menu */}
        <div className="flex flex-col gap-2 mt-16">
          <button
            onClick={onClose}
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
        </div>
      </motion.div>
    </div>
  );
};

export default SideBar;
