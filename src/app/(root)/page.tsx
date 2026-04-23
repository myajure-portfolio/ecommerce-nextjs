import { Metadata } from 'next';

import { IProduct } from '@/interfaces';
import { Hero } from '@/components/shared/hero';
import { FeaturedProducts } from '@/components/shared/products/FeaturedProducts';
import { Features } from '@/components/shared/products/Features';
import { Newsletter } from '@/components/shared/products/Newsletter';
import { Testimonials } from '@/components/shared/products/Testimonials';
import { getLatestProducts } from '@/actions/products/get-latest-products';

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
