import type { BreadCrumbType } from "../Types/BreadCrumbType";

export const breadCrumbsRoute: BreadCrumbType[] = [
  { path: "/", label: "Home" },
  { path: "/shopall", label: "Shop All" },
  {path:"/about" , label:"About Us"},
  {path:"/contact" , label:"Contact Us"},
  { path: "/forgot-password", label: "Forgot Password" },
  { path: "/account", label: "Account" },
  { path: "/account/overview", label: "Overview" },
  { path: "/account/orders", label: "Orders" },
  {path:"/cart" , label:"Cart"},
  {path:"/cart/checkout" , label:"Checkout"},
  {path:"/viewproduct" , label:"Product"},
  { path: "/terms&conditions", label: "Terms & Conditions" },

  { path: "/admin", label: "Admin" },
];
