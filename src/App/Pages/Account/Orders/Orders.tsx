import { Typography } from "../../../../@All/AppForm/Form";
import { MdOutlineTune } from "react-icons/md";
import AcOrderDisplay from "./OrdersProductDisplay/AcOrderDisplay";

const Orders = () => {
  return (
    <div className="w-full  h-full p-5  ">
      <div className="grid grid-cols-1 gap-8">
        <div className="flex w-full justify-between  ">
          <div className="flex flex-col ">
            <Typography className="text-xl font-medium text-[var(--main-web-color)]">
              {" "}
              All Orders
            </Typography>
            <Typography className="text-sm text-gray-500">
              {" "}
              from anytime
            </Typography>
          </div>
          <div className="flex gap-6 w-[40%] ">
            <input
              type="text"
              placeholder="Search"
              className="h-9 w-full font-[Share_Tech] rounded p-4 border-2 border-[var(--main-web-color)] focus:outline-none"
            />
            <div className="flex items-center gap-2 bg-[var(--main-web-color)] text-[var(--main-bg-color)] h-9  p-1 cursor-pointer  rounded hover:bg-[var(--main-web-color-2)]">
              <MdOutlineTune size={25} />
              <button className="">
                <Typography>Fillter</Typography>
              </button>
            </div>
          </div>
        </div>
        <div>
          <AcOrderDisplay/>
        </div>

      </div>
    </div>
  );
};

export default Orders;
