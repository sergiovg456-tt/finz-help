import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isRecoverySession: boolean;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function toUser(su: SupabaseUser): User {
  return {
    id: su.id,
    name: (su.user_metadata?.name as string) || su.email?.split("@")[0] || "Usuario",
    email: su.email ?? "",
    createdAt: su.created_at,
  };
}

function translateError(message: string): string {
  if (message.includes("Invalid login") || message.includes("invalid_credentials")) {
    return "Correo o contraseña incorrectos.";
  }
  if (message.includes("Email not confirmed")) {
    return "Debes confirmar tu correo antes de iniciar sesión.";
  }
  if (message.includes("already registered") || message.includes("already been registered") || message.includes("already exists")) {
    return "Ya existe una cuenta con ese correo.";
  }
  if (message.includes("Password should be at least")) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }
  if (message.includes("Unable to validate email address")) {
    return "El correo electrónico no es válido.";
  }
  if (message.includes("Email rate limit exceeded")) {
    return "Demasiados intentos. Espera unos minutos e inténtalo de nuevo.";
  }
  return message;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecoverySession, setIsRecoverySession] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ? toUser(data.session.user) : null);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecoverySession(true);
        setUser(session?.user ? toUser(session.user) : null);
      } else {
        setIsRecoverySession(false);
        setUser(session?.user ? toUser(session.user) : null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function register(
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> {
    if (!name.trim()) return { success: false, error: "El nombre es obligatorio." };
    if (!email.trim()) return { success: false, error: "El correo es obligatorio." };
    if (password.length < 6) return { success: false, error: "La contraseña debe tener al menos 6 caracteres." };

    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: { data: { name: name.trim() } },
    });

    if (error) return { success: false, error: translateError(error.message) };
    if (data.user && !data.session) return { success: true };
    return { success: true };
  }

  async function login(
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> {
    if (!email.trim()) return { success: false, error: "El correo es obligatorio." };
    if (!password) return { success: false, error: "La contraseña es obligatoria." };

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) return { success: false, error: translateError(error.message) };
    return { success: true };
  }

  async function logout(): Promise<void> {
    await supabase.auth.signOut();
    setUser(null);
    setIsRecoverySession(false);
  }

  async function resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    if (!email.trim()) return { success: false, error: "El correo es obligatorio." };

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      { redirectTo: "https://finze-help-fin-help.vercel.app/update-password" }
    );

    if (error) return { success: false, error: translateError(error.message) };
    return { success: true };
  }

  async function updatePassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
    if (newPassword.length < 6) {
      return { success: false, error: "La contraseña debe tener al menos 6 caracteres." };
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) return { success: false, error: translateError(error.message) };

    setIsRecoverySession(false);
    return { success: true };
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isRecoverySession, register, login, logout, resetPassword, updatePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
