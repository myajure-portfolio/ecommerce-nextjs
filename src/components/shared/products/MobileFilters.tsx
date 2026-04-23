'use client';

import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ProductFilters } from './ProductFilters';

interface Category {
  id: string;
  name: string;
}

interface MobileFiltersProps {
  categories: Category[];
}

export const MobileFilters = ({ categories }: MobileFiltersProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] sm:w-[400px] overflow-y-auto px-8 py-8">
        <SheetHeader className="mb-8 text-left">
          <SheetTitle className="text-2xl">Filter Products</SheetTitle>
          <SheetDescription className="text-base mt-2">
            Narrow down your search to find exactly what you need.
          </SheetDescription>
        </SheetHeader>
        <div className="py-2">
          <ProductFilters categories={categories} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
