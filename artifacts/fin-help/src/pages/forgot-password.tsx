import { useState, FormEvent } from "react";
import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { AlertCircle, CheckCircle2, ArrowLeft, Mail } from "lucide-react";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await resetPassword(email);
    setLoading(false);
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error ?? "Error al enviar el correo.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,#c8d5a0_0%,transparent_70%)] opacity-40 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,#b5c48a_0%,transparent_70%)] opacity-30 pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="m-5 rounded-full bg-white/50 backdrop-blur-md px-6 py-4 flex justify-between items-center shadow-sm">
          <Link href="/">
            <span className="font-serif italic text-primary text-xl font-bold cursor-pointer">Fin-help</span>
          </Link>
          <Link href="/login">
            <span className="flex items-center gap-1 text-primary font-medium hover:opacity-60 transition-opacity cursor-pointer text-sm">
              <ArrowLeft className="w-4 h-4" /> Volver al login
            </span>
          </Link>
        </nav>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-3xl shadow-sm p-8">
            {success ? (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="font-serif text-2xl font-bold text-primary mb-2">Correo enviado</h1>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Si el correo <strong>{email}</strong> está registrado, recibirás un enlace para restablecer tu contraseña. Revisa también tu carpeta de spam.
                </p>
                <Link href="/login">
                  <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-85 transition-opacity cursor-pointer">
                    <ArrowLeft className="w-4 h-4" /> Volver al inicio de sesión
                  </span>
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h1 className="font-serif text-3xl font-bold text-primary">Recuperar contraseña</h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
                  </p>
                </div>

                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-3 mb-6 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-primary" htmlFor="email">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      required
                      autoComplete="email"
                      className="w-full px-4 py-3 rounded-2xl border border-input bg-white/80 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full py-3 rounded-2xl bg-primary text-primary-foreground font-semibold hover:opacity-85 transition-opacity disabled:opacity-50"
                  >
                    {loading ? "Enviando..." : "Enviar enlace de recuperación"}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  ¿Recordaste tu contraseña?{" "}
                  <Link href="/login">
                    <span className="text-primary font-medium hover:underline cursor-pointer">Inicia sesión</span>
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
