import { CommonImage, Typography } from "../../../../@All/AppForm/Form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const RelatedProduct = ({ products }: any) => {
  const navigate = useNavigate();
  
  const handlerRelatedProduct = (id: any) => {
    navigate(`/viewproduct/${id}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Animation variants for the grid entrance
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 100 } 
    },
  };

  if (!products?.relatedProducts || products.relatedProducts.length === 0) {
    return (
      <div className="py-10 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
        <p className="text-gray-400 font-medium">No similar items found</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {products.relatedProducts.map((rp: any) => (
        <motion.div
          key={rp._id}
          variants={itemAnim}
          whileHover={{ y: -8 }}
          onClick={() => handlerRelatedProduct(rp._id)}
          className="group relative bg-white rounded-[2rem] p-3 border border-gray-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-300 cursor-pointer"
        >
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-gray-50">
            <CommonImage
              src={rp.productImage?.[0]}
              alt={rp.productName}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
          
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
              <div className="p-2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg text-gray-900">
                <Plus size={20} />
              </div>
            </div>
          </div>

         
          <div className="px-2 py-4">
            <Typography className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-[var(--main-web-color)] transition-colors">
              {rp.productName}
            </Typography>
            
            <div className="mt-1 flex items-center justify-between">
              <Typography className="text-lg font-black text-gray-900">
                ₹{rp.productPrice}
              </Typography>
              {rp.productOfferPrice > rp.productPrice && (
                <Typography className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  SAVE
                </Typography>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default RelatedProduct;