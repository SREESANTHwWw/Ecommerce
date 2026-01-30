import { CommonImage } from "../../../../@All/AppForm/Form";
import { useNavigate } from "react-router-dom";

const RelatedProduct = ({ products }: any) => {
  const navigate = useNavigate();
  const handlerRelatedProduct = (id: any) => {
    navigate(`/viewproduct/${id}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {products?.relatedProducts.length === 0 ? (
        <p className="text-gray-500">No related products found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.relatedProducts.map((rp: any) => (
            <div
              key={rp._id}
              onClick={() => handlerRelatedProduct(rp._id)}
              className="border rounded-xl p-4 hover:shadow-lg transition cursor-pointer"
            >
              <CommonImage
                src={rp.productImage?.[0]}
                alt={rp.productName}
                className="h-40 w-full object-cover rounded-lg"
              />
              <h3 className="mt-2 font-medium">{rp.productName}</h3>
              <p className="text-green-600 font-semibold">
                ₹ {rp.productPrice}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedProduct;
