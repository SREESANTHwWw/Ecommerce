import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Edit3, ShieldCheck,  } from "lucide-react";
import { useGetMeQuery } from "../../../../@All/Component/APIs/UserApi";
import { Typography } from "../../../../@All/AppForm/Form";
import { useState } from "react";
import UserEditForm from "./UserEditForm";
import PreviousButton from "../../../../@All/Component/CommonButtons/PreviousButton";

const UserProfile = () => {
  const { data: user, isLoading } = useGetMeQuery();
  const userdata = user?.data;
   const [userEditOpen, setUserEditOpen] = useState(false);

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10 px-4 md:px-0">
       <PreviousButton  />
        {
        userEditOpen &&(
            <UserEditForm onClose={() => setUserEditOpen(false)} userdata={userdata} />
        )
      }
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative  bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
      
        <div className="md:w-1/3 bg-[var(--main-web-color)] p-8 flex flex-col items-center justify-center text-white relative">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <img
              src={user?.avatar || "https://via.placeholder.com/150"}
              alt={userdata?.firstname}
              className="w-28 h-28 rounded-2xl object-cover border-4 border-white/20 shadow-2xl"
            />
            <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-var(--main-web-color) w-6 h-6 rounded-full shadow-lg" />
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="mt-4 text-xl font-bold tracking-tight">
            {userdata?.firstname} {userdata?.lastname}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-indigo-100 text-xs uppercase tracking-widest font-semibold flex items-center gap-1">
            <ShieldCheck size={12} /> <Typography>{userdata?.role || "Member"}</Typography>
          </motion.p>
        </div>

        {/* Right Section: Details */}
        <div className="md:w-2/3 p-8 bg-white/50">
          <div className="flex justify-between items-start mb-6">
            <div>
              <Typography className="text-gray-400 text-xs font-bold uppercase tracking-widest">Account Details</Typography>
              <div className="h-1 w-8 bg-[var(--main-web-color)] mt-1 rounded-full" />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={()=>setUserEditOpen(true)}
              className="p-2 bg-indigo-50 text-[var(--main-web-color)] cursor-pointer rounded-lg hover:bg-[var(--main-web-color)] hover:text-white transition-colors"
            >
              <Edit3 size={18} />
            </motion.button>
          </div>

          <div className="grid gap-5">
            {[
              { icon: <Mail className="text-[var(--main-web-color)]" />, label: "Email Address", value: userdata?.email },
              { icon: <Phone className="text-[var(--main-web-color)]" />, label: "Phone Number", value: userdata?.phonenumber || "Not provided" },
              { icon: <MapPin className="text-[var(--main-web-color)]" />, label: "Location", value: user?.location || "Global" },
            ].map((info, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="p-2 bg-white shadow-sm rounded-lg group-hover:scale-110 transition-transform">
                  {info.icon}
                </div>
                <div className="flex flex-col">
                  <Typography className="text-[10px] uppercase font-bold text-gray-400">{info.label}</Typography>
                  <Typography className="text-gray-700 font-medium">{info.value}</Typography>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;