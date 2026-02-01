import React from "react";
import { FaTruck, FaLock, FaSnowflake, FaCheckCircle } from "react-icons/fa";
import { Typography } from "../../../@All/AppForm/Form";

const trustItems = [
  {
    icon: <FaTruck size={32} className="text-indigo-600" />,
    title: "Free Delivery",
    desc: "Fast & free delivery to your doorstep",
  },
  {
    icon: <FaLock size={32} className="text-green-600" />,
    title: "Secure Payment",
    desc: "100% safe & encrypted payment gateway",
  },
  {
    icon: <FaSnowflake size={32} className="text-cyan-500" />,
    title: "Always Fresh",
    desc: "Delivered frozen and fresh every time",
  },
  {
    icon: <FaCheckCircle size={32} className="text-blue-600" />,
    title: "Trusted Quality",
    desc: "Premium ingredients & hygienically packed",
  },
];

const TrustSection: React.FC = () => {
  return (
    <div className="w-full  py-10">
      <div className="max-w-6xl mx-auto px-4  grid grid-cols-2 md:grid-cols-4 gap-6">
        {trustItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="mb-3">{item.icon}</div>
            <Typography className="font-semibold text-sm md:text-base">{item.title}</Typography>
            <Typography className="text-xs text-gray-500 mt-1">{item.desc}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustSection;
