import { useEffect, useMemo, useState } from "react";
import { useGetAllProductsQuery } from "../../Admin/Tab/Products/ProductApi";
import { useDebounce } from "../../../../@All/Functions/Hooks/Debounce";
import SearchPage from "./SearchPage";
import SearchedProducts from "./SearchedProducts";
import { motion } from "framer-motion";

interface SearchModalProps {
  searchTab: boolean;
  setSearchTab: (value: boolean) => void;
}

const SearchModal = ({ searchTab, setSearchTab }: SearchModalProps) => {
  const { data: allProducts, isLoading, isFetching } = useGetAllProductsQuery();

  const [searchData, setSearchData] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const debouncedSearch = useDebounce(searchData, 500);


    useEffect(() => {
  if (!searchTab) {
    setSearchData("");
    setSearchLoading(false);
  }
}, [searchTab]);


  useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === "Escape") setSearchTab(false);
  };

  if (searchTab) window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}, [searchTab]);

  useEffect(() => {
    if (!searchData) {
      setSearchLoading(false);
      return;
    }

    setSearchLoading(true);

    const timer = setTimeout(() => {
      setSearchLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchData]);

  const filteredProducts = useMemo(() => {
    if (!allProducts?.products) return [];

    if (!debouncedSearch) {
      return allProducts.products.slice(0, 4);
    }

    return allProducts.products.filter((p: any) =>
      p.productName.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, allProducts]);

  if (!searchTab) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <motion.div
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="bg-white max-w-3xl ml-auto p-4"
      >
        <SearchPage setSearchData={setSearchData} setSearchTab={setSearchTab} />

        <SearchedProducts
        setSearchTab={setSearchTab}
          filteredProducts={filteredProducts}
          isLoading={isLoading || isFetching || searchLoading}
        />
      </motion.div>
    </div>
  );
};

export default SearchModal;
