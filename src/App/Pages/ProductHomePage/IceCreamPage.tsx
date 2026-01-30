import { motion } from "framer-motion";
import { CommonImage, Typography } from "../../../@All/AppForm/Form";
import { useGetAllProductsQuery } from "../Admin/Tab/Products/ProductApi";
import FilteringProductSkeleton from "../NAVbar/ShopAll/FilteringProduct/FilteringProductSkeleton";

import { useNavigate } from "react-router-dom";

const IceCreamPage = () => {
  const { data: products, isLoading } = useGetAllProductsQuery();
  const navigate = useNavigate();

  if (isLoading) return <FilteringProductSkeleton />;
  if (!products?.products?.length) return <div>No products found</div>;

  const sliced = products.products[0];

  return (
    <div className="min-h-screen flex items-center justify-center px-10">
      <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl w-full">

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex justify-center transition-transform duration-300 hover:scale-105"
        >
          <CommonImage
            src={sliced?.productImage?.[0]}
            alt={sliced.productName}
            className="w-[80%] h-[80%] rounded-lg shadow-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1"
        >
          <div className="flex flex-col gap-8">
            <Typography className="text-4xl font-bold">
              {sliced.productName}
            </Typography>

            <Typography className="text-lg text-gray-600">
             Ice cream is a frozen dessert loved by everyone. Made with milk, cream, and rich flavors, it’s the perfect treat to cool down and sweeten your day.
            </Typography>

            <button
              onClick={() => navigate(`/viewproduct/${sliced._id}`)}
              className="w-36 h-10 bg-[var(--main-web-color)] cursor-pointer rounded-lg hover:bg-[var(--main-web-color-2)]"
            >
              <Typography className="text-white">Buy Now</Typography>
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};


export default IceCreamPage;
