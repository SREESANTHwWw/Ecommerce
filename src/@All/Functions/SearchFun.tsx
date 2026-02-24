import { useMemo } from "react";
import { useGetAllProductsQuery } from "../../App/Pages/Admin/Tab/Products/ProductApi";
import { useDebounce } from "./Hooks/Debounce";


export const SearchFun = (searchData = "") => {
  const { data: products } = useGetAllProductsQuery();

  const debouncedSearch = useDebounce(searchData, 400);

  const filterData = useMemo(() => {
    if (!products?.products || !debouncedSearch) return products?.products || [];

    return products.products.filter((item: any) =>
      item.productName
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, products]);

  return filterData;
};
