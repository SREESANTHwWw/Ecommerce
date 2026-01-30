import { useMemo, useState } from "react";
import { useGetAllProductsQuery } from "../../../../Admin/Tab/Products/ProductApi";
import { Typography } from "../../../../../../@All/AppForm/Form";
import { FirstLetterCap } from "../../../../../../@All/Functions/FirstLetterCap";
import {motion} from "framer-motion"
const ProductCatgoryFilter = ({ filter, setFilter }: any) => {
  const { data: AllProducts } = useGetAllProductsQuery();
  const [showAll, setShowAll] = useState(false);
  const VISIBLECOUNT = 5;

  const sidebarVariants = {
    hidden: { x: -40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
  };


  const category = useMemo(() => {
    if (!AllProducts?.products) return [];

    return [
      ...new Set(
        AllProducts?.products.map((item: any) => item.productCategory)
      ),
    ];
  }, [AllProducts]);

  const visibleCategory = useMemo(() => {
    if (!category) return [];

    return showAll ? category : category.slice(0, VISIBLECOUNT);
  }, [showAll, category]);

  return (
    <div className="flex flex-col p-4 gap-4">
      <Typography className="text-xl font-bold text-[var(--main-web-color)] select-none">
        Category
      </Typography>

      <motion.div
      variants={sidebarVariants  }
        
      className="flex flex-col">
        {visibleCategory.map((item: any) => (
          <label
            key={item}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              name="category"
              value={item}
              checked={filter.category.includes(item)}
              onChange={() =>
                setFilter((prev: any) => ({
                  ...prev,
                  category: prev.category.includes(item)
                    ? prev.category.filter((i: any) => i !== item)
                    : [...prev.category, item],
                }))
              }
              className="hidden"
            />

            <span
              className={`w-4 h-4 rounded border-2 flex items-center justify-center
    ${
      filter.category.includes(item)
        ? "border-[var(--main-web-color)]"
        : "border-gray-400"
    }
  `}
            >
              {filter.category.includes(item) && (
                <span className="w-2.5 h-2.5 rounded bg-[var(--main-web-color)]" />
              )}
            </span>

            <Typography className="font-semibold">
              {FirstLetterCap(item)}
            </Typography>
          </label>
        ))}
      </motion.div>
      {category.length > VISIBLECOUNT && (
        <div className="">
          <button
            className="text-[var(--main-web-color)] cursor-pointer"
            onClick={() => setShowAll(!showAll)}
          >
            <Typography>{showAll ? "Show Less" : "Show All"}</Typography>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCatgoryFilter;
