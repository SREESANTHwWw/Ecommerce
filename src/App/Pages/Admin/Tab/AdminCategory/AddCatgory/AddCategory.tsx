import { useState, useMemo } from "react";
import { CommonImage, Typography } from "../../../../../../@All/AppForm/Form";
import AddCategoryForm from "./AddCategoryForm";
import {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from "../CategoryApi";
import { ChevronRight, ChevronDown, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

type parentCategory = {
  _id: string;
  categoryName: string;
};

type CategoryTypeMap = {
  _id: string;
  categoryName: string;
  categoryImage: string;
  parentCategory: parentCategory | null;
  description: string;
  isActive: boolean;
  children?: CategoryTypeMap[];
};

const buildCategoryTree = (categories: CategoryTypeMap[]) => {
  const map: Record<string, CategoryTypeMap> = {};
  const roots: CategoryTypeMap[] = [];

  categories.forEach((cat) => {
    map[cat._id] = { ...cat, children: [] };
  });

  categories.forEach((cat) => {
    if (cat.parentCategory?._id && map[cat.parentCategory._id]) {
      map[cat.parentCategory._id].children?.push(map[cat._id]);
    } else {
      roots.push(map[cat._id]);
    }
  });
  return roots;
};

const CategoryRow = ({
  category,
  level,
}: {
  category: CategoryTypeMap;
  level: number;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const hasChildren = category.children && category.children.length > 0;
  const [deleteCategory] = useDeleteCategoryMutation();

  const paddingLeft = level * 30;
const deleteCategoryFn = async (id: string) => {
  const isConfirmed = window.confirm("Are you sure you want to delete this category?");

  if (!isConfirmed) return;

  setIsloading(true);

  try {
    const res = await deleteCategory(id);

    if (res.data.success) {
      toast.success(res.data.msg);
    }
  } catch (error: any) {
    toast.error(
      error?.response?.data?.err || "Failed to delete category"
    );
  } finally {
    setIsloading(false);
  }
};


  return (
    <>
      <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
        <td className="py-3 pr-4 text-sm text-gray-800">
          <div
            className="flex items-center"
            style={{ paddingLeft: `${paddingLeft}px` }}
          >
            {level > 0 && (
              <div className="w-4 h-4 border-l-2 border-b-2 border-gray-300 rounded-bl-none mr-2 -mt-2 opacity-50"></div>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`mr-2 p-1 rounded hover:bg-gray-200 text-gray-500 transition-transform ${
                !hasChildren ? "invisible" : ""
              }`}
            >
              {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            <div className="grid grid-cols-2 gap-5 items-center">
              <CommonImage
                src={category.categoryImage}
                className="w-20 h-20 object-contain rounded"
              />

              <Typography
                className={`font-medium ${level === 0 ? "text-gray-900 font-semibold" : "text-gray-700"}`}
              >
                {category.categoryName}
              </Typography>
            </div>
          </div>
        </td>

        <td className="py-3 px-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              category.isActive
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {category.isActive ? "Active" : "Inactive"}
          </span>
        </td>

        <td className="py-3 px-4 text-sm text-gray-500 truncate max-w-xs">
          {category.description || "-"}
        </td>

        <td className="py-3 px-4 text-right">
          <div className="flex justify-end gap-2  transition-opacity">
            <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded border border-gray-200">
              <Edit size={14} />
            </button>
            <button
              onClick={() => deleteCategoryFn(category._id)}
              className="p-1.5 text-red-600 hover:bg-red-50 cursor-pointer rounded border border-gray-200"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </td>
      </tr>

      {isOpen &&
        hasChildren &&
        category.children?.map((child) => (
          <CategoryRow key={child._id} category={child} level={level + 1} />
        ))}
    </>
  );
};

const AddCategory = () => {
  const [cateFormOn, setCateFormon] = useState(false);
  const [notification, setNotification] = useState<boolean>(false);
  const { data } = useGetAllCategoryQuery();

  const treeData = useMemo(() => {
    if (!data?.data) return [];
    return buildCategoryTree(data.data);
  }, [data]);

  return (
    <div className="w-full h-full p-8 flex flex-col gap-6 bg-gray-50/50 min-h-screen">
      {cateFormOn && (
        <AddCategoryForm
          onClose={() => setCateFormon(false)}
          setNotification={setNotification}
          category={data?.data || []}
        />
      )}

      <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div>
          <Typography className="text-xl font-bold text-gray-800">
            Category Management
          </Typography>
          <p className="text-sm text-gray-500">Manage your product hierarchy</p>
        </div>

        <button
          onClick={() => setCateFormon(true)}
          className="bg-[var(--main-web-color)] hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition shadow-sm"
        >
          <span>+ Add Category</span>
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider pl-10">
                  Category Hierarchy
                </th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">
                  Status
                </th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right w-24">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {treeData.length > 0 ? (
                treeData.map((category) => (
                  <CategoryRow
                    key={category._id}
                    category={category}
                    level={0}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
