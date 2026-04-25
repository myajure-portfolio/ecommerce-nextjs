'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, Heart } from 'lucide-react';
import { CartSheet } from './CartSheet';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { APP_NAME } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { UserButton } from './UserButton';
import { ThemeToggle } from '../ThemeToggle';
import type { Session as NextAuthSession } from 'next-auth';
import type { Cart } from '@/interfaces';

interface CartItem {
  id: string;
  productId: string;
  qty: number;
  price: number;
  name: string;
  slug: string;
  image: string;
  size: string | null;
}

type Session = NextAuthSession;
// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/categories', label: 'Categories' },
  { href: '/offers', label: 'Offers' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const Logo = () => (
  <Link href="/" className="flex items-center space-x-2 shrink-0">
    <div className="h-8 w-8 rounded-full bg-linear-to-r from-blue-600 to-indigo-600" />
    <span className="text-xl font-bold text-gray-900 dark:text-white">{APP_NAME}</span>
  </Link>
);

const DesktopNav = () => (
  <nav className="hidden md:flex items-center space-x-8">
    {NAV_LINKS.map(({ href, label }) => (
      <Link
        key={href}
        href={href}
        className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        {label}
      </Link>
    ))}
  </nav>
);



const CartButton = ({ onClick, count }: { onClick: () => void; count: number }) => (
  <Button
    variant="ghost"
    size="icon"
    onClick={onClick}
    className="relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
    aria-label="Open cart"
  >
    <ShoppingCart className="h-4 w-4" />
    {count > 0 && (
      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-blue-600 text-white">
        {count}
      </Badge>
    )}
  </Button>
);

const MobileSheet = ({ session }: { session?: Session | null }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-gray-600 dark:text-gray-300"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-80 bg-white dark:bg-gray-900 flex flex-col p-0">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <SheetTitle className="text-base font-semibold text-gray-900 dark:text-white">
            Menu
          </SheetTitle>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-5 py-4 space-y-1">
          {NAV_LINKS.map(({ href, label }) => (
            <SheetClose asChild key={href}>
              <Link
                href={href}
                className="flex items-center h-11 rounded-md px-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {label}
              </Link>
            </SheetClose>
          ))}
        </nav>

        {/* Theme toggle row */}
        <div className="px-5 pb-2">
          <ThemeToggle showLabel />
        </div>

        {/* User section pushed to bottom */}
        <div className="mt-auto px-5 pb-6">
          <UserButton session={session} isMobileSheet />
        </div>
      </SheetContent>
    </Sheet>
  );
};

// ─── Main Header ──────────────────────────────────────────────────────────────

export const Header = ({ session, cart }: { session?: Session | null; cart?: Cart }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCount = cart?.items?.reduce((acc: number, item: CartItem) => acc + item.qty, 0) || 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-backdrop-filter:bg-white/60 dark:supports-backdrop-filter:bg-gray-900/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo />

          <DesktopNav />

          {/* Desktop actions */}
          <div className="flex items-center space-x-1">
            <ThemeToggle className="hidden sm:inline-flex text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />

            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Wishlist"
            >
              <Heart className="h-4 w-4" />
            </Button>

            <CartButton onClick={() => setIsCartOpen(true)} count={cartCount} />

            {/* UserButton: hidden on mobile (handled by MobileSheet) */}
            <div className="hidden md:flex">
              <UserButton session={session} />
            </div>

            <MobileSheet session={session} />
          </div>
        </div>
      </div>

      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} cart={cart} />
    </header>
  );
};
