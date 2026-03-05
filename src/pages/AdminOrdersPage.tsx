import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { useOrders } from "@/context/OrderContext";
import { ORDER_STATUSES, OrderStatus } from "@/data/orders";
import { Eye, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminOrdersPage = () => {
  const { orders, updateOrderStatus } = useOrders();
  const [filter, setFilter] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-bold text-foreground mb-4">Order Management</h1>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
        {["All", ...ORDER_STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`shrink-0 rounded-xl px-4 py-2 text-xs font-medium transition-colors ${
              filter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-2xl bg-card card-shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Order ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs font-bold text-primary">{order.id}</td>
                <td className="px-4 py-3 text-card-foreground">{order.customerName}</td>
                <td className="px-4 py-3 text-muted-foreground">{order.phone}</td>
                <td className="px-4 py-3 font-medium text-card-foreground">₹{order.total.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                    className="rounded-lg border border-input bg-background px-2 py-1 text-xs text-foreground"
                  >
                    {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{order.date}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                    className="flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    <Eye className="h-3.5 w-3.5" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {filtered.map((order) => (
          <div key={order.id} className="rounded-2xl bg-card p-4 card-shadow">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-mono text-xs font-bold text-primary">{order.id}</p>
                <p className="text-sm font-medium text-card-foreground">{order.customerName}</p>
              </div>
              <span className="text-sm font-bold text-card-foreground">₹{order.total.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                className="flex-1 rounded-lg border border-input bg-background px-2 py-1.5 text-xs text-foreground"
              >
                {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <button
                onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                className="flex items-center gap-1 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"
              >
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expandedId === order.id ? "rotate-180" : ""}`} />
              </button>
            </div>
            <AnimatePresence>
              {expandedId === order.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-border pt-3"
                >
                  <div className="space-y-1 text-xs">
                    <p className="text-muted-foreground">Phone: {order.phone}</p>
                    <p className="text-muted-foreground">Email: {order.email}</p>
                    <p className="text-muted-foreground">Address: {order.address}</p>
                    <p className="text-muted-foreground">Date: {order.date}</p>
                    <div className="mt-2 space-y-1">
                      {order.items.map((item) => (
                        <p key={item.productId} className="text-card-foreground">
                          {item.name} × {item.quantity} = ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      ))}
                    </div>
                    {order.paymentScreenshot && (
                      <div className="mt-2">
                        <p className="text-muted-foreground mb-1">Payment Screenshot:</p>
                        <img src={order.paymentScreenshot} alt="Payment" className="h-32 rounded-lg object-cover" />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminOrdersPage;
