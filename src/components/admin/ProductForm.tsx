'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, type Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Plus, X } from 'lucide-react';
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
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  stock: z.coerce.number().int().min(0, 'Stock cannot be negative'),
  categoryId: z.string().min(1, 'Please select a category'),
  gender: z.enum(GENDERS),
  sizes: z.array(z.enum(SIZES)).min(1, 'Select at least one size'),
  isFeatured: z.boolean(),
  banner: z.string().nullable().optional(),
  images: z.array(z.string()).min(1, 'Add at least one image'),
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

// Local type matching AdminProductInput on the server — avoids importing Prisma in the client
type ProductPayload = {
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL')[];
  isFeatured: boolean;
  banner?: string | null;
  images: string[];
};

type PFControl = Control<ProductFormValues>;

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
      gender: (initialData?.gender as ProductFormValues['gender']) ?? 'men',
      sizes: (initialData?.sizes as ProductFormValues['sizes']) ?? [],
      isFeatured: initialData?.isFeatured ?? false,
      banner: initialData?.banner ?? null,
      images: initialData?.images ?? [],
    },
  });

  const name = form.watch('name');

  useEffect(() => {
    if (!isEdit && name) {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      form.setValue('slug', slug, { shouldValidate: true });
    }
  }, [name, isEdit, form]);

  const onSubmit = async (data: ProductFormValues) => {
    startTransition(async () => {
      try {
        const result =
          isEdit && initialData?.id
            ? await updateProduct(initialData.id, data as ProductPayload)
            : await createProduct(data as ProductPayload);

        if (result.success) {
          toast.success(isEdit ? 'Product updated!' : 'Product created!');
          router.push('/admin/products');
          router.refresh();
        } else {
          toast.error(result.message || 'Error saving product');
        }
      } catch (err) {
        console.error('Submit error:', err);
        toast.error('An unexpected error occurred. Check the console for details.');
      }
    });
  };

  const ctrl = form.control as unknown as PFControl;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          onSubmit as any,
          (errors) => {
            console.warn('Validation errors:', errors);
            const firstError = Object.values(errors)[0];
            const msg = (firstError as any)?.message || 'Please fill in all required fields';
            toast.error(msg);
          }
        )}
        className="space-y-8"
      >
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="rounded-2xl bg-card border border-border p-6 space-y-5 shadow-sm">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                Basic Information
              </h3>
              <FormField
                control={ctrl}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-background border-border text-foreground" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={ctrl}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Slug</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-background border-border text-foreground" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={ctrl}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="bg-background border-border text-foreground"
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Pricing & Inventory */}
            <div className="rounded-2xl bg-card border border-border p-6 space-y-5 shadow-sm">
               <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                Pricing &amp; Inventory
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={ctrl}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">Price (USD)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          className="bg-background border-border text-foreground"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={ctrl}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">Stock</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          className="bg-background border-border text-foreground"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Product Images */}
            <div className="rounded-2xl bg-card border border-border p-6 space-y-5 shadow-sm">
              <FormField
                control={ctrl}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                      Product Images
                    </FormLabel>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          value={newImageUrl}
                          onChange={e => setNewImageUrl(e.target.value)}
                          placeholder="Image URL"
                          className="bg-background border-border text-foreground flex-1"
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            if (newImageUrl.trim()) {
                              field.onChange([...(field.value ?? []), newImageUrl.trim()]);
                              setNewImageUrl('');
                            }
                          }}
                          variant="outline"
                          className="border-border text-muted-foreground"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {(field.value ?? []).map((url: string, i: number) => (
                          <div
                            key={i}
                            className="relative group rounded-xl overflow-hidden bg-accent aspect-square shadow-sm"
                          >
                            <img src={url} alt="" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() =>
                                field.onChange(
                                  (field.value ?? []).filter((_: string, idx: number) => idx !== i)
                                )
                              }
                              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-6">
            {/* Category & Gender */}
            <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6 space-y-5">
              <FormField
                control={ctrl}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value ?? ''}>
                      <FormControl>
                        <SelectTrigger className="bg-background border-border text-foreground">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover border-border text-popover-foreground">
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={ctrl}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Gender</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value ?? ''}>
                      <FormControl>
                        <SelectTrigger className="bg-background border-border text-foreground">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover border-border text-popover-foreground">
                        {GENDERS.map(g => (
                          <SelectItem key={g} value={g} className="capitalize">
                            {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Sizes */}
            <div className="rounded-2xl bg-card border border-border p-6 space-y-4 shadow-sm">
              <FormField
                control={ctrl}
                name="sizes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                      Available Sizes
                    </FormLabel>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {SIZES.map(size => {
                        const sizeValue = size as ProductFormValues['sizes'][number];
                        const currentSizes = (field.value ?? []) as ProductFormValues['sizes'];
                        const isSelected = currentSizes.includes(sizeValue);
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => {
                              field.onChange(
                                isSelected
                                  ? currentSizes.filter(s => s !== sizeValue)
                                  : [...currentSizes, sizeValue]
                              );
                            }}
                            className={cn(
                              'w-12 h-9 rounded-lg border text-sm font-medium transition-all',
                              isSelected
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border bg-background text-muted-foreground hover:border-muted-foreground hover:text-foreground'
                            )}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Featured */}
            <div className="rounded-2xl bg-card border border-border p-6 space-y-4 shadow-sm">
              <FormField
                control={ctrl}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="text-muted-foreground">Featured</FormLabel>
                    <FormControl>
                      <Switch checked={field.value ?? false} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-indigo-600 hover:bg-indigo-700 h-11 text-white font-semibold"
            >
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isEdit ? 'Save Changes' : 'Create Product'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
