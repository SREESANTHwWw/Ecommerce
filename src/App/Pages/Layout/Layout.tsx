import BreadCrumbs from "../Breadcrumb/BreadCrumbs";
import BreadcrumbSEO from "../Breadcrumb/Utils/BreadCurmbSEO";

import Navbar from "../NAVbar/Navbar";
import { Outlet } from "react-router-dom";
import IceCreamFooter from "../ProductHomePage/IceCreamFooter";
import { useScrollAnimation } from "../../../@All/Functions/useScrollAnimation";
import ScrollToTop from "../../../@All/Functions/ScrollToTop";

const Layout = () => {
  const ref = useScrollAnimation("fade-up");

  return (
    <>
      <Navbar />

      <ScrollToTop />

      <div className="md:pt-28 pt-20 ">
        <BreadcrumbSEO />
        <BreadCrumbs />

        <Outlet />
        <div ref={ref} className="bg-[var(--main-web-color)]">
          <IceCreamFooter />
        </div>
      </div>
    </>
  );
};

export default Layout;
