import { Metadata } from 'next';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAdminUsers } from '@/actions/users/get-admin-users';
import { AdminUsersClient } from '@/components/admin/AdminUsersClient';

export const metadata: Metadata = { title: 'Users — Admin' };

interface PageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function AdminUsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { users, count, totalPages, currentPage } = await getAdminUsers(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Users</h1>
          <p className="text-muted-foreground mt-1 text-sm">{count} registered accounts</p>
        </div>
        <Link href="/admin/users/new">
          <Button className="gap-2">
            <UserPlus className="w-4 h-4" />
            New User
          </Button>
        </Link>
      </div>

      <AdminUsersClient
        initialUsers={users}
        initialCount={count}
        initialTotalPages={totalPages}
        initialCurrentPage={currentPage}
      />
    </div>
  );
}