import { motion } from "framer-motion";
import { RiShieldCheckFill } from "react-icons/ri";
import { FiShoppingCart, FiMapPin, FiCreditCard } from "react-icons/fi";
import { Typography } from "../../../AppForm/Form";
import { useNavigate } from "react-router-dom";

type Step = "Cart" | "Address" | "Payment";

const CartNavBar = ({ activeStep = "Cart" }: { activeStep?: Step }) => {
  const navigate = useNavigate();

  const steps = [
    { title: "Cart", icon: <FiShoppingCart />, path: "/cart" },
    { title: "Address", icon: <FiMapPin />, path: "/cart" },
    { title: "Payment", icon: <FiCreditCard />, path: "/cart/payment" },
  ];

  const activeIndex = steps.findIndex(
    (step) => step.title === activeStep
  );

  const handleNavigate = (index: number, path: string) => {
    if (index <= activeIndex) navigate(path);
  };

  return (
    <div className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--main-web-color)]/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Typography className="text-2xl md:flex hidden font-extrabold text-white">
            Groviya
          </Typography>

          {/* Steps */}
          <div className="flex  flex-1 justify-center">
             <div className="flex  flex-col items-center gap-2">
                <Typography className="text-2xl md:hidden flex  font-extrabold text-white">
            Groviya
          </Typography>
            <div className="flex items-center gap-4">
             
             
              
              {steps.map((step, index) => {
                const isCompleted = index < activeIndex;
                const isActive = index === activeIndex;
                const isClickable = index <= activeIndex;

                return (
                  <div
                    key={step.title}
                    className={`flex items-center gap-2 ${
                      isClickable ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                    onClick={() => handleNavigate(index, step.path)}
                  >
                    <motion.div
                      className={`flex items-center justify-center w-9 h-9 rounded-full border
                        ${
                          isCompleted
                            ? "bg-emerald-500 text-white border-emerald-500"
                            : isActive
                            ? "bg-white text-[var(--main-web-color)] border-white"
                            : "border-white/40 text-white/60"
                        }`}
                      whileHover={isClickable ? { scale: 1.15 } : {}}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {step.icon}
                    </motion.div>

                    <Typography
                      className={`hidden sm:block text-sm font-medium ${
                        isCompleted || isActive
                          ? "text-white"
                          : "text-white/60"
                      }`}
                    >
                      {step.title}
                    </Typography>

                    {index !== steps.length - 1 && (
                      <div
                        className={`w-8 h-[2px] ${
                          index < activeIndex
                            ? "bg-emerald-500"
                            : "bg-white/30"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            </div>
          </div>

          {/* Secure */}
          <div className="hidden md:flex items-center gap-2">
            <RiShieldCheckFill className="text-emerald-400" size={26} />
            <Typography className="text-xs text-white">
              100% Secure Checkout
            </Typography>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartNavBar;
