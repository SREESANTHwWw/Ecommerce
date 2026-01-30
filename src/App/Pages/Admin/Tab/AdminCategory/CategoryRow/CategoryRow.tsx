import { useState } from "react";
import { Typography } from "../../../../../../@All/AppForm/Form";

const CategoryRow = ({
  category,
  level = 0,
}: {
  category: any;
  level?: number;
}) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div
        className="flex items-center justify-between border-b py-3"
        style={{ paddingLeft: `${level * 24}px` }}
      >
        <div className="flex items-center gap-2">
          {category.children.length > 0 && (
            <button onClick={() => setOpen(!open)}>
              {open ? "▼" : "▶"}
            </button>
          )}

          <Typography className="font-medium">
            {category.categoryName}
          </Typography>
        </div>

        <div className="flex items-center gap-6">
          <span
            className={`text-xs px-3 py-1 rounded-full ${
              category.isActive
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {category.isActive ? "Active" : "Draft"}
          </span>

          <div className="flex gap-2">
            <button className="text-blue-600 hover:underline">Edit</button>
            <button className="text-red-600 hover:underline">Delete</button>
          </div>
        </div>
      </div>

      {open &&
        category.children.map((child: any) => (
          <CategoryRow
            key={child._id}
            category={child}
            level={level + 1}
          />
        ))}
    </>
  );
};

export default CategoryRow