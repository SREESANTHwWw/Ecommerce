
import CardAdress from "./CartAdress/CardAdress";
import CartProducts from "./CartProducts/CartProducts";
import CartPayment from "./CartPayment/CartPayment";
import "./cart.css"

const Cart = () => {
   
  return (
      
   

   
 
       <div className="max-w-7xl mx-auto px-4 lg:px-10 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        <div className="flex flex-col gap-6">
          <CardAdress />
          

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <CartProducts />
          </div>
           <div className="lg:hidden">
            <CartPayment />
          </div>

         
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-24">
            <CartPayment />
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default Cart;
