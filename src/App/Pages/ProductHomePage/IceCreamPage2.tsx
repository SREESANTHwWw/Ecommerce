import { motion } from "framer-motion";
import { CommonImage, Typography } from "../../../@All/AppForm/Form";
import { useGetAllProductsQuery } from "../Admin/Tab/Products/ProductApi";
import FilteringProductSkeleton from "../NAVbar/ShopAll/FilteringProduct/FilteringProductSkeleton";

import { useNavigate } from "react-router-dom";
import "../ProductHomePage/IceCreamPage.css"
const IceCreamPage2 = () => {
  const { data: products, isLoading } = useGetAllProductsQuery();
  const navigate = useNavigate();

  if (isLoading) return <FilteringProductSkeleton />;
  if (!products?.products?.length) return <div>No products found</div>;

  const sliced = products.products.slice(1, 4);

  return (
    <div className="wavy-box_2">
      <div className="min-h-screen flex items-center justify-center px-10">
        <div className="max-w-6xl w-full">

          {/* CARD GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10   ">
            {sliced.map((item: any, index: number) => (
              <motion.div
                key={item._id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col"
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
                    className="mt-auto h-10 bg-[var(--main-web-color)] rounded-lg hover:bg-[var(--main-web-color-2)]"
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






