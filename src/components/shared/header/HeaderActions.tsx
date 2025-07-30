import { FC } from "react";
import Link from "next/link";
import { Session } from "next-auth";
import {
  Badge,
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components";
import { APP_NAME } from "@/lib";
import { Heart, Menu, Moon, ShoppingCart, Sun } from "lucide-react";
import UserButton from "./UserButton";

interface IHeaderActionsProps {
  user?: Session | null;
  setIsCartOpen: (open: boolean) => void;
  theme: string | undefined;
  setTheme: (theme: string) => void;
}

export const HeaderActions: FC<IHeaderActionsProps> = ({
  user,
  setIsCartOpen,
  theme,
  setTheme,
}) => (
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
    <UserButton user={user} />
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
      <SheetContent side="right" className="w-80 bg-white dark:bg-gray-900 p-5">
        <SheetTitle className="text-center">Menu</SheetTitle>
        <SheetDescription>{APP_NAME}</SheetDescription>
        <div className="flex flex-col space-y-4">
          <Link
            href="/"
            className="text-lg font-medium text-gray-900 dark:text-white"
          >
            Home
          </Link>
          <Link
            href="/productos"
            className="text-lg font-medium text-gray-900 dark:text-white"
          >
            Products
          </Link>
          <Link
            href="/categorias"
            className="text-lg font-medium text-gray-900 dark:text-white"
          >
            Categories
          </Link>
          <Link
            href="/ofertas"
            className="text-lg font-medium text-gray-900 dark:text-white"
          >
            Offers
          </Link>
          {!user && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <Link href="/sign-in" className="block mb-2">
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-gray-300 dark:border-gray-600"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  </div>
);
