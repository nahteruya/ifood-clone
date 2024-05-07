import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/RestaurantImage";
import Image from "next/image";
import ProductsList from "@/app/_components/ProductsList";
import { Button } from "@/app/_components/ui/button";
import DeliveryInfo from "@/app/_components/DeliveryInfo";
import { StarIcon } from "lucide-react";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) return notFound();

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />
      <div className="relative z-50 mt-[-1.5rem] bg-white py-6 rounded-tl-3xl rounded-tr-3xl ">
        <div className="flex justify-between items-center px-5">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className="text-lg font-semibold">{restaurant.name}</span>
          </div>
          <div className="gap-1 flex items-center bg-foreground rounded-full px-2 py-1">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-xs text-white">5.0</span>
          </div>
        </div>

        <div className="px-5">
          <DeliveryInfo restaurant={restaurant} />
        </div>

        <div className="flex overflow-x-scroll no-scrollbar mt-3 gap-4 px-5">
          {restaurant.categories.map((category) => (
            <div
              key={category.id}
              className="min-w-[167px] rounded-lg bg-[#f4f4f4] text-center py-1"
            >
              <span className="text-sm text-muted-foreground">
                {category.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <h3 className="font-semibold px-5">Mais pedidos</h3>
          <ProductsList products={restaurant.products} />
        </div>

        {restaurant.categories.map((category) => (
          <div key={category.id} className="mt-6 space-y-3">
            <h3 className="font-semibold px-5">{category.name}</h3>
            <ProductsList products={category.products} />
          </div>
        ))}

        <div className="mt-6 px-5">
          <Button className="w-full font-semibold">Adicionar a sacola</Button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
