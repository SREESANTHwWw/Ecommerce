import { useEffect, useState } from "react";
import { Outlet,  useNavigate, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import image from "../../../assets/profile.png";
import { TfiHome } from "react-icons/tfi";
import { Bell } from "lucide-react";
import { toast } from "react-hot-toast";
import { socket } from "../../../@All/Component/APIs/Socket";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifyCount, setNotifyCount] = useState(0);

  const sidebarWidth = sidebarOpen ? 200 : 90;
  const navbarHeight = "11vh";

  // 🔐 Frontend guard (UX protection)
  const token = localStorage.getItem("token");

  // 🔔 Socket logic (admin only)
  useEffect(() => {
    if (!token) return;

    if (!socket.connected) socket.connect();
    socket.emit("join-admin", token);

    const onNewOrder = () => {
      toast.success("🛒 New order received");
      setNotifyCount((prev) => prev + 1);
    };

    socket.on("new-order", onNewOrder);

    return () => {
      socket.off("new-order", onNewOrder);
    };
  }, [token]);

  // 🔔 Reset notification count when opening orders
  useEffect(() => {
    if (location.pathname.includes("/admin/orders")) {
      setNotifyCount(0);
    }
  }, [location.pathname]);

  return (
    <div className="w-full min-h-screen">
      {/* SIDEBAR */}
      <SideBar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* TOP NAVBAR */}
      <div
        className="fixed top-0 right-0 h-[11vh] bg-white gap-5 flex justify-end items-center px-6 z-30"
        style={{ left: sidebarWidth }}
      >
        <button onClick={() => navigate("/")}>
          <TfiHome className="text-3xl text-[var(--main-web-color-2)]" />
        </button>

        {/* 🔔 Notification */}
        <div className="relative cursor-pointer">
          <Bell className="w-6 h-6 text-gray-700" />
          {notifyCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
              {notifyCount}
            </span>
          )}
        </div>

        {/* PROFILE */}
        <div className="relative">
          <img
            src={image}
            alt="profile"
            className="w-10 h-10 rounded-full cursor-pointer border"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />

          {isDropdownOpen && (
            <div className="absolute right-0 mt-6 w-40 bg-white shadow rounded">
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 🔥 OUTLET AREA */}
      <div
        style={{
          marginLeft: sidebarWidth,
          paddingTop: navbarHeight,
          minHeight: `calc(100vh - ${navbarHeight})`,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
