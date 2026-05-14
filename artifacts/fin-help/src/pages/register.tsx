import { useState, FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Register() {
  const { register, user } = useAuth();
  const [, navigate] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    navigate("/graficas");
    return null;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const result = register(name, email, password);
    setLoading(false);

    if (result.success) {
      navigate("/graficas");
    } else {
      setError(result.error ?? "Error al registrarse.");
    }
  }

  const passwordStrength = password.length === 0
    ? null
    : password.length < 6
    ? "débil"
    : password.length < 10
    ? "media"
    : "fuerte";

  const strengthColor =
    passwordStrength === "débil"
      ? "text-red-500"
      : passwordStrength === "media"
      ? "text-yellow-600"
      : "text-green-600";

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,#c8d5a0_0%,transparent_70%)] opacity-40 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,#b5c48a_0%,transparent_70%)] opacity-30 pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="m-5 rounded-full bg-white/50 backdrop-blur-md px-6 py-4 flex justify-between items-center shadow-sm">
          <Link href="/">
            <span className="font-serif italic text-primary text-xl font-bold cursor-pointer">Fin-help</span>
          </Link>
          <Link href="/login">
            <span className="text-primary font-medium hover:opacity-60 transition-opacity cursor-pointer text-sm">
              ¿Ya tienes cuenta? <span className="underline">Inicia sesión</span>
            </span>
          </Link>
        </nav>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-3xl shadow-sm p-8">
            <div className="mb-8 text-center">
              <h1 className="font-serif text-3xl font-bold text-primary">Crea tu cuenta</h1>
              <p className="mt-2 text-sm text-muted-foreground">Empieza tu camino financiero hoy</p>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-3 mb-6 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-primary" htmlFor="name">
                  Nombre completo
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-input bg-white/80 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
              </div>

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
                  className="w-full px-4 py-3 rounded-2xl border border-input bg-white/80 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-primary" htmlFor="password">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    required
                    minLength={6}
                    className="w-full px-4 py-3 rounded-2xl border border-input bg-white/80 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passwordStrength && (
                  <p className={`text-xs font-medium ${strengthColor}`}>
                    Contraseña {passwordStrength}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-primary" htmlFor="confirm">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <input
                    id="confirm"
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repite tu contraseña"
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-input bg-white/80 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {confirmPassword && (
                  <p className={`text-xs font-medium flex items-center gap-1 ${password === confirmPassword ? "text-green-600" : "text-red-500"}`}>
                    {password === confirmPassword ? (
                      <><CheckCircle2 className="w-3 h-3" /> Las contraseñas coinciden</>
                    ) : (
                      <><AlertCircle className="w-3 h-3" /> Las contraseñas no coinciden</>
                    )}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full py-3 rounded-2xl bg-primary text-primary-foreground font-semibold hover:opacity-85 transition-opacity disabled:opacity-50"
              >
                {loading ? "Creando cuenta..." : "Crear cuenta"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login">
                <span className="text-primary font-medium hover:underline cursor-pointer">Inicia sesión</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
