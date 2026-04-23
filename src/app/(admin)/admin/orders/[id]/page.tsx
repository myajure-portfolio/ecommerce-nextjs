import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CreditCard, Package, Truck, User, Calendar, CheckCircle2 } from 'lucide-react';
import { getOrderById } from '@/actions/orders/get-order-by-id';
import { updateOrderStatus } from '@/actions/orders/update-order-status';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = { title: 'Order Details — Admin' };

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders" className="p-2 rounded-lg hover:bg-gray-800 text-gray-400"><ArrowLeft className="w-5 h-5" /></Link>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Order #{order.id.slice(0, 8)}</h1>
            <p className="text-gray-400 mt-1 text-sm flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {order.status !== 'delivered' && order.status !== 'cancelled' && (
            <form action={async () => { 'use server'; await updateOrderStatus(order.id, 'delivered'); }}>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                <CheckCircle2 className="w-4 h-4" /> Mark as Delivered
              </Button>
            </form>
          )}
          <Badge variant="outline" className="px-3 py-1 uppercase font-bold bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
            {order.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-2">
              <Package className="w-4 h-4 text-indigo-400" />
              <h2 className="text-sm font-semibold text-white">Order Items</h2>
            </div>
            <div className="divide-y divide-gray-800">
              {order.orderItems.map((item: any) => (
                <div key={item.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-200">{item.name}</p>
                    <p className="text-xs text-gray-500">Size: {item.size} | Qty: {item.qty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">${item.price}</p>
                    <p className="text-xs text-gray-500">Total: ${(Number(item.price) * item.qty).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-900/50 p-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-gray-200">${order.itemsPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Shipping</span>
                <span className="text-gray-200">${order.shippingPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tax</span>
                <span className="text-gray-200">${order.taxPrice}</span>
              </div>
              <Separator className="bg-gray-800" />
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-white">Total</span>
                <span className="text-2xl font-bold text-indigo-400">${order.totalPrice}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Customer Info */}
          <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400">
              <User className="w-4 h-4" />
              <h2 className="text-sm font-semibold uppercase tracking-widest">Customer</h2>
            </div>
            <div>
              <p className="text-white font-medium">{order.user.name}</p>
              <p className="text-sm text-gray-400">{order.user.email}</p>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400">
              <Truck className="w-4 h-4" />
              <h2 className="text-sm font-semibold uppercase tracking-widest">Shipping Address</h2>
            </div>
            <div className="text-sm text-gray-400 space-y-1">
              <p className="text-white">{(order.shippingAddress as any).fullName}</p>
              <p>{(order.shippingAddress as any).address}</p>
              <p>{(order.shippingAddress as any).city}, {(order.shippingAddress as any).postalCode}</p>
              <p>{(order.shippingAddress as any).country}</p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400">
              <CreditCard className="w-4 h-4" />
              <h2 className="text-sm font-semibold uppercase tracking-widest">Payment</h2>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-gray-400">Method: <span className="text-white font-medium capitalize">{order.paymentMethod}</span></p>
              <Badge className={cn("text-[10px] font-bold", order.isPaid ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400")}>
                {order.isPaid ? `Paid at ${new Date(order.paidAt!).toLocaleDateString()}` : 'Not Paid'}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
