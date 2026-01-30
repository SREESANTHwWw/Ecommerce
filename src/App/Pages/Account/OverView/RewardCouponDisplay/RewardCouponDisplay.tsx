import { Typography } from "../../../../../@All/AppForm/Form";
import { RiCoupon3Line } from "react-icons/ri";
import { MdStars } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const rewardCouponCards = [
  {
    title: "Coupons",
    count: 3,
    icon: RiCoupon3Line,
    path: "/account/coupons",
  },
  {
    title: "Rewards",
    count: 250,
    icon: MdStars,
    path: "/account/rewards",
  },
];

const RewardCouponDisplay = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {rewardCouponCards.map(({ title, count, icon: Icon, path }) => (
        <button
          key={title}
          onClick={() => navigate(path)}
          className="group cursor-pointer"
        >
          <div
            className="flex flex-col items-center bg-[var(--main-bg-color)]
            hover:bg-[var(--main-web-color-2)] transition p-4 rounded shadow-xl" 
          >
            <Icon className="text-4xl text-[var(--main-web-color-2)]  group-hover:scale-110 group-hover:text-[var(--main-bg-color)] transition: transition" />
            <Typography className="mt-1">{title}</Typography>
            <Typography className="font-semibold">{count}</Typography>
          </div>
        </button>
      ))}
    </div>
  );
};

export default RewardCouponDisplay;
