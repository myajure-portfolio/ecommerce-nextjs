import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";
import prisma from "@/lib";

export const getLatestProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: true,
      category: true,
    },
    take: LATEST_PRODUCTS_LIMIT,
  });

  return products.map((product) => ({
    ...product,
    images: product.images.map((image) => image.url),
    price: product.price.toString(),
    rating: product.rating.toString(),
    category: product.category.name,
  }));
};
