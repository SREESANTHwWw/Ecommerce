import { useMemo, useState } from "react";
import { useGetAllProductsQuery } from "../../../../Admin/Tab/Products/ProductApi";
import { Typography } from "../../../../../../@All/AppForm/Form";
import { FirstLetterCap } from "../../../../../../@All/Functions/FirstLetterCap";
import { motion, AnimatePresence } from "framer-motion";

const ProductCatgoryFilter = ({ filter, setFilter }: any) => {
  const { data: AllProducts } = useGetAllProductsQuery();
  const [showAll, setShowAll] = useState(false);
  const VISIBLE_COUNT = 5;

  const category = useMemo(() => {
    if (!AllProducts?.products) return [];
    return [...new Set(AllProducts.products.map((item: any) => item.productCategory))];
  }, [AllProducts]);

  const visibleCategory = useMemo(() => {
    return showAll ? category : category.slice(0, VISIBLE_COUNT);
  }, [showAll, category]);

  // Animation Variants
  const listVariants = {
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    hidden: { opacity: 0 },
  };

  const itemVariants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -10 },
  };

  const toggleCategory = (item: any) => {
    setFilter((prev: any) => ({
      ...prev,
      category: prev.category.includes(item)
        ? prev.category.filter((i: any) => i !== item)
        : [...prev.category, item],
    }));
  };

  return (
    <div className="w-72 flex flex-col p-5 bg-white rounded-2xl shadow-sm border border-gray-50 gap-4">
      <Typography className="text-lg font-bold text-gray-800 select-none">
        Category
      </Typography>

      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-1"
      >
        <AnimatePresence mode="popLayout">
          {visibleCategory.map((item: any) => {
            const isSelected = filter.category.includes(item);
            return (
              <motion.div
                key={item}
                variants={itemVariants}
                layout
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <label
                  className={`group flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? "bg-[var(--main-web-color)] text-white shadow-md shadow-blue-100" 
                      : "hover:bg-gray-50 text-gray-600"
                  }`}
                  onClick={() => toggleCategory(item)}
                >
                  <div className="flex items-center gap-3">
                    {/* Custom Animated Checkbox */}
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                      isSelected ? "border-white/40 bg-white/20" : "border-gray-300 bg-white"
                    }`}>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-sm bg-white"
                        />
                      )}
                    </div>
                    
                    <Typography className={`text-sm font-medium ${isSelected ? "text-white" : "text-gray-700"}`}>
                      {FirstLetterCap(item)}
                    </Typography>
                  </div>
                  
                  {/* Optional: Count or Arrow icon can go here */}
                </label>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {category.length > VISIBLE_COUNT && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="group flex items-center justify-center gap-2 py-2 mt-2 text-sm font-bold text-[var(--main-web-color)] hover:bg-blue-50 rounded-xl transition-all"
        >
          <span>{showAll ? "Show Less" : `View All (${category.length})`}</span>
          <motion.span
            animate={{ rotate: showAll ? 180 : 0 }}
            className="text-[10px]"
          >
            ▼
          </motion.span>
        </button>
      )}
    </div>
  );
};

export default ProductCatgoryFilter;