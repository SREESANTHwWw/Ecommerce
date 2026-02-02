import { motion } from "framer-motion";
import { CommonImage, Typography } from "../../../../@All/AppForm/Form";
import OrderDisplay from "./OrderDisplay/OrderDisplay";
import { useGetMeQuery } from "../../../../@All/Component/APIs/UserApi";
import { Mail, Sparkles, Settings2, ShieldCheck, MapPin } from "lucide-react";
import { useState } from "react";
import UserEditForm from "../AccountProfile/UserEditForm";
import { useNavigate } from "react-router-dom";

import AccountResponsive from "../AccountSideBar/AccountResponsive";
const OverView = () => {
  const { data: user, isLoading } = useGetMeQuery();
  const userdata = user?.data;
  const [userEditOpen, setUserEditOpen] = useState(false);
  const navigate = useNavigate();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 },
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-[var(--main-web-color)] border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-6xl mx-auto space-y-6 mt-6 pb-10"
    >
      {userEditOpen && (
        <UserEditForm
          onClose={() => setUserEditOpen(false)}
          userdata={userdata}
        />
      )}

      <motion.div
        variants={item}
        className="relative bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--main-web-color)] opacity-[0.03] rounded-full -mr-20 -mt-20" />

        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="w-32 h-32 rounded-[2rem] overflow-hidden ring-4 ring-gray-50 shadow-lg"
            >
              <CommonImage
                src={userdata?.avatar || "/bgremoveLogo.png"}
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </motion.div>
            <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-md border border-gray-50">
              <Sparkles size={18} className="text-yellow-500" />
            </div>
          </div>

          <div className="flex-1 space-y-3 text-center md:text-left">
            <div className="space-y-1">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                <Typography className="text-3xl font-black text-gray-900">
                  {userdata?.firstname} {userdata?.lastname}
                </Typography>
                <span className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 text-[11px] font-bold uppercase tracking-wider rounded-lg">
                  <ShieldCheck size={12} />
                  Verified
                </span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Mail size={15} className="text-gray-400" />
                  <Typography className="text-sm font-medium">
                    {userdata?.email}
                  </Typography>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={15} className="text-gray-400" />
                  <Typography className="text-sm font-medium">
                    Main Office
                  </Typography>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
              <button
                onClick={() => setUserEditOpen(true)}
                className="flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-[var(--main-web-color)] text-white rounded-xl text-sm font-semibold hover:bg-[var(--main-web-color-2)] transition-all shadow-md"
              >
                <Settings2 size={16} />
                Manage Settings
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-1">
        <div className="md:hidden flex ">
          <AccountResponsive />
        </div>
        <motion.div variants={item} className="lg:col-span-8 ">
          <div className="bg-transparent">
            <OrderDisplay />
          </div>
        </motion.div>

        
        <motion.div variants={item} className="lg:col-span-4 md:px-3 px-4 md:mt-0 mt-5">
          <div className="bg-gradient-to-br from-[var(--main-web-color)] to-[var(--main-web-color-2)] rounded-[2.5rem] p-6 text-white shadow-xl relative overflow-hidden h-full min-h-[200px]">
            <div className="flex flex-col space-y-4">
              <Typography className="text-xl font-bold opacity-90">
                Support Center
              </Typography>
              <Typography className="text-sm opacity-80 leading-relaxed">
                Need help with your recent orders or account settings? Our team
                is available 24/7.
              </Typography>
              <button
                onClick={() => navigate("/contact")}
                className="w-full py-3 bg-white/20 backdrop-blur-md rounded-xl cursor-pointer font-bold text-sm hover:bg-white/30 transition-all border border-white/30"
              >
                <Typography>Contact Support</Typography>
              </button>
            </div>
            {/* Background Shape */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OverView;
