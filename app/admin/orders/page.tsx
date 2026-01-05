import { ShoppingCart, Search, Filter, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const orders = [
  { id: "ORD-001", customer: "Sarah Johnson", email: "sarah@email.com", product: "Violet Blossom", amount: "Rp 850.000", status: "Completed", date: "2026-01-05" },
  { id: "ORD-002", customer: "Michael Chen", email: "michael@email.com", product: "Rose Royale", amount: "Rp 2.500.000", status: "Processing", date: "2026-01-05" },
  { id: "ORD-003", customer: "Emma Wilson", email: "emma@email.com", product: "Pink Paradise", amount: "Rp 1.200.000", status: "Pending", date: "2026-01-04" },
  { id: "ORD-004", customer: "David Lee", email: "david@email.com", product: "Sunny Cheer", amount: "Rp 680.000", status: "Completed", date: "2026-01-04" },
  { id: "ORD-005", customer: "Lisa Brown", email: "lisa@email.com", product: "Blush Rose Box", amount: "Rp 750.000", status: "Processing", date: "2026-01-03" },
  { id: "ORD-006", customer: "James Smith", email: "james@email.com", product: "Pastel Haze", amount: "Rp 950.000", status: "Completed", date: "2026-01-03" },
  { id: "ORD-007", customer: "Maria Garcia", email: "maria@email.com", product: "Cinta Kuning", amount: "Rp 650.000", status: "Pending", date: "2026-01-02" },
  { id: "ORD-008", customer: "Robert Taylor", email: "robert@email.com", product: "Sunshine Love", amount: "Rp 720.000", status: "Completed", date: "2026-01-02" },
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

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
            Orders
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all customer orders
          </p>
        </div>
        <Button className="bg-rose hover:bg-rose-dark text-white rounded-xl">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Export Orders
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-10 rounded-xl"
          />
        </div>
        <Button variant="outline" className="rounded-xl">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {order.id}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.email}</p>
                    </div>
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
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="rounded-lg">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
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
