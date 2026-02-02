import { useEffect, useState } from "react";
import { useGetAllCartQuery } from "../CartApi/CartApi";
import SpinnerLoading from "../../Loading/SpinnerLoading";
import { Typography } from "../../../AppForm/Form";
import { useGetAddressQuery } from "../../Addresses/AddressesApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CartPayment = () => {
  const { data: CartProducts, isLoading } = useGetAllCartQuery();
  const [total, setTotal] = useState<number>(0);
  const { data: address } = useGetAddressQuery();
  const navigate = useNavigate();
  useEffect(() => {
    if (!CartProducts?.cart?.items) return;

    const result = CartProducts.cart.items.reduce(
      (acc: number, val: any) =>
        acc + (val.productId?.productPrice || 0) * (val.qty || 1),
      0,
    );

    setTotal(result);
  }, [CartProducts]);

  const handleCheckout = () => {
    if (!address?.addresses || address.addresses.length === 0) {
      toast("Create a Address First!", {
        icon: "⚠️",
      });
      return;
    }

    navigate("/cart/checkout");
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <div
      className="
        w-full  mx-auto
        bg-white rounded-2xl
        shadow-[0_10px_30px_rgba(0,0,0,0.08)]
        p-5 sm:p-6
        space-y-5
      "
    >
      {/* Title */}
      <Typography className="text-base sm:text-lg font-semibold text-gray-800">
        Price Details
      </Typography>

      {/* Price rows */}
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <Typography>Subtotal</Typography>
          <Typography className="font-medium text-gray-700">
            ₹{total}
          </Typography>
        </div>

        <div className="flex justify-between">
          <Typography>Delivery Fee</Typography>
          <Typography className=" font-medium">50</Typography>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t pt-4 flex justify-between text-sm sm:text-base font-semibold text-gray-800">
        <Typography>Total Amount</Typography>
        <Typography className="text-[var(--main-web-color)]">
          ₹{total}
        </Typography>
      </div>

      <button
        onClick={handleCheckout}
        className="
          w-full mt-2
          bg-[var(--main-web-color)]
          hover:bg-[var(--main-web-color-2)]
          text-white
          py-3 sm:py-3.5
          rounded-xl
          font-semibold
          tracking-wide
          transition-all
          duration-200
          cursor-pointer
          disabled:cursor-not-allowed
          active:scale-[0.98]
          shadow-md
        "
      >
        <Typography> Proceed to Checkout</Typography>
      </button>
    </div>
  );
};

export default CartPayment;
