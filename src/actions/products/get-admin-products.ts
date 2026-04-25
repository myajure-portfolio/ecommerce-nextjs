'use server';

import { prisma } from '@/lib/prisma';
import { Gender } from '@/generated/prisma/client';

interface GetAdminProductsParams {
  q?: string;
  page?: string;
  limit?: string;
  category?: string;
  gender?: string;
  inStock?: string;
}

export const getAdminProducts = async ({
  q = '',
  page = '1',
  limit = '10',
  category,
  gender,
  inStock,
}: GetAdminProductsParams) => {
  try {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const where: {
      OR?: Array<{ name?: { contains: string; mode: 'insensitive' }; slug?: { contains: string; mode: 'insensitive' } }>;
      categoryId?: string;
      gender?: Gender;
      stock?: number | { gte: number } | { gt: number; lte: number };
    } = {};

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { slug: { contains: q, mode: 'insensitive' } },
      ];
    }

    if (category && category !== 'all') {
      where.categoryId = category;
    }

    if (gender && gender !== 'all') {
      where.gender = gender as Gender;
    }

    if (inStock && inStock !== 'all') {
      if (inStock === 'in') {
        where.stock = { gte: 6 };
      } else if (inStock === 'low') {
        where.stock = { gt: 0, lte: 5 };
      } else if (inStock === 'out') {
        where.stock = 0;
      }
    }

    const [products, count] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true, images: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNumber,
      }),
      prisma.product.count({ where }),
    ]);

    return {
      products: products.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        stock: p.stock,
        price: p.price.toString(),
        rating: p.rating.toString(),
        numReviews: p.numReviews,
        isFeatured: p.isFeatured,
        banner: p.banner,
        gender: p.gender,
        sizes: p.sizes,
        category: p.category.name,
        categoryId: p.categoryId,
        images: p.images.map(img => img.url),
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      })),
      count,
      totalPages: Math.ceil(count / limitNumber),
      currentPage: pageNumber,
    };
  } catch (error) {
    console.error('Error fetching admin products:', error);
    return {
      products: [],
      count: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }
};