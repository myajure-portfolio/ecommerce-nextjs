import { PrismaClient } from "../generated/prisma";
import { categories, products, users } from "./sample-data";

async function main() {
  const prisma = new PrismaClient();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  try {
    await prisma.user.createMany({
      data: users,
    });

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
