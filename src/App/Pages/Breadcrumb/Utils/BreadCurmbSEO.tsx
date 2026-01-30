// components/BreadcrumbSEO.jsx
import { useLocation } from "react-router-dom";
import { generateBreadCrumb } from "./BeadCrumbUtils";
import { breadCrumbsRoute } from "../Config/BreadCrumbRoutes";


const BreadcrumbSEO = () => {
  const { pathname } = useLocation();
  const breadcrumbs = generateBreadCrumb(pathname,breadCrumbsRoute);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `${window.location.origin}${item.path}`,
    })),
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
};

export default BreadcrumbSEO;
