import { motion } from "framer-motion";
import FilterProduct from "../../FilterProduct";
import { IoClose } from "react-icons/io5";
import { Typography } from "../../../../../../../@All/AppForm/Form";
const ResponsiveFilter = ({ filter, setFilter, setFilterTab }: any) => {


    const clearFilter = () => {
      setFilter((item: any) => ({ ...item, category: [] }))
      setFilter((item: any) => ({ ...item, price: [0, 5000] }))
      setFilter((item: any) => ({ ...item, discount: [0, 100] }))
    };

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <motion.div
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-0 right-0 h-full w-96 bg-[var(--main-bg-color)] shadow-xl p-6"
      >
        <button
          onClick={() => setFilterTab(false)}
          className="absolute top-1 left-2"
        >
          <IoClose size={30} className="text-[var(--main-web-color)]" />
        </button>

        <FilterProduct filter={filter} setFilter={setFilter} />
          <button onClick={() => setFilterTab(false)} className="w-full p-2 bg-[var(--main-web-color)] rounded text-white mt-4"><Typography>Apply</Typography> </button>
          <button onClick={clearFilter} className="w-full p-2 border-2 border-[var(--main-web-color)] rounded text-black mt-4"><Typography>Reset All</Typography></button>
      </motion.div>
    </div>
  );
};

export default ResponsiveFilter;
