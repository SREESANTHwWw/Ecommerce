import { NavLink } from "react-router-dom";
import { Typography } from "../../../../@All/AppForm/Form";
import { motion } from "framer-motion";

const menu = [
  {
    title: "OverView",
    path: "/account/overview",
  },
  {
    title: "Orders & Returns",
    path: "/account/orders",
  },
];

// const credits = [
//   { title: "Coupons", path: "/account/coupons" },
//   { title: "Rewards", path: "/account/rewards" },
// ];

const account = [
  { title: "Profile", path: "/account/profile" },
  { title: "Saved Address", path: "/account/address" },
  // { title: "Payment", path: "/account/payment" },
  { title: "Delete Account", path: "/account/delete", danger: true },
];
const AccountSideBar = () => {
  const sidebarVariants = {
    hidden: { x: -40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  const SidebarLink = ({ title, path, danger }: any) => (
    <motion.div variants={itemVariants}>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `px-4 py-2 rounded-md transition ${
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

  return (
    <motion.aside
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="w-64    shadow  bg-white  rounded p-4 space-y-6"
    >
    
      <motion.div variants={itemVariants} className="pb-4 ">
        <Typography className="font-semibold text-lg text-[var(--main-web-color)]">
          User Name
        </Typography>
      </motion.div>

     
      <div className="flex flex-col gap-1 text-[var(--main-web-color)]">
        {menu.map((item) => (
          <SidebarLink key={item.title} {...item} />
        ))}
      </div>
      <div>
        <motion.div variants={itemVariants}>
          <Typography className="px-4 py-2 font-bold text-gray-800">
            Account
          </Typography>
        </motion.div>
        <div className="grid grid-cols-1 text-[var(--main-web-color)]">
          {account.map((item) => (
            <SidebarLink key={item.title} {...item} />
          ))}
        </div>
      </div>

    
      {/* <div>
        <motion.div variants={itemVariants}>
          <Typography className="px-4 py-2 font-bold text-gray-800">
            Credits
          </Typography>
        </motion.div>
        <div className="flex flex-col gap-1 text-[var(--main-web-color)]">
          {credits.map((item) => (
            <SidebarLink key={item.title} {...item} />
          ))}
        </div>
      </div> */}

     
      
    </motion.aside>
  );
};

export default AccountSideBar;
