import {
  useDeleteCartMutation,
  useGetAllCartQuery,
  useUpdateQtyMutation,
} from "../CartApi/CartApi";
import { CommonImage, Typography } from "../../../AppForm/Form";

import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import StarRating from "../../StarRating/StarRating ";
import { useState } from "react";
import CommonAlert from "../../../AppForm/CommonAlert";
import toast from "react-hot-toast";

const CartProducts = () => {
  const { data: CartProducts } = useGetAllCartQuery();
  const [updateQty, { isLoading }] = useUpdateQtyMutation();
  const [deleteCart] = useDeleteCartMutation();

  const [alert, setAlert] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleIncrease = (productId: string, qty: number) => {
    updateQty({ productId, qty: qty + 1 });
  };

  const handleDecrease = (productId: string, qty: number) => {
    if (qty <= 1) return;
    updateQty({ productId, qty: qty - 1 });
  };

  const confirmDelete = (productId: string) => {
    setSelectedProduct(productId);
    setAlert(true);
  };

  const onConfirmDelete = async () => {

    try {
       if (!selectedProduct) return;
       await deleteCart(selectedProduct)
      .unwrap()
       toast.success("Product removed from cart", {
        style: {
          borderRadius: '15px',
          background: '#333',
          color: '#fff',
        },
      });
    setAlert(false);
    setSelectedProduct(null);
      
    } catch (error) {
      toast.error("Error removing product from cart", {
        style: {
          borderRadius: '15px',
          background: '#333',
          color: '#fff',
        },
      });
    }
   
  };

  return (
    <div className="w-full h-full bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-5">
        <CommonAlert
          isOpen={alert}
          message="Remove this item from your cart?"
          onConfirm={onConfirmDelete}
          onCancel={() => {
            setAlert(false);
            setSelectedProduct(null);
          }}
        />

        {
        CartProducts?.cart?.items?.length > 0 ? (
           CartProducts?.cart?.items?.map((item: any) => (
          <div
            key={item.productId._id}
            className="relative flex flex-col sm:flex-row gap-4 p-4 sm:p-5
              bg-white rounded-2xl border border-gray-100
              shadow-sm hover:shadow-md transition"
          >
            {/* Delete */}
            <button
              onClick={() => confirmDelete(item.productId._id)}
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center cursor-pointer
                rounded-full text-gray-400 hover:text-red-500
                hover:bg-red-50 transition"
            >
              <FiTrash2 size={16} />
            </button>

            {/* Image */}
            <CommonImage
              src={item.productId?.productImage?.[0]}
              alt={item.productId?.productName}
              className="w-full h-56 md:w-36 md:h-36 object-cover rounded-xl border"
            />

            {/* Content */}
            <div className="flex-1 flex flex-col gap-2">
              <Typography className="font-semibold text-base sm:text-lg line-clamp-1">
                {item.productId?.productName}
              </Typography>

              <Typography className="text-sm text-gray-500 line-clamp-2">
                {item.productId?.productDescription}
              </Typography>

              <StarRating rating={item.productId?.averageRating} />

              {/* Price + Qty */}
              <div className="flex items-center justify-between mt-3">
                <Typography className="text-lg font-bold text-[var(--main-web-color)]">
                  ₹{item.productId?.productPrice}
                </Typography>

                <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1.5">
                  <button
                    onClick={() =>
                      handleDecrease(item.productId._id, item.qty)
                    }
                    disabled={item.qty <= 1 || isLoading}
                    className="w-8 h-8 flex items-center justify-center cursor-pointer
                      rounded-full bg-white shadow
                      disabled:opacity-40  disabled:cursor-not-allowed" 
                  >
                    <FiMinus size={14} />
                  </button>

                  <span className="min-w-[20px] text-center text-sm font-semibold">
                    {item.qty}
                  </span>

                  <button
                    onClick={() =>
                      handleIncrease(item.productId._id, item.qty)
                    }
                    disabled={isLoading}
                    className="w-8 h-8 flex items-center justify-center cursor-pointer
                      rounded-full bg-white shadow disabled:cursor-not-allowed"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
        ):(
          <div className="w-full h-60 flex flex-col items-center justify-center">
          <Typography className="text-xl font-semibold">
            Your cart is empty
          </Typography>
        </div>
        )
       
        
        
        }
      </div>
    </div>
  );
};

export default CartProducts;
