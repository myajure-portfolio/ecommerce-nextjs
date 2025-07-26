import { hashSync } from "bcryptjs";

export const categories: string[] = [
  "Shirts",
  "Pants",
  "Shoes",
  "Accessories",
  "Outerwear",
  "Activewear",
  "Formalwear",
  "Casualwear",
  "Swimwear",
  "Underwear",
];

export interface IProductSeedInput {
  name: string;
  slug: string;
  description: string;
  gender: "men" | "women" | "kid" | "unisex";
  stock: number;
  sizes: ValidSizes[];
  price: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  banner: string | null;
  category: string;
  images: string[];
}

type ValidSizes = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";

export interface IUserSeedInput {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

export const users: IUserSeedInput[] = [
  {
    name: "John Doe",
    email: "test@gmail.com",
    password: hashSync("123456", 10),
    role: "admin",
  },
  {
    name: "Jane Smith",
    email: "test1@gmail.com",
    password: hashSync("123456", 10),
    role: "user",
  },
];

export const products: IProductSeedInput[] = [
  {
    name: "Polo Sporting Stretch Shirt",
    slug: "polo-sporting-stretch-shirt",
    description: "Classic Polo style with modern comfort",
    gender: "men",
    stock: 5,
    sizes: ["S", "M", "L", "XL"],
    price: 59.99,
    rating: 4.5,
    numReviews: 10,
    isFeatured: true,
    banner: "banner-1.jpg",
    category: "Shirts",
    images: [
      "/images/sample-products/p1-1.jpg",
      "/images/sample-products/p1-2.jpg",
    ],
  },
  {
    name: "Brooks Brothers Long Sleeved Shirt",
    slug: "brooks-brothers-long-sleeved-shirt",
    description: "Timeless style and premium comfort",
    gender: "men",
    stock: 10,
    sizes: ["M", "L", "XL"],
    price: 85.9,
    rating: 4.2,
    numReviews: 8,
    isFeatured: true,
    banner: "banner-2.jpg",
    category: "Shirts",
    images: [
      "/images/sample-products/p2-1.jpg",
      "/images/sample-products/p2-2.jpg",
    ],
  },
  {
    name: "Tommy Hilfiger Classic Fit Dress Shirt",
    slug: "tommy-hilfiger-classic-fit-dress-shirt",
    description: "A perfect blend of sophistication and comfort",
    gender: "men",
    stock: 0,
    sizes: ["M", "L"],
    price: 99.95,
    rating: 4.9,
    numReviews: 3,
    isFeatured: false,
    banner: null,
    category: "Shirts",
    images: [
      "/images/sample-products/p3-1.jpg",
      "/images/sample-products/p3-2.jpg",
    ],
  },
  {
    name: "Calvin Klein Slim Fit Stretch Shirt",
    slug: "calvin-klein-slim-fit-stretch-shirt",
    description: "Streamlined design with flexible stretch fabric",
    gender: "men",
    stock: 10,
    sizes: ["S", "M", "L"],
    price: 39.95,
    rating: 3.6,
    numReviews: 5,
    isFeatured: false,
    banner: null,
    category: "Shirts",
    images: [
      "/images/sample-products/p4-1.jpg",
      "/images/sample-products/p4-2.jpg",
    ],
  },
  {
    name: "Polo Ralph Lauren Oxford Shirt",
    slug: "polo-ralph-lauren-oxford-shirt",
    description: "Iconic Polo design with refined oxford fabric",
    gender: "men",
    stock: 6,
    sizes: ["M", "L", "XL"],
    price: 79.99,
    rating: 4.7,
    numReviews: 18,
    isFeatured: false,
    banner: null,
    category: "Shirts",
    images: [
      "/images/sample-products/p5-1.jpg",
      "/images/sample-products/p5-2.jpg",
    ],
  },
  {
    name: "Polo Classic Pink Hoodie",
    slug: "polo-classic-pink-hoodie",
    description: "Soft, stylish, and perfect for laid-back days",
    gender: "men",
    stock: 8,
    sizes: ["M", "L", "XL"],
    price: 99.99,
    rating: 4.6,
    numReviews: 12,
    isFeatured: true,
    banner: null,
    category: "Shirts",
    images: [
      "/images/sample-products/p6-1.jpg",
      "/images/sample-products/p6-2.jpg",
    ],
  },
];
