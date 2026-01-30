import React from "react";
import CartNavBar from "./CartNavBar/CartNavBar";
import BreadCrumbs from "../../../App/Pages/Breadcrumb/BreadCrumbs";
import CardAdress from "./CartAdress/CardAdress";
import CartProducts from "./CartProducts/CartProducts";

const Cart = () => {
  return (
    <div className="w-full h-full">
      <div>
        <CartNavBar />
        <BreadCrumbs/>
      </div>
      <div className="flex ">

        <div className=" md:w-[70%] w-full px-10 py-3">
          <CardAdress />
          <CartProducts/>
        </div>

      </div>
    </div>
  );
};

export default Cart;
