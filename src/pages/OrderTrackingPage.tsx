import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useOrders } from "@/context/OrderContext";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import OrderTimeline from "@/components/OrderTimeline";
import { motion } from "framer-motion";

const OrderTrackingPage = () => {
  const [searchParams] = useSearchParams();
  const [input, setInput] = useState(searchParams.get("orderId") || "");
  const [searchId, setSearchId] = useState(searchParams.get("orderId") || "");
  const { getOrder } = useOrders();
  const order = searchId ? getOrder(searchId) : undefined;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchId(input.trim());
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-lg py-8">
        <h1 className="font-display text-2xl font-bold text-foreground mb-6">Track Your Order</h1>

        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="Enter Order ID (e.g. ORD-2026-1042)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-ring focus:ring-2 transition-all"
          />
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>

        {searchId && !order && (
          <div className="rounded-2xl bg-destructive/10 p-5 text-center">
            <p className="text-sm font-medium text-destructive">Order not found. Please check the Order ID.</p>
          </div>
        )}

        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-2xl bg-card p-5 card-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-sm font-bold text-primary">{order.id}</span>
                <span className="text-xs text-muted-foreground">{order.date}</span>
              </div>
              <div className="text-sm space-y-1">
                <p className="text-card-foreground font-medium">{order.customerName}</p>
                <p className="text-muted-foreground">{order.phone}</p>
              </div>
              <div className="mt-3 pt-3 border-t border-border flex justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-bold text-primary">₹{order.total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="rounded-2xl bg-card p-5 card-shadow">
              <h2 className="font-display text-lg font-semibold text-card-foreground mb-6">Order Status</h2>
              <OrderTimeline currentStatus={order.status} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingPage;
