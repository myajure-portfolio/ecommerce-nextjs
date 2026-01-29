import { Metadata } from 'next';
import { getLatestProducts } from '@/actions';
import { FeaturedProducts, Features, Hero, Newsletter, Testimonials } from '@/components';
import { IProduct } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Home',
};

const HomePage = async () => {
  const latestProducts: IProduct[] = await getLatestProducts();

  return (
    <>
      <Hero />
      <Features />
      <FeaturedProducts products={latestProducts} />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default HomePage;
