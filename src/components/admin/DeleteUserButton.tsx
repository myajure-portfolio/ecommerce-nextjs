'use client';

import { deleteUser } from '@/actions/users/delete-user';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

interface DeleteUserButtonProps {
  userId: string;
  title?: string;
  description?: string;
}

export function DeleteUserButton({ 
  userId, 
  title = 'Delete User?', 
  description = 'This will permanently delete this user account and all associated data.'
}: DeleteUserButtonProps) {
  const onConfirm = async () => {
    return await deleteUser(userId);
  };

  return (
    <DeleteConfirmDialog 
      title={title} 
      description={description}
      onConfirm={onConfirm} 
    />
  );
}
