import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";

interface RestaurantItemProps {
  restaurant: Restaurant;
}
const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <div className="space-y-3 w-[266px] min-w-[266px]">
      <div className="h-[150px] w-full relative">
        <Image
          className="object-cover rounded-lg shadow-md"
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
        />
        <div className="absolute gap-[2px] top-2 left-2 flex items-center bg-white rounded-full px-2 py-[2px]">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-xs">5.0</span>
        </div>
        <Button className="absolute top-2 right-2 bg-gray-600 rounded-full p-2 h-fit">
          <HeartIcon size={12} className="fill-white" />
        </Button>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-sm">{restaurant.name}</h3>
        <div className="flex gap-3">
          <div className="flex gap-1">
            <BikeIcon className="text-primary" size={15} />
            <span className="text-muted-foreground text-xs">
              {Number(restaurant.deliveryFee) === 0
                ? "Entrega grátis"
                : formatCurrency(Number(restaurant.deliveryFee))}
            </span>
          </div>
          <div className="flex gap-1">
            <TimerIcon className="text-primary" size={15} />
            <span className="text-muted-foreground text-xs">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
