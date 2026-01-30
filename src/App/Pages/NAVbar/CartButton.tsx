import React from "react";
import { Typography } from "../../../@All/AppForm/Form";
import { MdOutlineShoppingCart } from "react-icons/md";

const CartButton = ({ cartLength ,navigate ,size }:any) => (

    

    
  <button className="cursor-pointer"
   onClick={()=>navigate("/cart")}
  >
    <div className="flex flex-col items-center mb-4">
      <div className="w-4 h-4 bg-red-800 text-white text-sm rounded-full flex items-center justify-center">
        <Typography>{cartLength}</Typography>
      </div>
      <MdOutlineShoppingCart className=" hover:text-[var(--bg-color-ca)] text-[var(--main-web-color)]" size={size} />
    </div>
  </button>
);

export default React.memo(CartButton);
