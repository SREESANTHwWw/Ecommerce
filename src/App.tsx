import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import SpinnerLoading from "./@All/Component/Loading/SpinnerLoading";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = lazy(() => import("./@All/Component/Login/Login"));
const ForgotPassword = lazy(
  () => import("./@All/Component/Login/ForgotPassword")
);
const Admin = lazy(() => import("./App/Pages/Admin/Admin"));
const Signuping = lazy(() => import("./@All/Component/SignUp/Signuping"));
const IntroPage = lazy(() => import("./@All/Component/SignUp/IndroPage"));
const TermsPage = lazy(() => import("./App/Pages/Terms/TermPage"));
const Home = lazy(() => import("./App/Pages/Home/Home"));
const Layout = lazy(() => import("./App/Pages/Layout/Layout"));
const ShopAll = lazy(() => import("./App/Pages/NAVbar/ShopAll/ShopAll"));
const RegisterOtp = lazy(() => import("./@All/Component/SignUp/RegisterOtp"));
const Account = lazy(() => import("./App/Pages/Account/Account"));
const OverView = lazy(() => import("./App/Pages/Account/OverView/OverView"));
const Orders = lazy(() => import("./App/Pages/Account/Orders/Orders"));
const Cart = lazy(() => import("./@All/Component/Cart/Cart"));
import AdminProtectedRoute from "./@All/ProtectedRoute/ProtectedRoute";
const ViewProduct = lazy(()=> import("./App/Pages/ViewProduct/ViewProduct"))
import ComingSoon from "./App/Pages/ComingSoon/ComingSoon";
import CartLayout from "./@All/Component/Cart/CartLayout/CartLayout";
import CartCheckoutPage from "./@All/Component/Cart/CartPayment/CheckOut/CartCheckoutPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<SpinnerLoading />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/shopall" element={<ShopAll />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signuping />} />
              <Route path="/viewproduct/:id" element={<ViewProduct />} />

              <Route path="account" element={<Account />}>
                <Route index element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<OverView />} />
                <Route path="orders" element={<Orders />} />
                <Route path="coupon" element={<ComingSoon/>}/>
                <Route path="rewards" element={<ComingSoon/>}/>
                <Route path="profile" element={<ComingSoon/>}/>
                <Route path="address" element={<ComingSoon/>}/>
                <Route path="payment" element={<ComingSoon/>}/>
                <Route path="delete" element={<ComingSoon/>}/>
              </Route>
            </Route>
            
  <Route path="/cart" element={<CartLayout />}>
    <Route index element={<Cart />} />
    <Route path="checkout" element={<CartCheckoutPage />} />
  </Route>


           
            <Route path="/registerotp" element={<RegisterOtp />} />
            <Route path="/terms&conditions" element={<TermsPage />} />
            <Route path="/groviya" element={<IntroPage />} />
            <Route path="/about" element={<ComingSoon/>}/>
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route
              path="/admin/*"
              element={
                <AdminProtectedRoute>
                  <Admin />
                </AdminProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
