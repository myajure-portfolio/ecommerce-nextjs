import { prisma } from "../lib/prisma";
import { categories, products } from "./sample-data";

async function main() {
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  try {
    await prisma.category.createMany({
      data: categories.map((category) => ({
        name: category,
      })),
    });

    const categoriesMap = Object.fromEntries(
      (await prisma.category.findMany()).map((category) => [
        category.name,
        category.id,
      ])
    );

    for (const product of products) {
      const { category, images, ...productData } = product;

      const createdProduct = await prisma.product.create({
        data: {
          ...productData,
          categoryId: categoriesMap[category],
        },
      });

      await prisma.productImage.createMany({
        data: product.images.map((imageUrl: string) => ({
          url: imageUrl,
          productId: createdProduct.id,
        })),
      });
    }

    console.log("Database seeded successfully with sample data.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
