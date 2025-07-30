"use client";

import { FC, useState } from "react";
import { useTheme } from "next-themes";
import { CartSheet } from "./CartSheet";
import { Session } from "next-auth";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderNav } from "./HeaderNav";
import { HeaderActions } from "./HeaderActions";

interface IHeaderProps {
  user: Session | null;
}

export const Header: FC<IHeaderProps> = ({ user }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <HeaderLogo />
          <HeaderNav />
          <HeaderActions
            user={user}
            setIsCartOpen={setIsCartOpen}
            theme={theme}
            setTheme={setTheme}
          />
        </div>
      </div>
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </header>
  );
};
