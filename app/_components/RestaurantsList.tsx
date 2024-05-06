import { db } from "../_lib/prisma";
import RestaurantItem from "./RestaurantItem";

const RestaurantsList = async () => {
  const restaurants = await db.restaurant.findMany({ take: 10 });

  return (
    <>
      <div className="flex overflow-x-scroll no-scrollbar gap-4 px-5">
        {restaurants.map((restaurant) => (
          <RestaurantItem key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </>
  );
};

export default RestaurantsList;
