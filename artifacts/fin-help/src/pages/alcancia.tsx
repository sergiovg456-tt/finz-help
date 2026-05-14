import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import Sidebar from "@/components/sidebar";
import { Plus, Trash2, CheckCircle2, MinusCircle, PlusCircle } from "lucide-react";

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  emoji: string;
  createdAt: string;
}

const EMOJIS = ["🐷", "🏠", "🚗", "✈️", "📱", "💻", "🎓", "💍", "🏋️", "🌴", "🎸", "📷", "⛵", "🐶", "🏖️"];

const STORAGE_KEY = "fin_help_alcancia";

function loadGoals(userId: string): Goal[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveGoals(userId: string, goals: Goal[]) {
  localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(goals));
}

function fmt(n: number) {
  return n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Alcancia() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [newEmoji, setNewEmoji] = useState("🐷");
  const [depositAmounts, setDepositAmounts] = useState<Record<string, string>>({});

  if (!user) {
    navigate("/login");
    return null;
  }

  useEffect(() => {
    setGoals(loadGoals(user.id));
  }, [user.id]);

  function persist(updated: Goal[]) {
    setGoals(updated);
    saveGoals(user!.id, updated);
  }

  function createGoal() {
    const target = parseFloat(newTarget);
    if (!newName.trim() || isNaN(target) || target <= 0) return;
    const goal: Goal = {
      id: crypto.randomUUID(),
      name: newName.trim(),
      targetAmount: target,
      savedAmount: 0,
      emoji: newEmoji,
      createdAt: new Date().toISOString(),
    };
    persist([...goals, goal]);
    setNewName("");
    setNewTarget("");
    setNewEmoji("🐷");
    setShowForm(false);
  }

  function deleteGoal(id: string) {
    persist(goals.filter((g) => g.id !== id));
  }

  function deposit(goalId: string) {
    const amount = parseFloat(depositAmounts[goalId] ?? "");
    if (isNaN(amount) || amount <= 0) return;
    persist(
      goals.map((g) =>
        g.id === goalId
          ? { ...g, savedAmount: Math.min(g.savedAmount + amount, g.targetAmount) }
          : g
      )
    );
    setDepositAmounts((prev) => ({ ...prev, [goalId]: "" }));
  }

  function withdraw(goalId: string) {
    const amount = parseFloat(depositAmounts[goalId] ?? "");
    if (isNaN(amount) || amount <= 0) return;
    persist(
      goals.map((g) =>
        g.id === goalId
          ? { ...g, savedAmount: Math.max(0, g.savedAmount - amount) }
          : g
      )
    );
    setDepositAmounts((prev) => ({ ...prev, [goalId]: "" }));
  }

  const totalSaved = goals.reduce((s, g) => s + g.savedAmount, 0);
  const totalTarget = goals.reduce((s, g) => s + g.targetAmount, 0);
  const completed = goals.filter((g) => g.savedAmount >= g.targetAmount).length;

  return (
    <div className="min-h-screen bg-background flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">Alcancía virtual</h1>
            <p className="text-muted-foreground text-sm mt-1">Crea metas de ahorro y sigue tu progreso</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-85 transition-opacity"
          >
            <Plus className="w-4 h-4" /> Nueva meta
          </button>
        </div>

        {/* Summary */}
        {goals.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total ahorrado", value: `$${fmt(totalSaved)}`, color: "text-green-600" },
              { label: "Meta total", value: `$${fmt(totalTarget)}`, color: "text-primary" },
              { label: "Metas cumplidas", value: String(completed), color: "text-green-600" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/60 backdrop-blur-sm rounded-3xl p-4 shadow-sm text-center">
                <p className={`font-bold text-xl ${color}`}>{value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        )}

        {/* New goal form */}
        {showForm && (
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-sm mb-6 border border-primary/10">
            <h3 className="font-semibold text-primary mb-4">Nueva meta de ahorro</h3>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-medium text-primary mb-2">Elige un ícono</p>
                <div className="flex flex-wrap gap-2">
                  {EMOJIS.map((e) => (
                    <button
                      key={e}
                      onClick={() => setNewEmoji(e)}
                      className={`text-2xl p-1.5 rounded-xl transition-all ${
                        newEmoji === e
                          ? "bg-primary/20 ring-2 ring-primary"
                          : "hover:bg-primary/10"
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-primary">Nombre de la meta</label>
                  <input
                    type="text"
                    placeholder="Ej: Vacaciones en la playa"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="px-4 py-2.5 rounded-2xl border border-input bg-white/80 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-primary">Monto objetivo ($)</label>
                  <input
                    type="number"
                    placeholder="Ej: 5000"
                    min="1"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="px-4 py-2.5 rounded-2xl border border-input bg-white/80 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={createGoal}
                  disabled={!newName.trim() || !newTarget}
                  className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-85 transition-opacity disabled:opacity-40"
                >
                  Crear meta
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 rounded-full border border-primary/30 text-primary text-sm font-medium hover:bg-primary/5 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Goals list */}
        {goals.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center gap-3">
            <span className="text-6xl">🐷</span>
            <p className="font-semibold text-primary">Sin metas de ahorro aún</p>
            <p className="text-sm text-muted-foreground">Crea tu primera meta para empezar a ahorrar</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-85 transition-opacity"
            >
              <Plus className="w-4 h-4" /> Crear primera meta
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {goals.map((goal) => {
              const pct = goal.targetAmount > 0
                ? Math.min(100, Math.round((goal.savedAmount / goal.targetAmount) * 100))
                : 0;
              const done = pct >= 100;

              return (
                <div
                  key={goal.id}
                  className={`bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-sm transition-shadow hover:shadow-md relative ${
                    done ? "ring-2 ring-green-400" : ""
                  }`}
                >
                  {done && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                  )}

                  {/* Goal header */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{goal.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-primary truncate">{goal.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        Meta: ${fmt(goal.targetAmount)}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="p-1.5 rounded-xl text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                      <span>${fmt(goal.savedAmount)} ahorrado</span>
                      <span className="font-medium text-primary">{pct}%</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          done ? "bg-green-500" : "bg-primary"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5">
                      {done
                        ? "🎉 ¡Meta alcanzada!"
                        : `Faltan $${fmt(goal.targetAmount - goal.savedAmount)}`}
                    </p>
                  </div>

                  {/* Deposit / withdraw */}
                  {!done && (
                    <div className="flex gap-2 mt-3">
                      <input
                        type="number"
                        placeholder="Cantidad"
                        min="0.01"
                        step="0.01"
                        value={depositAmounts[goal.id] ?? ""}
                        onChange={(e) =>
                          setDepositAmounts((prev) => ({ ...prev, [goal.id]: e.target.value }))
                        }
                        className="flex-1 px-3 py-2 rounded-xl border border-input bg-white/80 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <button
                        onClick={() => deposit(goal.id)}
                        title="Depositar"
                        className="p-2 rounded-xl bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                      >
                        <PlusCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => withdraw(goal.id)}
                        title="Retirar"
                        disabled={goal.savedAmount === 0}
                        className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors disabled:opacity-30"
                      >
                        <MinusCircle className="w-5 h-5" />
                      </button>
                    </div>
                  )}

                  {done && (
                    <div className="mt-3">
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Retirar cantidad"
                          min="0.01"
                          step="0.01"
                          value={depositAmounts[goal.id] ?? ""}
                          onChange={(e) =>
                            setDepositAmounts((prev) => ({ ...prev, [goal.id]: e.target.value }))
                          }
                          className="flex-1 px-3 py-2 rounded-xl border border-input bg-white/80 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <button
                          onClick={() => withdraw(goal.id)}
                          className="px-3 py-2 rounded-xl bg-red-50 text-red-500 text-sm font-medium hover:bg-red-100 transition-colors"
                        >
                          Retirar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
