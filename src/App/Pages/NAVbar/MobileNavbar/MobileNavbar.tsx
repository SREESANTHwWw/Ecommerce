
import { motion } from "framer-motion";
import { useGetAllCartQuery } from "../../../../@All/Component/Cart/CartApi/CartApi";
import { VscThreeBars } from "react-icons/vsc";
import { FiSearch } from "react-icons/fi";
import CartButton from "../CartButton";
import { useNavigate } from "react-router-dom";

import { Typography } from "../../../../@All/AppForm/Form";

const MobileNavbar = ({ setSearchTab, setIsSidebarOpen, showNavbar }: any) => {
  const { data } = useGetAllCartQuery();
  const cartLength = data?.cart?.items.length || 0;
  const navigate = useNavigate();

  return (
    <motion.div
      initial={false}
      animate={{ y: showNavbar ? 0 : -112 }}
      transition={{ type: "tween", duration: 0.25 }}
      style={{ willChange: "transform" }}
      className="fixed top-0 w-full h-20 z-50 flex items-center bg-[var(--main-web-color)] justify-between px-4 "
    >
      <button onClick={() => setIsSidebarOpen(true)}>
        <VscThreeBars
          className="hover:text-[var(--bg-color-ca)] text-[var(--main-bg-color)] cursor-pointer"
          size={28}
        />
      </button>

      <div className="">
        {/* <img src={logo} alt="" className="w-20 h-20 object-cover" /> */}
        <Typography className="text-3xl font-bold text-[var(--main-bg-color)] ">
        Groviya
      </Typography>
      </div>

      <div className="flex gap-4 ">
        <button onClick={() => setSearchTab(true)}>
          <FiSearch
            className="hover:text-[var(--bg-color-ca)]  text-[var(--main-bg-color)] cursor-pointer"
            size={25}
          />
        </button>
        <CartButton cartLength={cartLength} navigate={navigate} size={25} />
      </div>
    </motion.div>
  );
};

export default MobileNavbar;
