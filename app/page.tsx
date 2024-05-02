import Header from "./_components/Header";
import Search from "./_components/Search";
import CategoryList from "./_components/CategoryList";
import ProductsList from "./_components/ProductsList";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/PromoBanner";

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
        <PromoBanner
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas"
        />
      </div>
      <div className="pt-6 space-y-4">
        <ProductsList products={products} />
      </div>
      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-02.png"
          alt="A partir de R$17,90 em lanches"
        />
      </div>
    </>
  );
};

export default Home;
