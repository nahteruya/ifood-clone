import Header from "./_components/Header";
import Search from "./_components/Search";
import CategoryList from "./_components/CategoryList";
import Image from "next/image";
import ProductsList from "./_components/ProductsList";
import { db } from "./_lib/prisma";

const Home = async () => {
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
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <div className="px-5 pt-6">
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas"
          height={0}
          width={0}
          className="w-full h-auto object-contain"
          sizes="100vw"
        />
      </div>
      <div className="pt-6 space-y-4">
        <ProductsList products={products} />
      </div>
    </>
  );
};

export default Home;
