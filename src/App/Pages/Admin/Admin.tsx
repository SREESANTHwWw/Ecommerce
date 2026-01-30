import { useState } from "react";
import SideBar from "./SideBar";
import image from "../../../assets/profile.png";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Tab/dashBorad/DashBord";
import Products from "./Tab/Products/Products";
import AddPoductForm from "./Tab/Products/AddProduct/AddPoductForm";
import ReOrderProduct from "./Tab/Products/ReOrdering/ReOrderProduct";
import { TfiHome } from "react-icons/tfi";
import AddCategory from "./Tab/AdminCategory/AddCatgory/AddCategory";

const Admin = () => {
  const naviagte = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarWidth = sidebarOpen ? 200 : 90;
  const navbarHeight = "11vh";

  return (
    <div className="w-full min-h-screen">
      <SideBar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div
        className="fixed top-0 right-0 h-[11vh] bg-white  gap-5 flex justify-end items-center px-6 z-30"
        style={{
          left: sidebarWidth,
          transition: "left 0.3s",
        }}
      >
        <button onClick={() => naviagte("/")}>
          <TfiHome className="text-3xl font-bold text-[var(--main-web-color-2)] cursor-pointer" />
        </button>

        <div className="relative ">
          <img
            src={image}
            alt="profile"
            className="w-10 h-10 rounded-full cursor-pointer border object-cover border-gray-400"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />

          {isDropdownOpen && (
            <div className="absolute right-0 mt-6 w-40  rounded-md overflow-hidden z-50">
              <button
                className="block px-4 py-2 text-left w-full  font-semibold"
                onClick={() => alert("Logging out...")}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          marginLeft: sidebarWidth,
          paddingTop: "11vh",
          minHeight: `calc(100vh - ${navbarHeight})`,
          transition: "margin-left 0.3s",
        }}
      >
        <Routes>
          <Route path="*" element={<Dashboard  />} />
          <Route path="products" element={<Products  />} />
          <Route path="category" element={<AddCategory />} />
          <Route path="products/add" element={<AddPoductForm />} />
          <Route path="edit/:productId" element={<AddPoductForm />} />
          <Route
            path="products/reorder"
            element={<ReOrderProduct  />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
