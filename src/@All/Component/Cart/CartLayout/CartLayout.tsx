import { Outlet, useLocation } from "react-router-dom";
import CartNavBar from "../CartNavBar/CartNavBar";
import BreadCrumbs from "../../../../App/Pages/Breadcrumb/BreadCrumbs";

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

      <div className="px-4 lg:px-10">
        <BreadCrumbs />
      </div>

      <Outlet />
    </div>
  );
};

export default CartLayout;
