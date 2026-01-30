import type { BreadCrumbType } from "../Types/BreadCrumbType";

type BreadCrumbItem = {
  label: string;
  path: string;
};

export const generateBreadCrumb = (
  pathname: string,
  routes: BreadCrumbItem[]
): BreadCrumbType[] => {
  const segments = pathname.split("/").filter(Boolean); // Remove empty segments
  const breadCrumbs: BreadCrumbType[] = [];
  let currentPath = "";

  segments.forEach((segments) => {
    currentPath += `/${segments}`;
    const match = routes.find((e) => e.path === currentPath);
    if (match) {
      breadCrumbs.push({
        path: match.path,
        label: match.label,
      });
    }
  });
  return breadCrumbs;
};
