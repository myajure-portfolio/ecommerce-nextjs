'use client';

import { useState, useTransition } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createCategory } from '@/actions/categories/create-category';
import { toast } from 'react-toastify';

export function CreateCategoryForm() {
  const [name, setName] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    startTransition(async () => {
      const result = await createCategory(name);
      if (result.success) {
        toast.success(`Category "${name}" created!`);
        setName('');
      } else {
        toast.error(result.message || 'Failed to create category.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Category Name</label>
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Swimwear"
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
          disabled={isPending}
        />
      </div>
      <Button
        type="submit"
        disabled={isPending || !name.trim()}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
        Create Category
      </Button>
    </form>
  );
}
