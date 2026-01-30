import  { useState } from "react";
import {
 
  FileController,
  OptionController,
  TextController,
  Typography,
} from "../../../../../../@All/AppForm/Form";
import { useForm } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";
import { useAddCategoryMutation } from "../CategoryApi";
import { toast } from "react-toastify";
import {motion} from "framer-motion"
import SpinnerLoading from "../../../../../../@All/Component/Loading/SpinnerLoading";
type categoryType = {
  _id: string;
 categoryImage:string;
  categoryName: string;
  parentCategory: string;
};

type propsType = {
 
  onClose: () => void;
  category: categoryType[];
};

const AddCategoryForm = ({ onClose,  category }: propsType) => {
  const { control, handleSubmit } = useForm();
  const [addCategory] = useAddCategoryMutation();
  const [loading, setLoading] = useState(false);

const onSubmit = async (data: any) => {
  setLoading(true);
  try {
    const formData = new FormData();

    formData.append("categoryName", data.categoryName);
    formData.append("description", data.description);
    formData.append("isActive", data.isActive);

    if (data.parentCategory) {
      formData.append("parentCategory", data.parentCategory);
    }

  
    if (data.categoryImage && data.categoryImage[0]) {
      formData.append("categoryImage", data.categoryImage[0]);
    }

    const res = await addCategory(formData as any).unwrap();

    if (res.success) {
      toast.success(res.msg);
     
      onClose();
    }
  } catch (err) {
    console.error("Category creation failed:", err);
  } finally {
    setLoading(false);
  }
};

  const categoryOptions = category?.map((item: categoryType) => ({
    value: item._id,
    label: item.categoryName,
  }));

  return (
    <div className="bg-black/50 z-40 fixed inset-0 w-full h-screen  flex justify-center items-center">

      {loading && <SpinnerLoading/>}
      <motion.div 
       initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
       transition={{ duration: 1, ease: "easeOut" }}
       
      
      className="w-[40%] h-[90%] p-6 bg-[var(--main-bg-color)] rounded  flex flex-col gap-3">
        <div className=" flex justify-end">
          <button onClick={onClose}>
            <IoMdCloseCircle
              size={28}
              className="text-[var(--main-web-color)] cursor-pointer"
            />
          </button>
        </div>
        <div className="flex justify-center items-center">
          <Typography className="text-xl font-bold text-[var(--main-web-color-2)] ">
            Category Add Here
          </Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1">
          <TextController
            label="Category Name"
            id="categoryName"
            name="categoryName"
            placeholder="Category Name"
            type="text"
            control={control}
          />
          <OptionController
            label="SubCategory"
            id="parentCategory"
            name="parentCategory"
            placeholder="SubCategory"
            control={control}
            options={categoryOptions}
          />

          <TextController
            label="Description"
            id="description"
            name="description"
            placeholder="Description"
            type="textarea"
            rows={1}
            control={control}
            defaultValue={""}
          />
          <OptionController
            label="Status"
            id="isActive"
            name="isActive"
            placeholder="Status"
            control={control}
            options={[
              { value: true, label: "Active" },
              { value: false, label: "In-active" },
            ]}
          />
          <FileController
          label="Categoy Images"
              id="categoryImage"
              name="categoryImage"
              placeholder="Upload Images"
              type="file"
    
           control={control}
          
          />

          <div className="flex justify-end gap-2.5">
            <button
            onClick={onClose}
            className="bg-[var(--main-bg-color)] hover:bg-[var(--main-web-color-2)]  cursor-pointer border border-[var(--main-web-color-2)] hove h-10 w-20 rounded   hover:text-white">
              <Typography>Cancel</Typography>
            </button>
            <button
              type="submit"
              className="bg-[var(--main-web-color)] hover:bg-[var(--main-web-color-2)] text-white cursor-pointer border border-[var(--main-web-color-2)] hove h-10 w-20 rounded   hover:text-white"
            >
              {" "}
              <Typography>Save</Typography>{" "}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddCategoryForm;
