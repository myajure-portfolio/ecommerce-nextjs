"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Badge,
  Button,
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components";
import { ShoppingCart, Menu, User, Moon, Sun, Heart } from "lucide-react";
import { useTheme } from "next-themes";
import { CartSheet } from "./CartSheet";

export const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-backdrop-filter:bg-white/60 dark:supports-backdrop-filter:bg-gray-900/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-linear-to-r from-blue-600 to-indigo-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Loom Store
            </span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/productos"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Productos
            </Link>
            <Link
              href="/categorias"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Categorías
            </Link>
            <Link
              href="/ofertas"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Ofertas
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden sm:inline-flex text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <Heart className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <ShoppingCart className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-blue-600 text-white">
                3
              </Badge>
            </Button>

            <div className="hidden sm:flex items-center space-x-2">
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <User className="h-4 w-4 mr-2" />
                  Entrar
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md"
                >
                  Registrarse
                </Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-gray-600 dark:text-gray-300"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-white dark:bg-gray-900 p-5"
              >
                <SheetTitle className="text-center">Menu</SheetTitle>
                <div className="flex flex-col space-y-4 mt-8">
                  <Link
                    href="/"
                    className="text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Inicio
                  </Link>
                  <Link
                    href="/productos"
                    className="text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Productos
                  </Link>
                  <Link
                    href="/categorias"
                    className="text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Categorías
                  </Link>
                  <Link
                    href="/ofertas"
                    className="text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Ofertas
                  </Link>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link href="/login" className="block mb-2">
                      <Button
                        variant="outline"
                        className="w-full bg-transparent border-gray-300 dark:border-gray-600"
                      >
                        Iniciar Sesión
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white">
                        Registrarse
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </header>
  );
};
