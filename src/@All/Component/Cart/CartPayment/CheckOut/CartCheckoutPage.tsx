import CheckOut from "./CheckOut";
import "../../cart.css"

const CartCheckoutPage = () => {
  return (

    <div className="max-w-5xl bg-[var(--main-web-color)] rounded-lg mx-auto px-4 lg:px-10 py-6">
      <CheckOut />
    </div>
   
  );
};

export default CartCheckoutPage;
