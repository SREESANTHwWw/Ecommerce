
import { useGetAllCartQuery } from "../CartApi/CartApi";
import { Typography } from "../../../AppForm/Form";
import { IoMdClose } from "react-icons/io";
import StarRating from "../../StarRating/StarRating ";

const CartProducts = () => {
  const { data: CartProducts } = useGetAllCartQuery();

  return (
    <div className="w-full min-h-screen bg-[var(--main-bg-color)] p-4">
      <div className="max-w-5xl mx-auto flex flex-col gap-4">
        {CartProducts?.cart?.items?.map((item: any, index: number) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-xl shadow-md"
          >
            {/* Select Checkbox */}
            <input
              type="checkbox"
              className="w-5 h-5 accent-[var(--main-web-color)]"
            />

            {/* Product Image */}
            <img
              src={item?.productId?.productImage[0]}
              alt={item?.productId?.productName}
              className="w-36 h-36 object-cover rounded-lg "
            />

            {/* Product Details */}
            <div className="flex-1 flex flex-col gap-2">
              <Typography className="font-semibold text-lg">
                {item?.productId?.productName}
              </Typography>

              <Typography className="text-sm text-gray-500 line-clamp-2">
                {item?.productId?.productDescription}
              </Typography>
              <StarRating rating={item?.productId?.averageRating} />
              <Typography className="font-bold text-lg text-[var(--main-web-color)]">
                ₹{item?.productId?.productPrice}
              </Typography>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mt-2">
                <button className="w-8 h-8 border rounded-lg flex items-center justify-center hover:bg-gray-100">
                  -
                </button>

                <span className="min-w-[32px] text-center font-medium">
                  {item.qty}
                </span>

                <button className="w-8 h-8 border rounded-lg flex items-center justify-center hover:bg-gray-100">
                  +
                </button>
              </div>
            </div>

         
            <div className="flex sm:flex-col items-start sm:items-end gap-4 w-full sm:w-auto">
              <button className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm">
                <IoMdClose size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartProducts;
