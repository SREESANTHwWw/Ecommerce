import { useNavigate } from "react-router-dom";
import { Typography } from "../../../../@All/AppForm/Form";
import OrderDisplay from "./OrderDisplay/OrderDisplay";
import RewardCouponDisplay from "./RewardCouponDisplay/RewardCouponDisplay";

const OverView = () => {
    const navigate = useNavigate()

  return (
    <div className="w-full   shadow p-4 rounded bg-white">
      <div className=" grid grid-cols-3 items-center ">
        <div className="w-full flex justify-center">
          <img src="/bgremoveLogo.png" alt="" />
        </div>
        <div className="flex flex-col">
          <Typography>FirstName</Typography>
          <Typography>LastName</Typography>
          <Typography>email</Typography>
        </div>

        <div className=" w-full h-full   ">
          <button className="w-full bg-[var(--main-web-color-2)]  disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-[var(--main-web-color)] text-white py-2 rounded-lg font-medium transition">
            <Typography> Edit Profile</Typography>
          </button>
        </div>
      </div>
      <div>
        <OrderDisplay/>
      </div>
      <div>
        <RewardCouponDisplay/>
      </div>
     
    </div>
  );
};

export default OverView;
