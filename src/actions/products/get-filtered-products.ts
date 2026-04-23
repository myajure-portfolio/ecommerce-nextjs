'use server';

import { prisma } from '@/lib/prisma';
import { Prisma, Gender, Size } from '@/generated/prisma/client';

export interface GetProductsParams {
  q?: string;
  category?: string;
  gender?: string;
  size?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  page?: string;
  limit?: string;
}

export const getFilteredProducts = async ({
  q,
  category,
  gender,
  size,
  minPrice,
  maxPrice,
  sort,
  page = '1',
  limit = '12',
}: GetProductsParams) => {
  try {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 12;
    const skip = (pageNumber - 1) * limitNumber;

    const where: Prisma.ProductWhereInput = {};

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = {
        name: { equals: category, mode: 'insensitive' },
      };
    }

    if (gender) {
      const genders = gender.split(',').filter(g => Object.values(Gender).includes(g as Gender)) as Gender[];
      if (genders.length > 0) {
        where.gender = { in: genders };
      }
    }

    if (size) {
      const sizes = size.split(',').filter(s => Object.values(Size).includes(s as Size)) as Size[];
      if (sizes.length > 0) {
        where.sizes = { hasSome: sizes };
      }
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice && !isNaN(Number(minPrice))) {
        where.price.gte = Number(minPrice);
      }
      if (maxPrice && !isNaN(Number(maxPrice))) {
        where.price.lte = Number(maxPrice);
      }
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };

    switch (sort) {
      case 'lowest': orderBy = { price: 'asc' }; break;
      case 'highest': orderBy = { price: 'desc' }; break;
      case 'rating': orderBy = { rating: 'desc' }; break;
      case 'newest':
      default: orderBy = { createdAt: 'desc' }; break;
    }

    const [products, count] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limitNumber,
        include: {
          images: true,
          category: true,
        },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      products: products.map(product => ({
        ...product,
        images: product.images.map(img => img.url),
        price: Number(product.price),
        rating: Number(product.rating),
        category: product.category.name,
      })),
      totalPages: Math.ceil(count / limitNumber),
      count,
      currentPage: pageNumber,
    };
  } catch (error) {
    console.error('Error getting filtered products:', error);
    return { products: [], totalPages: 0, count: 0, currentPage: 1 };
  }
};
