import { useState, FormEvent, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff, AlertCircle, CheckCircle2, Lock } from "lucide-react";

export default function UpdatePassword() {
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Supabase puts the recovery token in the URL hash; onAuthStateChange fires
    // PASSWORD_RECOVERY once the SDK has exchanged it for a session.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });

    // If the page is refreshed, check for an existing session
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    // Sign out so the user starts a fresh session on login
    await supabase.auth.signOut();
    setSuccess(true);

    // Redirect to login with success message after a short pause
    setTimeout(() => {
      window.location.href = "/login?updated=1";
    }, 1500);
  }

  const passwordStrength =
    password.length === 0
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
        <nav className="m-5 rounded-full bg-white/50 backdrop-blur-md px-6 py-4 flex justify-between items-center shadow-sm">
          <span className="font-serif italic text-primary text-xl font-bold">Fin-help</span>
        </nav>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-3xl shadow-sm p-8">

            {success ? (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="font-serif text-2xl font-bold text-primary mb-2">
                  ¡Contraseña actualizada!
                </h1>
                <p className="text-sm text-muted-foreground">
                  Redirigiendo al inicio de sesión...
                </p>
              </div>

            ) : !ready ? (
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
                <h1 className="font-serif text-2xl font-bold text-primary mb-2">
                  Enlace inválido o expirado
                </h1>
                <p className="text-sm text-muted-foreground mb-6">
                  Este enlace de recuperación no es válido o ya expiró. Solicita uno nuevo.
                </p>
                <a
                  href="/forgot-password"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-85 transition-opacity"
                >
                  Solicitar nuevo enlace
                </a>
              </div>

            ) : (
              <>
                <div className="mb-8 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <h1 className="font-serif text-3xl font-bold text-primary">Nueva contraseña</h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Elige una contraseña segura para tu cuenta.
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
                    <label className="text-sm font-medium text-primary" htmlFor="password">
                      Nueva contraseña
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
                        autoComplete="new-password"
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
                        placeholder="Repite tu nueva contraseña"
                        required
                        autoComplete="new-password"
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
                      <p className={`text-xs font-medium flex items-center gap-1 ${
                        password === confirmPassword ? "text-green-600" : "text-red-500"
                      }`}>
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
                    {loading ? "Actualizando..." : "Guardar nueva contraseña"}
                  </button>
                </form>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
