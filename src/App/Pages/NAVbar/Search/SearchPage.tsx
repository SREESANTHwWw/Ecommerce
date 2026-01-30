import { FiSearch } from "react-icons/fi";

import { IoMdCloseCircleOutline } from "react-icons/io";

const SearchPage = ({  setSearchTab, setSearchData }: any) => {
  return (
    <div className="w-full  ">
      <div className="flex items-center w-full h-14 px-4 border-b-2 border-gray-300 rounded-lg focus-within:border-[var(--main-web-color)] transition  ">
        <FiSearch className="text-gray-400 mr-3" size={20} />
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchData(e.target.value.toLowerCase())}
          className="w-full text-lg font-[Share_Tech] outline-none placeholder-gray-400"
        />
        <button
          className="cursor-pointer bg-[var(--main-web-color)] flex items-center justify-center w-10 h-10 rounded"
          onClick={() => setSearchTab(false)}
        >
          <IoMdCloseCircleOutline size={25} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default SearchPage;
