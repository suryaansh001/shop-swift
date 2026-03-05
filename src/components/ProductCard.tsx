import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

const ProductCard = ({ product }: { product: Product }) => {
  const { items, addToCart, updateQuantity } = useCart();
  const cartItem = items.find((i) => i.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex flex-col rounded-2xl bg-card card-shadow hover:card-shadow-hover transition-all duration-300 overflow-hidden min-w-[160px] sm:min-w-[220px]"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="text-sm sm:text-base font-semibold text-card-foreground line-clamp-2 leading-tight">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2 hidden sm:block">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-base sm:text-lg font-bold text-primary">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {quantity === 0 ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => addToCart(product)}
              className="flex items-center gap-1 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:opacity-90"
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </motion.button>
          ) : (
            <div className="flex items-center gap-2 rounded-xl bg-primary px-1 py-0.5">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
              >
                <Minus className="h-3.5 w-3.5" />
              </motion.button>
              <span className="min-w-[20px] text-center text-sm font-bold text-primary-foreground">
                {quantity}
              </span>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
