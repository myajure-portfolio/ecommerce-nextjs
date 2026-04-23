import { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { getAdminUsers } from '@/actions/users/get-admin-users';
import { deleteUser } from '@/actions/users/delete-user';
import { DeleteUserButton } from '@/components/admin/DeleteUserButton';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { UserRoleToggle } from '@/components/admin/UserRoleToggle';

export const metadata: Metadata = { title: 'Users — Admin' };

interface SearchParams {
  q?: string;
  page?: string;
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { users, count, totalPages, currentPage } = await getAdminUsers(params);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Users</h1>
        <p className="text-gray-400 mt-1 text-sm">{count} registered accounts</p>
      </div>

      {/* Search */}
      <form method="GET" className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <Input
          name="q"
          defaultValue={params.q}
          placeholder="Search by name or email..."
          className="pl-9 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
        />
      </form>

      {/* Table */}
      <div className="rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                  User
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-widest hidden md:table-cell">
                  Email
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                  Role
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-widest hidden lg:table-cell">
                  Joined
                </th>
                <th className="px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
              {users.map(user => {
                const initials = user.name
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <tr key={user.id} className="hover:bg-gray-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user.image ?? ''} />
                          <AvatarFallback className="text-xs bg-indigo-700 text-white font-semibold">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-200">{user.name}</p>
                          <p className="text-xs text-gray-500 md:hidden">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-gray-400">{user.email}</span>
                    </td>
                    <td className="px-4 py-4">
                      <UserRoleToggle userId={user.id} currentRole={user.role} />
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-gray-500 text-xs">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end">
                        <DeleteUserButton 
                          userId={user.id} 
                          description={`This will permanently delete "${user.name}" and all their data. This cannot be undone.`}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800">
            <p className="text-xs text-gray-500">
              Page {currentPage} of {totalPages} · {count} users
            </p>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Link
                  key={page}
                  href={`?${new URLSearchParams({ ...params, page: page.toString() })}`}
                  className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                  }`}
                >
                  {page}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
