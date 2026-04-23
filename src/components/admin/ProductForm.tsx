'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Plus, X, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { createProduct } from '@/actions/products/create-product';
import { updateProduct } from '@/actions/products/update-product';
import { toast } from 'react-toastify';
import { cn } from '@/lib/utils';

const GENDERS = ['men', 'women', 'kid', 'unisex'] as const;
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().min(0),
  categoryId: z.string().min(1),
  gender: z.enum(GENDERS),
  sizes: z.array(z.string()).min(1),
  isFeatured: z.boolean(),
  banner: z.string().nullable().optional(),
  images: z.array(z.string()).min(1),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface Category {
  id: string;
  name: string;
}

interface ProductFormProps {
  categories: Category[];
  initialData?: Partial<ProductFormValues> & { id?: string };
  isEdit?: boolean;
}

export function ProductForm({ categories, initialData, isEdit }: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [newImageUrl, setNewImageUrl] = useState('');

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: initialData?.name ?? '',
      slug: initialData?.slug ?? '',
      description: initialData?.description ?? '',
      price: initialData?.price ?? 0,
      stock: initialData?.stock ?? 0,
      categoryId: initialData?.categoryId ?? '',
      gender: initialData?.gender ?? 'men',
      sizes: initialData?.sizes ?? [],
      isFeatured: initialData?.isFeatured ?? false,
      banner: initialData?.banner ?? null,
      images: initialData?.images ?? [],
    },
  });

  const images = form.watch('images');
  const selectedSizes = form.watch('sizes');

  const onSubmit = (data: ProductFormValues) => {
    startTransition(async () => {
      const result = isEdit && initialData?.id
        ? await updateProduct(initialData.id, data as any)
        : await createProduct(data as any);

      if (result.success) {
        toast.success(isEdit ? 'Product updated!' : 'Product created!');
        router.push('/admin/products');
        router.refresh();
      } else {
        toast.error(result.message || 'Error saving product');
      }
    });
  };

  const toggleSize = (size: string) => {
    const current = form.getValues('sizes');
    form.setValue('sizes', current.includes(size) ? current.filter(s => s !== size) : [...current, size]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-6">
            <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6 space-y-5">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-widest">Basic Information</h3>
              <FormField<ProductFormValues> control={form.control as any} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Product Name</FormLabel>
                  <FormControl><Input {...field} value={field.value as string} className="bg-gray-800 border-gray-700 text-white" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField<ProductFormValues> control={form.control as any} name="slug" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Slug</FormLabel>
                  <FormControl><Input {...field} value={field.value as string} className="bg-gray-800 border-gray-700 text-white" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField<ProductFormValues> control={form.control as any} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Description</FormLabel>
                  <FormControl><Textarea {...field} value={field.value as string} className="bg-gray-800 border-gray-700 text-white" rows={4} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6 space-y-5">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-widest">Pricing & Inventory</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField<ProductFormValues> control={form.control as any} name="price" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">Price (USD)</FormLabel>
                    <FormControl><Input {...field} value={field.value as number} type="number" step="0.01" className="bg-gray-800 border-gray-700 text-white" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField<ProductFormValues> control={form.control as any} name="stock" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">Stock</FormLabel>
                    <FormControl><Input {...field} value={field.value as number} type="number" className="bg-gray-800 border-gray-700 text-white" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>
            <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6 space-y-5">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-widest">Product Images</h3>
              <div className="flex gap-2">
                <Input value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)} placeholder="URL de la imagen" className="bg-gray-800 border-gray-700 text-white flex-1" />
                <Button type="button" onClick={() => { if(newImageUrl.trim()){ form.setValue('images', [...images, newImageUrl.trim()]); setNewImageUrl(''); } }} variant="outline" className="border-gray-700 text-gray-300"><Plus className="w-4 h-4" /></Button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {images.map((url, i) => (
                  <div key={i} className="relative group rounded-xl overflow-hidden bg-gray-800 aspect-square">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => form.setValue('images', images.filter((_, idx) => idx !== i))} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white"><X className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6 space-y-5">
              <FormField<ProductFormValues> control={form.control as any} name="categoryId" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value as string}>
                    <FormControl><SelectTrigger className="bg-gray-800 border-gray-700 text-white"><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {categories.map(cat => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField<ProductFormValues> control={form.control as any} name="gender" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Gender</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value as string}>
                    <FormControl><SelectTrigger className="bg-gray-800 border-gray-700 text-white"><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {GENDERS.map(g => <SelectItem key={g} value={g} className="capitalize">{g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-widest">Available Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {SIZES.map(size => (
                  <button key={size} type="button" onClick={() => toggleSize(size)} className={cn("w-12 h-9 rounded-lg border text-sm font-medium transition-all", selectedSizes.includes(size) ? "border-indigo-500 bg-indigo-600/20 text-indigo-400" : "border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-500 hover:text-gray-300")}>{size}</button>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6 space-y-4">
              <FormField<ProductFormValues> control={form.control as any} name="isFeatured" render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel className="text-gray-300">Featured</FormLabel>
                  <FormControl><Switch checked={field.value as boolean} onCheckedChange={field.onChange} /></FormControl>
                </FormItem>
              )} />
            </div>
            <Button type="submit" disabled={isPending} className="w-full bg-indigo-600 hover:bg-indigo-700 h-11 text-white font-semibold">
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isEdit ? 'Save Changes' : 'Create Product'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
