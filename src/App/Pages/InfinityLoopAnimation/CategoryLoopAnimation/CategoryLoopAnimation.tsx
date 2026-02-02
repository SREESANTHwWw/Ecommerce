import React from "react";
import Marquee from "react-fast-marquee";
import { CommonImage, Typography } from "../../../../@All/AppForm/Form";
import { useGetAllCategoryQuery } from "../../Admin/Tab/AdminCategory/CategoryApi";

const CategoryLoopAnimation: React.FC = () => {
  const { data } = useGetAllCategoryQuery();
  const items = data?.data.slice(0, 5) || [];

  return (
    <div className="w-full bg-white py-16">
      {/* HEADER */}
      <div className="text-center mb-10">
        <Typography className="text-3xl font-extrabold">Categories</Typography>
      </div>

 
      <div className="relative w-full overflow-hidden">
        <Marquee
          gradient={false} 
          speed={300} 
         
          loop={0}
        >
          {items.map((item:any) => (
            <div
              key={item._id}
              className="flex flex-col items-center min-w-[180px] mx-5"
            >
              <div className="w-36 h-36 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shadow-lg">
                <CommonImage
                  src={item.categoryImage}
                  className="w-full h-full object-cover"
                  alt={item.categoryName}
                />
              </div>
              <Typography className="mt-4 font-semibold text-lg">
                {item.categoryName}
              </Typography>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default CategoryLoopAnimation;
