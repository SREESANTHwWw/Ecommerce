
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Typography } from "../../AppForm/Form";

const PreviousButton = ({ 
  className = "", 
  text = "Back to previous", 
  variant = undefined // For Framer Motion animation variants
}) => {
  const navigate = useNavigate();

  return (
    <motion.button
      variants={variant}
      onClick={() => navigate(-1)}
      className={`flex items-center gap-2 cursor-pointer text-gray-500 hover:text-[var(--main-web-color)] transition-colors font-medium text-sm group ${className}`}
    >
      <div className="p-2 rounded-full group-hover:bg-gray-100 transition-all">
        <ArrowLeft size={18} />
      </div>
      <Typography>{text}</Typography>
    </motion.button>
  );
};

export default PreviousButton;