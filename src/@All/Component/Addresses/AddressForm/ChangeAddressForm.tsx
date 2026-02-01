import  { useEffect, useState } from "react";
import { useGetAddressQuery, useUpdateAddressMutation } from "../AddressesApi";
import { TextController, Typography } from "../../../AppForm/Form";
import { FiMapPin, FiX } from "react-icons/fi";
import { useForm } from "react-hook-form";
import SpinnerLoading from "../../Loading/SpinnerLoading";
import { toast } from "react-toastify";

const ChangeAddressForm = ({ setChangeFrom }: any) => {
  const { data: address } = useGetAddressQuery();
  const [updateAddress, { isLoading }] = useUpdateAddressMutation();
  const { control, setValue, handleSubmit, } = useForm();
  const [selectedId, setSelectedId] = useState<string>(address?.addresses[0]._id);
  console.log(selectedId);


  useEffect(() => {
  if (address?.addresses?.length) {
    const defaultAddress =
      address.addresses.find((a: any) => a.isDefault) ||
      address.addresses[0];

    setSelectedId(defaultAddress._id);

    setValue("street", defaultAddress.street);
    setValue("city", defaultAddress.city);
    setValue("state", defaultAddress.state);
    setValue("pincode", defaultAddress.pincode);
    setValue("country", defaultAddress.country);
  }
}, [address, setValue]);

  const onSubmit = async (data: any) => {
    try {
      await updateAddress({
        id: selectedId,
        body: {
          ...data,
          isDefault: true,
        },
      }).unwrap();
      toast.success("Address updated successfully");
      setChangeFrom(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update address ");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-3 sm:px-4">

      <div className="w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-y-auto">

        {isLoading && <SpinnerLoading />}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <Typography className="text-xl font-semibold">
            Select Address for Order
          </Typography>
          <button onClick={() => setChangeFrom(false)}>
            <FiX className="text-gray-500 hover:text-black cursor-pointer" size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Address List */}
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
            {address?.addresses.map((item: any) => {
              const active = selectedId === item._id;

              return (
                <label
                  key={item._id}
                  className={`flex gap-4 p-4 border rounded-xl cursor-pointer transition
                  ${
                    active
                      ? "border-[var(--main-web-color)] bg-[var(--main-web-color)]/5"
                      : "hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="selectedAddress"
                    checked={active}
                    onChange={() => {
                      setSelectedId(item._id);
                      setValue("street", item.street);
                      setValue("city", item.city);
                      setValue("state", item.state);
                      setValue("pincode", item.pincode);
                      setValue("country", item.country);
                    }}
                    className="mt-1 accent-[var(--main-web-color)]"
                  />

                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-[var(--main-web-color)]/10 text-[var(--main-web-color)]">
                    <FiMapPin size={18} />
                  </div>

                  <div>
                    <Typography className="font-medium text-sm">
                      {item.street}, {item.city}, {item.state}
                    </Typography>
                    <Typography className="text-xs text-gray-500 mt-1">
                      {item.pincode}, {item.country}
                    </Typography>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Form */}
          <div>
            <Typography className="text-lg font-semibold mb-4">
              Change Address
            </Typography>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Street */}
              <div className="md:col-span-2">
                <Typography className="text-sm mb-1">Street Address</Typography>
                <TextController
                  type="text"
                  id="street"
                  name="street"
                  control={control}
                  placeholder="House no, Street name"
                  rules={{ required: "House no, Street name is  required" }}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              {/* City */}
              <div>
                <Typography className="text-sm mb-1">City</Typography>
                <TextController
                  type="text"
                  name="city"
                  id="city"
                  rules={{ required: "City is  required" }}
                  control={control}
                  placeholder="City"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <Typography className="text-sm mb-1">State</Typography>
                <TextController
                  type="text"
                  id="state"
                  name="state"
                  control={control}
                  rules={{ required: "State is  required" }}
                  placeholder="State"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              {/* Pincode */}
              <div>
                <Typography className="text-sm mb-1">Pincode</Typography>
                <TextController
                  type="text"
                  name="pincode"
                  id="Pincode"
                  rules={{ required: "Pincode is  required" }}
                  control={control}
                  placeholder="Pincode"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              {/* Country */}
              <div>
                <Typography className="text-sm mb-1">Country</Typography>
                <TextController
                  type="text"
                  id="country"
                  name="country"
                  rules={{ required: "Country is  required" }}
                  control={control}
                  placeholder="India"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setChangeFrom(false)}
                  className="px-5 py-2 rounded-lg border hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                disabled={isLoading}
                  type="submit"
                  className="px-6 py-2 rounded-lg disabled:cursor-not-allowed cursor-pointer bg-[var(--main-web-color)] text-white hover:bg-[var(--main-web-color-2)]"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeAddressForm;
