import { Metadata } from 'next';
import Link from 'next/link';
import {
  Package,
  Users,
  Tags,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { getAdminStats } from '@/actions/dashboard/get-admin-stats';
import { StatsCard } from '@/components/admin/StatsCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata: Metadata = { title: 'Admin Dashboard' };

export default async function AdminPage() {
  const stats = await getAdminStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Welcome back. Here's what's happening in your store.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
          variant="indigo"
          subtitle="Across all categories"
        />
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          variant="emerald"
          subtitle="Registered accounts"
        />
        <StatsCard
          title="Categories"
          value={stats.totalCategories}
          icon={Tags}
          variant="amber"
          subtitle="Product categories"
        />
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingCart}
          variant="rose"
          subtitle="Lifetime orders"
        />
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-indigo-900/40 via-gray-900 to-gray-900 border border-indigo-800/30 p-6">
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600/20 rounded-xl">
              <DollarSign className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
              <p className="text-4xl font-bold text-white tracking-tight mt-0.5">
                ${stats.totalRevenue.toFixed(2)}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 max-w-xs">Total value of all orders completed.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
            <h2 className="text-sm font-semibold text-white">Recent Orders</h2>
            <Link href="/admin/orders">
              <Button variant="ghost" size="sm" className="text-xs text-indigo-400 gap-1 h-7">
                View all <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
          <div className="divide-y divide-gray-800">
            {stats.recentOrders.length === 0 && (
              <p className="px-6 py-6 text-sm text-gray-500 text-center">No orders yet.</p>
            )}
            {stats.recentOrders.map((order: any) => (
              <div
                key={order.id}
                className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-200 truncate">{order.userName}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-white">${order.totalPrice}</p>
                  <Badge variant="outline" className="text-[10px] uppercase font-bold py-0">
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-white">Low Stock Alerts</h2>
            </div>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="divide-y divide-gray-800">
            {stats.lowStockProducts.length === 0 && (
              <p className="px-6 py-6 text-sm text-gray-500 text-center">
                All products are well stocked. ✓
              </p>
            )}
            {stats.lowStockProducts.map((product: any) => (
              <div
                key={product.id}
                className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-800/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-800 shrink-0">
                  {product.images[0] && (
                    <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-200 truncate">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>
                <Badge
                  className={cn(
                    'shrink-0 text-xs font-bold',
                    product.stock === 0
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-amber-500/20 text-amber-400'
                  )}
                  variant="outline"
                >
                  {product.stock === 0 ? 'Out of Stock' : `${product.stock} left`}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
