import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { Upload, QrCode, Smartphone, Copy, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

const CheckoutPage = () => {
  const { items, totalAmount, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const upiId = import.meta.env.VITE_UPI_ID || "";
  const storeName = import.meta.env.VITE_STORE_NAME || "Sharma Electrical Supplies";

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setScreenshot(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.address) return;
    setSubmitting(true);

    const orderId = addOrder({
      customerName: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      items: items.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image,
      })),
      total: totalAmount,
      paymentScreenshot: screenshot || undefined,
    });

    clearCart();
    setTimeout(() => navigate(`/order-success/${orderId}`), 500);
  };

  const orderRef = `ORD${Date.now().toString().slice(-6)}`;

  const openUpiApp = () => {
    const upiUrl = [
      `upi://pay?pa=${encodeURIComponent(upiId)}`,
      `&pn=${encodeURIComponent(storeName)}`,
      `&am=${totalAmount}`,
      `&cu=INR`,
      `&tn=${encodeURIComponent(`Order-${orderRef}`)}`,
    ].join("");
    window.location.href = upiUrl;
  };

  const copyUpiId = async () => {
    await navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-2xl py-6">
        <h1 className="font-display text-2xl font-bold text-foreground mb-6">Checkout</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Customer Details */}
          <div className="rounded-2xl bg-card p-5 card-shadow space-y-4">
            <h2 className="font-display text-lg font-semibold text-card-foreground">Delivery Details</h2>
            {[
              { label: "Full Name", key: "name", type: "text" },
              { label: "Email Address", key: "email", type: "email" },
              { label: "Mobile Number", key: "phone", type: "tel" },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">{field.label}</label>
                <input
                  type={field.type}
                  required
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-ring focus:ring-2 transition-all"
                />
              </div>
            ))}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Delivery Address</label>
              <textarea
                required
                rows={3}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-ring focus:ring-2 transition-all resize-none"
              />
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-2xl bg-card p-5 card-shadow space-y-4">
            <h2 className="font-display text-lg font-semibold text-card-foreground">Payment</h2>
            <div className="flex flex-col items-center gap-4 rounded-xl bg-secondary p-6">
              <div className="flex h-40 w-40 items-center justify-center rounded-2xl bg-background border-2 border-dashed border-border">
                <QrCode className="h-24 w-24 text-foreground" />
              </div>
              <p className="text-center text-sm text-muted-foreground max-w-sm">
                Scan the QR code using any UPI app and complete the payment. After payment, upload the screenshot below.
              </p>
              <div className="w-full rounded-xl bg-primary/5 p-3 text-center">
                <span className="text-xs text-muted-foreground">Amount to pay</span>
                <p className="text-2xl font-bold text-primary">₹{totalAmount.toLocaleString("en-IN")}</p>
              </div>

              {/* UPI Pay button */}
              {upiId && (
                <div className="w-full flex flex-col gap-3">
                  <motion.button
                    type="button"
                    onClick={openUpiApp}
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.01 }}
                    className="flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-sm font-semibold text-white
                      bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600
                      shadow-[0_4px_24px_0px_rgba(124,58,237,0.4)]
                      hover:shadow-[0_6px_32px_0px_rgba(124,58,237,0.55)]
                      transition-all duration-300"
                  >
                    <Smartphone className="h-5 w-5" />
                    Open UPI App to Pay
                  </motion.button>

                  {/* UPI ID + copy */}
                  <div className="flex items-center justify-between rounded-xl bg-muted/50 border border-border px-4 py-2.5">
                    <div>
                      <p className="text-[10px] text-muted-foreground mb-0.5">UPI ID</p>
                      <p className="text-sm font-mono font-medium text-foreground">{upiId}</p>
                    </div>
                    <motion.button
                      type="button"
                      onClick={copyUpiId}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-muted"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {copied ? (
                          <motion.span key="check" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} className="flex items-center gap-1 text-green-500">
                            <Check className="h-3.5 w-3.5" /> Copied!
                          </motion.span>
                        ) : (
                          <motion.span key="copy" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} className="flex items-center gap-1">
                            <Copy className="h-3.5 w-3.5" /> Copy
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </div>
              )}
            </div>


            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Upload Payment Screenshot</label>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-background py-6 text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all">
                <Upload className="h-5 w-5" />
                {screenshot ? "Screenshot uploaded ✓" : "Click to upload"}
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>
              {screenshot && (
                <img src={screenshot} alt="Payment screenshot" className="mt-3 h-32 rounded-xl object-cover" />
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="rounded-2xl bg-card p-5 card-shadow">
            <h2 className="font-display text-lg font-semibold text-card-foreground mb-3">Order Summary</h2>
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-card-foreground">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="text-sm font-medium text-card-foreground">
                  ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 mt-2 border-t border-border">
              <span className="font-bold text-card-foreground">Total</span>
              <span className="text-lg font-bold text-primary">₹{totalAmount.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={submitting}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-2xl bg-primary py-4 text-sm font-semibold text-primary-foreground shadow-elevated disabled:opacity-50 transition-all"
          >
            {submitting ? "Submitting..." : "Submit Order"}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
