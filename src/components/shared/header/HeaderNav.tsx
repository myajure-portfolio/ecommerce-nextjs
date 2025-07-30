import Link from "next/link";

export const HeaderNav = () => (
  <nav className="hidden md:flex items-center space-x-8">
    <Link
      href="/"
      className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
    >
      Home
    </Link>
    <Link
      href="/productos"
      className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
    >
      Products
    </Link>
    <Link
      href="/categorias"
      className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
    >
      Categories
    </Link>
    <Link
      href="/ofertas"
      className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
    >
      Offers
    </Link>
  </nav>
);
