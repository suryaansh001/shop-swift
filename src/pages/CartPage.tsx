import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, totalAmount } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container flex flex-col items-center justify-center py-24 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/40 mb-4" />
          <h2 className="font-display text-2xl font-bold text-foreground">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Add some products to get started</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-2xl py-6">
        <button onClick={() => navigate("/")} className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Continue Shopping
        </button>

        <h1 className="font-display text-2xl font-bold text-foreground mb-6">Your Cart</h1>

        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <motion.div
              key={item.product.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="flex items-center gap-4 rounded-2xl bg-card p-4 card-shadow"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-16 w-16 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-card-foreground truncate">{item.product.name}</h3>
                <p className="text-sm font-bold text-primary">₹{item.product.price.toLocaleString("en-IN")}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-xl bg-secondary p-1">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary-foreground hover:bg-muted transition-colors"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="min-w-[24px] text-center text-sm font-bold text-secondary-foreground">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary-foreground hover:bg-muted transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 rounded-2xl bg-card p-5 card-shadow">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="text-sm font-medium text-card-foreground">₹{totalAmount.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-3 mt-3">
            <span className="text-base font-bold text-card-foreground">Total</span>
            <span className="text-lg font-bold text-primary">₹{totalAmount.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="mt-4 w-full rounded-2xl bg-primary py-4 text-sm font-semibold text-primary-foreground shadow-elevated transition-all active:scale-[0.98]"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
