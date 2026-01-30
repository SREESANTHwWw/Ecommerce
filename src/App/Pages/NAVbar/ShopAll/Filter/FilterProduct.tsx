import PriceRange from "./Ranges/PriceRange";
import DiscountRang from "./Ranges/DiscountRang";
import ProductCatgoryFilter from "./Category/ProductCatgoryFilter";

const FilterProduct = ({
 filter,
  setFilter,
}: any) => {
  return (
    <div className="flex flex-col p-3 bg-[var(--main-bg-color)] rounded ">
      <div>
        <ProductCatgoryFilter
        filter={filter}
        setFilter={setFilter}
        />
      </div>
      <div >
        <PriceRange filter={filter} setFilter={setFilter} />
      </div>
      <div>
        <DiscountRang
          filter={filter}
          setFilter={setFilter}
        />
      </div>
    </div>
  );
};

export default FilterProduct;
