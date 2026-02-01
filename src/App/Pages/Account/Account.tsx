import { Outlet } from "react-router-dom";
import AccountSideBar from "./AccountSideBar/AccountSideBar";
// import { VscThreeBars } from "react-icons/vsc";
// import { useState } from "react";
const Account = () => {
  // const [sideMenuOpen, setSideMenu] = useState(false);
  return (
    <div className="flex  bg-gradient-to-br from-[var(--grad)] to-[var(--main-bg-color)]">
      <div className="h-screen md:flex hidden">
        <AccountSideBar />
      </div>
      <div className="md:hidden flex">
        {/* <button onClick={() => setSideMenu(true)}>
          <VscThreeBars
            className="hover:text-[var(--bg-color-ca)] text-[var(--main-bg-color)] cursor-pointer"
            size={28}
          />
        </button> */}
      </div>

      <main className="flex-1 p-6 bg-white ">
        <Outlet />
      </main>
    </div>
  );
};

export default Account;
