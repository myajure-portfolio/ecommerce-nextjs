'use client';

import { signOut } from 'next-auth/react';
import { Bell, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AdminHeaderProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const initials = user?.name
    ? user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'A';

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-gray-800 bg-gray-900 shrink-0">
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden text-gray-400 hover:text-gray-200 hover:bg-gray-800"
      >
        <Menu className="w-5 h-5" />
      </Button>

      <div className="hidden lg:flex items-center gap-2">
        <span className="text-xs text-gray-500 font-medium uppercase tracking-widest">
          Admin Console
        </span>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <Button
          variant="ghost"
          size="sm"
          className="relative text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg"
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 hover:bg-gray-800 rounded-lg px-2 py-1.5 transition-colors">
              <Avatar className="w-7 h-7">
                <AvatarImage src={user?.image ?? ''} />
                <AvatarFallback className="text-xs bg-indigo-600 text-white font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-200 leading-none">{user?.name}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-none">{user?.email}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-52 bg-gray-900 border-gray-700 text-gray-300"
          >
            <DropdownMenuLabel className="text-gray-400 font-normal text-xs uppercase tracking-widest">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-red-400 focus:text-red-300 focus:bg-red-900/20 cursor-pointer gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
