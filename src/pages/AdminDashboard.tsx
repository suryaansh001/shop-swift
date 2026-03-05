import AdminLayout from "@/components/AdminLayout";
import { useOrders } from "@/context/OrderContext";
import { sampleProducts } from "@/data/products";
import { ShoppingCart, IndianRupee, Package, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const AdminDashboard = () => {
  const { orders } = useOrders();

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const totalSold = orders.reduce((s, o) => s + o.items.reduce((si, i) => si + i.quantity, 0), 0);

  // Product frequency
  const productCount: Record<string, number> = {};
  orders.forEach((o) => o.items.forEach((i) => {
    productCount[i.name] = (productCount[i.name] || 0) + i.quantity;
  }));
  const topProduct = Object.entries(productCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  const chartData = [
    { day: "Mon", orders: 3, revenue: 8500 },
    { day: "Tue", orders: 5, revenue: 14200 },
    { day: "Wed", orders: 2, revenue: 5600 },
    { day: "Thu", orders: 7, revenue: 22100 },
    { day: "Fri", orders: 4, revenue: 11800 },
    { day: "Sat", orders: 6, revenue: 18400 },
    { day: "Sun", orders: 1, revenue: 3200 },
  ];

  const topProductsData = Object.entries(productCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, qty]) => ({ name: name.length > 15 ? name.slice(0, 15) + "…" : name, qty }));

  const stats = [
    { label: "Total Orders", value: orders.length, icon: ShoppingCart, color: "text-primary" },
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: IndianRupee, color: "text-success" },
    { label: "Products Sold", value: totalSold, icon: Package, color: "text-accent" },
    { label: "Top Product", value: topProduct, icon: TrendingUp, color: "text-warning" },
  ];

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-card p-4 card-shadow">
            <s.icon className={`h-5 w-5 ${s.color} mb-2`} />
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-lg font-bold text-card-foreground truncate">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-card p-5 card-shadow">
          <h2 className="font-display text-base font-semibold text-card-foreground mb-4">Orders Per Day</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl bg-card p-5 card-shadow">
          <h2 className="font-display text-base font-semibold text-card-foreground mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--success))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl bg-card p-5 card-shadow md:col-span-2">
          <h2 className="font-display text-base font-semibold text-card-foreground mb-4">Top Selling Products</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topProductsData} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} width={120} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="qty" fill="hsl(var(--accent))" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
