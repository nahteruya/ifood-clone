import { ChevronRightIcon } from "lucide-react";
import { db } from "../_lib/prisma";
import ProductItem from "./ProductsItem";
import { Button } from "./ui/button";

const ProductsList = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <div className="flex justify-between items-center px-5">
        <h2 className="font-semibold">Pedidos recomendados</h2>
        <Button
          variant="ghost"
          className="p-0 text-primary hover:bg-transparent h-fit"
        >
          ver todos
          <ChevronRightIcon size={16} />
        </Button>
      </div>
      <div className="flex overflow-x-scroll no-scrollbar gap-4 px-5">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductsList;
