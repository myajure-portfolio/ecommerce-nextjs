import Link from 'next/link';
import { LogIn, LogOut, UserCircle, UserPlus, LayoutDashboard, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SheetClose } from '@/components/ui/sheet';
import { logout } from '@/actions/auth/logout';

// ─── Types ────────────────────────────────────────────────────────────────────

interface UserButtonProps {
  session: any;
  isMobileSheet?: boolean;
}

// ─── Shared avatar ────────────────────────────────────────────────────────────

const UserAvatar = ({ initial }: { initial: string }) => (
  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-sm font-semibold text-white shadow-sm">
    {initial}
  </div>
);

// ─── Desktop variant ──────────────────────────────────────────────────────────

const DesktopUserButton = ({ session }: { session: any }) => {
  if (!session) {
    return (
      <div className="flex items-center space-x-2">
        <Link href="/sign-in">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white gap-1.5"
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button
            size="sm"
            className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md gap-1.5"
          >
            <UserPlus className="h-4 w-4" />
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  const initial = session.user?.name?.charAt(0).toUpperCase() ?? 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="ml-1 rounded-full ring-offset-background transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="User menu"
        >
          <UserAvatar initial={initial} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session.user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/user/profile" className="flex items-center gap-2 cursor-pointer">
            <UserCircle className="h-4 w-4" />
            User Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/user/orders" className="flex items-center gap-2 cursor-pointer">
            <ClipboardList className="h-4 w-4" />
            Order History
          </Link>
        </DropdownMenuItem>

        {session?.user?.role === 'admin' && (
          <DropdownMenuItem asChild>
            <Link href="/admin" className="flex items-center gap-2 cursor-pointer">
              <LayoutDashboard className="h-4 w-4" />
              Admin
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem className="p-0">
          <form action={logout} className="w-full">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 h-8 px-2 font-normal text-red-600 dark:text-red-400 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// ─── Mobile Sheet variant ─────────────────────────────────────────────────────

const MobileSheetUserButton = ({ session }: { session: any }) => {
  if (!session) {
    return (
      <div className="flex flex-col space-y-2">
        <SheetClose asChild>
          <Link href="/sign-in" className="w-full">
            <Button variant="outline" className="w-full justify-start h-11 gap-2">
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link href="/sign-up" className="w-full">
            <Button className="w-full justify-start h-11 gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </Button>
          </Link>
        </SheetClose>
      </div>
    );
  }

  const initial = session.user?.name?.charAt(0).toUpperCase() ?? 'U';

  return (
    <div className="flex flex-col space-y-1">
      {/* Profile card */}
      <div className="flex items-center gap-3 rounded-lg bg-gray-50 dark:bg-gray-800/60 p-3 mb-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-lg font-semibold text-white shadow-sm shrink-0">
          {initial}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
            {session.user?.name}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {session.user?.email}
          </span>
        </div>
      </div>

      {/* Nav links */}
      <SheetClose asChild>
        <Link
          href="/user/profile"
          className="flex items-center gap-3 h-11 px-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <UserCircle className="h-4 w-4 text-gray-400" />
          User Profile
        </Link>
      </SheetClose>

      <SheetClose asChild>
        <Link
          href="/user/orders"
          className="flex items-center gap-3 h-11 px-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ClipboardList className="h-4 w-4 text-gray-400" />
          Order History
        </Link>
      </SheetClose>

      {session?.user?.role === 'admin' && (
        <SheetClose asChild>
          <Link
            href="/admin"
            className="flex items-center gap-3 h-11 px-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <LayoutDashboard className="h-4 w-4 text-gray-400" />
            Admin
          </Link>
        </SheetClose>
      )}

      {/* Sign out */}
      <div className="pt-2">
        <form action={logout} className="w-full">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-11 px-3 text-base text-red-600 dark:text-red-400 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </form>
      </div>
    </div>
  );
};

// ─── Export ───────────────────────────────────────────────────────────────────

export const UserButton = ({ session, isMobileSheet = false }: UserButtonProps) => {
  if (isMobileSheet) return <MobileSheetUserButton session={session} />;
  return <DesktopUserButton session={session} />;
};
