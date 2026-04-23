'use client';

import { useTransition } from 'react';
import { updateUserRole } from '@/actions/users/update-user-role';
import { toast } from 'react-toastify';
import { Badge } from '@/components/ui/badge';
import { Shield, User } from 'lucide-react';

interface UserRoleToggleProps {
  userId: string;
  currentRole: string;
}

export function UserRoleToggle({ userId, currentRole }: UserRoleToggleProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    startTransition(async () => {
      const result = await updateUserRole(userId, newRole);
      if (result.success) {
        toast.success(`Role changed to ${newRole}.`);
      } else {
        toast.error(result.message || 'Failed to update role.');
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className="group transition-all"
      title="Click to toggle role"
    >
      {currentRole === 'admin' ? (
        <Badge className="gap-1.5 bg-indigo-600/20 text-indigo-400 border-indigo-600/30 text-xs font-semibold cursor-pointer hover:bg-indigo-600/30 transition-colors">
          <Shield className="w-3 h-3" />
          Admin
        </Badge>
      ) : (
        <Badge className="gap-1.5 bg-gray-800 text-gray-400 border-gray-700 text-xs font-semibold cursor-pointer hover:bg-gray-700 hover:text-gray-300 transition-colors" variant="outline">
          <User className="w-3 h-3" />
          User
        </Badge>
      )}
    </button>
  );
}
