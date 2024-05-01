import { db } from "../_lib/prisma";
import CategoryItem from "./CategoryItem";

const CategoryList = async () => {
  const categories = await db.category.findMany({});
  return (
    <div className="flex overflow-x-auto no-scrollbar gap-3 p-1">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
