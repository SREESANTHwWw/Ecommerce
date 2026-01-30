import BreadCrumbs from "../Breadcrumb/BreadCrumbs";
import BreadcrumbSEO from "../Breadcrumb/Utils/BreadCurmbSEO";

import Navbar from "../NAVbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
  
         <Navbar />
   
     
         
      <div className="md:pt-28 pt-20 ">
        <BreadcrumbSEO />
        <BreadCrumbs />
        
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
