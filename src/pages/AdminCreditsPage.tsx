import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { sampleCredits } from "@/data/orders";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminCreditsPage = () => {
  const [credits] = useState(sampleCredits);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-bold text-foreground mb-4">Customer Credits</h1>

      {/* Premium notice */}
      <div className="mb-6 flex items-start gap-3 rounded-2xl bg-warning/10 border border-warning/30 p-4">
        <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-foreground">Premium Feature</p>
          <p className="text-xs text-muted-foreground mt-1">
            Customer Credit Management is a Premium Feature. Customer login/signup and automated credit tracking will only be enabled in the premium version.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {credits.map((c) => {
          const remaining = c.creditLimit - c.creditUsed;
          const exhausted = remaining <= 0;
          return (
            <div key={c.id} className="rounded-2xl bg-card p-4 card-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-card-foreground">{c.customerName}</h3>
                  <p className="text-xs text-muted-foreground">{c.email} · {c.phone}</p>
                </div>
                <span className={`rounded-lg px-2 py-1 text-[10px] font-semibold ${
                  c.status === "Active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                }`}>
                  {c.status}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-secondary p-2">
                  <p className="text-[10px] text-muted-foreground">Limit</p>
                  <p className="text-xs font-bold text-card-foreground">₹{c.creditLimit.toLocaleString("en-IN")}</p>
                </div>
                <div className="rounded-lg bg-secondary p-2">
                  <p className="text-[10px] text-muted-foreground">Used</p>
                  <p className="text-xs font-bold text-accent">₹{c.creditUsed.toLocaleString("en-IN")}</p>
                </div>
                <div className="rounded-lg bg-secondary p-2">
                  <p className="text-[10px] text-muted-foreground">Remaining</p>
                  <p className={`text-xs font-bold ${exhausted ? "text-destructive" : "text-success"}`}>
                    ₹{remaining.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              {exhausted && (
                <p className="mt-2 text-xs text-destructive font-medium">
                  Customer cannot place new credit orders until payment is made.
                </p>
              )}

              <button
                onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
                className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg bg-secondary py-2 text-xs font-medium text-secondary-foreground"
              >
                Transactions
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expandedId === c.id ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {expandedId === c.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 border-t border-border pt-3 space-y-2">
                      {c.transactions.map((t, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <div>
                            <span className="text-muted-foreground">{t.date}</span>
                            {t.orderId && <span className="ml-2 font-mono text-primary">{t.orderId}</span>}
                          </div>
                          <span className={`font-semibold ${t.type === "Credit" ? "text-accent" : "text-success"}`}>
                            {t.type === "Credit" ? "-" : "+"}₹{t.amount.toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
};

export default AdminCreditsPage;
