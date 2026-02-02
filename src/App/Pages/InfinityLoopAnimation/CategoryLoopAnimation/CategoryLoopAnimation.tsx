import { CommonImage, Typography } from "../../../../@All/AppForm/Form";
import { useGetAllCategoryQuery } from "../../Admin/Tab/AdminCategory/CategoryApi";

const CategoryLoopAnimation: React.FC = () => {
  const { data } = useGetAllCategoryQuery();
  const items = data?.data.slice(0, 5) || [];

  return (
    <div className="w-full overflow-hidden bg-white py-16">
      {/* HEADER */}
      <div className="text-center mb-10">
        <Typography className="text-3xl font-extrabold">
          Categories
        </Typography>
      </div>

      {/* MARQUEE */}
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee gap-10">
          {[...items, ...items].map((item, index) => (
            <div
              key={`${item._id}-${index}`}
              className="flex flex-col items-center min-w-[180px]"
            >
              <div className="w-36 h-36 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shadow-lg">
                <CommonImage
                  src={item.categoryImage}
                  className="w-full h-full object-cover"
                />
              </div>

              <Typography className="mt-4 font-semibold text-lg">
                {item.categoryName}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryLoopAnimation;
