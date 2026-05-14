import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
      <h1 className="font-serif text-6xl font-bold text-primary">404</h1>
      <p className="text-xl text-muted-foreground">Página no encontrada</p>
      <Link href="/">
        <button className="mt-4 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-80 transition-opacity">
          Volver al inicio
        </button>
      </Link>
    </div>
  );
}
