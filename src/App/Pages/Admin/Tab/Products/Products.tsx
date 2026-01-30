import  { useState } from "react";
import Cardview from "./Tabs/Cardview";
import TableView from "./Tabs/TableView";
import {  TextController, Typography } from "../../../../../@All/AppForm/Form";
import { useForm } from "react-hook-form";

const Products = () => {
  const [tab, setTab] = useState(0);
  const { control,  watch } = useForm()

  const SearchValue = watch("searchData");
  
   console.log(SearchValue)


  return (
    <div
      className={`p-6 min-h-screen   `}
      // style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      <div className=" font-bold mb-6 flex justify-between">
        <Typography
         
          className="text-2xl font-bold"
        >
          Products
        </Typography>

        <div className="flex gap-3">
           <TextController
            id="searchData"
            name="searchData"
         
            control={control}
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTab(0)}
          className={`px-4 py-2 rounded ${
            tab === 0 ? "bg-gray-200" : "bg-gray-100"
          }`}
        >
          Card View
        </button>
        <button
          onClick={() => setTab(1)}
          className={`px-4 py-2 rounded ${
            tab === 1 ? "bg-gray-200" : "bg-gray-100"
          }`}
        >
          Table View
        </button>
      </div>

      <div>
        {tab === 0 && <Cardview  searchData={SearchValue} />}
        {tab === 1 && <TableView  />}
      </div>
    </div>
  );
};

export default Products;
