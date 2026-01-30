import { useEffect, useState } from "react";
import {
 
  FileController,
  OptionController,
  TextController,
  Typography,
} from "../../../../../../@All/AppForm/Form";

import { useForm } from "react-hook-form";
import {
  useCreateProductMutation,
  // useGetProductByIdQuery,
} from "../ProductApi";
import type { ProductCreateType } from "../Types";
import NotificationMessage from "../../../../../../@All/AppForm/NotificationMessage";
import SpinnerLoading from "../../../../../../@All/Component/Loading/SpinnerLoading";
// import { useParams } from "react-router-dom";
import { useGetAllCategoryQuery } from "../../AdminCategory/CategoryApi";

const AddPoductForm = () => {
  const { control, handleSubmit, reset, watch, setValue } =
    useForm<ProductCreateType>();

  // const { productId } = useParams();

  // console.log("productId", productId);
  const [createProduct] = useCreateProductMutation();
  // const { data: product } = useGetProductByIdQuery(productId ?? "");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<null | any>(null);
  const { data: category } = useGetAllCategoryQuery();
  console.log(category);

  // const catelogName = category?.data?.Filter((item:any) => item.categoryName )

  // useEffect(() => {
  //   if (product && product.product) {
  //     const prod = product.product;
  //     reset({
  //       productName: prod.productName ,
  //       productPrice: prod.productPrice ,
  //       productOfferPrice: prod.productOfferPrice ,
  //       productQuantity: prod.productQuantity ,
  //       productCategory: prod.productCategory ,
  //       productDescription: prod.productDescription ,
  //       productdiscount: prod.productdiscount ,
  //       productUnit: prod.productUnit ,

  //       productStock: prod.productStock ,
  //       productStatus: prod.productStatus ,
  //       productImages: [], // File inputs cannot be set programmatically
  //     });
  //   } else {
  //     reset({
  //       productName: "",
  //       productPrice: 0,
  //       productOfferPrice: 0,
  //       productQuantity: 0,
  //       productCategory: "",
  //       productDescription: "",
  //       productdiscount: 0,
  //       productUnit: "",
  //       productStock: 0,
  //       productStatus: "",
  //       productImages: [],
  //     });
  //   }
  // }, [product, reset]);

  const onSubmit = async (data: ProductCreateType) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Collect the files from file0..file4 into productImage
      const files = data.productImages ? Array.from(data.productImages) : [];
      files.forEach((file) => formData.append("productImage", file));

      // Append other fields
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "productImages") {
          if (value === undefined || value === null || Number.isNaN(value)) {
            formData.append(key, "");
          } else {
            formData.append(key, String(value));
          }
        }
      });

      const res = await createProduct(formData as any).unwrap();

      if (res.success) {
        setNotification({
          variant: "success",
          message: "Product created successfully!",
        });
      }

      reset({
        productName: "",
        productPrice: 0,
        productQuantity: 0,
        productCategory: "",
        productDescription: "",
        productdiscount: 0,
        productUnit: "",

        productStock: 0,
        productStatus: "",
        productImages: [],
      });

      setLoading(false);

      console.log("Product created:", res);
    } catch (err) {
      setLoading(false);
      console.error("Product creation failed:", err);
    }
  };

  const productPrice = watch("productPrice");
  const productdiscount = watch("productdiscount");

  useEffect(() => {
    const price = Number(productPrice) || 0;
    let discount = Number(productdiscount) || 0;

    if (discount > 100) discount = 100;
    if (discount < 0) discount = 0;

    const offerPrice = price - (price * discount) / 100;

    setValue("productOfferPrice", Math.max(0, Math.round(offerPrice)));
  }, [productPrice, productdiscount, setValue]);

  return (
    <div className="w-full px-7 py-7 ">
      {notification && (
        <NotificationMessage
          variant={notification.variant}
          message={notification.message}
        />
      )}
      {loading && (
        <div className="w-full h-full flex items-center justify-center ">
          <SpinnerLoading />
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          <Typography className="text-2xl font-bold text-[var(--main-web-color)]">
            {" "}
            New Product
          </Typography>
          <button
            type="submit"
            className="bg-[var(--main-web-color)] hover:bg-[var(--main-web-color-2)] text-white cursor-pointer border border-[var(--main-web-color-2)] hove h-10 w-20 rounded-lg   hover:text-white"
          >
            <Typography className="text-sm">Save</Typography>
          </button>
        </div>
        <div className="mt-7 p-6 rounded shadow-md">
          <Typography className="text-md text-[var(--main-web-color-2)] font-bold underline">
            Product Details :-
          </Typography>

          <div className="grid sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 grid-cols-1  gap-4 mt-4">
            <TextController
              label="Product Name"
              id="productName"
              name="productName"
              placeholder="Product Name"
              type="text"
              control={control}
              defaultValue={""}
            />

            <OptionController
              label="Category"
              id="productCategory"
              name="productCategory"
              placeholder="Category"
              defaultValue=""
              control={control}
              options={
                category?.data?.map((item: any) => ({
                  value: item.categoryName,
                  label: item.categoryName, 
                })) || []
              }
            />

            <TextController
              label=" Available Stock"
              id="productStock"
              name="productStock"
              placeholder="Available Stock"
              type="number"
              control={control}
              defaultValue={""}
            />
            <TextController
              label="Price"
              id="productPrice"
              name="productPrice"
              placeholder="Price"
              type="number"
              control={control}
              defaultValue={""}
            />
            <OptionController
              label="Unit"
              id="productUnit"
              name="productUnit"
              placeholder="Unit"
              defaultValue={""}
              options={[
                { value: "kg", label: "Kilogram (kg)" },
                { value: "g", label: "Gram (g)" },
                { value: "L", label: "Litre (L)" },
                { value: "ml", label: "Millilitre (ml)" },
                { value: "pcs", label: "Pieces (pcs)" },
                { value: "doz", label: "Dozen" },
                { value: "pack", label: "Pack" },
                { value: "bunch", label: "Bunch" },
                { value: "slice", label: "Slice" },
                { value: "cup", label: "Cup" },
              ]}
              control={control}
            />
            <div className="grid grid-cols-1 ">
              <TextController
                label="Unit Size"
                id="productQuantity"
                name="productQuantity"
                placeholder="Unit Size"
                type="number"
                control={control}
                defaultValue={""}
              />
              <Typography className="text-sm text-gray-500">
                Example : 1 Kg Pack
              </Typography>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4">
            <Typography className="text-md text-[var(--main-web-color-2)] font-bold underline">
              Discount & Status :-
            </Typography>
            <div className="grid md:grid-cols-3 grid-cols-1 items-center gap-6">
              <TextController
                label="Discount (%)"
                id="productdiscount"
                name="productdiscount"
                placeholder="Discount (%)"
                type="number"
                control={control}
                defaultValue={""}
              />

              <TextController
                label="Offer Price"
                id="productOfferPrice"
                name="productOfferPrice"
                placeholder="Offer Price"
                type="number"
                control={control}
                readOnly={true}
                defaultValue={""}
              />
              <OptionController
                label="Status"
                id="productStatus"
                name="productStatus"
                placeholder="Status"
                control={control}
                defaultValue={""}
                options={[
                  { value: "active", label: "Active" },
                  { value: "in-active", label: "In-active" },
                ]}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Typography className="text-md text-[var(--main-web-color-2)] font-bold underline">
              Product Description :-
            </Typography>

            <TextController
              label="Description"
              id="productDescription"
              name="productDescription"
              placeholder="Description"
              type="textarea"
              rows={1}
              control={control}
              defaultValue={""}
            />
          </div>
          <div>
            <Typography className="text-md text-[var(--main-web-color-2)] font-bold underline">
              Products Images :-
            </Typography>
          </div>
          <div className="mt-4 w-full    gap-4">
            <FileController
              label="Product Images"
              id="productImages"
              name="productImages"
              placeholder="Upload Images"
              type="file"
              control={control}
              multiple={true}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPoductForm;
