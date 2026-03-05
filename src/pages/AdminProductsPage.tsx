import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { sampleProducts, Product } from "@/data/products";
import { Plus, Pencil, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptyProduct: Product = {
    id: `p${Date.now()}`,
    name: "",
    price: 0,
    description: "",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop",
    category: "",
    enabled: true,
    inventory: 0,
  };

  const [formData, setFormData] = useState<Product>(emptyProduct);

  const openAdd = () => {
    setFormData({ ...emptyProduct, id: `p${Date.now()}` });
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setFormData({ ...p });
    setEditing(p);
    setShowForm(true);
  };

  const save = () => {
    if (!formData.name || formData.price <= 0) return;
    if (editing) {
      setProducts((prev) => prev.map((p) => (p.id === editing.id ? formData : p)));
    } else {
      setProducts((prev) => [...prev, formData]);
    }
    setShowForm(false);
  };

  const toggleEnabled = (id: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Products</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground"
        >
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className={`rounded-2xl bg-card p-4 card-shadow transition-opacity ${!p.enabled ? "opacity-50" : ""}`}>
            <div className="flex items-start gap-3">
              <img src={p.image} alt={p.name} className="h-14 w-14 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-card-foreground truncate">{p.name}</h3>
                <p className="text-sm font-bold text-primary">₹{p.price.toLocaleString("en-IN")}</p>
                <p className="text-xs text-muted-foreground">Stock: {p.inventory}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => openEdit(p)}
                className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-secondary py-2 text-xs font-medium text-secondary-foreground"
              >
                <Pencil className="h-3 w-3" /> Edit
              </button>
              <button
                onClick={() => toggleEnabled(p.id)}
                className={`flex-1 rounded-lg py-2 text-xs font-medium ${
                  p.enabled
                    ? "bg-destructive/10 text-destructive"
                    : "bg-success/10 text-success"
                }`}
              >
                {p.enabled ? "Disable" : "Enable"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-foreground/30 backdrop-blur-sm p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-card p-6 card-shadow max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-semibold text-card-foreground">
                  {editing ? "Edit Product" : "Add Product"}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-muted-foreground"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Product Name", key: "name", type: "text" },
                  { label: "Price (₹)", key: "price", type: "number" },
                  { label: "Category", key: "category", type: "text" },
                  { label: "Inventory", key: "inventory", type: "number" },
                  { label: "Image URL", key: "image", type: "text" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">{f.label}</label>
                    <input
                      type={f.type}
                      value={(formData as any)[f.key]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-ring focus:ring-2 transition-all"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Description</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-ring focus:ring-2 transition-all resize-none"
                  />
                </div>
                <button
                  onClick={save}
                  className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
                >
                  {editing ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default AdminProductsPage;
