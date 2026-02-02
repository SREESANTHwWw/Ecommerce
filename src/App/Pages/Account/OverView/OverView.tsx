import { motion } from "framer-motion";
import { Typography } from "../../../../@All/AppForm/Form";
import OrderDisplay from "./OrderDisplay/OrderDisplay";
import RewardCouponDisplay from "./RewardCouponDisplay/RewardCouponDisplay";
import { useGetMeQuery } from "../../../../@All/Component/APIs/UserApi";
import { Mail, Sparkles, ChevronRight } from "lucide-react";
import { useState } from "react";
import UserEditForm from "../AccountProfile/UserEditForm";

const OverView = () => {
  const { data: user, isLoading } = useGetMeQuery();
  const userdata = user?.data;
  const Orders = userdata?.orders;
  const [userEditOpen, setUserEditOpen] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
      },
    },
  };

  if (isLoading)
    return (
      <div className="p-10 text-center animate-pulse">Loading Dashboard...</div>
    );

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full space-y-8"
    >
      {userEditOpen && (
        <UserEditForm
          onClose={() => setUserEditOpen(false)}
          userdata={userdata}
        />
      )}

      <motion.div
        variants={item}
        className="relative overflow-hidden bg-white border border-gray-100 rounded-[2rem] p-6 shadow-xl shadow-gray-100/50"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-transparent rounded-bl-full -z-0" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <motion.div
              whileHover={{ rotate: 5 }}
              className="w-24 h-24 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <img
                src={userdata?.avatar || "/bgremoveLogo.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="absolute -bottom-2 -right-2 bg-[var(--main-web-color)] p-1.5 rounded-lg text-white shadow-lg">
              <Sparkles size={14} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start items-baseline gap-2">
              <Typography className="text-2xl font-black text-gray-800 tracking-tight">
                {userdata?.firstname} {userdata?.lastname}
              </Typography>
              <Typography className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-full">
                Active Member
              </Typography>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-gray-500">
              <Mail size={14} />
              <Typography className="text-sm font-medium">
                {userdata?.email}
              </Typography>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setUserEditOpen(true)}
              className="group flex items-center justify-center gap-2 px-8 py-3 bg-[var(--main-web-color)] cursor-pointer text-white rounded-2xl font-bold transition-all"
            >
              Edit Profile
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <motion.div variants={item} className="lg:col-span-8">
          <div className="bg-white rounded-[2rem] p-2 border border-gray-50 shadow-sm">
            <OrderDisplay Orders={Orders} />
          </div>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-4">
          <div className="h-full bg-gradient-to-b from-indigo-50 to-white rounded-[2rem] p-6 border border-indigo-100/50">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[var(--main-web-color)] rounded-lg flex items-center justify-center text-white">
                <Sparkles size={16} />
              </div>
              <h3 className="font-bold text-gray-800">Your Rewards</h3>
            </div>
            <RewardCouponDisplay />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OverView;
