export const buildCategoryTree = (categories: any[]) => {
  const map: any = {};
  const roots: any[] = [];

  categories.forEach(cat => {
    map[cat._id] = { ...cat, children: [] };
  });

  categories.forEach(cat => {
    if (cat.parentCategory?._id) {
      map[cat.parentCategory._id]?.children.push(map[cat._id]);
    } else {
      roots.push(map[cat._id]);
    }
  });

  return roots;
};
