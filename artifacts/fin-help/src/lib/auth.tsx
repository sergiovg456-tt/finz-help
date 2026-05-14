import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = "fin_help_users";
const SESSION_KEY = "fin_help_session";

function getStoredUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getStoredSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(user: User | null) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = getStoredSession();
    setUser(session);
    setIsLoading(false);
  }, []);

  function register(name: string, email: string, password: string): { success: boolean; error?: string } {
    if (!name.trim()) return { success: false, error: "El nombre es obligatorio." };
    if (!email.trim()) return { success: false, error: "El correo es obligatorio." };
    if (!password.trim()) return { success: false, error: "La contraseña es obligatoria." };
    if (password.length < 6) return { success: false, error: "La contraseña debe tener al menos 6 caracteres." };

    const users = getStoredUsers();
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
    if (existing) {
      return { success: false, error: "Ya existe una cuenta con ese correo." };
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      createdAt: new Date().toISOString(),
    };

    saveUsers([...users, newUser]);
    saveSession(newUser);
    setUser(newUser);
    return { success: true };
  }

  function login(email: string, password: string): { success: boolean; error?: string } {
    if (!email.trim()) return { success: false, error: "El correo es obligatorio." };
    if (!password.trim()) return { success: false, error: "La contraseña es obligatoria." };

    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
    );

    if (!found) {
      return { success: false, error: "Correo o contraseña incorrectos." };
    }

    saveSession(found);
    setUser(found);
    return { success: true };
  }

  function logout() {
    saveSession(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
