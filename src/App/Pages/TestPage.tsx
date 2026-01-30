import { useState } from "react";
import { Typography } from "../../@All/AppForm/Form";
import icecream from "../../assets/icrem.jpg";

const TestPage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="w-full min-h-[90vh] bg-gradient-to-br from-[var(--grad)] to-[var(--main-bg-color)] flex items-center">
      <div className="max-w-7xl mx-auto px-6 p-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-4 flex flex-col">
          <Typography className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Fresh & <span className="text-[var(--main-web-color-2)]">Creamy</span>
          </Typography>

          <Typography className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Ice Creams
          </Typography>

          <Typography className="text-gray-600 text-lg max-w-xl">
            Delicious handcrafted ice creams made with premium ingredients,
            delivered cold and fresh to your doorstep.
          </Typography>

          <div className="flex gap-4 pt-4">
            <button className="px-8 py-3 bg-[var(--main-web-color-2)] hover:bg-[var(--main-web-color)] text-white rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              Order Now
            </button>

            <button className="px-8 py-3 border-2 border-[var(--main-web-color-2)] text-[var(--main-web-color-2)] rounded-xl font-semibold hover:bg-[var(--main-web-color)] hover:text-white transition-all duration-300">
              View Flavors
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <div
            className={`${
              imageLoaded ? "bg-white" : "bg-gray-400 opacity-0"
            } rounded-3xl animate-float md:p-6 p-3 shadow-2xl`}
          >
            <img
              onLoad={() => setImageLoaded(true)}
              src={icecream}
              alt="Ice Cream"
              className={`w-[200%] md:h-[380px] h-[200px] object-cover rounded-2xl ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>

      </div>
           {/* <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 200" className="w-full">
          <path
            fill="#d6afdf "
            d="M0,96L60,101.3C120,107,240,117,360,117.3C480,117,600,107,720,101.3C840,96,960,96,1080,106.7C1200,117,1320,139,1380,149.3L1440,160L1440,320L0,320Z"
          />
        </svg>
      </div> */}
    </section>
  );
};

export default TestPage;
