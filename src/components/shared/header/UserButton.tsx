import { FC } from "react";
import Link from "next/link";
import { Session } from "next-auth";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components";
import { User } from "lucide-react";
import { signOutUser } from "@/actions";

const UserButton: FC<{ user?: Session | null }> = ({ user }) => {
  const session = user;

  if (!session) {
    return (
      <div className="hidden sm:flex items-center space-x-2">
        <Link href="/sign-in">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md"
          >
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  const firstInitial = session.user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-gray-200"
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-medium leading-none">
                {session.user?.name || "User"}
              </div>
              <div className="text-sm text-muted-foreground leading-none">
                {session.user?.email || "Email not available"}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem className="p-0 mb-1">
            <form className="w-full" action={signOutUser}>
              <Button
                variant="ghost"
                className="w-full py-4 px-2 h-4 justify-start"
              >
                Sign Out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
