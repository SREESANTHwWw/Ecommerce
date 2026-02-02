import { Outlet } from "react-router-dom";
import AccountSideBar from "./AccountSideBar/AccountSideBar";
import { VscThreeBars } from "react-icons/vsc";
import { useState } from "react";
import AccountResponsive from "./AccountSideBar/AccountResponsive";

const Account = () => {
  const [sideMenuOpen, setSideMenu] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[var(--grad)] to-[var(--main-bg-color)]">
      <div className="hidden md:flex h-screen">
        <AccountSideBar />
      </div>

      {sideMenuOpen && (
        <AccountResponsive
          isOpen={sideMenuOpen}
          onClose={() => setSideMenu(false)}
        />
      )}

      <div className="flex-1  relative">
        {!sideMenuOpen && (
          <button
            onClick={() => setSideMenu(true)}
            className="absolute top-5 right-5 md:hidden flex z-50"
          >
            <VscThreeBars
              size={28}
              className="text-gray-700 hover:text-[var(--bg-color-ca)] cursor-pointer"
            />
          </button>
        )}

        <main className="p-6  bg-white min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Account;
