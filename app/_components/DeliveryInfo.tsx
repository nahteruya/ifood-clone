import { BikeIcon, TimerIcon } from "lucide-react";
import { formatCurrency } from "../_helpers/price";
import { Card } from "./ui/card";
import { Restaurant } from "@prisma/client";

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">;
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <Card className="flex justify-around items-center py-2 mt-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="text-xs">Entrega</span>
          <BikeIcon size={14} />
        </div>
        <span className="font-semibold">
          {Number(restaurant.deliveryFee)
            ? formatCurrency(Number(restaurant.deliveryFee))
            : "Grátis"}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="text-xs">Entrega</span>
          <TimerIcon size={14} />
        </div>
        <span className="font-semibold">
          {restaurant.deliveryTimeMinutes} min
        </span>
      </div>
    </Card>
  );
};

export default DeliveryInfo;
