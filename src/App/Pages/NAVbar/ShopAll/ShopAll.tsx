import { useEffect, useState } from "react";
import FilterProduct from "./Filter/FilterProduct";
import { useProductFilterQuery } from "../../Admin/Tab/Products/ProductApi";

import { useDebounce } from "../../../../@All/Functions/Hooks/Debounce";
import Pagination from "../../../../@All/Component/Pagination/Pagination";
import ResponsiveFilter from "./Filter/Ranges/ResponsiveFilter/ResponsiveFilter";
import { Typography } from "../../../../@All/AppForm/Form";
import ProductFiltered from "./FilteringProduct/ProductFiltered";
import { MdOutlineTune } from "react-icons/md";
import SearchComp from "../../../../@All/Component/SearchComponents/SearchComp";
import { motion } from "framer-motion";


type FilterState = {
  category: string[];
  search: string;
  price: [number, number];
  discount: [number, number];
};
const ShopAll = () => {
  const [filter, setFilter] = useState<FilterState>({
    category: [],
    search: "",
    price: [0, 5000],
    discount: [0, 100],
  });
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [filterTab, setFilterTab] = useState(false);
  const debouncedFilter = useDebounce(filter, 600);

  const {
    data: products,
    isLoading,
    isFetching,
  } = useProductFilterQuery({
    category: debouncedFilter.category,
    minPrice: debouncedFilter.price[0],
    maxPrice: debouncedFilter.price[1],
    minDiscount: debouncedFilter.discount[0],
    maxDiscount: debouncedFilter.discount[1],
    page,
    search: debouncedFilter.search,
    limit: 12,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [debouncedFilter, debouncedFilter.category]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setFilterTab(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [filterTab]);

  return (
    <div className="flex flex-col   w-full bg-[var(--main-bg-color)]">
      <div className="w-full flex justify-center p-4">
        <motion.div
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="md:w-[70%] w-full bg-[var(--main-bg-color)] "
        >
          <SearchComp
            setSearchData={(value) =>
              setFilter((prev) => ({ ...prev, search: value }))
            }
    
          />
        </motion.div>
      </div>

      <div className="flex">
        <div className=" ">
          {!isMobile && (
            <div className="flex p-4">
              <FilterProduct filter={filter} setFilter={setFilter} />
            </div>
          )}
          {isMobile && filterTab && (
            <ResponsiveFilter
              filter={filter}
              setFilter={setFilter}
              setFilterTab={setFilterTab}
            />
          )}
        </div>
        <div className="w-full flex flex-col  p-2 gap-3">
          {isMobile && (
            <div className="flex justify-end pr-4">
              <button onClick={() => setFilterTab(true)} className=" ">
                <div className="flex gap-3">
                  <MdOutlineTune
                    size={30}
                    className="text-[var(--main-web-color)]"
                  />{" "}
                  <Typography className="text-xl font-bold text-[var(--main-web-color)] ">
                    Filter
                  </Typography>
                </div>
              </button>
            </div>
          )}
          <div className="">
            <ProductFiltered
              products={products}
              isLoading={isLoading}
              isFetching={isFetching}
            />
          </div>

          <div className="flex justify-center h-full items-center ">
            <Pagination
              page={page}
              setPage={setPage}
              totalPages={products?.totalPages}
            />
          </div>
          
        </div>
        
      </div>
    
    </div>
  );
};

export default ShopAll;
