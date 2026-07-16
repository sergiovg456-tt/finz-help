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
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
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

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ? toUser(data.session.user) : null);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? toUser(session.user) : null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function register(name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> {
    if (!name.trim()) return { success: false, error: "El nombre es obligatorio." };
    if (!email.trim()) return { success: false, error: "El correo es obligatorio." };
    if (password.length < 6) return { success: false, error: "La contraseña debe tener al menos 6 caracteres." };

    const { error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: { data: { name: name.trim() } },
    });

    if (error) {
      if (error.message.includes("already registered") || error.message.includes("already been registered")) {
        return { success: false, error: "Ya existe una cuenta con ese correo." };
      }
      return { success: false, error: error.message };
    }
    return { success: true };
  }

  async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    if (!email.trim()) return { success: false, error: "El correo es obligatorio." };
    if (!password) return { success: false, error: "La contraseña es obligatoria." };

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) {
      if (error.message.includes("Invalid login")) {
        return { success: false, error: "Correo o contraseña incorrectos." };
      }
      return { success: false, error: error.message };
    }
    return { success: true };
  }

  async function logout(): Promise<void> {
    await supabase.auth.signOut();
    setUser(null);
  }

  async function resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    if (!email.trim()) return { success: false, error: "El correo es obligatorio." };

    const redirectTo = `${window.location.origin}/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo,
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, register, login, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
