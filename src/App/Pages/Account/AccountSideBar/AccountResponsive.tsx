import { NavLink } from "react-router-dom";
import { Typography } from "../../../../@All/AppForm/Form";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const menu = [
  { title: "OverView", path: "/account/overview" },
  { title: "Orders & Returns", path: "/account/orders" },
];

// const credits = [
//   { title: "Coupons", path: "/account/coupons" },
//   { title: "Rewards", path: "/account/rewards" },
// ];

const account = [
  { title: "Profile", path: "/account/profile" },
  { title: "Saved Address", path: "/account/address" },
//   { title: "Payment", path: "/account/payment" },
  { title: "Delete Account", path: "/account/delete", danger: true },
];

const sidebarVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 15 },
  visible: { opacity: 1, x: 0 },
};

const SidebarLink = ({ title, path, danger, onClick }: any) => (
  <motion.div variants={itemVariants}>
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) =>
        `px-4 py-2 rounded-md transition block ${
          danger
            ? "text-red-600 hover:bg-red-50"
            : isActive
            ? "text-[var(--main-bg-color-1)] font-bold"
            : "hover:bg-gray-100"
        }`
      }
    >
      <Typography>{title}</Typography>
    </NavLink>
  </motion.div>
);

const AccountResponsive = ({ isOpen, onClose }: any) => {
 
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const handleResize = () => media.matches && onClose();
    media.addEventListener("change", handleResize);
    return () => media.removeEventListener("change", handleResize);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
         
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />

         
          <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-xl flex flex-col"
          >
         
            <div className="flex bg-white items-center justify-between px-5 py-4 border-b">
              <Typography className="font-semibold text-lg text-[var(--main-web-color)]">
                My Account
              </Typography>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <IoClose size={22} />
              </button>
            </div>

        
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              <div className="flex flex-col gap-1">
                {menu.map((item) => (
                  <SidebarLink
                    key={item.title}
                    {...item}
                    onClick={onClose}
                  />
                ))}
              </div>
               <div>
                <Typography className="px-4 py-2 font-bold text-gray-800">
                  Account
                </Typography>
                {account.map((item) => (
                  <SidebarLink
                    key={item.title}
                    {...item}
                    onClick={onClose}
                  />
                ))}
              </div>

              {/* <div>
                <Typography className="px-4 py-2 font-bold text-gray-800">
                  Credits
                </Typography>
                {credits.map((item) => (
                  <SidebarLink
                    key={item.title}
                    {...item}
                    onClick={onClose}
                  />
                ))}
              </div> */}

             
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default AccountResponsive;
