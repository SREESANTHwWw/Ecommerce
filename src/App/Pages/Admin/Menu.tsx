import {
  MdOutlineDashboard,
  MdOutlinePeople,
  MdOutlineSettings,
  MdOutlineInventory2,
  MdOutlineLogout

} from "react-icons/md";
import { RiAddCircleLine } from "react-icons/ri";
import { IoReorderThree } from "react-icons/io5";

const size = 24;

type menuType = {
  title: string;
  url: string;
  icon: any;
  children?: menuType[];
};

const menu: menuType[] = [
  { title: "Dashboard", url: "/dashboard", icon: MdOutlineDashboard },
  { title: "Users", url: "/users", icon: MdOutlinePeople },
  { title: "Category", url: "/category", icon: MdOutlinePeople },
  {
    title: "Products",
    url: "/products",
    icon: MdOutlineInventory2,
    children: [
      
      {
        title: "Product List",
        url: "/products",
        icon: MdOutlineInventory2
      },
      {
        title: "Add Product",
        url: "/products/add",
        icon: RiAddCircleLine
      },
       {
        title: "Re-ordering ",
        url: "/products/reorder",
        icon: IoReorderThree
      },
    ]
  },
  { title: "Settings", url: "/settings", icon: MdOutlineSettings },
  { title: "Logout", url: "/logout", icon: MdOutlineLogout }
];

export { size };
export default menu;
