
import { Outlet } from "react-router-dom";
import AccountSideBar from "./AccountSideBar/AccountSideBar";

const Account = () => {
  return (
    <div className="flex  bg-gradient-to-br from-[var(--grad)] to-[var(--main-bg-color)]">
      

      <AccountSideBar />

      
      <main className="flex-1 p-6 bg-white ">
        <Outlet />
      </main>

    </div>
  );
};

export default Account;
