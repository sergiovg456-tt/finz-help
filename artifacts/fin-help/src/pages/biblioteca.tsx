import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import {
  BookOpen,
  BarChart3,
  LogOut,
  Search,
  Clock,
  Tag,
  ChevronRight,
} from "lucide-react";

const recursos = [
  {
    id: 1,
    title: "Cómo crear tu primer presupuesto",
    desc: "Guía paso a paso para organizar tus finanzas y empezar a ahorrar desde hoy.",
    category: "Presupuesto",
    readTime: "5 min",
    level: "Principiante",
  },
  {
    id: 2,
    title: "Inversión para principiantes",
    desc: "Todo lo que necesitas saber para empezar a invertir con poco dinero.",
    category: "Inversión",
    readTime: "8 min",
    level: "Principiante",
  },
  {
    id: 3,
    title: "Entendiendo el interés compuesto",
    desc: "El poder del interés compuesto y cómo aprovecharlo para hacer crecer tu dinero.",
    category: "Inversión",
    readTime: "6 min",
    level: "Intermedio",
  },
  {
    id: 4,
    title: "Cómo salir de deudas",
    desc: "Estrategias probadas para eliminar deudas y recuperar tu libertad financiera.",
    category: "Deudas",
    readTime: "10 min",
    level: "Intermedio",
  },
  {
    id: 5,
    title: "Fondo de emergencia: por qué y cómo",
    desc: "La importancia de tener un colchón financiero y cómo construirlo.",
    category: "Ahorro",
    readTime: "4 min",
    level: "Principiante",
  },
  {
    id: 6,
    title: "Diversificación de portafolio",
    desc: "Aprende a distribuir tus inversiones para minimizar riesgos.",
    category: "Inversión",
    readTime: "12 min",
    level: "Avanzado",
  },
  {
    id: 7,
    title: "Planificación para la jubilación",
    desc: "Empieza a planificar tu retiro desde hoy para asegurar tu futuro.",
    category: "Ahorro",
    readTime: "9 min",
    level: "Intermedio",
  },
  {
    id: 8,
    title: "Tarjetas de crédito: aliadas o enemigas",
    desc: "Cómo usar las tarjetas de crédito de forma inteligente sin endeudarte.",
    category: "Deudas",
    readTime: "7 min",
    level: "Principiante",
  },
  {
    id: 9,
    title: "ETFs vs fondos mutuos",
    desc: "Comparativa entre las dos formas más populares de inversión pasiva.",
    category: "Inversión",
    readTime: "11 min",
    level: "Avanzado",
  },
];

const categories = ["Todas", "Presupuesto", "Ahorro", "Inversión", "Deudas"];
const levelColors: Record<string, string> = {
  Principiante: "bg-green-100 text-green-700",
  Intermedio: "bg-yellow-100 text-yellow-700",
  Avanzado: "bg-red-100 text-red-700",
};

export default function Biblioteca() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  if (!user) {
    navigate("/login");
    return null;
  }

  const filtered = recursos.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === "Todas" || r.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-background">
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
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">Biblioteca</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {recursos.length} recursos educativos sobre finanzas personales
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar recursos..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-input bg-white/70 backdrop-blur-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/60 text-primary hover:bg-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Resources grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No se encontraron recursos</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(({ id, title, desc, category, readTime, level }) => (
                <div
                  key={id}
                  className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Tag className="w-3 h-3" /> {category}
                    </span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[level]}`}>
                      {level}
                    </span>
                  </div>
                  <h3 className="font-semibold text-primary mb-2 leading-snug group-hover:underline">
                    {title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" /> {readTime} de lectura
                    </span>
                    <span className="flex items-center gap-1 text-xs text-primary font-medium group-hover:gap-2 transition-all">
                      Leer <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
