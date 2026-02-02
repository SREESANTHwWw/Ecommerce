import { motion } from "framer-motion";
import { CommonImage, Typography } from "../../../@All/AppForm/Form";
import { useGetAllProductsQuery } from "../Admin/Tab/Products/ProductApi";
import FilteringProductSkeleton from "../NAVbar/ShopAll/FilteringProduct/FilteringProductSkeleton";
import { useNavigate } from "react-router-dom";
import "./IceCreamPage.css";
import { useScrollAnimation } from "../../../@All/Functions/useScrollAnimation";

const IceCreamPage = () => {
  const { data: products, isLoading } = useGetAllProductsQuery();
  const navigate = useNavigate();
    const lastItem = products?.products[products?.products?.length - 1];
   const ref = useScrollAnimation("fade-right")
     const ref2 = useScrollAnimation("fade-left")


  if (isLoading) return <FilteringProductSkeleton />;
  if (!products?.products?.length) return <div>No products found</div>;


  return (
    <div className="wavy-box_2 min-h-screen flex items-center justify-center px-10 relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl w-full z-10">

        {/* LEFT IMAGE */}
        <motion.div
         whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex justify-center transition-transform duration-300 hover:scale-105"
        >
          <div ref={ref} className="wavy-box">
            <CommonImage
              src={lastItem?.productImage?.[0]}
              alt={lastItem.productName}
              className="rounded-lg object-fill w-full h-full shadow-2xl"
            />
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
        whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <div ref={ref2} className="flex flex-col gap-3">
            <Typography className="text-4xl font-bold">
              {lastItem.productName}
            </Typography>

            <Typography className="text-lg text-gray-600">
              Ice cream is a frozen dessert loved by everyone. Made with milk,
              cream, and rich flavors, it’s the perfect treat to cool down and
              sweeten your day.
            </Typography>

            <button
              onClick={() => navigate(`/viewproduct/${lastItem._id}`)}
              className="w-36 h-10 bg-[var(--main-bg-color)] cursor-pointer rounded-lg text-[var(--main-web-color)] hover:text-[var(--main-bg-color)]  hover:bg-[var(--main-web-color-2)] transition"
            >
              <Typography className="">Buy Now</Typography>
            </button>
          </div>
        </motion.div>
      </div>

     
      <div className="wave-bottom">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="var(--main-web-color)"
            d="M0,224L48,208C96,192,192,160,288,170.7C384,181,480,235,576,250.7C672,267,768,245,864,224C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default IceCreamPage;
