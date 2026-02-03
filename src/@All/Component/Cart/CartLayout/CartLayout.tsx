import { Outlet, useLocation } from "react-router-dom";
import CartNavBar from "../CartNavBar/CartNavBar";
import BreadCrumbs from "../../../../App/Pages/Breadcrumb/BreadCrumbs";
import ScrollToTop from "../../../Functions/ScrollToTop";

const CartLayout = () => {
  const location = useLocation();

  const getActiveStep = () => {
    if (location.pathname.includes("address")) return "Address";
    if (location.pathname.includes("checkout")) return "Payment";
    return "Cart";
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Cart Navbar ONLY for cart flow */}
      <CartNavBar activeStep={getActiveStep()} />
 <ScrollToTop/>
      <div className="">
        <BreadCrumbs />
      </div>

      <Outlet />
    </div>
  );
};

export default CartLayout;
