import React from "react";
import { toast } from "react-toastify";
import { addToCartSlice } from "../Cart/CartStore/CartSlice";
import { useDispatch } from "react-redux";
import { useAddToCartMutation } from "../Cart/CartApi/CartApi";
import { useNavigate } from "react-router-dom";

type AddToCartButtonProps = {
  product: {
    _id: string;
    productPrice: number;
  };
  className?: string;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  className = "",
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      addToCartSlice({
        productId: product._id,
        price: product.productPrice,
        qty: 1,
      }),
    );

    try {
      const res = await addToCart({
        productId: product._id,
        qty: 1,
      }).unwrap();

      if (res.success) {
        toast.success(res.msg);
      }
    } catch (err: any) {
      if (err?.data.failed) {
        navigate("/login");
      }
      toast.error(err?.data?.err || "Something went wrong");
    }
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleAdd}
      className={`h-10 rounded-md cursor-pointer text-white bg-[var(--main-web-color)]
        hover:bg-[var(--bg-color-ca)] disabled:opacity-50 ${className}`}
    >
      {isLoading ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default React.memo(AddToCartButton);
