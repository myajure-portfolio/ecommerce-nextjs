'use client';

import { deleteProduct } from '@/actions/products/delete-product';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

interface DeleteProductButtonProps {
  productId: string;
  title?: string;
  description?: string;
}

export function DeleteProductButton({ 
  productId, 
  title = 'Delete Product?', 
  description = 'This will permanently delete this product and remove it from the store.'
}: DeleteProductButtonProps) {
  const onConfirm = async () => {
    return await deleteProduct(productId);
  };

  return (
    <DeleteConfirmDialog 
      title={title} 
      description={description}
      onConfirm={onConfirm} 
    />
  );
}
