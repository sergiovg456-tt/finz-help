import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { BookOpen, BarChart3, PiggyBank, LogOut } from "lucide-react";

const NAV_ITEMS = [
  { href: "/graficas", label: "Gráficas", icon: BarChart3 },
  { href: "/alcancia", label: "Alcancía", icon: PiggyBank },
  { href: "/biblioteca", label: "Biblioteca", icon: BookOpen },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [location, navigate] = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white/50 backdrop-blur-sm border-r border-border/40 p-6 shrink-0">
      <Link href="/">
        <span className="font-serif italic text-primary text-xl font-bold cursor-pointer mb-8 block">
          Fin-help
        </span>
      </Link>

      <nav className="flex-1 flex flex-col gap-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = location === href || location.startsWith(href + "/");
          return (
            <Link key={href} href={href}>
              <span
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors cursor-pointer ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-primary hover:bg-primary/10"
                }`}
              >
                <Icon className="w-4 h-4" /> {label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        {user && (
          <>
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-secondary/50 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-primary truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => { logout(); navigate("/"); }}
              className="flex items-center gap-2 w-full px-4 py-2 rounded-2xl text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Cerrar sesión
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
