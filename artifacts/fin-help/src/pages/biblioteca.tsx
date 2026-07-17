import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import { articles } from "@/data/articles";
import { BookOpen, Search, Clock, Tag, ChevronRight } from "lucide-react";

const categories = ["Todas", "Presupuesto", "Ahorro", "Inversión", "Deudas"];

const levelColors: Record<string, string> = {
  Principiante: "bg-green-100 text-green-700",
  Intermedio: "bg-yellow-100 text-yellow-700",
  Avanzado: "bg-red-100 text-red-700",
};

export default function Biblioteca() {
  const { user, isLoading } = useAuth();
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  useEffect(() => {
    if (!isLoading && !user) navigate("/login");
  }, [user, isLoading]);

  if (!user) return null;

  const filtered = articles.filter((r) => {
    const matchSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === "Todas" || r.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-background flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 md:p-8 pb-24 md:pb-8">
        <div className="mb-8">
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">Biblioteca</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {articles.length} artículos educativos sobre finanzas personales
          </p>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar artículos..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-input bg-white/70 backdrop-blur-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

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

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No se encontraron artículos</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(({ id, title, description, category, readTime, level }) => (
              <button
                key={id}
                onClick={() => navigate(`/biblioteca/${id}`)}
                className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group cursor-pointer text-left hover:bg-white/80"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Tag className="w-3 h-3" /> {category}
                  </span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[level]}`}>
                    {level}
                  </span>
                </div>
                <h3 className="font-semibold text-primary mb-2 leading-snug group-hover:underline text-left">
                  {title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 text-left">{description}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" /> {readTime} de lectura
                  </span>
                  <span className="flex items-center gap-1 text-xs text-primary font-medium">
                    Leer <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
