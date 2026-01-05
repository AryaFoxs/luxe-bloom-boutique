import { createClient } from "@/lib/supabase/server";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
} from "lucide-react";

const stats = [
  {
    label: "Total Revenue",
    value: "Rp 12.500.000",
    change: "+12%",
    icon: DollarSign,
    color: "bg-green-500",
  },
  {
    label: "Total Orders",
    value: "156",
    change: "+8%",
    icon: ShoppingCart,
    color: "bg-blue-500",
  },
  {
    label: "Products",
    value: "24",
    change: "+2",
    icon: Package,
    color: "bg-purple-500",
  },
  {
    label: "Customers",
    value: "89",
    change: "+15%",
    icon: Users,
    color: "bg-rose",
  },
];

const recentOrders = [
  { id: "ORD-001", customer: "Sarah Johnson", product: "Violet Blossom", amount: "Rp 850.000", status: "Completed" },
  { id: "ORD-002", customer: "Michael Chen", product: "Rose Royale", amount: "Rp 2.500.000", status: "Processing" },
  { id: "ORD-003", customer: "Emma Wilson", product: "Pink Paradise", amount: "Rp 1.200.000", status: "Pending" },
  { id: "ORD-004", customer: "David Lee", product: "Sunny Cheer", amount: "Rp 680.000", status: "Completed" },
  { id: "ORD-005", customer: "Lisa Brown", product: "Blush Rose Box", amount: "Rp 750.000", status: "Processing" },
];

function getStatusColor(status: string) {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700";
    case "Processing":
      return "bg-blue-100 text-blue-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
          Welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s what&apos;s happening with your boutique today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
            <p className="text-muted-foreground text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Orders</h2>
            <a href="/admin/orders" className="text-rose text-sm font-medium hover:underline">
              View All
            </a>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="/admin/products"
          className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-rose/30 transition-all group"
        >
          <div className="p-3 rounded-xl bg-rose/10 group-hover:bg-rose/20 transition-colors">
            <Package className="w-6 h-6 text-rose" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Add New Product</h3>
            <p className="text-sm text-muted-foreground">Expand your collection</p>
          </div>
        </a>
        <a
          href="/admin/orders"
          className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-rose/30 transition-all group"
        >
          <div className="p-3 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors">
            <Clock className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Pending Orders</h3>
            <p className="text-sm text-muted-foreground">3 orders need attention</p>
          </div>
        </a>
        <a
          href="/admin/customers"
          className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-rose/30 transition-all group"
        >
          <div className="p-3 rounded-xl bg-purple-50 group-hover:bg-purple-100 transition-colors">
            <Users className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">View Customers</h3>
            <p className="text-sm text-muted-foreground">Manage customer data</p>
          </div>
        </a>
      </div>
    </div>
  );
}
