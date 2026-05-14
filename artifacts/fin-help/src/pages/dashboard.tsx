import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import {
  TrendingUp,
  BookOpen,
  Target,
  PiggyBank,
  LogOut,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  CheckCircle2,
} from "lucide-react";

const tips = [
  {
    title: "Regla del 50/30/20",
    desc: "Destina el 50% a necesidades, 30% a deseos y 20% al ahorro.",
    tag: "Presupuesto",
  },
  {
    title: "Fondo de emergencia",
    desc: "Mantén entre 3 y 6 meses de gastos en una cuenta de fácil acceso.",
    tag: "Ahorro",
  },
  {
    title: "Elimina deudas caras",
    desc: "Prioriza pagar tarjetas con altas tasas de interés antes que invertir.",
    tag: "Deudas",
  },
];

const goals = [
  { label: "Ahorro mensual", progress: 65, target: "$500", current: "$325" },
  { label: "Fondo de emergencia", progress: 40, target: "$3,000", current: "$1,200" },
  { label: "Inversión", progress: 20, target: "$1,000", current: "$200" },
];

const activity = [
  { label: "Salario", amount: "+$2,500", type: "in", date: "1 may" },
  { label: "Renta", amount: "-$800", type: "out", date: "2 may" },
  { label: "Supermercado", amount: "-$120", type: "out", date: "5 may" },
  { label: "Freelance", amount: "+$350", type: "in", date: "8 may" },
  { label: "Servicios", amount: "-$60", type: "out", date: "10 may" },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar + main layout */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white/50 backdrop-blur-sm border-r border-border/40 p-6">
          <Link href="/">
            <span className="font-serif italic text-primary text-xl font-bold cursor-pointer mb-8 block">Fin-help</span>
          </Link>
          <nav className="flex-1 flex flex-col gap-1">
            {[
              { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
              { href: "/biblioteca", label: "Biblioteca", icon: BookOpen },
            ].map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}>
                <span className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-primary hover:bg-primary/10 transition-colors cursor-pointer">
                  <Icon className="w-4 h-4" /> {label}
                </span>
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-secondary/50 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
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
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {/* Mobile header */}
          <div className="flex items-center justify-between mb-6 md:hidden">
            <span className="font-serif italic text-primary text-xl font-bold">Fin-help</span>
            <button onClick={() => { logout(); navigate("/"); }} className="text-muted-foreground hover:text-primary">
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-8">
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
              Hola, {user.name.split(" ")[0]}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Aquí está el resumen de tu situación financiera</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Balance total", value: "$4,250", icon: DollarSign, trend: "+8%" },
              { label: "Ingresos mes", value: "$2,850", icon: TrendingUp, trend: "+12%" },
              { label: "Gastos mes", value: "$1,980", icon: ArrowDownRight, trend: "-3%" },
              { label: "Ahorrado", value: "$870", icon: PiggyBank, trend: "+15%" },
            ].map(({ label, value, icon: Icon, trend }) => (
              <div key={label} className="bg-white/60 backdrop-blur-sm rounded-3xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="w-4 h-4 text-primary/60" />
                  <span className="text-xs font-medium text-green-600">{trend}</span>
                </div>
                <p className="font-bold text-xl text-primary">{value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Goals */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-primary">Metas financieras</h2>
              </div>
              <div className="flex flex-col gap-4">
                {goals.map(({ label, progress, target, current }) => (
                  <div key={label}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-foreground">{label}</span>
                      <span className="text-xs text-muted-foreground">{current} / {target}</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{progress}% completado</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-primary">Actividad reciente</h2>
              </div>
              <div className="flex flex-col gap-3">
                {activity.map(({ label, amount, type, date }) => (
                  <div key={label + date} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${type === "in" ? "bg-green-100" : "bg-red-50"}`}>
                        {type === "in"
                          ? <ArrowUpRight className="w-4 h-4 text-green-600" />
                          : <ArrowDownRight className="w-4 h-4 text-red-500" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground">{date}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${type === "in" ? "text-green-600" : "text-red-500"}`}>
                      {amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-primary">Consejos financieros</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {tips.map(({ title, desc, tag }) => (
                <div key={title} className="bg-secondary/40 rounded-2xl p-4">
                  <span className="text-xs font-medium text-accent-foreground bg-accent/20 px-2 py-0.5 rounded-full">{tag}</span>
                  <h3 className="font-semibold text-sm text-primary mt-2 mb-1">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
