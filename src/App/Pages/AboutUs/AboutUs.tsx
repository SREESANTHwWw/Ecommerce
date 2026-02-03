import { motion } from "framer-motion";
import { Typography, CommonImage } from "../../../@All/AppForm/Form";
import icecream from "../../../assets/icrem.jpg";
import PreviousButton from "../../../@All/Component/CommonButtons/PreviousButton";
const AboutUs = () => {
  return (
    <div className="w-full bg-gradient-to-b px-6 md:px-16 overflow-hidden">
      <div className="px-4 md:px-0 ">
        <PreviousButton />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col p-10"
        >
          <Typography className="text-2xl uppercase tracking-widest text-[var(--main-web-color)] font-semibold mb-3">
            About Groviya
          </Typography>

          <Typography className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Scooping Happiness <br /> One Ice Cream at a Time 🍦
          </Typography>

          <Typography className="text-gray-600 text-lg leading-relaxed mb-6">
            Groviya is an ice-cream based e-commerce brand crafted with love,
            premium ingredients, and irresistible flavors. From classic
            favorites to bold new creations, we deliver frozen joy straight to
            your doorstep.
          </Typography>

          <Typography className="text-gray-600 text-lg leading-relaxed">
            Our mission is simple — make every moment sweeter with high-quality,
            hygienic, and delicious ice creams made for all ages.
          </Typography>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glow */}
          <div className="absolute -inset-4 bg-pink-300/30 blur-3xl rounded-full"></div>

          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
          >
            <CommonImage
              src={icecream}
              className="w-full h-[420px] object-cover"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* STATS */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 p-6 text-center"
      >
        {[
          { value: "50+", label: "Flavours" },
          { value: "10k+", label: "Happy Customers" },
          { value: "100%", label: "Natural Ingredients" },
          { value: "24/7", label: "Fast Delivery" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white flex flex-col rounded-2xl shadow-lg py-8"
          >
            <Typography className="text-3xl font-extrabold text-pink-500">
              {item.value}
            </Typography>
            <Typography className="text-gray-600 mt-2">{item.label}</Typography>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AboutUs;
