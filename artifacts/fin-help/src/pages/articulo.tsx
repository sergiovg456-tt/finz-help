import { useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { useAuth } from "@/lib/auth";
import Sidebar from "@/components/sidebar";
import { getArticle } from "@/data/articles";
import { ArrowLeft, Clock, Tag, BarChart2, Calendar, CheckCircle2, Lightbulb, BookOpen } from "lucide-react";

const levelColors: Record<string, string> = {
  Principiante: "bg-green-100 text-green-700",
  Intermedio: "bg-yellow-100 text-yellow-700",
  Avanzado: "bg-red-100 text-red-700",
};

export default function Articulo() {
  const { user, isLoading } = useAuth();
  const [, navigate] = useLocation();
  const [, params] = useRoute("/biblioteca/:id");

  const articleId = Number(params?.id);
  const article = getArticle(articleId);

  useEffect(() => {
    if (!isLoading && !user) navigate("/login");
  }, [user, isLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleId]);

  if (!user) return null;

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col items-center justify-center gap-4">
          <BookOpen className="w-12 h-12 text-muted-foreground" />
          <p className="text-primary font-semibold">Artículo no encontrado</p>
          <button
            onClick={() => navigate("/biblioteca")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-85 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" /> Volver a la biblioteca
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-5 py-8 pb-24 md:pb-8">

          {/* Back button */}
          <button
            onClick={() => navigate("/biblioteca")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Volver a la biblioteca
          </button>

          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Tag className="w-3 h-3" /> {article.category}
              </span>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${levelColors[article.level]}`}>
                {article.level}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> {article.readTime} de lectura
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" /> Actualizado: {article.updatedAt}
              </span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary leading-tight mb-3">
              {article.title}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {article.description}
            </p>
          </header>

          {/* Intro */}
          <div className="bg-primary/5 border-l-4 border-primary rounded-r-2xl px-5 py-4 mb-8">
            <p className="text-sm md:text-base text-primary/90 leading-relaxed font-medium">
              {article.intro}
            </p>
          </div>

          {/* Sections */}
          <div className="flex flex-col gap-8 mb-10">
            {article.sections.map((section, i) => (
              <section key={i}>
                <h2 className="font-serif text-lg md:text-xl font-bold text-primary mb-3">
                  {section.heading}
                </h2>
                <p className="text-sm md:text-base text-foreground leading-relaxed mb-3">
                  {section.content}
                </p>
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="flex flex-col gap-2 mt-3">
                    {section.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-foreground leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-amber-800">Consejos prácticos</h3>
            </div>
            <ul className="flex flex-col gap-3">
              {article.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-amber-900 leading-relaxed">
                  <span className="mt-1 text-amber-500 font-bold shrink-0">{i + 1}.</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Key points */}
          <div className="bg-white/70 backdrop-blur-sm border border-border/40 rounded-3xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-primary">Puntos clave</h3>
            </div>
            <ul className="flex flex-col gap-2.5">
              {article.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Summary */}
          <div className="bg-primary rounded-3xl p-6 mb-8">
            <h3 className="font-semibold text-primary-foreground mb-3 flex items-center gap-2">
              <BarChart2 className="w-4 h-4" /> Resumen final
            </h3>
            <p className="text-sm md:text-base text-primary-foreground/90 leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Back button bottom */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/biblioteca")}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 border border-border/40 text-primary text-sm font-medium hover:bg-white transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Volver a la biblioteca
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
