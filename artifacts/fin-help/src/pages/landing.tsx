import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import {
  BookOpen,
  TrendingUp,
  Shield,
  ChevronRight,
  Star,
  Users,
  Award,
  BarChart3,
  PiggyBank,
} from "lucide-react";

export default function Landing() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,#c8d5a0_0%,transparent_70%)] opacity-40 z-0 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,#b5c48a_0%,transparent_70%)] opacity-30 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="m-5 rounded-full bg-white/50 backdrop-blur-md px-6 py-4 flex justify-between items-center shadow-sm">
          <Link href="/">
            <span className="font-serif italic text-primary text-xl font-bold cursor-pointer">Fin-help</span>
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/graficas">
                  <span className="hidden md:block text-primary font-medium hover:opacity-60 transition-opacity cursor-pointer text-sm">Gráficas</span>
                </Link>
                <Link href="/alcancia">
                  <span className="hidden md:block text-primary font-medium hover:opacity-60 transition-opacity cursor-pointer text-sm">Alcancía</span>
                </Link>
                <Link href="/biblioteca">
                  <span className="hidden md:block text-primary font-medium hover:opacity-60 transition-opacity cursor-pointer text-sm">Biblioteca</span>
                </Link>
                <span className="hidden md:block text-sm text-muted-foreground font-medium">
                  Hola, {user.name.split(" ")[0]}
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-full border border-primary/30 text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <span className="text-primary font-medium hover:opacity-60 transition-opacity cursor-pointer text-sm">Iniciar sesión</span>
                </Link>
                <Link href="/register">
                  <span className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer">
                    Registrarse
                  </span>
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Hero */}
        <section className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-12 pb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm text-sm font-medium text-primary mb-6 shadow-sm">
            <Star className="w-4 h-4 fill-current" />
            Tu guía financiera personal
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary leading-tight max-w-3xl">
            Toma el control de tu <span className="italic">futuro financiero</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed font-light">
            Aprende, planifica y crece. Fin-help te proporciona las herramientas y el conocimiento
            para tomar decisiones financieras inteligentes cada día.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
            {user ? (
              <Link href="/graficas">
                <span className="flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-85 transition-opacity cursor-pointer shadow-md">
                  Ver mis gráficas <ChevronRight className="w-5 h-5" />
                </span>
              </Link>
            ) : (
              <>
                <Link href="/register">
                  <span className="flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-85 transition-opacity cursor-pointer shadow-md">
                    Empezar gratis <ChevronRight className="w-5 h-5" />
                  </span>
                </Link>
                <Link href="/login">
                  <span className="px-8 py-4 rounded-full border border-primary/30 text-primary font-medium hover:bg-white/40 transition-colors cursor-pointer">
                    Ya tengo cuenta
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-16">
            {[
              { icon: Users, value: "12,000+", label: "Usuarios activos" },
              { icon: BookOpen, value: "200+", label: "Recursos educativos" },
              { icon: Award, value: "95%", label: "Satisfacción" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon className="w-5 h-5 text-primary/60" />
                <span className="font-bold text-2xl text-primary">{value}</span>
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="px-6 pb-20 max-w-5xl mx-auto w-full">
          <h2 className="font-serif text-3xl font-bold text-primary text-center mb-12">
            Todo lo que necesitas
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: BarChart3,
                title: "Gráficas financieras",
                desc: "Visualiza tus ingresos y gastos en tiempo real. Descubre cuánto puedes ahorrar de verdad.",
              },
              {
                icon: PiggyBank,
                title: "Alcancía virtual",
                desc: "Crea metas de ahorro personalizadas y lleva un registro de tu progreso.",
              },
              {
                icon: BookOpen,
                title: "Biblioteca de recursos",
                desc: "Accede a cientos de artículos, guías y herramientas sobre finanzas personales.",
              },
              {
                icon: TrendingUp,
                title: "Seguimiento inteligente",
                desc: "El sistema estima automáticamente un margen para gastos personales que no siempre contamos.",
              },
              {
                icon: Shield,
                title: "Planificación segura",
                desc: "Crea planes financieros con objetivos claros y alcanzables basados en tus números reales.",
              },
              {
                icon: Star,
                title: "Consejos personalizados",
                desc: "Accede a contenido educativo adaptado a distintos niveles y situaciones financieras.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-primary mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        {!user && (
          <section className="px-6 pb-20">
            <div className="max-w-2xl mx-auto text-center bg-primary rounded-3xl p-12 shadow-lg">
              <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-4">
                Empieza hoy mismo
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                Únete a miles de personas que ya están construyendo su futuro financiero.
              </p>
              <Link href="/register">
                <span className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-semibold hover:bg-secondary transition-colors cursor-pointer shadow-sm">
                  Crear cuenta gratuita <ChevronRight className="w-5 h-5" />
                </span>
              </Link>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/30">
          <p>© 2025 Fin-help. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}
