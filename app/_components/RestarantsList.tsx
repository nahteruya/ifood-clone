import { db } from "../_lib/prisma";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import RestaurantItem from "./RestaurantItem";

const RestaurantsList = async () => {
  const restaurants = await db.restaurant.findMany({ take: 10 });

  return (
    <>
      <div className="flex justify-between items-center px-5">
        <h2 className="font-semibold">Restaurantes recomendados</h2>
        <Button
          variant="ghost"
          className="p-0 text-primary hover:bg-transparent h-fit"
        >
          ver todos
          <ChevronRightIcon size={16} />
        </Button>
      </div>
      <div className="flex overflow-x-scroll no-scrollbar gap-4 px-5">
        {restaurants.map((restaurant) => (
          <RestaurantItem key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </>
  );
};

export default RestaurantsList;
