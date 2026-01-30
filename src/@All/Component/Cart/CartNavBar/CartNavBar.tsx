import { useState } from "react";
import logo from "../../../../assets/bgremoveLogo.png";
import { Typography } from "../../../AppForm/Form";
import { RiShieldCheckFill } from "react-icons/ri";

const CartNavBar = () => {
  const [step] = useState(2);

  const NavDet = [
    { id: 1, title: "Cart" },
    { id: 2, title: "Address" },
    { id: 3, title: "Payment" },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-[var(--gradNav)] to-[var(--main-bg-color)]">
      <div className="w-full px-4 py-3">


        <div className="flex items-center justify-between md:grid md:grid-cols-3 gap-4">

    
          <div className="flex justify-center md:justify-start">
            <img
              src={logo}
              alt="logo"
              className="w-16 h-16 md:w-24 md:h-24 object-contain"
            />
          </div>

      
          <div className="flex items-center justify-between w-full md:col-span-1">
            {NavDet.map((item, index) => (
              <div key={item.id} className="flex items-center w-full">

           
                <Typography
                  className={`text-xs md:text-sm font-medium tracking-wide
                    ${
                      step >= item.id
                        ? "text-[var(--main-web-color-2)]"
                        : "text-gray-400"
                    }`}
                >
                  {item.title}
                </Typography>

        
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

          
          <div className="hidden md:flex justify-end">
            <div className="flex items-center gap-2">
              <RiShieldCheckFill size={28} className="text-teal-500" />
              <Typography className="text-gray-500 tracking-wider text-sm">
                100% Secure
              </Typography>
            </div>
          </div>

        </div>

        
        <div className="flex md:hidden justify-center mt-2">
          <RiShieldCheckFill size={22} className="text-teal-500" />
        </div>

      </div>
    </div>
  );
};

export default CartNavBar;
