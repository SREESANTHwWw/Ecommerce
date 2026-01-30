import { useMemo } from "react";
import { useGetAllProductsQuery } from "../../App/Pages/Admin/Tab/Products/ProductApi";

export const SearchFun = ( searchData = ""  ) => {
  const { data: products } = useGetAllProductsQuery();

  const filterData = useMemo(() => {
    if (!products?.products) return [];

    return products?.products.filter((item: any) =>
      item.productName.toLowerCase().includes(searchData.toLowerCase())
    );
  }, [searchData, products]);
  return filterData;
};
