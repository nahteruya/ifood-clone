import { Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import ProductItem from "./ProductsItem";
import { Button } from "./ui/button";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

const ProductsList = async ({ products }: ProductListProps) => {
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
