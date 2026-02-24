import { motion, AnimatePresence } from "framer-motion";
import PriceRange from "./Ranges/PriceRange";
import DiscountRang from "./Ranges/DiscountRang";
import ProductCatgoryFilter from "./Category/ProductCatgoryFilter";

const FilterProduct = ({ filter, setFilter }: any) => {
  // Check if any filter is modified to show the Global Reset
  const isFiltered = 
    filter.category.length > 0 || 
    filter.price[0] !== 0 || 
    filter.price[1] !== 5000 || 
    filter.discount[0] !== 0 || 
    filter.discount[1] !== 100;

  const handleResetAll = () => {
    setFilter({
      category: [],
      price: [0, 5000],
      discount: [0, 100],
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.15,
        duration: 0.5,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-5 flex flex-col gap-6 p-2 w-full max-w-[300px]"
    >
      {/* Sidebar Header & Global Reset */}
      <div className="flex items-center justify-between px-3">
        <h2 className="text-xl font-black tracking-tight text-gray-900">Filters</h2>
        <AnimatePresence>
          {isFiltered && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleResetAll}
              className="text-xs font-bold text-[var(--main-web-color)] hover:underline cursor-pointer"
            >
              Clear All
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-2">
        {/* Category Section */}
        <motion.div variants={sectionVariants}>
          <ProductCatgoryFilter filter={filter} setFilter={setFilter} />
        </motion.div>

        {/* Separator */}
        <div className="mx-5 h-[1px] bg-gray-100" />

        {/* Price Section */}
        <motion.div variants={sectionVariants}>
          <PriceRange filter={filter} setFilter={setFilter} />
        </motion.div>

        {/* Separator */}
        <div className="mx-5 h-[1px] bg-gray-100" />

        {/* Discount Section */}
        <motion.div variants={sectionVariants}>
          <DiscountRang filter={filter} setFilter={setFilter} />
        </motion.div>
      </div>

      {/* Modern Tip/Banner (Optional) */}
      <div className="mt-4 p-4 bg-gradient-to-br from-[var(--main-web-color)] to-[var(--main-web-color-2)] rounded-2xl text-white">
        <p className="text-xs opacity-70">Need help?</p>
        <p className="text-sm font-bold">Contact Support</p>
      </div>
    </motion.div>
  );
};

export default FilterProduct;