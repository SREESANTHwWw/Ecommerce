import { useState } from "react";

import icecream from "../../../assets/coneIce2.png";
import { Typography } from "../../../@All/AppForm/Form";
import "./Hero.css";
import { useNavigate } from "react-router-dom";
const TestPage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate =useNavigate()

  return (
    <div className="wavy">
      <section className="w-full min-h-[70vh]  flex bg-[var(--main-web-color)] items-center">
        <div className="max-w-7xl mx-auto px-6  p-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-4 flex flex-col">
            <Typography className="text-5xl md:text-6xl font-extrabold leading-tight text-[var(--main-bg-color)]">
              Fresh & <span className="text-[var(--grad)]">Creamy</span>
            </Typography>

            <Typography className="text-5xl md:text-6xl font-extrabold leading-tight text-[var(--main-bg-color)]">
              Ice Creams
            </Typography>

            <Typography className="text-gray-300 text-lg max-w-xl">
              Delicious handcrafted ice creams made with premium ingredients,
              delivered cold and fresh to your doorstep.
            </Typography>

            <div className="flex  gap-4 pt-4">

              <button
               onClick={()=>navigate("/shopall")}
              className="px-8 py-3 bg-[var(--main-web-color-2)] cursor-pointer hover:bg-[var(--main-web-color)] text-white rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
               <Typography> Shop All</Typography> 
              </button>

              <button
              onClick={()=>navigate("/shopall")}
              className="px-8 py-3 border-2 border-[var(--main-web-color-2)] cursor-pointer text-[var(--main-web-color-2)] rounded-xl font-semibold bg-[var(--main-bg-color)] hover:bg-[var(--main-web-color)] hover:text-white transition-all duration-300">
             <Typography> View More</Typography> 
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center">
            <div
              className={`overflow-hidden ${
                imageLoaded ? "" : "bg-gray-400 opacity-0"
              } rounded-3xl animate-float md:p-6 p-3 `}
            >
              <img
                onLoad={() => setImageLoaded(true)}
                src={icecream}
                alt="Ice Cream"
                className={`w-full md:h-[500px] h-[400px] object-cover rounded-2xl ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestPage;
