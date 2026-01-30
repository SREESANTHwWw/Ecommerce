import type { BreadCrumbType } from "../Types/BreadCrumbType";

export const breadCrumbsRoute: BreadCrumbType[] = [
  { path: "/", label: "Home" },
  { path: "/shopall", label: "Shop All" },

  { path: "/forgot-password", label: "Forgot Password" },
  { path: "/account", label: "Account" },
  { path: "/account/overview", label: "Overview" },
  { path: "/account/orders", label: "Orders" },
  {path:"/cart" , label:"Cart"},

  { path: "/terms&conditions", label: "Terms & Conditions" },

  { path: "/admin", label: "Admin" },
];
