import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const SUPABASE_MISSING_ERROR =
  "La aplicación no está configurada correctamente. " +
  "Faltan las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en Vercel.";

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
    if (!isSupabaseConfigured) return { success: false, error: SUPABASE_MISSING_ERROR };
    if (!name.trim()) return { success: false, error: "El nombre es obligatorio." };
    if (!email.trim()) return { success: false, error: "El correo es obligatorio." };
    if (password.length < 6) return { success: false, error: "La contraseña debe tener al menos 6 caracteres." };

    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: { data: { name: name.trim() } },
    });

    if (error) {
      if (
        error.message.includes("already registered") ||
        error.message.includes("already been registered") ||
        error.message.includes("already exists")
      ) {
        return { success: false, error: "Ya existe una cuenta con ese correo." };
      }
      return { success: false, error: error.message };
    }

    // If email confirmation is enabled but user already registered, Supabase returns
    // a user with no session. We treat it as success and let them log in.
    if (data.user && !data.session) {
      // Email confirmation is ON — user needs to confirm. Still return success
      // so they can see a message, but they won't be auto-logged-in.
      return { success: true };
    }

    return { success: true };
  }

  async function login(
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: SUPABASE_MISSING_ERROR };
    if (!email.trim()) return { success: false, error: "El correo es obligatorio." };
    if (!password) return { success: false, error: "La contraseña es obligatoria." };

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) {
      if (error.message.includes("Invalid login") || error.message.includes("invalid_credentials")) {
        return { success: false, error: "Correo o contraseña incorrectos." };
      }
      if (error.message.includes("Email not confirmed")) {
        return { success: false, error: "Debes confirmar tu correo antes de iniciar sesión." };
      }
      return { success: false, error: error.message };
    }
    return { success: true };
  }

  async function logout(): Promise<void> {
    await supabase.auth.signOut();
    setUser(null);
    setIsRecoverySession(false);
  }

  async function resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: SUPABASE_MISSING_ERROR };
    if (!email.trim()) return { success: false, error: "El correo es obligatorio." };

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      { redirectTo: "https://finze-help-fin-help.vercel.app/update-password" }
    );

    if (error) return { success: false, error: error.message };
    return { success: true };
  }

  async function updatePassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
    if (newPassword.length < 6) {
      return { success: false, error: "La contraseña debe tener al menos 6 caracteres." };
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) return { success: false, error: error.message };

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
