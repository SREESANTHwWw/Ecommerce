import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

type Props = {
  setSearchData: (value: string) => void;
 
};

const SearchComp: React.FC<Props> = ({ setSearchData, }) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.toLowerCase();
    setValue(text);
    setSearchData(text);
  };

  const clearSearch = () => {
    setValue("");
    setSearchData("");
  };

  return (
    <div className="flex items-center gap-3 w-full">
    
      <div className="flex items-center w-full h-14 px-4  border-b-2 border-gray-300 rounded-lg focus-within:border-[var(--main-web-color)] transition">
        <FiSearch className="text-gray-400 mr-3" size={20} />

        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Search products, categories..."
          className="w-full text-lg font-[Share_Tech] outline-none placeholder-gray-400"
        />

        {value && (
          <button onClick={clearSearch} className="ml-2">
            <IoMdClose size={20} className="text-gray-500 hover:text-black" />
          </button>
        )}
      </div>

    
   
    </div>
  );
};

export default SearchComp;
