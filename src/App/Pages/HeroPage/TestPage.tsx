import { useState } from "react";
import icecream from "../../../assets/coneIce2.png";
import { Typography } from "../../../@All/AppForm/Form";
import "./Hero.css";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "../../../@All/Functions/useScrollAnimation";
import { motion } from "framer-motion";

const TestPage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const ref = useScrollAnimation("fade-right");
  const ref2 = useScrollAnimation("fade-up");

  return (
    <div className="wavy_hero overflow-hidden">
      <section className="w-full min-h-[80vh] flex bg-[var(--main-web-color)] items-center relative">
        
        {/* Decorative Background Blob for the right side */}
        <div className="absolute right-[-5%] top-[10%] w-[500px] h-[500px] bg-[var(--grad)] opacity-20 blur-[100px] rounded-full -z-0" />

        <div className="max-w-7xl mx-auto px-6 p-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center z-10">
          {/* LEFT CONTENT */}
          <div ref={ref} className="space-y-4 flex flex-col">
            <Typography className="text-5xl md:text-7xl font-extrabold leading-tight text-[var(--main-bg-color)] tracking-tighter">
              Fresh & <span className="text-[var(--grad)] italic">Creamy</span>
            </Typography>

            <Typography className="text-5xl md:text-7xl font-extrabold leading-tight text-[var(--main-bg-color)] tracking-tighter">
              Ice Creams
            </Typography>

            <Typography className="text-gray-300 text-lg max-w-xl leading-relaxed">
              Delicious handcrafted ice creams made with premium ingredients,
              delivered cold and fresh to your doorstep.
            </Typography>

            <div className="flex gap-4 pt-6">
              <button
                onClick={() => navigate("/shopall")}
                className="px-8 py-4 bg-[var(--main-web-color-2)] cursor-pointer hover:bg-white hover:text-[var(--main-web-color-2)] text-white rounded-2xl font-bold shadow-lg transition-all duration-300 active:scale-95"
              >
                <Typography>Shop All</Typography>
              </button>

              <button
                onClick={() => navigate("/shopall")}
                className="px-8 py-4 border-2 border-white/20 cursor-pointer text-white rounded-2xl font-bold hover:bg-white hover:text-[var(--main-web-color)] transition-all duration-300"
              >
                <Typography>View More</Typography>
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE - Wavy Design */}
          <div className="flex justify-center relative">
            {/* The "Wavy" Floating Container */}
            <motion.div
              ref={ref2}
              animate={{ 
                borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 50% 60% 40% 60%", "40% 60% 70% 30% / 40% 50% 60% 50%"],
                y: [0, -20, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className={`relative overflow-hidden w-full max-w-[550px] aspect-square flex items-center justify-center
                bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 shadow-2xl
                ${imageLoaded ? "opacity-100" : "opacity-0 transition-opacity duration-1000"}`}
            >
              <img
                onLoad={() => setImageLoaded(true)}
                src={icecream}
                alt="Ice Cream"
                className="w-[100%] h-[100%] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)]"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestPage;