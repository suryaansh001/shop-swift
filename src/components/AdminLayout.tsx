import { ReactNode } from "react";
import { useNavigate, Link, useLocation, Navigate } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { useTheme } from "@/context/ThemeContext";
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, Zap, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Orders", path: "/admin/orders", icon: ShoppingCart },
  { label: "Products", path: "/admin/products", icon: Package },
  { label: "Credits", path: "/admin/credits", icon: Users },
];

function DarkModeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      whileTap={{ scale: 0.93 }}
      className={`
        relative flex items-center overflow-hidden transition-all duration-300
        ${compact
          ? "w-9 h-9 rounded-xl justify-center"
          : "w-full gap-3 rounded-xl px-3 py-2.5 text-sm font-medium"}
        ${isDark
          ? "bg-gradient-to-br from-indigo-500/15 to-purple-600/15 border border-indigo-500/25 text-indigo-300 shadow-[0_0_12px_1px_rgba(99,102,241,0.15)]"
          : "bg-gradient-to-br from-amber-50/80 to-orange-50/80 border border-amber-300/50 text-amber-600 shadow-[0_0_12px_1px_rgba(251,191,36,0.15)]"}
      `}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
            transition={{ duration: 0.22 }}
            className="absolute"
          >
            <Moon className="h-4 w-4" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -30, scale: 0.7 }}
            transition={{ duration: 0.22 }}
            className="absolute"
          >
            <Sun className="h-4 w-4" />
          </motion.span>
        )}
      </AnimatePresence>
      {!compact && (
        <span className="ml-7">{isDark ? "Light Mode" : "Dark Mode"}</span>
      )}
    </motion.button>
  );
}

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - desktop */}
      <aside className="hidden w-60 flex-col border-r border-border bg-card/80 backdrop-blur-sm p-4 md:flex">
        <div className="flex items-center gap-2 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-[0_0_12px_2px_hsl(var(--primary)/0.3)]">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-sm font-bold text-card-foreground">Admin Panel</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${active
                    ? "bg-primary text-primary-foreground shadow-[0_2px_12px_0px_hsl(var(--primary)/0.35)]"
                    : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                  }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
          <DarkModeToggle />
          <button
            onClick={() => { logout(); navigate("/admin"); }}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-border bg-card/90 backdrop-blur-sm md:hidden">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-1 flex-col items-center gap-1 py-3 text-[10px] font-medium transition-colors ${active ? "text-primary" : "text-muted-foreground"
                }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
        {/* Dark mode toggle in mobile nav */}
        <div className="flex flex-1 flex-col items-center gap-1 py-3">
          <DarkModeToggle compact />
          <span className="text-[10px] font-medium text-muted-foreground">Theme</span>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-auto pb-20 md:pb-0">
        <div className="p-4 sm:p-6">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
