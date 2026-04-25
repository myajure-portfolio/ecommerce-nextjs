import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { UserForm } from '@/components/admin/UserForm';

export const metadata: Metadata = { title: 'New User — Admin' };

export default function NewUserPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/users" className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Create User</h1>
          <p className="text-muted-foreground mt-1 text-sm">Add a new user to the system</p>
        </div>
      </div>

      <div className="rounded-2xl bg-card border border-border p-6">
        <UserForm isEdit={false} />
      </div>
    </div>
  );
}