import { Users, Search, Filter, MoreHorizontal, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const customers = [
  { id: 1, name: "Sarah Johnson", email: "sarah@email.com", phone: "+62 812-3456-7890", orders: 5, totalSpent: "Rp 4.250.000", lastOrder: "2026-01-05" },
  { id: 2, name: "Michael Chen", email: "michael@email.com", phone: "+62 813-4567-8901", orders: 3, totalSpent: "Rp 5.200.000", lastOrder: "2026-01-05" },
  { id: 3, name: "Emma Wilson", email: "emma@email.com", phone: "+62 814-5678-9012", orders: 7, totalSpent: "Rp 8.400.000", lastOrder: "2026-01-04" },
  { id: 4, name: "David Lee", email: "david@email.com", phone: "+62 815-6789-0123", orders: 2, totalSpent: "Rp 1.530.000", lastOrder: "2026-01-04" },
  { id: 5, name: "Lisa Brown", email: "lisa@email.com", phone: "+62 816-7890-1234", orders: 4, totalSpent: "Rp 3.150.000", lastOrder: "2026-01-03" },
  { id: 6, name: "James Smith", email: "james@email.com", phone: "+62 817-8901-2345", orders: 1, totalSpent: "Rp 950.000", lastOrder: "2026-01-03" },
  { id: 7, name: "Maria Garcia", email: "maria@email.com", phone: "+62 818-9012-3456", orders: 6, totalSpent: "Rp 4.890.000", lastOrder: "2026-01-02" },
  { id: 8, name: "Robert Taylor", email: "robert@email.com", phone: "+62 819-0123-4567", orders: 2, totalSpent: "Rp 1.440.000", lastOrder: "2026-01-02" },
];

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
            Customers
          </h1>
          <p className="text-muted-foreground mt-1">
            View and manage your customer base
          </p>
        </div>
        <Button className="bg-rose hover:bg-rose-dark text-white rounded-xl">
          <Users className="w-4 h-4 mr-2" />
          Export Customers
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-10 rounded-xl"
          />
        </div>
        <Button variant="outline" className="rounded-xl">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Last Order
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-rose/10 flex items-center justify-center">
                        <span className="text-rose font-semibold text-sm">
                          {customer.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <p className="font-medium text-foreground">{customer.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Mail className="w-3.5 h-3.5" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Phone className="w-3.5 h-3.5" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {customer.orders} orders
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {customer.totalSpent}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {customer.lastOrder}
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
