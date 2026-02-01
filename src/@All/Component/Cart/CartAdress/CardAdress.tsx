import { Typography } from "../../../AppForm/Form";
import { FiMapPin, FiEdit2 } from "react-icons/fi";
import {
  useDefaultAddressQuery,
  
} from "../../Addresses/AddressesApi";
import { useState } from "react";
import AddressForm from "../../Addresses/AddressForm/AddressForm";
import ChangeAddressForm from "../../Addresses/AddressForm/ChangeAddressForm";

const CardAdress = () => {
  // const { data: address } = useGetAddressQuery();
  const { data: DefaultAddress } = useDefaultAddressQuery();

  const [showAddForm, setshowAddForm] = useState(false);
  const [showChangeform, setChangeFrom] = useState(false);
  const addressDefault = DefaultAddress?.address;
  console.log(addressDefault);

  return (
    
    <div className="w-full bg-[var(--grad)] rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 flex flex-col gap-4">
      {showAddForm && <AddressForm setshowAddForm={setshowAddForm} />}
      {showChangeform && <ChangeAddressForm setChangeFrom={setChangeFrom} />}

      {addressDefault ? (
        <div
          key={addressDefault?._id}
          className="flex flex-col md:flex-row md:items-center gap-4 border-b last:border-b-0 pb-4 last:pb-0"
        >
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-[var(--main-web-color)]/10 text-[var(--main-web-color)]">
              <FiMapPin size={18} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Typography className="font-semibold text-sm sm:text-base">
                  Deliver to {addressDefault?.street}, {addressDefault?.city},{" "}
                  {addressDefault?.state}
                </Typography>
               
              </div>
              <div className=" flex flex-col gap-2 p-1 ">
                <Typography className="text-xs sm:text-sm text-gray-500">
                  ({addressDefault?.pincode})
                </Typography>
              <Typography className="text-sm text-gray-600  leading-relaxed">
                {addressDefault?.country}
              </Typography>

              </div>
 
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full md:w-auto md:ml-auto">
            <button
              onClick={() => setChangeFrom(true)}
              className="inline-flex items-center justify-center gap-2 cursor-pointer
      h-10 px-4 rounded-lg
      bg-[var(--main-web-color)]
      text-white
      hover:opacity-90 transition
      text-sm font-medium"
            >
              <FiEdit2 size={15} />
              <Typography>Change</Typography>
            </button>

            <button
              onClick={() => setshowAddForm(true)}
              className="inline-flex items-center justify-center gap-2 cursor-pointer
      h-10 px-4 rounded-lg
      border border-[var(--main-web-color)]
      text-[var(--main-web-color)]
      hover:bg-[var(--main-web-color)]/10 transition
      text-sm font-medium"
            >
              <FiMapPin size={15} />
              <Typography>Add</Typography>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* ICON + PLACEHOLDER */}
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-[var(--main-web-color)]/10 text-[var(--main-web-color)]">
              <FiMapPin size={18} />
            </div>

            <div>
              <Typography className="font-semibold text-sm sm:text-base">
                No address added
              </Typography>
              <Typography className="text-sm text-gray-600 mt-1 leading-relaxed">
                Please add your delivery address
              </Typography>
            </div>
          </div>

          {/* ADD ADDRESS BUTTON */}
          <button
            className="w-full md:w-auto md:ml-auto flex items-center justify-center gap-2 cursor-pointer
            px-4 py-2.5 rounded-xl border
            border-[var(--main-web-color)]
            text-[var(--main-web-color)]
            hover:bg-[var(--main-web-color)]
            hover:text-white transition text-sm font-medium"
            onClick={() => setshowAddForm(true)}
          >
            <FiEdit2 size={14} />
            Add Address
          </button>
        </div>
      )}
    </div>
  );
};

export default CardAdress;
