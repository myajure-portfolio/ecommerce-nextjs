import {
  FeaturedProducts,
  Features,
  Hero,
  Newsletter,
  Testimonials,
} from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

const HomePage = async () => {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default HomePage;
