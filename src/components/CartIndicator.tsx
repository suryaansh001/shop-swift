import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CartIndicator = () => {
  const { totalItems, totalAmount } = useCart();
  const navigate = useNavigate();

  if (totalItems === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-4 left-4 right-4 z-50 md:bottom-6 md:left-auto md:right-6 md:w-auto"
      >
        <button
          onClick={() => navigate("/cart")}
          className="flex w-full items-center justify-between gap-4 rounded-2xl bg-primary px-5 py-3.5 text-primary-foreground shadow-elevated transition-transform active:scale-[0.98] md:min-w-[280px]"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                {totalItems}
              </span>
            </div>
            <span className="text-sm font-medium">
              {totalItems} item{totalItems > 1 ? "s" : ""}
            </span>
          </div>
          <span className="text-base font-bold">
            ₹{totalAmount.toLocaleString("en-IN")} →
          </span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartIndicator;
