"use client";

import Image from "next/image";
import {
  formatCurrency,
  calculateProductTotalPrice,
} from "@/app/_helpers/price";
import DiscountBadge from "@/app/_components/DiscountBadge";
import { Button } from "@/app/_components/ui/button";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import { Card } from "@/app/_components/ui/card";
import ProductsList from "@/app/_components/ProductsList";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseClick = () =>
    setQuantity((prevQuantity) => prevQuantity + 1);

  const handleDecreaseClick = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity === 1) return 1;
      return prevQuantity - 1;
    });
  };
  return (
    <div className="relative z-50 mt-[-1.5rem] bg-white py-6 rounded-tl-3xl rounded-tr-3xl ">
      <div className="flex items-center gap-2 px-5">
        <div className="relative w-6 h-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-sm text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      <h1 className="mb-3 font-semibold mt-1 text-xl px-5">{product.name}</h1>
      <div className="flex justify-between items-center px-5">
        <div>
          <div className="flex gap-2">
            <h2 className="font-semibold text-xl">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage && <DiscountBadge product={product} />}
          </div>
          <span className="text-sm text-muted-foreground">
            De: {formatCurrency(Number(product.price))}
          </span>
        </div>
        <div className="flex gap-4 items-center text-center">
          <Button
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
            onClick={handleDecreaseClick}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">{quantity}</span>
          <Button size="icon" onClick={handleIncreaseClick}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      <div className="px-5">
        <Card className="flex justify-around items-center py-2 mt-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <BikeIcon size={14} />
            </div>
            <span className="font-semibold">
              {product.restaurant.deliveryFee
                ? formatCurrency(Number(product.restaurant.deliveryFee))
                : "Grátis"}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <TimerIcon size={14} />
            </div>
            <span className="font-semibold">
              {product.restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </Card>
      </div>

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="font-semibold px-5">Sucos</h3>
        <ProductsList products={complementaryProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;
