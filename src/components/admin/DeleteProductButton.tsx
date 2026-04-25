'use client';

import { deleteProduct } from '@/actions/products/delete-product';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

interface DeleteProductButtonProps {
  productId: string;
  title?: string;
  description?: string;
  onDeleted?: () => void;
}

export function DeleteProductButton({
  productId,
  title = 'Delete Product?',
  description = 'This will permanently delete this product and remove it from the store.',
  onDeleted,
}: DeleteProductButtonProps) {
  const onConfirm = async () => {
    const result = await deleteProduct(productId);
    if (result.success && onDeleted) {
      onDeleted();
    }
    return result;
  };

  return (
    <DeleteConfirmDialog
      title={title}
      description={description}
      onConfirm={onConfirm}
    />
  );
}