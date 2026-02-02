import { motion, cubicBezier } from "framer-motion";
import { CommonImage, Typography } from "../../../@All/AppForm/Form";
import { useGetAllProductsQuery } from "../Admin/Tab/Products/ProductApi";
import FilteringProductSkeleton from "../NAVbar/ShopAll/FilteringProduct/FilteringProductSkeleton";
import { useNavigate } from "react-router-dom";
import "../ProductHomePage/IceCreamPage.css";

const cardVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: 100,
    rotate: [-8, 0, 8][index],
    scale: 0.9,
  }),
  visible: (index: number) => ({
    opacity: 1,
    y: [40, 0, 40][index],
    rotate: [-8, 0, 8][index],
    scale: 1,
    transition: {
      duration: 0.8,
      delay: index * 0.15,
      ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
    },
  }),
};

const IceCreamPage2 = () => {
  const { data: products, isLoading } = useGetAllProductsQuery();
  const navigate = useNavigate();

  if (isLoading) return <FilteringProductSkeleton />;
  if (!products?.products?.length) return <div>No products found</div>;

  const sliced = products.products.slice(1, 4);

  return (
    <div className="">
      <div className="min-h-screen flex items-center justify-center px-6 md:px-10">
        <div className="max-w-6xl w-full">
       
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {sliced.map((item: any, index: number) => (
              <motion.div
                key={item._id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3 }} 
                whileHover={{
                  scale: 1.08,
                  rotate: 0,
                  y: -10,
                  zIndex: 20,
                }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col cursor-pointer"
              >
                {/* IMAGE */}
                <div className="h-60 overflow-hidden">
                  <CommonImage
                    src={item?.productImage?.[0]}
                    alt={item.productName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <Typography className="text-xl font-bold">
                    {item.productName}
                  </Typography>

                  <Typography className="text-gray-600 text-sm">
                    Ice cream is a frozen dessert loved by everyone. Made with milk,
                    cream, and rich flavors.
                  </Typography>

                  <button
                    onClick={() => navigate(`/viewproduct/${item._id}`)}
                    className="mt-auto h-10 bg-[var(--main-web-color)] cursor-pointer rounded-lg hover:bg-[var(--main-web-color-2)] transition"
                  >
                    <Typography className="text-white">Buy Now</Typography>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IceCreamPage2;
