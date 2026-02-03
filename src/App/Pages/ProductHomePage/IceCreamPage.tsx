import { motion, useScroll, useTransform } from "framer-motion";
import { CommonImage, Typography } from "../../../@All/AppForm/Form";
import { useGetAllProductsQuery } from "../Admin/Tab/Products/ProductApi";
import FilteringProductSkeleton from "../NAVbar/ShopAll/FilteringProduct/FilteringProductSkeleton";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import "./IceCreamPage.css";

const IceCreamPage = () => {
  const { data: products, isLoading } = useGetAllProductsQuery();
  const navigate = useNavigate();
  const lastItem = products?.products[products?.products?.length - 1];

  // Parallax effect for the background elements
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  if (isLoading) return <FilteringProductSkeleton />;
  if (!products?.products?.length) return <div>No products found</div>;

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 md:px-16 overflow-hidden bg-[#fafafa]">
      
      {/* BACKGROUND ELEMENTS - Animated Blobs */}
      <motion.div style={{ y: y1 }} className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-pink-100/50 rounded-full blur-[100px] -z-10" />
      <motion.div style={{ y: y2 }} className="absolute bottom-[-10%] right-[-5%] w-[35vw] h-[35vw] bg-blue-100/50 rounded-full blur-[100px] -z-10" />

      <div className="flex flex-col lg:flex-row items-center gap-12 max-w-7xl w-full z-10">

        {/* LEFT: IMAGE STAGE */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex-1 relative group"
        >
          {/* Decorative Ring */}
          <div className="absolute inset-0 border-2 border-dashed border-gray-200 rounded-full scale-110 group-hover:rotate-45 transition-transform duration-1000" />
          
          <div className="relative z-10 p-4">
            <motion.div
              whileHover={{ scale: 1.02, rotate: -2 }}
              className="bg-white p-6 rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] overflow-hidden"
            >
              <CommonImage
                src={lastItem?.productImage?.[0]}
                alt={lastItem.productName}
                className="rounded-[2rem] object-cover w-full aspect-[4/5] md:aspect-square"
              />
            </motion.div>

            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-50"
            >
              <div className="bg-[var(--main-web-color)] p-2 rounded-lg text-white">
                <Sparkles size={20} />
              </div>
              <div>
                <Typography className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Freshly Churned</Typography>
                <Typography className="text-sm font-bold text-gray-900">New Flavor</Typography>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT: CONTENT STAGE */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 text-center lg:text-left space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[var(--main-web-color)]  border border-blue-100">
             <span className="w-2 h-2 rounded-full bg-[var(--main-web-color)]  animate-pulse" />
             <Typography className="text-[10px] font-black uppercase tracking-widest">Editor's Choice</Typography>
          </div>
           <div className="flex flex-col">

          
          <Typography className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] tracking-tighter">
            Craving for <span className="text-[var(--main-web-color)] ">Perfect</span> {lastItem.productName}?
          </Typography>

          <Typography className="text-lg text-gray-500 leading-relaxed max-w-xl">
            Our artisanal <span className="text-gray-900 font-semibold">{lastItem.productName}</span> is handcrafted using locally sourced dairy and premium flavors, frozen slowly to ensure the smoothest texture in every scoop.
          </Typography>
 </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button
              onClick={() => navigate(`/viewproduct/${lastItem._id}`)}
              className="group flex items-center gap-3 px-8 py-4 bg-[var(--main-web-color)]  cursor-pointer text-white rounded-2xl font-bold hover:bg-[var(--main-web-color-2)]  transition-all shadow-xl shadow-gray-200 active:scale-95"
            >
              <ShoppingBag size={20} />
              Buy Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                </div>
              ))}
              <div className="pl-6">
                <Typography className="text-xs font-bold text-gray-900 leading-none">1.2k+</Typography>
                <Typography className="text-[10px] text-gray-400 font-medium">Happy Licks</Typography>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Wave (Improved SVG) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.41,133.73,118.07,198.8,107.7Z" fill="var(--main-web-color)"></path>
        </svg>
      </div>
    </div>
  );
};

export default IceCreamPage;