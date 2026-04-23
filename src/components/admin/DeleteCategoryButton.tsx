'use client';

import { deleteCategory } from '@/actions/categories/delete-category';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

interface DeleteCategoryButtonProps {
  categoryId: string;
  title?: string;
  description?: string;
}

export function DeleteCategoryButton({ 
  categoryId, 
  title = 'Delete Category?', 
  description 
}: DeleteCategoryButtonProps) {
  const onConfirm = async () => {
    return await deleteCategory(categoryId);
  };

  return (
    <DeleteConfirmDialog 
      title={title}
      description={description}
      onConfirm={onConfirm} 
    />
  );
}
