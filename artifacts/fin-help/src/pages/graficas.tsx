import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import Sidebar from "@/components/sidebar";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Plus, Trash2, TrendingUp, TrendingDown, DollarSign, PiggyBank, Info } from "lucide-react";

const EXPENSE_COLORS = [
  "#2d4a7a", "#5c7a4a", "#8ba05a", "#a07060", "#4a6080",
  "#7a5c8a", "#3a7a6a", "#9a7030", "#5a4a9a", "#7a3a5a",
];

interface Row { id: number; label: string; amount: string }

let nextId = 100;

const DEFAULT_EXPENSES: Row[] = [
  { id: 1, label: "Renta / Hipoteca", amount: "" },
  { id: 2, label: "Comida y supermercado", amount: "" },
  { id: 3, label: "Transporte", amount: "" },
  { id: 4, label: "Servicios (luz, agua, internet)", amount: "" },
];

const DEFAULT_INCOME: Row[] = [
  { id: 10, label: "Salario", amount: "" },
];

function parseMoney(s: string): number {
  const n = parseFloat(s.replace(/,/g, ""));
  return isNaN(n) || n < 0 ? 0 : n;
}

function fmt(n: number) {
  return n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function loadData(userId: string): { income: Row[]; expenses: Row[] } {
  try {
    const raw = localStorage.getItem(`fin_help_graficas_${userId}`);
    if (!raw) return { income: DEFAULT_INCOME, expenses: DEFAULT_EXPENSES };
    const parsed = JSON.parse(raw);
    if (parsed.income?.length) nextId = Math.max(nextId, ...parsed.income.map((r: Row) => r.id + 1));
    if (parsed.expenses?.length) nextId = Math.max(nextId, ...parsed.expenses.map((r: Row) => r.id + 1));
    return {
      income: parsed.income?.length ? parsed.income : DEFAULT_INCOME,
      expenses: parsed.expenses?.length ? parsed.expenses : DEFAULT_EXPENSES,
    };
  } catch {
    return { income: DEFAULT_INCOME, expenses: DEFAULT_EXPENSES };
  }
}

function saveData(userId: string, income: Row[], expenses: Row[]) {
  localStorage.setItem(`fin_help_graficas_${userId}`, JSON.stringify({ income, expenses }));
}

export default function Graficas() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [incomeRows, setIncomeRows] = useState<Row[]>(DEFAULT_INCOME);
  const [expenseRows, setExpenseRows] = useState<Row[]>(DEFAULT_EXPENSES);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user) return;
    const { income, expenses } = loadData(user.id);
    setIncomeRows(income);
    setExpenseRows(expenses);
    setLoaded(true);
  }, [user?.id]);

  useEffect(() => {
    if (!user || !loaded) return;
    saveData(user.id, incomeRows, expenseRows);
  }, [incomeRows, expenseRows, user?.id, loaded]);

  if (!user) { navigate("/login"); return null; }

  const totalIncome = incomeRows.reduce((s, r) => s + parseMoney(r.amount), 0);
  const totalExpenses = expenseRows.reduce((s, r) => s + parseMoney(r.amount), 0);
  const remaining = Math.max(0, totalIncome - totalExpenses);

  const PERSONAL_DISCOUNT = 0.25;
  const suggestedSavings = remaining * (1 - PERSONAL_DISCOUNT);
  const personalBuffer = remaining * PERSONAL_DISCOUNT;

  const hasData = totalIncome > 0 || totalExpenses > 0;
  const savingsPercent = totalIncome > 0 ? Math.round((suggestedSavings / totalIncome) * 100) : 0;

  const pieData = expenseRows
    .filter((r) => parseMoney(r.amount) > 0)
    .map((r) => ({ name: r.label || "Sin nombre", value: parseMoney(r.amount) }));

  const barData = [
    { name: "Ingresos", value: totalIncome },
    { name: "Gastos fijos", value: totalExpenses },
    { name: "Uso personal", value: personalBuffer },
    { name: "Ahorro sugerido", value: suggestedSavings },
  ];

  function addIncome() {
    setIncomeRows((prev) => [...prev, { id: nextId++, label: "", amount: "" }]);
  }

  function addExpense() {
    setExpenseRows((prev) => [...prev, { id: nextId++, label: "", amount: "" }]);
  }

  function removeIncome(id: number) {
    setIncomeRows((prev) => prev.filter((r) => r.id !== id));
  }

  function removeExpense(id: number) {
    setExpenseRows((prev) => prev.filter((r) => r.id !== id));
  }

  function updateIncome(id: number, field: "label" | "amount", val: string) {
    setIncomeRows((prev) => prev.map((r) => r.id === id ? { ...r, [field]: val } : r));
  }

  function updateExpense(id: number, field: "label" | "amount", val: string) {
    setExpenseRows((prev) => prev.map((r) => r.id === id ? { ...r, [field]: val } : r));
  }

  return (
    <div className="min-h-screen bg-background flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="mb-8">
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">Gráficas financieras</h1>
          <p className="text-muted-foreground text-sm mt-1">Registra tus ingresos y gastos para ver tu situación real</p>
        </div>

        {/* Input section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Income */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h2 className="font-semibold text-primary">Ingresos</h2>
              </div>
              <span className="text-lg font-bold text-green-600">${fmt(totalIncome)}</span>
            </div>
            <div className="flex flex-col gap-3">
              {incomeRows.map((row) => (
                <div key={row.id} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Fuente de ingreso"
                    value={row.label}
                    onChange={(e) => updateIncome(row.id, "label", e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-input bg-white/80 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    type="number"
                    placeholder="$0"
                    min="0"
                    value={row.amount}
                    onChange={(e) => updateIncome(row.id, "amount", e.target.value)}
                    className="w-28 px-3 py-2 rounded-xl border border-input bg-white/80 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {incomeRows.length > 1 && (
                    <button
                      onClick={() => removeIncome(row.id)}
                      className="p-2 rounded-xl text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addIncome}
                className="flex items-center gap-2 text-sm text-primary font-medium hover:opacity-70 transition-opacity mt-1"
              >
                <Plus className="w-4 h-4" /> Agregar fuente
              </button>
            </div>
          </div>

          {/* Expenses */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-500" />
                <h2 className="font-semibold text-primary">Gastos fijos</h2>
              </div>
              <span className="text-lg font-bold text-red-500">${fmt(totalExpenses)}</span>
            </div>
            <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
              {expenseRows.map((row) => (
                <div key={row.id} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Categoría de gasto"
                    value={row.label}
                    onChange={(e) => updateExpense(row.id, "label", e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-input bg-white/80 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    type="number"
                    placeholder="$0"
                    min="0"
                    value={row.amount}
                    onChange={(e) => updateExpense(row.id, "amount", e.target.value)}
                    className="w-28 px-3 py-2 rounded-xl border border-input bg-white/80 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {expenseRows.length > 1 && (
                    <button
                      onClick={() => removeExpense(row.id)}
                      className="p-2 rounded-xl text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addExpense}
              className="flex items-center gap-2 text-sm text-primary font-medium hover:opacity-70 transition-opacity mt-3"
            >
              <Plus className="w-4 h-4" /> Agregar gasto
            </button>
          </div>
        </div>

        {hasData && (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Ingresos totales", value: `$${fmt(totalIncome)}`, color: "text-green-600", bg: "bg-green-50", icon: TrendingUp },
                { label: "Gastos fijos", value: `$${fmt(totalExpenses)}`, color: "text-red-500", bg: "bg-red-50", icon: TrendingDown },
                { label: "Uso personal est.", value: `$${fmt(personalBuffer)}`, color: "text-yellow-600", bg: "bg-yellow-50", icon: DollarSign },
                { label: "Ahorro sugerido", value: `$${fmt(suggestedSavings)}`, color: "text-primary", bg: "bg-secondary/50", icon: PiggyBank },
              ].map(({ label, value, color, bg, icon: Icon }) => (
                <div key={label} className={`${bg} rounded-3xl p-4 shadow-sm`}>
                  <Icon className={`w-4 h-4 ${color} mb-2`} />
                  <p className={`font-bold text-lg ${color}`}>{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Savings insight */}
            <div className="bg-primary/10 border border-primary/20 rounded-3xl p-5 mb-8 flex gap-3">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-primary">
                  Podrías ahorrar aproximadamente el {savingsPercent}% de tus ingresos
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Calculado sobre lo que te queda después de gastos fijos, reservando un <strong>25% de margen</strong> para
                  gastos personales no contabilizados (salidas, ropa, antojos, emergencias pequeñas, etc.).
                  Este es un estimado orientativo — ajústalo según tu estilo de vida.
                </p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Bar chart */}
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-sm">
                <h3 className="font-semibold text-primary mb-4">Distribución de tu dinero</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={barData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#666" }} />
                    <YAxis tick={{ fontSize: 11, fill: "#666" }} />
                    <Tooltip
                      formatter={(v: number) => [`$${fmt(v)}`, ""]}
                      contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: 12 }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {barData.map((_, i) => (
                        <Cell
                          key={i}
                          fill={["#4ade80", "#f87171", "#fbbf24", "#2d4a7a"][i] ?? "#ccc"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie chart */}
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-sm">
                <h3 className="font-semibold text-primary mb-4">
                  {pieData.length > 0 ? "¿En qué gastas tu dinero?" : "Agrega montos a tus gastos para ver la gráfica"}
                </h3>
                {pieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {pieData.map((_, i) => (
                          <Cell key={i} fill={EXPENSE_COLORS[i % EXPENSE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(v: number) => [`$${fmt(v)}`, ""]}
                        contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: 12 }}
                      />
                      <Legend
                        iconType="circle"
                        iconSize={8}
                        formatter={(v) => <span style={{ fontSize: 11, color: "#555" }}>{v}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
                    Sin datos de gastos aún
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {!hasData && (
          <div className="text-center py-20 flex flex-col items-center gap-3">
            <TrendingUp className="w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground">Ingresa tus ingresos y gastos para ver las gráficas</p>
          </div>
        )}
      </main>
    </div>
  );
}
