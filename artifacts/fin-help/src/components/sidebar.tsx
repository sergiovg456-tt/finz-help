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

  function isActive(href: string) {
    return location === href || location.startsWith(href + "/");
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white/50 backdrop-blur-sm border-r border-border/40 p-6 shrink-0">
        <Link href="/">
          <span className="font-serif italic text-primary text-xl font-bold cursor-pointer mb-8 block">
            Fin-help
          </span>
        </Link>

        <nav className="flex-1 flex flex-col gap-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}>
              <span
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors cursor-pointer ${
                  isActive(href)
                    ? "bg-primary text-primary-foreground"
                    : "text-primary hover:bg-primary/10"
                }`}
              >
                <Icon className="w-4 h-4" /> {label}
              </span>
            </Link>
          ))}
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

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-border/40 px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <span className="font-serif italic text-primary text-lg font-bold cursor-pointer">
            Fin-help
          </span>
        </Link>
        {user && (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-border/40 flex items-center">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="flex-1">
            <span
              className={`flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors cursor-pointer ${
                isActive(href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive(href) ? "stroke-[2.5]" : ""}`} />
              {label}
            </span>
          </Link>
        ))}
        {user && (
          <button
            onClick={() => { logout(); navigate("/"); }}
            className="flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Salir
          </button>
        )}
      </nav>
    </>
  );
}
