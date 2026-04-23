import { Metadata } from 'next';
import Link from 'next/link';
import { Search, Eye, ShoppingCart } from 'lucide-react';
import { getAdminOrders } from '@/actions/orders/get-admin-orders';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = { title: 'Orders — Admin' };

export default async function AdminOrdersPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const { orders, count, totalPages, currentPage } = await getAdminOrders(params);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Orders</h1>
        <p className="text-gray-400 mt-1 text-sm">{count} total orders</p>
      </div>

      <div className="rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-widest">Order ID</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-widest">Customer</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-widest">Date</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-widest">Total</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {orders.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500">No orders found.</td></tr>
              )}
              {orders.map((order: any) => (
                <tr key={order.id} className="hover:bg-gray-800/40 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-400">{order.id.slice(0, 8)}...</td>
                  <td className="px-4 py-4 text-gray-200">
                    <p className="font-medium">{order.user.name}</p>
                    <p className="text-xs text-gray-500">{order.user.email}</p>
                  </td>
                  <td className="px-4 py-4 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-4 font-semibold text-white">${order.totalPrice}</td>
                  <td className="px-4 py-4">
                    <Badge variant="outline" className={cn("text-[10px] uppercase font-bold px-2 py-0.5", 
                      order.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      order.status === 'cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                      'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                    )}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Link href={`/admin/orders/${order.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-indigo-400"><Eye className="w-4 h-4" /></Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
