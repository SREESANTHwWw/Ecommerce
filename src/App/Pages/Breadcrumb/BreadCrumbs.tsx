import { Link, useLocation } from "react-router-dom";

import { useMemo } from "react";
import { generateBreadCrumb } from "./Utils/BeadCrumbUtils";
import { breadCrumbsRoute } from "./Config/BreadCrumbRoutes";
import { RiArrowRightSLine } from "react-icons/ri";
import { Typography } from "../../../@All/AppForm/Form";

const BreadCrumbs = () => {
  const { pathname } = useLocation();

  const breadcrumbs = useMemo(
    () => generateBreadCrumb(pathname, breadCrumbsRoute),
    [pathname]
  );

  if (!breadcrumbs.length) return null;
  return (
    <nav aria-label="breadCrumb" className="px-7   py-3 text-sm">
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <Link to="/" className="hover:text-[var(--bg-color-ca)]">
            <Typography> Home</Typography>
          </Link>
        </li>
        {breadcrumbs.map((item, index) => (
          <li key={item.path} className="flex  items-center gap-1">
            <RiArrowRightSLine size={20}/>
            {index === breadcrumbs.length - 1 ? (
              <Typography className="font-semibold text-[var(--button-bg-color] ">{item.label}</Typography>
            ) : (
              <Link to={item.path} className="text-[var(--main-web-color)] hover:text-[var(--bg-color-ca)] ">
               <Typography>{item.label}</Typography> 
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
