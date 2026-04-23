'use client';

import { useTransition } from 'react';
import Image from 'next/image';

import { Minus, Plus, Trash2, ShoppingBag, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { removeFromCart, updateCartItemQuantity } from '@/actions/cart/cart.actions';
import { toast } from 'react-toastify';

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart?: any;
}

export const CartSheet: React.FC<CartSheetProps> = ({ open, onOpenChange, cart }) => {
  const [isPending, startTransition] = useTransition();

  const cartItems = cart?.items || [];

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    startTransition(async () => {
      if (newQuantity === 0) {
        const result = await removeFromCart(id);
        if (result.success) toast.info('Item removed from cart');
        else toast.error(result.message);
      } else {
        const result = await updateCartItemQuantity(id, newQuantity);
        if (result.success) toast.success('Cart updated');
        else toast.error(result.message);
      }
    });
  };

  const handleRemoveItem = (id: string) => {
    startTransition(async () => {
      const result = await removeFromCart(id);
      if (result.success) toast.info('Item removed from cart');
      else toast.error(result.message);
    });
  };

  const subtotal = Number(cart?.itemsPrice || 0);
  const shipping = Number(cart?.shippingPrice || 0);
  const total = Number(cart?.totalPrice || 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg bg-white dark:bg-gray-900 p-4 sm:p-6">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart
            <Badge variant="secondary">{cartItems.length}</Badge>
            {isPending && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground ml-2" />}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <Button
                  className="mt-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  onClick={() => onOpenChange(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto py-6">
                <div className="space-y-6">
                  {cartItems.map((item: any) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-20 w-16 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                        <Image
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.size && `Size: ${item.size} • `}
                              ${Number(item.price).toFixed(2)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-red-500"
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => handleUpdateQuantity(item.id, item.qty - 1)}
                              disabled={isPending}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.qty}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => handleUpdateQuantity(item.id, item.qty + 1)}
                              disabled={isPending}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="font-medium">${(Number(item.price) * item.qty).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6 space-y-4 shrink-0">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Free shipping applied to your order!
                    </p>
                  )}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Button className="w-full h-12 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold">
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-12 bg-transparent"
                    onClick={() => onOpenChange(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
