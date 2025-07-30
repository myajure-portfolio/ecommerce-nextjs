import Link from "next/link";
import { APP_NAME } from "@/lib";

export const HeaderLogo = () => (
  <Link href="/" className="flex items-center space-x-2">
    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />
    <span className="text-xl font-bold text-gray-900 dark:text-white">
      {APP_NAME}
    </span>
  </Link>
);
