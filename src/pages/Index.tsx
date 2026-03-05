import { motion } from "framer-motion";
import { ArrowDown, Zap } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CartIndicator from "@/components/CartIndicator";
import Navbar from "@/components/Navbar";
import { sampleProducts } from "@/data/products";

const Index = () => {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/5"
              style={{
                width: 200 + i * 80,
                height: 200 + i * 80,
                left: `${10 + i * 18}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="container relative flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary mb-6"
          >
            <Zap className="h-8 w-8 text-primary-foreground" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-bold sm:text-5xl md:text-6xl text-foreground"
          >
            Sharma Electrical
            <br />
            <span className="text-gradient">Supplies</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 max-w-md text-base sm:text-lg text-muted-foreground"
          >
            Reliable Electrical Materials Delivered Quickly
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProducts}
            className="mt-8 flex items-center gap-2 rounded-2xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-elevated transition-all hover:opacity-90"
          >
            Browse Products
            <ArrowDown className="h-4 w-4 animate-float" />
          </motion.button>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="container py-12 pb-32">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-2xl font-bold sm:text-3xl text-foreground mb-8"
        >
          Our Products
        </motion.h2>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-x-visible md:pb-0 lg:grid-cols-4">
          {sampleProducts
            .filter((p) => p.enabled)
            .map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="snap-start shrink-0 w-[170px] sm:w-auto"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
        </div>
      </section>

      <CartIndicator />
    </div>
  );
};

export default Index;
