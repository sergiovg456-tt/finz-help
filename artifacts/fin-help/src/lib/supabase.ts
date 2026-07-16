import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Exported so auth.tsx can surface a clear Spanish error instead of "Failed to fetch"
// when the app is deployed without the required environment variables.
export const isSupabaseConfigured =
  Boolean(supabaseUrl) && Boolean(supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.error(
    "[fin-help] ⚠️  Faltan variables de entorno de Supabase.\n" +
    "Requeridas: VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY\n" +
    "En Vercel: Project Settings → Environment Variables → añade ambas para Production y redespliega."
  );
}

// Use placeholder values so createClient does not throw and crash the entire app.
// Auth calls fail gracefully with a descriptive message instead of a blank screen.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
