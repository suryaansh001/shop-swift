import { useParams, useNavigate } from "react-router-dom";
import { useOrders } from "@/context/OrderContext";
import { CheckCircle2, Package } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const { getOrder } = useOrders();
  const navigate = useNavigate();
  const order = orderId ? getOrder(orderId) : undefined;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-lg flex flex-col items-center py-16 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10 mb-6"
        >
          <CheckCircle2 className="h-10 w-10 text-success" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-2xl font-bold text-foreground"
        >
          Your order has been received
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 w-full rounded-2xl bg-card p-5 card-shadow text-left"
        >
          <div className="flex items-center gap-3 mb-4">
            <Package className="h-5 w-5 text-primary" />
            <span className="font-display text-lg font-semibold text-card-foreground">Order Details</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-mono font-bold text-primary">{orderId}</span>
            </div>
            {order && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-bold text-card-foreground">₹{order.total.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-success">{order.status}</span>
                </div>
                <div className="border-t border-border mt-3 pt-3">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex justify-between py-1">
                      <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                      <span className="text-card-foreground">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Estimated processing time: 1-2 business days</p>
        </motion.div>

        <button
          onClick={() => navigate(`/track?orderId=${orderId}`)}
          className="mt-6 w-full rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground"
        >
          Track Your Order
        </button>
        <button
          onClick={() => navigate("/")}
          className="mt-3 w-full rounded-2xl bg-secondary py-3.5 text-sm font-semibold text-secondary-foreground"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
