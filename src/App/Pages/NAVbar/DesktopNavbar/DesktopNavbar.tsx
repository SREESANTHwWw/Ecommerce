import { useSelector } from "react-redux";
import { useGetAllCartQuery } from "../../../../@All/Component/Cart/CartApi/CartApi";
import { useNavigate } from "react-router-dom";
import { Typography } from "../../../../@All/AppForm/Form";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import AccountdropDown from "../../Account/AccountDropDown/AccountdropDown";
import CartButton from "../CartButton";
import PillNav from "./Pillnav";

const DesktopNavbar = ({
  setSearchTab,
  showDropdown,
  setShowDropdown,
  showNavbar,
}: any) => {
  const token = useSelector((state: any) => state.userAuth.token);
  const { data } = useGetAllCartQuery();
  const cartLength = data?.cart?.items.length || 0;
  const navigate = useNavigate();

  return (
    <motion.div
      animate={{ y: showNavbar ? 0 : -112 }}
      className="fixed top-0 w-full z-50 h-28 grid grid-cols-3 bg-[var(--main-web-color)] items-center px-10 "
    >
      <div className="px-20">
        {/* <img src={logo} alt="" className="w-32 h-32 object-cover" /> */}
        <Typography className="text-3xl font-bold text-[var(--main-bg-color)]">
          Groviya
        </Typography>
      </div>

      <div className="flex justify-center w-full items-center bg-red-500 gap-10">
      
        <PillNav
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "ShopAll", href: "/shopall" },
          { label: "Contact", href: "/contact" },
        ]}
        activeHref="/"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#ffffff"
        pillColor="#ffffff"
        hoveredPillTextColor="#4f1453"
        pillTextColor="#000000"
        initialLoadAnimation={true}
      />
      </div>
      

      <div className="flex items-center justify-end gap-6">
        <button onClick={() => setSearchTab(true)}>
          <FiSearch
            className="hover:text-[var(--bg-color-ca)] text-[var(--main-bg-color)] cursor-pointer "
            size={26}
          />
        </button>

        {token && (
          <div
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            className="relative cursor-pointer"
          >
            <FaUserCircle
              className="cursor-pointer hover:text-[var(--bg-color-ca)] text-[var(--main-bg-color)]"
              size={30}
            />
            <AnimatePresence>
              {showDropdown && <AccountdropDown />}
            </AnimatePresence>
          </div>
        )}

        <CartButton cartLength={cartLength} navigate={navigate} size={30} />
        {!token && (
          <button
            className="bg-[var(--main-web-color-2)] w-20  h-9  hover:bg-[var(--main-web-color)] cursor-pointer text-white rounded-md"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default DesktopNavbar;
