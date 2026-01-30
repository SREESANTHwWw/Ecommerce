import { CommonImage, Typography } from "../../../../@All/AppForm/Form";
import { useGetAllCategoryQuery } from "../../Admin/Tab/AdminCategory/CategoryApi";
import "./CategoryLoop.css";

const CategoryLoopAnimation: React.FC = () => {
  const { data } = useGetAllCategoryQuery();
  const items = data?.data.slice(0, 5) || [];

  return (
    <div className="category-wrapper">
      <div className="category-header">
        <Typography className="category-title">Categories</Typography>
      </div>

      <div className="marquee">
        <div className="marquee-track">
          {[...items, ...items].map((item, index) => (
            <div key={`${item._id}-${index}`} className="marquee-item">
              <CommonImage
                src={item.categoryImage}
                className="category-image"
              />
              <Typography className="category-name">
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
