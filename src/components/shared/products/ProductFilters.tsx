'use client';

import { useEffect, useState, useCallback, useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Category {
  id: string;
  name: string;
}

interface ProductFiltersProps {
  categories: Category[];
}

export const ProductFilters = ({ categories }: ProductFiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // State for immediate UI updates
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]); // Max 500 for demo

  // Initialize state from URL
  useEffect(() => {
    const genders = searchParams.get('gender')?.split(',') || [];
    const sizes = searchParams.get('size')?.split(',') || [];
    const category = searchParams.get('category') || '';
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    setSelectedGenders(genders);
    setSelectedSizes(sizes);
    setSelectedCategory(category);

    if (minPrice && maxPrice) {
      setPriceRange([Number(minPrice), Number(maxPrice)]);
    } else {
      setPriceRange([0, 500]);
    }
  }, [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      params.delete('page'); // Reset pagination on filter change
      return params.toString();
    },
    [searchParams]
  );

  const applyFilter = (name: string, value: string) => {
    const queryString = createQueryString(name, value);
    startTransition(() => {
      router.push(`${pathname}?${queryString}`, { scroll: false });
    });
  };

  const toggleArrayFilter = (currentList: string[], value: string, paramName: string) => {
    const newList = currentList.includes(value)
      ? currentList.filter(item => item !== value)
      : [...currentList, value];

    applyFilter(paramName, newList.join(','));
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handlePriceCommit = (value: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('minPrice', value[0].toString());
    params.set('maxPrice', value[1].toString());
    params.delete('page');

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const clearFilters = () => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const genders = ['men', 'women', 'kid', 'unisex'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">
          Filters
        </h3>
        <button
          onClick={clearFilters}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 hover:underline transition-colors"
        >
          Clear all
        </button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={['category', 'gender', 'size', 'price']}
        className="w-full space-y-2"
      >
        {/* Categories */}
        <AccordionItem value="category" className="border-b-0">
          <AccordionTrigger className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 hover:no-underline">
            Category
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="cat-all"
                  checked={selectedCategory === ''}
                  onCheckedChange={() => applyFilter('category', '')}
                />
                <Label htmlFor="cat-all">All Categories</Label>
              </div>
              {categories.map(category => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cat-${category.id}`}
                    checked={selectedCategory === category.name}
                    onCheckedChange={() => applyFilter('category', category.name)}
                    className="border-gray-300 dark:border-gray-600"
                  />
                  <Label
                    htmlFor={`cat-${category.id}`}
                    className="text-sm font-normal text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Gender */}
        <AccordionItem value="gender" className="border-b-0">
          <AccordionTrigger className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 hover:no-underline">
            Gender
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3.5 pt-2">
              {genders.map(gender => (
                <div key={gender} className="flex items-center space-x-2">
                  <Checkbox
                    id={`gender-${gender}`}
                    checked={selectedGenders.includes(gender)}
                    onCheckedChange={() => toggleArrayFilter(selectedGenders, gender, 'gender')}
                    className="border-gray-300 dark:border-gray-600"
                  />
                  <Label
                    htmlFor={`gender-${gender}`}
                    className="capitalize text-sm font-normal text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {gender}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Size */}
        <AccordionItem value="size" className="border-b-0">
          <AccordionTrigger className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 hover:no-underline">
            Size
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-y-3.5 gap-x-2 pt-2">
              {sizes.map(size => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={selectedSizes.includes(size)}
                    onCheckedChange={() => toggleArrayFilter(selectedSizes, size, 'size')}
                    className="border-gray-300 dark:border-gray-600"
                  />
                  <Label
                    htmlFor={`size-${size}`}
                    className="text-sm font-normal text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price */}
        <AccordionItem value="price" className="border-b-0">
          <AccordionTrigger className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 hover:no-underline">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6 pt-4 px-2">
              <Slider
                min={0}
                max={500}
                step={10}
                value={priceRange}
                onValueChange={handlePriceChange}
                onValueCommit={handlePriceCommit}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm font-medium text-gray-600 dark:text-gray-400">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}+</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {isPending && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-100 flex items-center gap-3 px-6 py-3.5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-full shadow-2xl border border-gray-100 dark:border-gray-800 animate-in slide-in-from-bottom-8 fade-in duration-300">
          <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 tracking-wide">
            Updating results...
          </span>
        </div>
      )}
    </div>
  );
};
