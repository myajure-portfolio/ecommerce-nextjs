import { Metadata } from 'next';
import Link from 'next/link';
import { cn } from '@/lib/utils';
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
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Orders</h1>
        <p className="text-muted-foreground mt-1 text-sm">{count} total orders</p>
      </div>

      <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/20">
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest">Order ID</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest">Customer</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest">Date</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest">Total</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest">Status</th>
                <th className="px-4 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">No orders found.</td></tr>
              )}
              {orders.map((order: any) => (
                <tr key={order.id} className="hover:bg-accent/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{order.id.slice(0, 8)}...</td>
                  <td className="px-4 py-4 text-foreground">
                    <p className="font-medium">{order.user.name}</p>
                    <p className="text-xs text-muted-foreground">{order.user.email}</p>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-4 font-semibold text-foreground">${order.totalPrice}</td>
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
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-indigo-500 dark:hover:text-indigo-400"><Eye className="w-4 h-4" /></Button>
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

