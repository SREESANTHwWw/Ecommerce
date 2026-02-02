import { useForm } from "react-hook-form";
import { TextController, Typography } from "../../../AppForm/Form";
import { useState } from "react";
import { useAddAddressMutation } from "../AddressesApi";
import { toast } from "react-hot-toast";
import SpinnerLoading from "../../Loading/SpinnerLoading";
const AddressForm = ({ setshowAddForm }: any) => {
  const { control, handleSubmit,reset } = useForm({
    defaultValues: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    },
  });
  const [addAddress,{isLoading}] = useAddAddressMutation()


  const [isDefault, setIsDefault] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      await addAddress({ ...data, isDefault }).unwrap();
      
     
      toast.success("Address saved successfully!", {
        style: {
          borderRadius: '15px',
          background: '#333',
          color: '#fff',
        },
      });

     
      setTimeout(() => {
        setshowAddForm(false);
        reset();
      }, 1000);
      
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save address. Please try again.");
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      {isLoading && (<SpinnerLoading/>)}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-6 sm:p-8 relative">
        <Typography className="text-2xl font-semibold text-gray-800 mb-6">
          Add New Address
        </Typography>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Street */}
          <div className="md:col-span-2">
            <Typography className="block text-sm font-medium text-gray-600 mb-1">
              Street Address
            </Typography>
            <TextController
              type="text"
              id="street"
              name="street"
               rules={{ required: "House no, Street name is  required" }}
              control={control}
              placeholder="House no, Street name"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--main-web-color)] outline-none"
            />
          </div>

          {/* City */}
          <div>
            <Typography className="block text-sm font-medium text-gray-600 mb-1">
              City
            </Typography>
            <TextController
              type="text"
              id="city"
              name="city"
            rules={{ required: "City is  required" }}
              control={control}
              placeholder="City"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--main-web-color)] outline-none"
            />
          </div>

          {/* State */}
          <div>
            <Typography className="block text-sm font-medium text-gray-600 mb-1">
              State
            </Typography>
            <TextController
              type="text"
              id="state"
              name="state"
              control={control}
                rules={{ required: "State is  required" }}
              placeholder="State"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--main-web-color)] outline-none"
            />
          </div>

          {/* Pincode */}
          <div>
            <Typography className="block text-sm font-medium text-gray-600 mb-1">
              Pincode
            </Typography>
            <TextController
              type="text"
              id="pincode"
              name="pincode"
               rules={{ required: "Pincode is  required" }}
              control={control}
              placeholder="Pincode"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--main-web-color)] outline-none"
            />
          </div>

          {/* Country */}
          <div>
            <Typography className="block text-sm font-medium text-gray-600 mb-1">
              Country
            </Typography>
            <TextController
              type="text"
              id="country"
              name="country"
              control={control}
               rules={{ required: "Country is  required" }}
              placeholder="India"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--main-web-color)] outline-none"
            />
          </div>

          {/* Default Address (state-managed checkbox) */}
          <div className="md:col-span-2 flex items-center gap-2 mt-2">
            <input
              id="isDefault"
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="w-4 h-4 accent-[var(--main-web-color)]"
            />
            <Typography className="text-sm text-gray-600 cursor-pointer">
              Set as default address
            </Typography>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setshowAddForm(false)}
              className="px-5 py-2 rounded-lg border text-gray-600 cursor-pointer hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="px-6 py-2 rounded-lg  disabled:cursor-not-allowed cursor-pointer  bg-[var(--main-web-color)] text-white hover:bg-[var(--main-web-color-2)] transition"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
