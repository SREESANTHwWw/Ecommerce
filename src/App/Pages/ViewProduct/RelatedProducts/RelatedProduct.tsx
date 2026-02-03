import { CommonImage, Typography } from "../../../../@All/AppForm/Form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Star, ArrowUpRight } from "lucide-react";

const RelatedProduct = ({ products }: any) => {
  const navigate = useNavigate();

  const handlerRelatedProduct = (id: any) => {
    navigate(`/viewproduct/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemAnim = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 260, damping: 20 } 
    },
  };

  if (!products?.relatedProducts || products.relatedProducts.length === 0) {
    return (
      <div className="py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
        <Typography className="text-gray-400 font-semibold">No similar items found in this category</Typography>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show" // Starts animation when visible on screen
      viewport={{ once: true }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {products.relatedProducts.map((rp: any) => {
        const discount = Math.round(((rp.productOfferPrice - rp.productPrice) / rp.productOfferPrice) * 100);

        return (
          <motion.div
            key={rp._id}
            variants={itemAnim}
            whileHover={{ y: -10 }}
            onClick={() => handlerRelatedProduct(rp._id)}
            className="group relative bg-white rounded-[2.5rem] p-4 border border-transparent hover:border-gray-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 cursor-pointer overflow-hidden"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#f9f9f9]">
              <CommonImage
                src={rp.productImage?.[0]}
                alt={rp.productName}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Floating Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {discount > 0 && (
                  <span className="bg-orange-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg">
                    -{discount}%
                  </span>
                )}
                {rp.averageRating >= 4 && (
                  <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                    <Star size={10} fill="currentColor" className="text-yellow-400" /> TOP
                  </span>
                )}
              </div>

              {/* View Detail Overlay */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <motion.div 
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    className="p-4 bg-white rounded-full shadow-xl text-gray-900"
                 >
                    <ArrowUpRight size={24} />
                 </motion.div>
              </div>
            </div>

            {/* Product Details */}
            <div className="mt-5 px-1">
              <div className="flex justify-between items-start mb-1">
                <Typography className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {rp.productCategory}
                </Typography>
                <div className="flex items-center gap-1">
                  <Star size={12} fill="currentColor" className="text-yellow-400" />
                  <Typography className="text-[11px] font-bold text-gray-600">{rp.averageRating || "5.0"}</Typography>
                </div>
              </div>

              <Typography className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-[var(--main-web-color)] transition-colors">
                {rp.productName}
              </Typography>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="flex flex-col">
                  <Typography className="text-xl font-black text-gray-900 leading-none">
                    ₹{rp.productPrice}
                  </Typography>
                  <Typography className="text-[11px] line-through text-gray-400 mt-1">
                    ₹{rp.productOfferPrice}
                  </Typography>
                </div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="h-12 w-12 bg-[var(--main-web-color)] text-white rounded-2xl flex items-center cursor-pointer justify-center hover:bg-[var(--main-web-color-2)] transition-colors shadow-lg shadow-gray-200"
                >
                  <Plus size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default RelatedProduct;