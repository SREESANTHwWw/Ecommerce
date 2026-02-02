import { Outlet } from "react-router-dom";
import AccountSideBar from "./AccountSideBar/AccountSideBar";



const Account = () => {
 

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[var(--grad)] to-[var(--main-bg-color)]">
      <div className="hidden md:flex h-screen">
        <AccountSideBar />
      </div>

      <div className="flex-1  relative">
        <main className="p-6  bg-white min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Account;
