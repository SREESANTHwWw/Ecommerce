import { useState } from "react";
import logo from "../../../../assets/bgremoveLogo.png";
import { Typography } from "../../../AppForm/Form";
import { RiShieldCheckFill } from "react-icons/ri";

const CartNavBar = () => {
  const [step] = useState(2); // current step

  const NavDet = [
    { id: 1, title: "Cart" },
    { id: 2, title: "Address" },
    { id: 3, title: "Payment" },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-[var(--gradNav)] to-[var(--main-bg-color)]">
      <div className="grid grid-cols-3 items-center w-full px-6 py-3">

        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-24 h-24 object-cover" />
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between w-full">
          {NavDet.map((item, index) => (
            <div key={item.id} className="flex items-center w-full">

              {/* Step circle + title */}
            
                <Typography className=" mt-1 tracking-wide">
                  {item.title}
                </Typography>

              {/* Progress line (not after last item) */}
              {index !== NavDet.length - 1 && (
                <div className="flex-1 h-1 mx-2 bg-gray-300 rounded">
                  <div
                    className={`h-full rounded transition-all duration-300
                      ${
                        step > item.id
                          ? "bg-[var(--main-web-color-2)] w-full"
                          : "w-0"
                      }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Secure badge */}
        <div className="flex justify-end">
          <div className="flex items-center gap-2">
            <RiShieldCheckFill size={32} className="text-teal-500" />
            <Typography className="text-gray-500 tracking-wider">
              100% Secure
            </Typography>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartNavBar;
