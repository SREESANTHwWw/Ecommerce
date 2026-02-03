import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../Admin/Tab/Products/ProductApi";
import StarRating from "../../../@All/Component/StarRating/StarRating ";
import { CommonImage, Typography } from "../../../@All/AppForm/Form";
import RelatedProduct from "./RelatedProducts/RelatedProduct";
import AddtoCartButton from "../../../@All/Component/CommonButtons/AddtoCartButton";
import { motion, AnimatePresence } from "framer-motion";
import { Zap,  Truck ,Droplets} from "lucide-react";
import PreviousButton from "../../../@All/Component/CommonButtons/PreviousButton";

const ViewProduct = () => {
  const { id } = useParams();
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductByIdQuery(id ?? "", {
    refetchOnMountOrArgChange: true,
  });

  const [activeImg, setActiveImg] = useState(0);
  const item = products?.product;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-[var(--main-web-color)] border-t-transparent rounded-full"
        />
      </div>
    );

  if (isError || !item)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Typography className="text-red-500 font-bold">
          Product not found
        </Typography>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[var(--main-bg-color)] min-h-screen pb-20"

    > 
      <div className="max-w-7xl mx-auto px-4  ">
        <div className="p-4 ">
        <PreviousButton variant={item} />
      </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-6">
            <div className="flex md:flex-col gap-3 shrink-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {item.productImage.map((img: string, index: number) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveImg(index)}
                  className={`w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-all border-2 
          ${activeImg === index ? "border-[var(--main-web-color)] shadow-md" : "border-gray-100 opacity-60"}`}
                >
                  <CommonImage
                    src={img}
                    className="w-full h-full object-cover"
                    alt={`Thumbnail ${index}`}
                  />
                </motion.div>
              ))}
            </div>

          
            <div className="relative w-full aspect-[4/5] md:aspect-square bg-gray-50 rounded-[2.5rem] overflow-hidden border border-gray-50 shadow-inner group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={item.productImage[activeImg]}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

      
              <div className="absolute top-6 left-6 z-10">
                {item.productStock > 0 ? (
                  <Typography className="bg-white/90 backdrop-blur-md text-emerald-700 text-[10px] font-black uppercase px-4 py-2 rounded-full shadow-sm tracking-widest">
                    In Stock
                  </Typography>
                ) : (
                  <Typography className="bg-white/90 backdrop-blur-md text-rose-700 text-[10px] font-black uppercase px-4 py-2 rounded-full shadow-sm tracking-widest">
                    Out of Stock
                  </Typography>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6 py-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-col  ">
                <Typography className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-2">
                  {item.productName}
                </Typography>
                <Typography className="text-gray-400 px-1 text-xs font-bold uppercase tracking-widest mb-2">
                  {item.productCategory}
                </Typography>
              </div>

              <div className="flex items-center gap-2">
                <StarRating rating={item.averageRating} />
                <Typography className="text-xs text-gray-400 font-medium">
                  (120+ Reviews)
                </Typography>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 p-6 rounded-3xl"
            >
              <div className="flex items-baseline gap-3">
                <Typography className="text-3xl font-black text-[var(--main-web-color)]">
                  ₹{item.productPrice}
                </Typography>
                <Typography className="text-lg line-through text-gray-400 font-medium">
                  ₹{item.productOfferPrice}
                </Typography>
                <Typography className="ml-auto text-emerald-600 text-sm font-bold">
                  {Math.round(
                    ((item.productOfferPrice - item.productPrice) /
                      item.productOfferPrice) *
                      100,
                  )}
                  % OFF
                </Typography>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Typography className="text-gray-600 leading-relaxed text-sm">
                {item.productDescription}
              </Typography>
            </motion.div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <Truck size={18} className="text-[var(--main-web-color-2)]" />
                <span className="text-[10px] font-bold text-gray-600 uppercase">
                  Cold-Chain Delivery
                </span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <Droplets size={18} className="text-pink-400" />
                <span className="text-[10px] font-bold text-gray-600 uppercase">
                  100% Organic Dairy
                </span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mt-auto pt-6"
            >
              <AddtoCartButton
                className="w-full h-14 bg-[var(--main-web-color)] hover:bg-[var(--main-web-color-2)] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95"
                product={item}
              />
              <button
                disabled
                className="w-full h-14 bg-[var(--main-web-color)] disabled:cursor-not-allowed hover:opacity-90 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-orange-100 transition-all active:scale-95"
              >
                <Zap size={18} fill="currentColor" />
                Buy Now
              </button>
            </motion.div>
          </div>
        </div>

        <div className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[2px] flex-1 bg-gray-100"></div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              You May Also Like
            </h2>
            <div className="h-[2px] flex-1 bg-gray-100"></div>
          </div>
          <RelatedProduct products={products} />
        </div>
      </div>
    </motion.div>
  );
};

export default ViewProduct;
