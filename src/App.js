import React, { useState, useMemo, useEffect } from "react";
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
  AlertTriangle,
  PieChart,
  Target,
  Zap,
  Plus,
  Trash2,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  ShieldAlert,
  ShoppingBag,
  Banknote,
  Edit2,
  Briefcase,
  Receipt,
  Landmark,
  Check,
  Clock,
  HardDrive,
} from "lucide-react";

// --- FORMATADORES ---
const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const categoriasDespesa = [
  "Moradia",
  "Alimentação",
  "Transporte",
  "Saúde",
  "Educação",
  "Lazer",
  "Cartão de Crédito",
  "Outros",
];
const categoriasReceita = [
  "Salário",
  "Freelance",
  "Rendimentos",
  "Vendas",
  "Outros",
];

export default function FintechApp() {
  // INJEÇÃO AUTOMÁTICA DE DESIGN (Não precisa mexer no index.html)
  useEffect(() => {
    if (!document.getElementById("tailwind-cdn")) {
      const script = document.createElement("script");
      script.id = "tailwind-cdn";
      script.src = "https://cdn.tailwindcss.com";
      document.head.appendChild(script);
    }
  }, []);

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [syncStatus, setSyncStatus] = useState("A carregar...");

  // --- ESTADO GLOBAL ---
  const [activeTab, setActiveTab] = useState("resumo");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selic, setSelic] = useState(10.5);

  const [transactions, setTransactions] = useState([]);
  const [fixedSalaries, setFixedSalaries] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const [fixedExpenses, setFixedExpenses] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [consortiums, setConsortiums] = useState([]);
  const [creditCards, setCreditCards] = useState([]);
  const [overdueDebts, setOverdueDebts] = useState([]);
  const [installments, setInstallments] = useState([]);
  const [loans, setLoans] = useState([]);
  const [paidItems, setPaidItems] = useState({});

  // Estados de Formulários
  const [newFixedSalary, setNewFixedSalary] = useState({
    company: "",
    amount: "",
    payDay: "",
  });
  const [editingFixedSalaryId, setEditingFixedSalaryId] = useState(null);
  const [newCommission, setNewCommission] = useState({
    description: "",
    amount: "",
    date: "",
  });
  const [editingCommissionId, setEditingCommissionId] = useState(null);
  const [newFixedExpense, setNewFixedExpense] = useState({
    name: "",
    category: "",
    amount: "",
    dueDate: "",
  });
  const [editingFixedExpenseId, setEditingFixedExpenseId] = useState(null);
  const [newInvestment, setNewInvestment] = useState({
    type: "Renda Fixa",
    name: "",
    institution: "",
    amount: "",
    rate: "",
    dividendYield: "",
  });
  const [editingInvId, setEditingInvId] = useState(null);
  const [newConsortium, setNewConsortium] = useState({
    name: "",
    administrator: "",
    creditLetter: "",
    status: "Não Contemplado",
    installmentValue: "",
    dueDate: "",
  });
  const [editingConsortiumId, setEditingConsortiumId] = useState(null);
  const [newCard, setNewCard] = useState({
    name: "",
    limit: "",
    used: "",
    closingDate: "",
    dueDate: "",
  });
  const [editingCardId, setEditingCardId] = useState(null);
  const [newDebt, setNewDebt] = useState({
    institution: "",
    originalValue: "",
    currentValue: "",
    interest: "",
    status: "Negativado",
  });
  const [editingDebtId, setEditingDebtId] = useState(null);
  const [newInstallment, setNewInstallment] = useState({
    name: "",
    totalAmount: "",
    installmentsCount: "",
    startDate: "",
  });
  const [editingInstId, setEditingInstId] = useState(null);
  const [newLoan, setNewLoan] = useState({
    name: "",
    totalAmount: "",
    interestRate: "",
    installmentsCount: "",
    startDate: "",
  });
  const [editingLoanId, setEditingLoanId] = useState(null);
  const [newTx, setNewTx] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: "",
  });
  const [editingTxId, setEditingTxId] = useState(null);

  const [dateFilter, setDateFilter] = useState({ start: "", end: "" });
  const [simSaving, setSimSaving] = useState(500);

  // --- LOCAL STORAGE (SALVAR NO DISPOSITIVO DO CLIENTE) ---
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("fintech_dashboard_data");
      if (savedData) {
        const data = JSON.parse(savedData);
        if (data.transactions) setTransactions(data.transactions);
        if (data.fixedSalaries) setFixedSalaries(data.fixedSalaries);
        if (data.commissions) setCommissions(data.commissions);
        if (data.fixedExpenses) setFixedExpenses(data.fixedExpenses);
        if (data.investments) setInvestments(data.investments);
        if (data.consortiums) setConsortiums(data.consortiums);
        if (data.creditCards) setCreditCards(data.creditCards);
        if (data.overdueDebts) setOverdueDebts(data.overdueDebts);
        if (data.installments) setInstallments(data.installments);
        if (data.loans) setLoans(data.loans);
        if (data.selic) setSelic(data.selic);
        if (data.paidItems) setPaidItems(data.paidItems);
      } else {
        // Dados de Exemplo para a primeira vez
        setTransactions([
          {
            id: 3,
            type: "expense",
            amount: 1200,
            category: "Alimentação",
            description: "Mercado",
            month: new Date().getMonth(),
            date: new Date().toISOString().split("T")[0],
          },
        ]);
        setFixedSalaries([
          { id: 1, company: "Trabalho Principal", amount: 8500, payDay: 5 },
        ]);
        setFixedExpenses([
          {
            id: 1,
            name: "Aluguel",
            category: "Moradia",
            amount: 2500,
            dueDate: 10,
          },
        ]);
        setInvestments([
          {
            id: 1,
            type: "Renda Fixa",
            name: "Tesouro Selic",
            institution: "Banco Inter",
            amount: 15000,
            rate: 10.5,
            dividendYield: 0,
          },
        ]);
        setCreditCards([
          {
            id: 1,
            name: "Cartão Principal",
            limit: 5000,
            invoices: { [new Date().getMonth()]: 1200 },
            used: 1200,
            closingDate: 5,
            dueDate: 12,
          },
        ]);
      }
      setIsDataLoaded(true);
      setSyncStatus("Salvo no dispositivo");
    } catch (error) {
      console.error("Erro ao carregar:", error);
      setSyncStatus("Erro ao carregar");
      setIsDataLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isDataLoaded) return;

    setSyncStatus("A guardar...");
    const timeoutId = setTimeout(() => {
      const dataToSave = {
        transactions,
        fixedSalaries,
        commissions,
        fixedExpenses,
        investments,
        consortiums,
        creditCards,
        overdueDebts,
        installments,
        loans,
        selic,
        paidItems,
      };

      try {
        localStorage.setItem(
          "fintech_dashboard_data",
          JSON.stringify(dataToSave)
        );
        setSyncStatus("Salvo localmente");
      } catch (e) {
        console.error("Erro ao salvar dados:", e);
        setSyncStatus("Erro ao Guardar");
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [
    transactions,
    fixedSalaries,
    commissions,
    fixedExpenses,
    investments,
    consortiums,
    creditCards,
    overdueDebts,
    installments,
    loans,
    selic,
    paidItems,
    isDataLoaded,
  ]);

  const getMonthsDifference = (startDateStr, endYear, endMonth) => {
    const start = new Date(startDateStr);
    const startY = start.getUTCFullYear();
    const startM = start.getUTCMonth();
    return (endYear - startY) * 12 + (endMonth - startM);
  };

  // --- CÁLCULOS AUTOMÁTICOS ---
  const allTransactions = useMemo(() => {
    let generated = transactions.filter(
      (t) => !t.isAuto && !t.refId && !String(t.id).startsWith("auto-")
    );
    const currentYear = selectedYear;

    creditCards.forEach((card) => {
      const invoices = card.invoices || { [new Date().getMonth()]: card.used };
      Object.keys(invoices).forEach((mStr) => {
        const m = Number(mStr);
        const amount = Number(invoices[m]);
        if (amount > 0) {
          generated.push({
            id: `auto-cc-${card.id}-${m}`,
            isAuto: true,
            type: "expense",
            amount,
            category: "Cartão de Crédito",
            description: `Fatura: ${card.name}`,
            month: m,
            date: new Date(currentYear, m, card.dueDate || 1)
              .toISOString()
              .split("T")[0],
          });
        }
      });
    });

    installments.forEach((inst) => {
      if (!inst.startDate) return;
      const startObj = new Date(inst.startDate);
      for (let i = 0; i < inst.installmentsCount; i++) {
        const txDate = new Date(startObj);
        txDate.setUTCMonth(txDate.getUTCMonth() + i);
        generated.push({
          id: `auto-inst-${inst.id}-${i}`,
          isAuto: true,
          type: "expense",
          amount: inst.installmentValue,
          category: "Cartão de Crédito",
          description: `Parcela: ${inst.name} (${i + 1}/${
            inst.installmentsCount
          })`,
          month: txDate.getUTCMonth(),
          date: txDate.toISOString().split("T")[0],
        });
      }
    });

    loans.forEach((loan) => {
      if (!loan.startDate) return;
      const startObj = new Date(loan.startDate);
      generated.push({
        id: `auto-loan-inc-${loan.id}`,
        isAuto: true,
        type: "income",
        amount: loan.principal,
        category: "Outros",
        description: `Valor Recebido: ${loan.name}`,
        month: startObj.getUTCMonth(),
        date: startObj.toISOString().split("T")[0],
      });
      for (let i = 0; i < loan.installmentsCount; i++) {
        const txDate = new Date(startObj);
        txDate.setUTCMonth(txDate.getUTCMonth() + i);
        generated.push({
          id: `auto-loan-exp-${loan.id}-${i}`,
          isAuto: true,
          type: "expense",
          amount: loan.installmentValue,
          category: "Outros",
          description: `Pgto Empréstimo: ${loan.name} (${i + 1}/${
            loan.installmentsCount
          })`,
          month: txDate.getUTCMonth(),
          date: txDate.toISOString().split("T")[0],
        });
      }
    });

    fixedSalaries.forEach((salary) => {
      for (let m = 0; m < 12; m++) {
        generated.push({
          id: `auto-salary-${salary.id}-${m}`,
          isAuto: true,
          type: "income",
          amount: salary.amount,
          category: "Salário",
          description: `Salário: ${salary.company}`,
          month: m,
          date: new Date(currentYear, m, salary.payDay || 1)
            .toISOString()
            .split("T")[0],
        });
      }
    });

    commissions.forEach((comm) => {
      if (!comm.date) return;
      const cDate = new Date(comm.date);
      generated.push({
        id: `auto-comm-${comm.id}`,
        isAuto: true,
        type: "income",
        amount: comm.amount,
        category: "Rendimentos",
        description: `Comissão/Extra: ${comm.description}`,
        month: cDate.getUTCMonth(),
        date: cDate.toISOString().split("T")[0],
      });
    });

    fixedExpenses.forEach((expense) => {
      for (let m = 0; m < 12; m++) {
        generated.push({
          id: `auto-fixedexp-${expense.id}-${m}`,
          isAuto: true,
          type: "expense",
          amount: expense.amount,
          category: expense.category || "Outros",
          description: `Fixo: ${expense.name}`,
          month: m,
          date: new Date(currentYear, m, expense.dueDate || 1)
            .toISOString()
            .split("T")[0],
        });
      }
    });

    consortiums.forEach((cons) => {
      for (let m = 0; m < 12; m++) {
        generated.push({
          id: `auto-cons-${cons.id}-${m}`,
          isAuto: true,
          type: "expense",
          amount: cons.installmentValue,
          category: "Outros",
          description: `Consórcio: ${cons.name} ${
            cons.status === "Contemplado" ? "(Contemplado)" : ""
          }`,
          month: m,
          date: new Date(currentYear, m, cons.dueDate || 1)
            .toISOString()
            .split("T")[0],
        });
      }
    });

    return generated;
  }, [
    transactions,
    creditCards,
    installments,
    loans,
    overdueDebts,
    fixedSalaries,
    commissions,
    fixedExpenses,
    consortiums,
    selectedMonth,
    selectedYear,
  ]);

  const currentMonthTx = useMemo(
    () =>
      allTransactions.filter((t) => {
        const txYear = Number(t.date.split("-")[0]);
        return t.month === selectedMonth && txYear === selectedYear;
      }),
    [allTransactions, selectedMonth, selectedYear]
  );

  const extratoTx = useMemo(() => {
    if (dateFilter.start && dateFilter.end) {
      return allTransactions.filter(
        (t) => t.date >= dateFilter.start && t.date <= dateFilter.end
      );
    }
    return currentMonthTx;
  }, [allTransactions, currentMonthTx, dateFilter]);

  const extratoIncome = extratoTx
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const extratoExpense = extratoTx
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const pastTxs = useMemo(
    () =>
      allTransactions.filter((t) => {
        const txYear = Number(t.date.split("-")[0]);
        if (txYear < selectedYear) return true;
        if (txYear === selectedYear && t.month <= selectedMonth) return true;
        return false;
      }),
    [allTransactions, selectedMonth, selectedYear]
  );

  const totalIncome = currentMonthTx
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpense = currentMonthTx
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const currentBalance = totalIncome - totalExpense;

  const totalCartoesMes = currentMonthTx
    .filter(
      (t) =>
        t.category === "Cartão de Crédito" &&
        t.type === "expense" &&
        t.description.startsWith("Fatura:")
    )
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalParcelasEmprestimosMes = currentMonthTx
    .filter(
      (t) =>
        t.isAuto &&
        (t.description.startsWith("Pgto Empréstimo") ||
          t.description.startsWith("Parcela:"))
    )
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const {
    totalInvested,
    totalDividendsMes,
    averageRate,
    expectedMonthlyReturn,
  } = useMemo(() => {
    let total = 0;
    let divMes = 0;
    let totalWeightedRate = 0;
    let expectedMonthly = 0;

    investments.forEach((inv) => {
      const amount = Number(inv.amount) || 0;
      const rate = Number(inv.rate) || 0;
      const divYield = Number(inv.dividendYield) || 0;

      total += amount;
      divMes += amount * (divYield / 100);
      totalWeightedRate += amount * rate;

      const monthlyRateYield = amount * (Math.pow(1 + rate / 100, 1 / 12) - 1);
      expectedMonthly += monthlyRateYield + amount * (divYield / 100);
    });

    const avgRate = total > 0 ? totalWeightedRate / total : 0;
    return {
      totalInvested: total,
      totalDividendsMes: divMes,
      averageRate: avgRate,
      expectedMonthlyReturn: expectedMonthly,
    };
  }, [investments]);

  const loansDebt = loans.reduce((acc, loan) => {
    if (!loan.startDate) return acc + Number(loan.principal);
    const diff = getMonthsDifference(
      loan.startDate,
      selectedYear,
      selectedMonth
    );
    if (diff < 0) return acc;
    const paidCount = Math.max(0, Math.min(loan.installmentsCount, diff + 1));
    const remainingCount = loan.installmentsCount - paidCount;
    return acc + remainingCount * loan.installmentValue;
  }, 0);

  const installmentsDebt = installments.reduce((acc, inst) => {
    if (!inst.startDate) return acc + Number(inst.totalAmount);
    const diff = getMonthsDifference(
      inst.startDate,
      selectedYear,
      selectedMonth
    );
    if (diff < 0) return acc;
    const paidCount = Math.max(0, Math.min(inst.installmentsCount, diff + 1));
    const remainingCount = inst.installmentsCount - paidCount;
    return acc + remainingCount * inst.installmentValue;
  }, 0);

  const overdueDebt = overdueDebts.reduce(
    (acc, curr) => acc + Number(curr.currentValue),
    0
  );
  const totalDebtInSelectedMonth = overdueDebt + loansDebt + installmentsDebt;

  const accumulatedIncome = pastTxs
    .filter((t) => t.type === "income")
    .reduce((a, c) => a + Number(c.amount), 0);
  const accumulatedExpense = pastTxs
    .filter((t) => t.type === "expense")
    .reduce((a, c) => a + Number(c.amount), 0);
  const accumulatedBalance = accumulatedIncome - accumulatedExpense;

  const netWorth =
    totalInvested + accumulatedBalance - totalDebtInSelectedMonth;

  const expenseRatio = totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0;

  let consumptionPattern = "Controlado";
  let patternColor = "text-emerald-500";
  if (expenseRatio > 60 && expenseRatio <= 80) {
    consumptionPattern = "Moderado";
    patternColor = "text-orange-500";
  } else if (expenseRatio > 80) {
    consumptionPattern = "Alto Risco";
    patternColor = "text-rose-500";
  }

  const financialScore = useMemo(() => {
    let score = 100;
    if (expenseRatio > 90) score -= 30;
    else if (expenseRatio > 70) score -= 15;
    if (totalInvested < 3000) score -= 20;
    if (overdueDebts.length > 0) score -= 40;
    if (totalIncome === 0) return 0;
    return Math.max(0, Math.min(100, Math.round(score)));
  }, [expenseRatio, totalInvested, overdueDebts, totalIncome]);

  const insights = useMemo(() => {
    let msgs = [];
    const today = new Date();
    const isCurrentMonth =
      selectedMonth === today.getMonth() &&
      selectedYear === today.getFullYear();
    const currentDay = today.getDate();
    const overdueCount = currentMonthTx.filter((tx) => {
      if (tx.type !== "expense" || paidItems[tx.id]) return false;
      const txDay = new Date(tx.date).getDate();
      const isPastMonth =
        selectedYear < today.getFullYear() ||
        (selectedYear === today.getFullYear() &&
          selectedMonth < today.getMonth());
      return isPastMonth || (isCurrentMonth && txDay < currentDay);
    }).length;

    if (overdueCount > 0)
      msgs.push({
        type: "danger",
        text: `Atenção: Tem ${overdueCount} conta(s) em atraso ou a aguardar pagamento!`,
      });
    if (expenseRatio > 80)
      msgs.push({
        type: "danger",
        text: `Atenção: Já gastou ${expenseRatio.toFixed(
          0
        )}% da sua renda neste mês.`,
      });
    if (totalExpense > totalIncome && totalIncome > 0)
      msgs.push({
        type: "danger",
        text: "Alerta Vermelho: Os seus gastos ultrapassaram os seus ganhos!",
      });
    if (overdueDebts.length > 0)
      msgs.push({
        type: "warning",
        text: "Possui dívidas negativadas. Priorize a renegociação para recuperar o seu crédito.",
      });

    let highCC = creditCards.find((c) => {
      const inv = c.invoices ? c.invoices[selectedMonth] || 0 : 0;
      return inv / c.limit > 0.8;
    });
    if (highCC)
      msgs.push({
        type: "warning",
        text: `A fatura de ${meses[selectedMonth]} do ${highCC.name} está próxima do limite.`,
      });
    if (currentBalance > 1000)
      msgs.push({
        type: "success",
        text: `Excelente! Tem ${formatCurrency(
          currentBalance
        )} de sobra. Considere investir em Renda Fixa.`,
      });
    if (msgs.length === 0)
      msgs.push({
        type: "info",
        text: "As suas finanças estão sob controlo. Mantenha o seu planeamento.",
      });
    return msgs;
  }, [
    expenseRatio,
    totalExpense,
    totalIncome,
    overdueDebts,
    creditCards,
    currentBalance,
    selectedMonth,
    selectedYear,
    currentMonthTx,
    paidItems,
  ]);

  // --- FUNÇÕES DE AÇÃO ---
  const toggleTransactionPayment = (id) =>
    setPaidItems((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleAddFixedSalary = (e) => {
    e.preventDefault();
    if (
      !newFixedSalary.company ||
      !newFixedSalary.amount ||
      !newFixedSalary.payDay
    )
      return;
    const salaryItem = {
      id: editingFixedSalaryId || Date.now(),
      company: newFixedSalary.company,
      amount: Number(newFixedSalary.amount),
      payDay: Number(newFixedSalary.payDay),
    };
    if (editingFixedSalaryId) {
      setFixedSalaries(
        fixedSalaries.map((s) =>
          s.id === editingFixedSalaryId ? salaryItem : s
        )
      );
      setEditingFixedSalaryId(null);
    } else {
      setFixedSalaries([...fixedSalaries, salaryItem]);
    }
    setNewFixedSalary({ company: "", amount: "", payDay: "" });
  };
  const handleEditFixedSalary = (salary) => {
    setNewFixedSalary({
      company: salary.company,
      amount: salary.amount,
      payDay: salary.payDay,
    });
    setEditingFixedSalaryId(salary.id);
  };
  const handleDeleteFixedSalary = (id) =>
    setFixedSalaries(fixedSalaries.filter((s) => s.id !== id));

  const handleAddCommission = (e) => {
    e.preventDefault();
    if (
      !newCommission.description ||
      !newCommission.amount ||
      !newCommission.date
    )
      return;
    const commItem = {
      id: editingCommissionId || Date.now(),
      description: newCommission.description,
      amount: Number(newCommission.amount),
      date: newCommission.date,
    };
    if (editingCommissionId) {
      setCommissions(
        commissions.map((c) => (c.id === editingCommissionId ? commItem : c))
      );
      setEditingCommissionId(null);
    } else {
      setCommissions([...commissions, commItem]);
    }
    setNewCommission({ description: "", amount: "", date: "" });
  };
  const handleEditCommission = (comm) => {
    setNewCommission({
      description: comm.description,
      amount: comm.amount,
      date: comm.date,
    });
    setEditingCommissionId(comm.id);
  };
  const handleDeleteCommission = (id) =>
    setCommissions(commissions.filter((c) => c.id !== id));

  const handleAddFixedExpense = (e) => {
    e.preventDefault();
    if (
      !newFixedExpense.name ||
      !newFixedExpense.amount ||
      !newFixedExpense.dueDate ||
      !newFixedExpense.category
    )
      return;
    const expenseItem = {
      id: editingFixedExpenseId || Date.now(),
      name: newFixedExpense.name,
      category: newFixedExpense.category,
      amount: Number(newFixedExpense.amount),
      dueDate: Number(newFixedExpense.dueDate),
    };
    if (editingFixedExpenseId) {
      setFixedExpenses(
        fixedExpenses.map((exp) =>
          exp.id === editingFixedExpenseId ? expenseItem : exp
        )
      );
      setEditingFixedExpenseId(null);
    } else {
      setFixedExpenses([...fixedExpenses, expenseItem]);
    }
    setNewFixedExpense({ name: "", category: "", amount: "", dueDate: "" });
  };
  const handleEditFixedExpense = (expense) => {
    setNewFixedExpense({
      name: expense.name,
      category: expense.category,
      amount: expense.amount,
      dueDate: expense.dueDate,
    });
    setEditingFixedExpenseId(expense.id);
  };
  const handleDeleteFixedExpense = (id) =>
    setFixedExpenses(fixedExpenses.filter((exp) => exp.id !== id));

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!newTx.amount || !newTx.description || !newTx.date) return;
    const txDate = new Date(newTx.date);
    const txItem = {
      id: editingTxId ? editingTxId : Date.now(),
      ...newTx,
      amount: Number(newTx.amount),
      month: txDate.getUTCMonth(),
    };
    if (editingTxId) {
      setTransactions(
        transactions.map((t) => (t.id === editingTxId ? txItem : t))
      );
      setEditingTxId(null);
    } else {
      setTransactions([...transactions, txItem]);
    }
    setNewTx({
      type: "expense",
      amount: "",
      category: "",
      description: "",
      date: "",
    });
  };
  const handleEditTransaction = (tx) => {
    setNewTx({
      type: tx.type,
      amount: tx.amount,
      category: tx.category,
      description: tx.description,
      date: tx.date,
    });
    setEditingTxId(tx.id);
  };
  const deleteTransaction = (id) =>
    setTransactions(transactions.filter((t) => t.id !== id));

  const handleAddInvestment = (e) => {
    e.preventDefault();
    if (
      !newInvestment.name ||
      !newInvestment.amount ||
      !newInvestment.institution
    )
      return;
    const invItem = {
      id: editingInvId ? editingInvId : Date.now(),
      type: newInvestment.type || "Renda Fixa",
      name: newInvestment.name,
      institution: newInvestment.institution,
      amount: Number(newInvestment.amount),
      rate: Number(newInvestment.rate || 0),
      dividendYield: Number(newInvestment.dividendYield || 0),
    };
    if (editingInvId) {
      setInvestments(
        investments.map((i) => (i.id === editingInvId ? invItem : i))
      );
      setEditingInvId(null);
    } else {
      setInvestments([...investments, invItem]);
    }
    setNewInvestment({
      type: "Renda Fixa",
      name: "",
      institution: "",
      amount: "",
      rate: "",
      dividendYield: "",
    });
  };
  const handleEditInvestment = (inv) => {
    setNewInvestment({
      type: inv.type,
      name: inv.name,
      institution: inv.institution || "",
      amount: inv.amount,
      rate: inv.rate,
      dividendYield: inv.dividendYield || "",
    });
    setEditingInvId(inv.id);
  };
  const handleDeleteInvestment = (id) =>
    setInvestments(investments.filter((i) => i.id !== id));

  const handleAddConsortium = (e) => {
    e.preventDefault();
    if (
      !newConsortium.name ||
      !newConsortium.installmentValue ||
      !newConsortium.dueDate
    )
      return;
    const consItem = {
      id: editingConsortiumId || Date.now(),
      name: newConsortium.name,
      administrator: newConsortium.administrator,
      creditLetter: Number(newConsortium.creditLetter || 0),
      status: newConsortium.status || "Não Contemplado",
      installmentValue: Number(newConsortium.installmentValue),
      dueDate: Number(newConsortium.dueDate),
    };
    if (editingConsortiumId) {
      setConsortiums(
        consortiums.map((c) => (c.id === editingConsortiumId ? consItem : c))
      );
      setEditingConsortiumId(null);
    } else {
      setConsortiums([...consortiums, consItem]);
    }
    setNewConsortium({
      name: "",
      administrator: "",
      creditLetter: "",
      status: "Não Contemplado",
      installmentValue: "",
      dueDate: "",
    });
  };
  const handleEditConsortium = (cons) => {
    setNewConsortium({
      name: cons.name,
      administrator: cons.administrator || "",
      creditLetter: cons.creditLetter || "",
      status: cons.status,
      installmentValue: cons.installmentValue,
      dueDate: cons.dueDate,
    });
    setEditingConsortiumId(cons.id);
  };
  const handleDeleteConsortium = (id) =>
    setConsortiums(consortiums.filter((c) => c.id !== id));

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newCard.name || !newCard.limit) return;
    const usedVal = Number(newCard.used || 0);
    if (editingCardId) {
      setCreditCards(
        creditCards.map((c) => {
          if (c.id === editingCardId) {
            const invs = {
              ...(c.invoices || { [new Date().getMonth()]: c.used }),
            };
            invs[selectedMonth] = usedVal;
            return {
              ...c,
              ...newCard,
              limit: Number(newCard.limit),
              invoices: invs,
              used: usedVal,
            };
          }
          return c;
        })
      );
      setEditingCardId(null);
    } else {
      setCreditCards([
        ...creditCards,
        {
          id: Date.now(),
          ...newCard,
          limit: Number(newCard.limit),
          invoices: { [selectedMonth]: usedVal },
          used: usedVal,
        },
      ]);
    }
    setNewCard({ name: "", limit: "", used: "", closingDate: "", dueDate: "" });
  };
  const handleEditCard = (card) => {
    const curUsed = card.invoices
      ? card.invoices[selectedMonth] || 0
      : selectedMonth === new Date().getMonth()
      ? card.used
      : 0;
    setNewCard({
      name: card.name,
      limit: card.limit,
      used: curUsed,
      closingDate: card.closingDate || "",
      dueDate: card.dueDate || "",
    });
    setEditingCardId(card.id);
  };
  const handleDeleteCard = (id) =>
    setCreditCards(creditCards.filter((c) => c.id !== id));

  const handleAddInstallment = (e) => {
    e.preventDefault();
    if (
      !newInstallment.name ||
      !newInstallment.totalAmount ||
      !newInstallment.installmentsCount ||
      !newInstallment.startDate
    )
      return;
    const total = Number(newInstallment.totalAmount);
    const count = Number(newInstallment.installmentsCount);
    const val = total / count;
    const instId = editingInstId ? editingInstId : Date.now();
    const newInstItem = {
      id: instId,
      name: newInstallment.name,
      totalAmount: total,
      installmentsCount: count,
      installmentValue: val,
      paid: 0,
      startDate: newInstallment.startDate,
    };
    if (editingInstId) {
      setInstallments(
        installments.map((i) => (i.id === instId ? newInstItem : i))
      );
      setEditingInstId(null);
    } else {
      setInstallments([...installments, newInstItem]);
    }
    setNewInstallment({
      name: "",
      totalAmount: "",
      installmentsCount: "",
      startDate: "",
    });
  };
  const handleEditInstallment = (inst) => {
    setNewInstallment({
      name: inst.name,
      totalAmount: inst.totalAmount,
      installmentsCount: inst.installmentsCount,
      startDate: inst.startDate || "",
    });
    setEditingInstId(inst.id);
  };
  const handleDeleteInstallment = (id) =>
    setInstallments(installments.filter((i) => i.id !== id));

  const handleAddLoan = (e) => {
    e.preventDefault();
    if (
      !newLoan.name ||
      !newLoan.totalAmount ||
      !newLoan.installmentsCount ||
      !newLoan.startDate
    )
      return;
    const principal = Number(newLoan.totalAmount);
    const count = Number(newLoan.installmentsCount);
    const rate = Number(newLoan.interestRate || 0) / 100;
    const loanId = editingLoanId ? editingLoanId : Date.now();
    let pmt = principal / count;
    if (rate > 0)
      pmt =
        (principal * rate * Math.pow(1 + rate, count)) /
        (Math.pow(1 + rate, count) - 1);
    const newLoanItem = {
      id: loanId,
      name: newLoan.name,
      principal: principal,
      interestRate: rate * 100,
      installmentsCount: count,
      installmentValue: pmt,
      startDate: newLoan.startDate,
    };
    if (editingLoanId) {
      setLoans(loans.map((l) => (l.id === loanId ? newLoanItem : l)));
      setEditingLoanId(null);
    } else {
      setLoans([...loans, newLoanItem]);
    }
    setNewLoan({
      name: "",
      totalAmount: "",
      interestRate: "",
      installmentsCount: "",
      startDate: "",
    });
  };
  const handleEditLoan = (loan) => {
    setNewLoan({
      name: loan.name,
      totalAmount: loan.principal,
      interestRate: loan.interestRate,
      installmentsCount: loan.installmentsCount,
      startDate: loan.startDate || "",
    });
    setEditingLoanId(loan.id);
  };
  const handleDeleteLoan = (id) => setLoans(loans.filter((l) => l.id !== id));

  const handleAddDebt = (e) => {
    e.preventDefault();
    if (!newDebt.institution || !newDebt.currentValue) return;
    const debtItem = {
      id: editingDebtId ? editingDebtId : Date.now(),
      institution: newDebt.institution,
      originalValue: Number(newDebt.originalValue || 0),
      currentValue: Number(newDebt.currentValue),
      interest: Number(newDebt.interest || 0),
      status: newDebt.status || "Negativado",
    };
    if (editingDebtId) {
      setOverdueDebts(
        overdueDebts.map((d) => (d.id === editingDebtId ? debtItem : d))
      );
      setEditingDebtId(null);
    } else {
      setOverdueDebts([...overdueDebts, debtItem]);
    }
    setNewDebt({
      institution: "",
      originalValue: "",
      currentValue: "",
      interest: "",
      status: "Negativado",
    });
  };
  const handleEditDebt = (debt) => {
    setNewDebt({
      institution: debt.institution,
      originalValue: debt.originalValue,
      currentValue: debt.currentValue,
      interest: debt.interest,
      status: debt.status,
    });
    setEditingDebtId(debt.id);
  };
  const handleDeleteDebt = (id) =>
    setOverdueDebts(overdueDebts.filter((d) => d.id !== id));

  const TabButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 md:space-x-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all font-medium text-xs md:text-sm whitespace-nowrap md:whitespace-normal w-auto md:w-full
        ${
          activeTab === id
            ? "bg-blue-600 text-white shadow-md"
            : "text-slate-500 hover:bg-slate-100 hover:text-blue-600"
        }`}
    >
      <Icon size={18} className="shrink-0" />
      <span>{label}</span>
    </button>
  );

  if (!isDataLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-400">
        <Activity size={48} className="animate-pulse mb-4 text-blue-400" />
        <p>A iniciar o seu espaço seguro...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col md:flex-row overflow-hidden">
      <aside className="w-full md:w-64 bg-white border-b md:border-r border-slate-100 p-4 md:p-6 flex flex-col gap-2 shadow-sm z-20 md:h-screen md:sticky md:top-0 shrink-0">
        <div className="flex items-center justify-between mb-4 md:mb-8 px-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Zap className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              FintechAI
            </span>
          </div>
          <div className="flex items-center text-[10px] md:hidden bg-slate-50 px-2 py-1 rounded-full border border-slate-200 text-slate-500">
            <HardDrive size={12} className="text-emerald-500 mr-1" /> Offline
          </div>
        </div>

        <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          <TabButton id="resumo" icon={LayoutDashboard} label="Resumo" />
          <TabButton id="renda" icon={Briefcase} label="Renda" />
          <TabButton id="despesas-fixas" icon={Receipt} label="Fixas" />
          <TabButton id="fluxo" icon={Activity} label="Extrato" />
          <TabButton
            id="investimentos"
            icon={TrendingUp}
            label="Investimentos"
          />
          <TabButton id="dividas" icon={CreditCard} label="Cartões" />
          <TabButton id="planejamento" icon={Target} label="Planos" />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100 hidden md:block">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">Score Financeiro</p>
            <div className="flex items-end justify-between mb-2">
              <span
                className={`text-2xl font-bold ${
                  financialScore >= 70
                    ? "text-emerald-500"
                    : financialScore >= 40
                    ? "text-orange-500"
                    : "text-rose-500"
                }`}
              >
                {financialScore}
              </span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full ${
                  financialScore >= 70
                    ? "bg-emerald-500"
                    : financialScore >= 40
                    ? "bg-orange-500"
                    : "bg-rose-500"
                }`}
                style={{ width: `${financialScore}%` }}
              ></div>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        <header className="bg-white border-b border-slate-100 px-4 md:px-8 py-4 md:py-5 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 capitalize truncate">
            {activeTab.replace("-", " ")}
          </h1>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center text-xs font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 mr-2">
              <HardDrive size={14} className="text-emerald-500 mr-2" />{" "}
              {syncStatus}
            </div>
            <div className="flex items-center space-x-1 md:space-x-2 bg-slate-50 p-1.5 rounded-lg border border-slate-200 shrink-0">
              <Calendar size={16} className="text-slate-400 ml-1 md:ml-2" />
              <select
                className="bg-transparent border-none text-xs md:text-sm font-semibold text-blue-600 focus:ring-0 cursor-pointer pr-1"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
              >
                {meses.map((m, i) => (
                  <option key={i} value={i}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                className="bg-transparent border-none text-xs md:text-sm font-semibold text-slate-600 focus:ring-0 cursor-pointer pr-1 md:pr-2"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                {Array.from(
                  { length: 11 },
                  (_, i) => new Date().getFullYear() - 5 + i
                ).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-6 md:space-y-8 pb-24">
          <>
            {activeTab === "resumo" && (
              <div className="space-y-6 md:space-y-8 animation-fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 md:p-4 opacity-10">
                      <ArrowDownRight size={40} className="text-emerald-500" />
                    </div>
                    <p className="text-[10px] md:text-sm font-medium text-slate-500 mb-1">
                      Entradas (Mês)
                    </p>
                    <h3 className="text-lg md:text-2xl font-bold text-slate-800">
                      {formatCurrency(totalIncome)}
                    </h3>
                  </div>
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 md:p-4 opacity-10">
                      <ArrowUpRight size={40} className="text-rose-500" />
                    </div>
                    <p className="text-[10px] md:text-sm font-medium text-slate-500 mb-1">
                      Saídas (Mês)
                    </p>
                    <h3 className="text-lg md:text-2xl font-bold text-slate-800">
                      {formatCurrency(totalExpense)}
                    </h3>
                  </div>
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden col-span-2 sm:col-span-1">
                    <div className="absolute top-0 right-0 p-3 md:p-4 opacity-10">
                      <Wallet size={40} className="text-blue-600" />
                    </div>
                    <p className="text-[10px] md:text-sm font-medium text-slate-500 mb-1">
                      Saldo Mensal
                    </p>
                    <h3
                      className={`text-xl md:text-2xl font-bold ${
                        currentBalance >= 0
                          ? "text-emerald-500"
                          : "text-rose-500"
                      }`}
                    >
                      {formatCurrency(currentBalance)}
                    </h3>
                  </div>
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 md:p-4 opacity-10">
                      <CreditCard size={40} className="text-orange-500" />
                    </div>
                    <p className="text-[10px] md:text-sm font-medium text-slate-500 mb-1">
                      Fatura Cartão
                    </p>
                    <h3 className="text-lg md:text-2xl font-bold text-orange-500">
                      {formatCurrency(totalCartoesMes)}
                    </h3>
                  </div>
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 md:p-4 opacity-10">
                      <Banknote size={40} className="text-amber-500" />
                    </div>
                    <p className="text-[10px] md:text-sm font-medium text-slate-500 mb-1">
                      Parcelas/Emprést.
                    </p>
                    <h3 className="text-lg md:text-2xl font-bold text-amber-500">
                      {formatCurrency(totalParcelasEmprestimosMes)}
                    </h3>
                  </div>
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden col-span-2 sm:col-span-1">
                    <div className="absolute top-0 right-0 p-3 md:p-4 opacity-10">
                      <TrendingUp size={40} className="text-purple-500" />
                    </div>
                    <p className="text-[10px] md:text-sm font-medium text-slate-500 mb-1">
                      Dividendos (Mês)
                    </p>
                    <h3 className="text-lg md:text-2xl font-bold text-purple-600">
                      +{formatCurrency(totalDividendsMes)}
                    </h3>
                  </div>
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 md:p-4 opacity-10">
                      <Target size={40} className="text-emerald-600" />
                    </div>
                    <p className="text-[10px] md:text-sm font-medium text-slate-500 mb-1">
                      Total Investido
                    </p>
                    <h3 className="text-lg md:text-2xl font-bold text-emerald-600">
                      {formatCurrency(totalInvested)}
                    </h3>
                  </div>
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 md:p-4 opacity-10">
                      <ShieldAlert size={40} className="text-rose-600" />
                    </div>
                    <p className="text-[10px] md:text-sm font-medium text-slate-500 mb-1">
                      Dívidas Restantes
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold text-rose-600">
                      {formatCurrency(totalDebtInSelectedMonth)}
                    </h3>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-4 md:p-6 rounded-2xl shadow-md text-white relative overflow-hidden col-span-2 sm:col-span-1">
                    <div className="absolute top-0 right-0 p-3 md:p-4 opacity-20">
                      <PieChart size={40} />
                    </div>
                    <p className="text-[10px] md:text-sm font-medium text-blue-100 mb-1">
                      Património Acum.
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold">
                      {formatCurrency(netWorth)}
                    </h3>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-bold text-slate-800 flex items-center mb-4 md:mb-6">
                    <Clock className="text-blue-500 mr-2" size={20} /> Controlo
                    de Pagamentos ({meses[selectedMonth]}/{selectedYear})
                  </h3>
                  <div className="space-y-3">
                    {currentMonthTx
                      .filter((t) => t.type === "expense")
                      .sort(
                        (a, b) =>
                          new Date(a.date).getDate() -
                          new Date(b.date).getDate()
                      )
                      .map((tx) => {
                        const isPaid = paidItems[tx.id];
                        const txDay = new Date(tx.date).getDate();
                        const today = new Date();
                        const isCurrentMonth =
                          selectedMonth === today.getMonth() &&
                          selectedYear === today.getFullYear();
                        const isPastMonth =
                          selectedYear < today.getFullYear() ||
                          (selectedYear === today.getFullYear() &&
                            selectedMonth < today.getMonth());
                        const isOverdue =
                          (isPastMonth ||
                            (isCurrentMonth && txDay < today.getDate())) &&
                          !isPaid;
                        return (
                          <div
                            key={tx.id}
                            className={`flex items-center justify-between p-3 rounded-lg border ${
                              isPaid
                                ? "border-slate-100 bg-slate-50 opacity-70"
                                : isOverdue
                                ? "border-rose-200 bg-rose-50"
                                : "border-slate-200 hover:bg-slate-50"
                            } transition-colors`}
                          >
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => toggleTransactionPayment(tx.id)}
                                className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                  isPaid
                                    ? "bg-emerald-500 border-emerald-500"
                                    : isOverdue
                                    ? "border-rose-500 bg-white"
                                    : "border-slate-300 bg-white"
                                }`}
                              >
                                {isPaid && (
                                  <Check size={14} className="text-white" />
                                )}
                              </button>
                              <div>
                                <p
                                  className={`font-bold text-xs md:text-sm ${
                                    isPaid
                                      ? "text-slate-500 line-through"
                                      : "text-slate-800"
                                  }`}
                                >
                                  {tx.description}
                                </p>
                                <p className="text-[10px] md:text-xs text-slate-500">
                                  Dia {txDay}{" "}
                                  <span className="ml-1 px-1.5 py-0.5 bg-slate-200 rounded text-[8px] uppercase">
                                    {tx.category}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <p
                                className={`font-bold text-xs md:text-sm ${
                                  isPaid
                                    ? "text-slate-500 line-through"
                                    : isOverdue
                                    ? "text-rose-600"
                                    : "text-slate-800"
                                }`}
                              >
                                {formatCurrency(tx.amount)}
                              </p>
                              {isOverdue && !isPaid && (
                                <span className="text-[10px] text-rose-600 font-bold">
                                  Atrasado
                                </span>
                              )}
                              {!isOverdue && !isPaid && (
                                <span className="text-[10px] text-blue-600 font-bold">
                                  A Pagar
                                </span>
                              )}
                              {isPaid && (
                                <span className="text-[10px] text-emerald-600 font-bold">
                                  Pago
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    {currentMonthTx.filter((t) => t.type === "expense")
                      .length === 0 && (
                      <p className="text-sm text-slate-400 text-center py-4">
                        Sem contas este mês.
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-bold text-slate-800 flex items-center mb-4 md:mb-6">
                    <Zap className="text-purple-500 mr-2" size={20} />{" "}
                    Inteligência Artificial
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    {insights.map((insight, idx) => (
                      <div
                        key={idx}
                        className={`p-3 md:p-4 rounded-xl flex items-start border-l-4 ${
                          insight.type === "danger"
                            ? "bg-rose-50 border-rose-500 text-rose-700"
                            : insight.type === "warning"
                            ? "bg-orange-50 border-orange-500 text-orange-700"
                            : insight.type === "success"
                            ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                            : "bg-blue-50 border-blue-500 text-blue-700"
                        }`}
                      >
                        <AlertTriangle
                          size={16}
                          className="mr-2 md:mr-3 flex-shrink-0 mt-0.5"
                        />
                        <p className="font-medium text-xs md:text-sm">
                          {insight.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "renda" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4 flex items-center">
                    <Briefcase className="mr-2 text-emerald-600" /> Salário Fixo
                    Mensal
                  </h3>
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
                    <h4 className="text-sm font-bold text-slate-800 mb-4">
                      {editingFixedSalaryId
                        ? "Editar Salário"
                        : "Adicionar Salário"}
                    </h4>
                    <form
                      onSubmit={handleAddFixedSalary}
                      className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4"
                    >
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-500 mb-1">
                          Fonte Pagadora
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Empresa"
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500"
                          value={newFixedSalary.company}
                          onChange={(e) =>
                            setNewFixedSalary({
                              ...newFixedSalary,
                              company: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">
                          Valor (R$)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          placeholder="0.00"
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500"
                          value={newFixedSalary.amount}
                          onChange={(e) =>
                            setNewFixedSalary({
                              ...newFixedSalary,
                              amount: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">
                          Dia do Pgto
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="31"
                          required
                          placeholder="Ex: 5"
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500"
                          value={newFixedSalary.payDay}
                          onChange={(e) =>
                            setNewFixedSalary({
                              ...newFixedSalary,
                              payDay: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="md:col-span-4 mt-2">
                        <button
                          type="submit"
                          className={`w-full text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center ${
                            editingFixedSalaryId
                              ? "bg-orange-500 hover:bg-orange-600"
                              : "bg-emerald-600 hover:bg-emerald-700"
                          }`}
                        >
                          {editingFixedSalaryId ? (
                            "Atualizar"
                          ) : (
                            <>
                              <Plus size={16} className="mr-1" /> Adicionar
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                          <th className="p-3 md:p-4 font-semibold">
                            Fonte Pagadora
                          </th>
                          <th className="p-3 md:p-4 font-semibold text-right">
                            Valor Líquido
                          </th>
                          <th className="p-3 md:p-4 font-semibold text-center">
                            Dia
                          </th>
                          <th className="p-3 md:p-4 font-semibold text-center">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
                        {fixedSalaries.map((salary) => (
                          <tr key={salary.id} className="hover:bg-slate-50">
                            <td className="p-3 md:p-4 font-bold text-slate-800 truncate">
                              {salary.company}
                            </td>
                            <td className="p-3 md:p-4 text-right font-medium text-emerald-600">
                              {formatCurrency(salary.amount)}
                            </td>
                            <td className="p-3 md:p-4 text-center text-slate-500">
                              {salary.payDay}
                            </td>
                            <td className="p-3 md:p-4 text-center flex justify-center space-x-2">
                              <button
                                onClick={() => handleEditFixedSalary(salary)}
                                className="text-slate-400 hover:text-blue-500"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteFixedSalary(salary.id)
                                }
                                className="text-slate-400 hover:text-rose-500"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4 flex items-center">
                    <TrendingUp className="mr-2 text-emerald-600" /> Comissões e
                    Extras
                  </h3>
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
                    <form
                      onSubmit={handleAddCommission}
                      className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4"
                    >
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-500 mb-1">
                          Descrição
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Freelance"
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500"
                          value={newCommission.description}
                          onChange={(e) =>
                            setNewCommission({
                              ...newCommission,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">
                          Valor (R$)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          placeholder="0.00"
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500"
                          value={newCommission.amount}
                          onChange={(e) =>
                            setNewCommission({
                              ...newCommission,
                              amount: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">
                          Data
                        </label>
                        <input
                          type="date"
                          required
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500"
                          value={newCommission.date}
                          onChange={(e) =>
                            setNewCommission({
                              ...newCommission,
                              date: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="md:col-span-4 mt-2">
                        <button
                          type="submit"
                          className={`w-full text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center ${
                            editingCommissionId
                              ? "bg-orange-500 hover:bg-orange-600"
                              : "bg-emerald-600 hover:bg-emerald-700"
                          }`}
                        >
                          {editingCommissionId ? (
                            "Atualizar"
                          ) : (
                            <>
                              <Plus size={16} className="mr-1" /> Adicionar
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[400px]">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                          <th className="p-3 md:p-4 font-semibold">Data</th>
                          <th className="p-3 md:p-4 font-semibold">
                            Descrição
                          </th>
                          <th className="p-3 md:p-4 font-semibold text-right">
                            Valor
                          </th>
                          <th className="p-3 md:p-4 font-semibold text-center">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
                        {commissions.map((comm) => (
                          <tr key={comm.id} className="hover:bg-slate-50">
                            <td className="p-3 md:p-4 text-slate-600">
                              {new Date(comm.date).toLocaleDateString("pt-BR")}
                            </td>
                            <td className="p-3 md:p-4 font-bold text-slate-800 truncate">
                              {comm.description}
                            </td>
                            <td className="p-3 md:p-4 text-right font-medium text-emerald-600">
                              +{formatCurrency(comm.amount)}
                            </td>
                            <td className="p-3 md:p-4 text-center flex justify-center space-x-2">
                              <button
                                onClick={() => handleEditCommission(comm)}
                                className="text-slate-400 hover:text-blue-500"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteCommission(comm.id)}
                                className="text-slate-400 hover:text-rose-500"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "despesas-fixas" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4 flex items-center">
                    <Receipt className="mr-2 text-rose-600" /> Despesas Fixas
                    Mensais
                  </h3>
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
                    <form
                      onSubmit={handleAddFixedExpense}
                      className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4"
                    >
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-500 mb-1">
                          Nome
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Conta de Luz"
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500"
                          value={newFixedExpense.name}
                          onChange={(e) =>
                            setNewFixedExpense({
                              ...newFixedExpense,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">
                          Categoria
                        </label>
                        <select
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500"
                          value={newFixedExpense.category}
                          onChange={(e) =>
                            setNewFixedExpense({
                              ...newFixedExpense,
                              category: e.target.value,
                            })
                          }
                          required
                        >
                          <option value="">Selecione...</option>
                          {categoriasDespesa.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">
                          Valor (R$)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          placeholder="0.00"
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500"
                          value={newFixedExpense.amount}
                          onChange={(e) =>
                            setNewFixedExpense({
                              ...newFixedExpense,
                              amount: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">
                          Vencimento (Dia)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="31"
                          required
                          placeholder="Ex: 10"
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-rose-500"
                          value={newFixedExpense.dueDate}
                          onChange={(e) =>
                            setNewFixedExpense({
                              ...newFixedExpense,
                              dueDate: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="md:col-span-5 mt-2">
                        <button
                          type="submit"
                          className={`w-full text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center ${
                            editingFixedExpenseId
                              ? "bg-orange-500 hover:bg-orange-600"
                              : "bg-rose-600 hover:bg-rose-700"
                          }`}
                        >
                          {editingFixedExpenseId ? (
                            "Atualizar"
                          ) : (
                            <>
                              <Plus size={16} className="mr-1" /> Adicionar
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                          <th className="p-3 md:p-4 font-semibold">Despesa</th>
                          <th className="p-3 md:p-4 font-semibold text-right">
                            Valor
                          </th>
                          <th className="p-3 md:p-4 font-semibold text-center">
                            Vencimento
                          </th>
                          <th className="p-3 md:p-4 font-semibold text-center">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
                        {fixedExpenses.map((expense) => (
                          <tr key={expense.id} className="hover:bg-slate-50">
                            <td className="p-3 md:p-4 font-bold text-slate-800">
                              {expense.name}{" "}
                              <span className="block md:inline text-[10px] text-slate-400 font-normal md:ml-2">
                                {expense.category}
                              </span>
                            </td>
                            <td className="p-3 md:p-4 text-right font-medium text-rose-600">
                              -{formatCurrency(expense.amount)}
                            </td>
                            <td className="p-3 md:p-4 text-center text-slate-500">
                              Dia {expense.dueDate}
                            </td>
                            <td className="p-3 md:p-4 text-center flex justify-center space-x-2">
                              <button
                                onClick={() => handleEditFixedExpense(expense)}
                                className="text-slate-400 hover:text-blue-500"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteFixedExpense(expense.id)
                                }
                                className="text-slate-400 hover:text-rose-500"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "fluxo" && (
              <div className="space-y-6">
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100">
                  <form
                    onSubmit={handleAddTransaction}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 md:gap-4"
                  >
                    <div className="md:col-span-1">
                      <label className="block text-xs font-semibold text-slate-500 mb-1">
                        Tipo
                      </label>
                      <select
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
                        value={newTx.type}
                        onChange={(e) =>
                          setNewTx({ ...newTx, type: e.target.value })
                        }
                      >
                        <option value="expense">Saída</option>
                        <option value="income">Entrada</option>
                      </select>
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-xs font-semibold text-slate-500 mb-1">
                        Data
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
                        value={newTx.date}
                        onChange={(e) =>
                          setNewTx({ ...newTx, date: e.target.value })
                        }
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-xs font-semibold text-slate-500 mb-1">
                        Valor (R$)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        placeholder="0.00"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
                        value={newTx.amount}
                        onChange={(e) =>
                          setNewTx({ ...newTx, amount: e.target.value })
                        }
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-xs font-semibold text-slate-500 mb-1">
                        Categoria
                      </label>
                      <select
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
                        value={newTx.category}
                        onChange={(e) =>
                          setNewTx({ ...newTx, category: e.target.value })
                        }
                        required
                      >
                        <option value="">Selecione...</option>
                        {(newTx.type === "expense"
                          ? categoriasDespesa
                          : categoriasReceita
                        ).map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                      <label className="block text-xs font-semibold text-slate-500 mb-1">
                        Descrição
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Mercado"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
                        value={newTx.description}
                        onChange={(e) =>
                          setNewTx({ ...newTx, description: e.target.value })
                        }
                      />
                    </div>
                    <div className="sm:col-span-2 md:col-span-1 mt-2 md:mt-0 flex items-end">
                      <button
                        type="submit"
                        className={`w-full text-white font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center ${
                          editingTxId
                            ? "bg-orange-500 hover:bg-orange-600"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        {editingTxId ? "Atualizar" : "Adicionar"}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-end gap-4">
                  <div className="flex-1 w-full">
                    <label className="block text-[10px] md:text-xs font-semibold text-slate-500 mb-1">
                      Filtrar de (Data Inicial)
                    </label>
                    <input
                      type="date"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
                      value={dateFilter.start}
                      onChange={(e) =>
                        setDateFilter({ ...dateFilter, start: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <label className="block text-[10px] md:text-xs font-semibold text-slate-500 mb-1">
                      Até (Data Final)
                    </label>
                    <input
                      type="date"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
                      value={dateFilter.end}
                      onChange={(e) =>
                        setDateFilter({ ...dateFilter, end: e.target.value })
                      }
                    />
                  </div>
                  {(dateFilter.start || dateFilter.end) && (
                    <button
                      onClick={() => setDateFilter({ start: "", end: "" })}
                      className="w-full md:w-auto px-6 py-2.5 text-sm font-bold text-slate-500 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors shrink-0"
                    >
                      Limpar Filtro
                    </button>
                  )}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <h3 className="text-base md:text-lg font-bold text-slate-800">
                      {dateFilter.start && dateFilter.end
                        ? "Lançamentos (Filtrado)"
                        : `Lançamentos de ${meses[selectedMonth]}`}
                    </h3>
                    <div className="text-xs md:text-sm font-medium flex gap-4">
                      <span className="text-emerald-500">
                        Entradas: {formatCurrency(extratoIncome)}
                      </span>
                      <span className="text-rose-500">
                        Saídas: {formatCurrency(extratoExpense)}
                      </span>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-[10px] md:text-xs uppercase tracking-wider">
                          <th className="p-3 md:p-4 font-semibold text-center w-12">
                            Estado
                          </th>
                          <th className="p-3 md:p-4 font-semibold">Data</th>
                          <th className="p-3 md:p-4 font-semibold">
                            Descrição
                          </th>
                          <th className="p-3 md:p-4 font-semibold text-right">
                            Valor
                          </th>
                          <th className="p-3 md:p-4 font-semibold text-center">
                            Ação
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
                        {extratoTx.length === 0 ? (
                          <tr>
                            <td
                              colSpan="5"
                              className="p-6 md:p-8 text-center text-slate-400"
                            >
                              Sem movimentações neste período.
                            </td>
                          </tr>
                        ) : (
                          extratoTx
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map((tx) => {
                              const isPaid = paidItems[tx.id];
                              return (
                                <tr
                                  key={tx.id}
                                  className={`hover:bg-slate-50 transition-colors ${
                                    isPaid ? "opacity-60 bg-slate-50" : ""
                                  }`}
                                >
                                  <td className="p-3 md:p-4 text-center">
                                    <button
                                      onClick={() =>
                                        toggleTransactionPayment(tx.id)
                                      }
                                      className={`w-5 h-5 md:w-6 md:h-6 mx-auto rounded-full border-2 flex items-center justify-center ${
                                        isPaid
                                          ? "bg-emerald-500 border-emerald-500"
                                          : "border-slate-300 bg-white"
                                      }`}
                                    >
                                      {isPaid && (
                                        <Check
                                          size={14}
                                          className="text-white"
                                        />
                                      )}
                                    </button>
                                  </td>
                                  <td className="p-3 md:p-4 text-slate-600 whitespace-nowrap">
                                    {new Date(tx.date).toLocaleDateString(
                                      "pt-BR"
                                    )}
                                  </td>
                                  <td className="p-3 md:p-4 font-medium text-slate-800">
                                    {tx.description}
                                    <span className="block text-[10px] text-slate-400 font-normal mt-0.5">
                                      {tx.category}
                                    </span>
                                  </td>
                                  <td
                                    className={`p-3 md:p-4 text-right font-bold whitespace-nowrap ${
                                      tx.type === "income"
                                        ? "text-emerald-500"
                                        : "text-slate-800"
                                    }`}
                                  >
                                    {tx.type === "income" ? "+" : "-"}
                                    {formatCurrency(tx.amount)}
                                  </td>
                                  <td className="p-3 md:p-4 text-center">
                                    {!tx.isAuto ? (
                                      <div className="flex justify-center space-x-2">
                                        <button
                                          onClick={() =>
                                            handleEditTransaction(tx)
                                          }
                                          className="text-slate-400 hover:text-blue-500 transition-colors"
                                        >
                                          <Edit2 size={16} />
                                        </button>
                                        <button
                                          onClick={() =>
                                            deleteTransaction(tx.id)
                                          }
                                          className="text-slate-400 hover:text-rose-500 transition-colors"
                                        >
                                          <Trash2 size={16} />
                                        </button>
                                      </div>
                                    ) : (
                                      <span className="text-[10px] text-blue-500 font-bold bg-blue-50 px-2 py-1 rounded border border-blue-100">
                                        Auto
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "investimentos" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div className="bg-blue-600 text-white p-4 md:p-6 rounded-2xl shadow-md flex flex-col justify-center">
                    <p className="text-blue-200 text-xs md:text-sm font-medium mb-1">
                      Total Investido
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      {formatCurrency(totalInvested)}
                    </h2>
                    <div className="flex items-center text-[10px] md:text-xs bg-white/10 p-1.5 rounded-lg inline-block w-fit">
                      <TrendingUp size={14} className="mr-1 inline" />{" "}
                      Rendimento da Carteira:{" "}
                      <span className="font-bold ml-1">
                        {averageRate.toFixed(1)}% a.a.
                      </span>
                    </div>
                  </div>

                  <div className="bg-purple-600 text-white p-4 md:p-6 rounded-2xl shadow-md flex flex-col justify-center">
                    <p className="text-purple-200 text-xs md:text-sm font-medium mb-1">
                      Rendimento Médio Estimado (Mês)
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      +{formatCurrency(expectedMonthlyReturn)}
                    </h2>
                    <p className="text-[10px] md:text-xs text-purple-200">
                      Baseado nas taxas e dividendos registados.
                    </p>
                  </div>

                  <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                    <label className="text-xs md:text-sm font-bold text-slate-700 mb-2">
                      Taxa Selic Atual (% ao ano)
                    </label>
                    <div className="flex items-center">
                      <input
                        type="number"
                        step="0.1"
                        value={selic}
                        onChange={(e) => setSelic(Number(e.target.value))}
                        className="text-xl md:text-2xl font-bold text-blue-600 bg-slate-50 border border-slate-200 rounded-lg p-2 w-24 outline-none focus:border-blue-500"
                      />
                    </div>
                    <p className="mt-2 text-[10px] md:text-xs text-slate-500">
                      Benchmark padrão.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
                  <form
                    onSubmit={handleAddInvestment}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                  >
                    <div>
                      <label className="block text-[10px] md:text-xs font-semibold text-slate-500 mb-1">
                        Tipo
                      </label>
                      <select
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm outline-none focus:border-blue-500"
                        value={newInvestment.type}
                        onChange={(e) =>
                          setNewInvestment({
                            ...newInvestment,
                            type: e.target.value,
                          })
                        }
                      >
                        <option>Renda Fixa</option>
                        <option>Ações</option>
                        <option>FIIs</option>
                        <option>Cripto</option>
                        <option>Outros</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] md:text-xs font-semibold text-slate-500 mb-1">
                        Nome do Ativo
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: MXRF11"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm outline-none focus:border-blue-500"
                        value={newInvestment.name}
                        onChange={(e) =>
                          setNewInvestment({
                            ...newInvestment,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] md:text-xs font-semibold text-slate-500 mb-1">
                        Onde
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Corretora"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm outline-none focus:border-blue-500"
                        value={newInvestment.institution}
                        onChange={(e) =>
                          setNewInvestment({
                            ...newInvestment,
                            institution: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] md:text-xs font-semibold text-slate-500 mb-1">
                        Valor Investido
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        placeholder="0.00"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm outline-none focus:border-blue-500"
                        value={newInvestment.amount}
                        onChange={(e) =>
                          setNewInvestment({
                            ...newInvestment,
                            amount: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex gap-2 w-full">
                      <div className="w-1/2">
                        <label className="block text-[10px] md:text-xs font-semibold text-slate-500 mb-1">
                          Taxa a.a %
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Ex: 11.5"
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm outline-none focus:border-blue-500"
                          value={newInvestment.rate}
                          onChange={(e) =>
                            setNewInvestment({
                              ...newInvestment,
                              rate: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-[10px] md:text-xs font-semibold text-slate-500 mb-1">
                          Div. a.m %
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Ex: 0.8"
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm outline-none focus:border-purple-500"
                          value={newInvestment.dividendYield}
                          onChange={(e) =>
                            setNewInvestment({
                              ...newInvestment,
                              dividendYield: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-end">
                      <button
                        type="submit"
                        className={`w-full text-white font-medium py-2.5 rounded-lg text-sm transition-colors h-10 ${
                          editingInvId
                            ? "bg-orange-500 hover:bg-orange-600"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        {editingInvId ? "Atualizar" : "Adicionar"}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-[10px] md:text-xs uppercase tracking-wider">
                        <th className="p-3 md:p-4 font-semibold">Ativo</th>
                        <th className="p-3 md:p-4 font-semibold">Onde</th>
                        <th className="p-3 md:p-4 font-semibold text-right">
                          Valor Investido
                        </th>
                        <th className="p-3 md:p-4 font-semibold text-center">
                          Taxa/Div
                        </th>
                        <th className="p-3 md:p-4 font-semibold text-right">
                          Resultado Médio (Mês)
                        </th>
                        <th className="p-3 md:p-4 font-semibold text-center">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
                      {investments.map((inv) => {
                        const amount = Number(inv.amount) || 0;
                        const rate = Number(inv.rate) || 0;
                        const divYield = Number(inv.dividendYield) || 0;
                        const monthlyRateYield =
                          amount * (Math.pow(1 + rate / 100, 1 / 12) - 1);
                        const expectedMonthly =
                          monthlyRateYield + amount * (divYield / 100);

                        return (
                          <tr key={inv.id} className="hover:bg-slate-50">
                            <td className="p-3 md:p-4 font-bold text-slate-800">
                              {inv.name}{" "}
                              <span className="block text-[10px] text-slate-400 font-normal">
                                {inv.type}
                              </span>
                            </td>
                            <td className="p-3 md:p-4 text-slate-600">
                              {inv.institution}
                            </td>
                            <td className="p-3 md:p-4 text-right font-medium text-blue-600">
                              {formatCurrency(inv.amount)}
                            </td>
                            <td className="p-3 md:p-4 text-center">
                              {inv.rate > 0 && (
                                <span className="block text-emerald-600 font-bold">
                                  {inv.rate}% a.a
                                </span>
                              )}
                              {inv.dividendYield > 0 && (
                                <span className="block text-purple-600 font-bold">
                                  {inv.dividendYield}% a.m
                                </span>
                              )}
                            </td>
                            <td className="p-3 md:p-4 text-right font-bold text-emerald-600">
                              +{formatCurrency(expectedMonthly)}
                            </td>
                            <td className="p-3 md:p-4 text-center flex justify-center space-x-2">
                              <button
                                onClick={() => handleEditInvestment(inv)}
                                className="text-slate-400 hover:text-blue-500"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteInvestment(inv.id)}
                                className="text-slate-400 hover:text-rose-500"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 md:mt-12">
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4 flex items-center">
                    <Landmark className="mr-2 text-blue-600" /> Consórcios
                  </h3>
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
                    <form
                      onSubmit={handleAddConsortium}
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                    >
                      <div>
                        <label className="block text-[10px] md:text-xs font-semibold text-slate-500 mb-1">
                          Nome do Bem
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm outline-none focus:border-blue-500"
                          value={newConsortium.name}
                          onChange={(e) =>
                            setNewConsortium({
                              ...newConsortium,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] md:text-xs font-semibold text-slate-500 mb-1">
                          Administradora
                        </label>
                        <input
                          type="text"
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm outline-none focus:border-blue-500"
                          value={newConsortium.administrator}
                          onChange={(e) =>
                            setNewConsortium({
                              ...newConsortium,
                              administrator: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] md:text-xs font-semibold text-slate-500 mb-1">
                          Carta (R$)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm outline-none focus:border-blue-500"
                          value={newConsortium.creditLetter}
                          onChange={(e) =>
                            setNewConsortium({
                              ...newConsortium,
                              creditLetter: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex gap-2 w-full">
                        <div className="w-1/2">
                          <label className="block text-[10px] md:text-xs font-semibold text-slate-500 mb-1">
                            Parcela (R$)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            required
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm outline-none focus:border-blue-500"
                            value={newConsortium.installmentValue}
                            onChange={(e) =>
                              setNewConsortium({
                                ...newConsortium,
                                installmentValue: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-[10px] md:text-xs font-semibold text-slate-500 mb-1">
                            Vencimento
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="31"
                            required
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm outline-none focus:border-blue-500"
                            value={newConsortium.dueDate}
                            onChange={(e) =>
                              setNewConsortium({
                                ...newConsortium,
                                dueDate: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] md:text-xs font-semibold text-slate-500 mb-1">
                          Estado
                        </label>
                        <select
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm outline-none focus:border-blue-500"
                          value={newConsortium.status}
                          onChange={(e) =>
                            setNewConsortium({
                              ...newConsortium,
                              status: e.target.value,
                            })
                          }
                        >
                          <option>Não Contemplado</option>
                          <option>Contemplado</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        <button
                          type="submit"
                          className={`w-full text-white font-medium py-2.5 rounded-lg text-sm transition-colors h-10 ${
                            editingConsortiumId
                              ? "bg-orange-500 hover:bg-orange-600"
                              : "bg-blue-600 hover:bg-blue-700"
                          }`}
                        >
                          {editingConsortiumId ? "Atualizar" : "Adicionar"}
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-[10px] md:text-xs uppercase tracking-wider">
                          <th className="p-3 md:p-4 font-semibold">Bem</th>
                          <th className="p-3 md:p-4 font-semibold text-right">
                            Carta
                          </th>
                          <th className="p-3 md:p-4 font-semibold text-center">
                            Estado
                          </th>
                          <th className="p-3 md:p-4 font-semibold text-right">
                            Parcela
                          </th>
                          <th className="p-3 md:p-4 font-semibold text-center">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
                        {consortiums.map((cons) => (
                          <tr key={cons.id} className="hover:bg-slate-50">
                            <td className="p-3 md:p-4 font-bold text-slate-800">
                              {cons.name}{" "}
                              <span className="block text-[10px] text-slate-400 font-normal">
                                {cons.administrator}
                              </span>
                            </td>
                            <td className="p-3 md:p-4 text-right font-medium text-blue-600">
                              {formatCurrency(cons.creditLetter)}
                            </td>
                            <td className="p-3 md:p-4 text-center">
                              <span
                                className={`px-2 py-1 rounded text-[10px] md:text-xs font-bold ${
                                  cons.status === "Contemplado"
                                    ? "bg-emerald-100 text-emerald-600"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {cons.status}
                              </span>
                            </td>
                            <td className="p-3 md:p-4 text-right font-bold text-slate-700">
                              {formatCurrency(cons.installmentValue)}{" "}
                              <span className="text-[10px] text-slate-400 block">
                                Dia {cons.dueDate}
                              </span>
                            </td>
                            <td className="p-3 md:p-4 text-center flex justify-center space-x-2">
                              <button
                                onClick={() => handleEditConsortium(cons)}
                                className="text-slate-400 hover:text-blue-500"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteConsortium(cons.id)}
                                className="text-slate-400 hover:text-rose-500"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "dividas" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4 flex items-center">
                    <CreditCard className="mr-2 text-blue-600" /> Cartões de
                    Crédito
                  </h3>
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
                    <form
                      onSubmit={handleAddCard}
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 md:gap-4"
                    >
                      <div className="sm:col-span-2 md:col-span-2">
                        <label className="block text-[10px] md:text-xs font-semibold text-slate-500 mb-1">
                          Nome do Cartão
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm"
                          value={newCard.name}
                          onChange={(e) =>
                            setNewCard({ ...newCard, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-[10px] md:text-xs font-semibold text-slate-500 mb-1">
                          Limite Total (R$)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm"
                          value={newCard.limit}
                          onChange={(e) =>
                            setNewCard({ ...newCard, limit: e.target.value })
                          }
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-[10px] md:text-xs font-semibold text-slate-500 mb-1 text-orange-600">
                          Fatura de {meses[selectedMonth]}
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm"
                          value={newCard.used}
                          onChange={(e) =>
                            setNewCard({ ...newCard, used: e.target.value })
                          }
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-[10px] md:text-xs font-semibold text-slate-500 mb-1">
                          Vencimento (Dia)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="31"
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm"
                          value={newCard.dueDate}
                          onChange={(e) =>
                            setNewCard({ ...newCard, dueDate: e.target.value })
                          }
                        />
                      </div>
                      <div className="sm:col-span-2 md:col-span-1 mt-2 md:mt-0 flex items-end">
                        <button
                          type="submit"
                          className={`w-full text-white font-medium py-2.5 rounded-lg text-sm ${
                            editingCardId ? "bg-orange-500" : "bg-blue-600"
                          }`}
                        >
                          {editingCardId ? "Atualizar" : "Adicionar"}
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {creditCards.map((card) => {
                      const curUsed = card.invoices
                        ? card.invoices[selectedMonth] || 0
                        : selectedMonth === new Date().getMonth()
                        ? card.used
                        : 0;
                      const pct =
                        card.limit > 0 ? (curUsed / card.limit) * 100 : 0;
                      return (
                        <div
                          key={card.id}
                          className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 relative"
                        >
                          <div className="absolute top-2 right-2 md:top-4 md:right-4 flex space-x-1 md:space-x-2">
                            <button
                              onClick={() => handleEditCard(card)}
                              className="text-slate-400 hover:text-blue-500 bg-slate-50 p-1.5 rounded-md"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteCard(card.id)}
                              className="text-slate-400 hover:text-rose-500 bg-slate-50 p-1.5 rounded-md"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="flex flex-col md:flex-row md:justify-between items-start mb-4">
                            <div className="mb-2 md:mb-0">
                              <h4 className="font-bold text-base md:text-lg text-slate-800">
                                {card.name}
                              </h4>
                              <p className="text-[10px] md:text-xs text-slate-400">
                                Vencimento: dia {card.dueDate}
                              </p>
                            </div>
                            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold text-orange-600">
                              Fatura ({meses[selectedMonth]}):{" "}
                              {formatCurrency(curUsed)}
                            </span>
                          </div>
                          <div className="mb-2 flex justify-between text-xs md:text-sm">
                            <span className="text-slate-500">Limite Usado</span>
                            <span className="font-bold text-slate-800">
                              {pct.toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                            <div
                              className={`h-2 rounded-full ${
                                pct > 80
                                  ? "bg-rose-500"
                                  : pct > 50
                                  ? "bg-orange-500"
                                  : "bg-blue-500"
                              }`}
                              style={{ width: `${pct}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-[10px] md:text-xs text-slate-400">
                            <span>
                              Disponível: {formatCurrency(card.limit - curUsed)}
                            </span>
                            <span>Total: {formatCurrency(card.limit)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-8 mb-4 flex items-center">
                    <ShoppingBag className="mr-2 text-blue-600" /> Compras
                    Parceladas
                  </h3>
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 mb-6 overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-[10px] md:text-xs uppercase tracking-wider">
                          <th className="p-3 font-semibold">Compra</th>
                          <th className="p-3 font-semibold text-center">
                            Parcelas
                          </th>
                          <th className="p-3 font-semibold text-right">
                            Valor Parcela
                          </th>
                          <th className="p-3 font-semibold text-center">
                            Estado
                          </th>
                          <th className="p-3 font-semibold text-center">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
                        {installments.map((inst) => {
                          const startMonth = inst.startDate
                            ? new Date(inst.startDate).getUTCMonth()
                            : 0;
                          const startYear = inst.startDate
                            ? new Date(inst.startDate).getUTCFullYear()
                            : new Date().getFullYear();
                          const diff =
                            (selectedYear - startYear) * 12 +
                            (selectedMonth - startMonth);
                          const paidCount =
                            diff < 0
                              ? 0
                              : Math.max(
                                  0,
                                  Math.min(inst.installmentsCount, diff + 1)
                                );
                          const isFinished =
                            paidCount >= inst.installmentsCount;
                          const isActive = diff >= 0 && !isFinished;

                          return (
                            <tr key={inst.id} className="hover:bg-slate-50">
                              <td className="p-3 font-bold text-slate-800">
                                {inst.name}{" "}
                                <span className="block font-normal text-[10px] text-slate-400">
                                  Total: {formatCurrency(inst.totalAmount)}
                                </span>
                              </td>
                              <td className="p-3 text-center font-bold text-slate-700">
                                {paidCount}/{inst.installmentsCount}x
                              </td>
                              <td className="p-3 text-right font-bold text-slate-700">
                                {formatCurrency(inst.installmentValue)}
                              </td>
                              <td className="p-3 text-center">
                                <span
                                  className={`px-2 py-1 rounded text-[10px] md:text-xs font-bold ${
                                    isFinished
                                      ? "bg-emerald-100 text-emerald-600"
                                      : isActive
                                      ? "bg-blue-100 text-blue-600"
                                      : "bg-slate-100 text-slate-500"
                                  }`}
                                >
                                  {isFinished
                                    ? "Concluída"
                                    : isActive
                                    ? "Ativa"
                                    : "Futura"}
                                </span>
                              </td>
                              <td className="p-3 text-center flex justify-center space-x-2">
                                <button
                                  onClick={() => handleEditInstallment(inst)}
                                  className="text-slate-400 hover:text-blue-500"
                                >
                                  <Edit2 size={16} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteInstallment(inst.id)
                                  }
                                  className="text-slate-400 hover:text-rose-500"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <form
                      onSubmit={handleAddInstallment}
                      className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2 border-t border-slate-100 pt-4"
                    >
                      <input
                        type="text"
                        required
                        placeholder="Ex: TV"
                        className="p-2 border rounded text-xs"
                        value={newInstallment.name}
                        onChange={(e) =>
                          setNewInstallment({
                            ...newInstallment,
                            name: e.target.value,
                          })
                        }
                      />
                      <input
                        type="number"
                        required
                        placeholder="Total R$"
                        className="p-2 border rounded text-xs"
                        value={newInstallment.totalAmount}
                        onChange={(e) =>
                          setNewInstallment({
                            ...newInstallment,
                            totalAmount: e.target.value,
                          })
                        }
                      />
                      <input
                        type="number"
                        required
                        placeholder="Meses (Ex: 10)"
                        className="p-2 border rounded text-xs"
                        value={newInstallment.installmentsCount}
                        onChange={(e) =>
                          setNewInstallment({
                            ...newInstallment,
                            installmentsCount: e.target.value,
                          })
                        }
                      />
                      <input
                        type="date"
                        required
                        className="p-2 border rounded text-xs"
                        value={newInstallment.startDate}
                        onChange={(e) =>
                          setNewInstallment({
                            ...newInstallment,
                            startDate: e.target.value,
                          })
                        }
                      />
                      <button
                        type="submit"
                        className={`text-white rounded text-xs py-2 col-span-2 md:col-span-1 ${
                          editingInstId ? "bg-orange-500" : "bg-blue-600"
                        }`}
                      >
                        {editingInstId ? "Atualizar" : "Adicionar"}
                      </button>
                    </form>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-8 mb-4 flex items-center">
                    <Banknote className="mr-2 text-blue-600" /> Dinheiro
                    Emprestado
                  </h3>
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 mb-6 overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-[10px] md:text-xs uppercase tracking-wider">
                          <th className="p-3 font-semibold">Credor</th>
                          <th className="p-3 font-semibold text-right">
                            Restante
                          </th>
                          <th className="p-3 font-semibold text-center">
                            Juros
                          </th>
                          <th className="p-3 font-semibold text-center">
                            Parcelas
                          </th>
                          <th className="p-3 font-semibold text-right">
                            Valor Parcela
                          </th>
                          <th className="p-3 font-semibold text-center">
                            Estado
                          </th>
                          <th className="p-3 font-semibold text-center">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
                        {loans.map((loan) => {
                          const startMonth = loan.startDate
                            ? new Date(loan.startDate).getUTCMonth()
                            : 0;
                          const startYear = loan.startDate
                            ? new Date(loan.startDate).getUTCFullYear()
                            : new Date().getFullYear();
                          const diff =
                            (selectedYear - startYear) * 12 +
                            (selectedMonth - startMonth);
                          const paidCount =
                            diff < 0
                              ? 0
                              : Math.max(
                                  0,
                                  Math.min(loan.installmentsCount, diff + 1)
                                );
                          const isFinished =
                            paidCount >= loan.installmentsCount;
                          const isActive = diff >= 0 && !isFinished;
                          const remainingPrincipal =
                            Math.max(0, loan.installmentsCount - paidCount) *
                            loan.installmentValue;

                          return (
                            <tr key={loan.id} className="hover:bg-slate-50">
                              <td className="p-3 font-bold text-slate-800">
                                {loan.name}
                              </td>
                              <td className="p-3 text-right font-medium">
                                <span className="block text-rose-600">
                                  {formatCurrency(remainingPrincipal)}
                                </span>
                                <span className="block text-[10px] text-slate-400 font-normal">
                                  Pego: {formatCurrency(loan.principal)}
                                </span>
                              </td>
                              <td className="p-3 text-center text-slate-500">
                                {loan.interestRate > 0
                                  ? `${loan.interestRate}% a.m.`
                                  : "-"}
                              </td>
                              <td className="p-3 text-center font-bold text-slate-700">
                                {paidCount}/{loan.installmentsCount}x
                              </td>
                              <td className="p-3 text-right font-bold text-slate-700">
                                {formatCurrency(loan.installmentValue)}
                              </td>
                              <td className="p-3 text-center">
                                <span
                                  className={`px-2 py-1 rounded text-[10px] md:text-xs font-bold ${
                                    isFinished
                                      ? "bg-emerald-100 text-emerald-600"
                                      : isActive
                                      ? "bg-orange-100 text-orange-600"
                                      : "bg-slate-100 text-slate-500"
                                  }`}
                                >
                                  {isFinished
                                    ? "Quitado"
                                    : isActive
                                    ? "Aberto"
                                    : "Futuro"}
                                </span>
                              </td>
                              <td className="p-3 text-center flex justify-center space-x-2">
                                <button
                                  onClick={() => handleEditLoan(loan)}
                                  className="text-slate-400 hover:text-blue-500"
                                >
                                  <Edit2 size={16} />
                                </button>
                                <button
                                  onClick={() => handleDeleteLoan(loan.id)}
                                  className="text-slate-400 hover:text-rose-500"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <form
                      onSubmit={handleAddLoan}
                      className="mt-4 grid grid-cols-2 md:grid-cols-6 gap-2 border-t border-slate-100 pt-4"
                    >
                      <input
                        type="text"
                        required
                        placeholder="De quem pegou?"
                        className="col-span-2 p-2 border rounded text-xs"
                        value={newLoan.name}
                        onChange={(e) =>
                          setNewLoan({ ...newLoan, name: e.target.value })
                        }
                      />
                      <input
                        type="number"
                        required
                        placeholder="Valor Pego R$"
                        className="p-2 border rounded text-xs"
                        value={newLoan.totalAmount}
                        onChange={(e) =>
                          setNewLoan({
                            ...newLoan,
                            totalAmount: e.target.value,
                          })
                        }
                      />
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Juros % a.m"
                        className="p-2 border rounded text-xs"
                        value={newLoan.interestRate}
                        onChange={(e) =>
                          setNewLoan({
                            ...newLoan,
                            interestRate: e.target.value,
                          })
                        }
                      />
                      <input
                        type="number"
                        required
                        placeholder="Meses"
                        className="p-2 border rounded text-xs"
                        value={newLoan.installmentsCount}
                        onChange={(e) =>
                          setNewLoan({
                            ...newLoan,
                            installmentsCount: e.target.value,
                          })
                        }
                      />
                      <input
                        type="date"
                        required
                        className="p-2 border rounded text-xs"
                        value={newLoan.startDate}
                        onChange={(e) =>
                          setNewLoan({ ...newLoan, startDate: e.target.value })
                        }
                      />
                      <button
                        type="submit"
                        className={`col-span-2 md:col-span-6 text-white rounded text-xs py-2 ${
                          editingLoanId ? "bg-orange-500" : "bg-blue-600"
                        }`}
                      >
                        {editingLoanId
                          ? "Atualizar Empréstimo"
                          : "Adicionar Empréstimo"}
                      </button>
                    </form>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4 flex items-center text-rose-600">
                    <ShieldAlert className="mr-2" /> Dívidas em Atraso
                  </h3>
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-rose-100 mb-6">
                    <form
                      onSubmit={handleAddDebt}
                      className="grid grid-cols-2 md:grid-cols-6 gap-2"
                    >
                      <input
                        type="text"
                        required
                        placeholder="Banco/Instituição"
                        className="col-span-2 p-2 border border-rose-200 rounded text-xs"
                        value={newDebt.institution}
                        onChange={(e) =>
                          setNewDebt({
                            ...newDebt,
                            institution: e.target.value,
                          })
                        }
                      />
                      <input
                        type="number"
                        required
                        placeholder="Valor Atual"
                        className="p-2 border border-rose-200 rounded text-xs"
                        value={newDebt.currentValue}
                        onChange={(e) =>
                          setNewDebt({
                            ...newDebt,
                            currentValue: e.target.value,
                          })
                        }
                      />
                      <input
                        type="number"
                        placeholder="Juros %"
                        className="p-2 border border-rose-200 rounded text-xs"
                        value={newDebt.interest}
                        onChange={(e) =>
                          setNewDebt({ ...newDebt, interest: e.target.value })
                        }
                      />
                      <button
                        type="submit"
                        className="col-span-2 md:col-span-2 bg-rose-600 text-white rounded text-xs py-2"
                      >
                        Registar Pendência
                      </button>
                    </form>
                  </div>
                  {overdueDebts.map((debt) => (
                    <div
                      key={debt.id}
                      className="bg-white p-4 rounded-xl border border-rose-100 flex justify-between items-center mb-2"
                    >
                      <div>
                        <p className="font-bold text-slate-800 text-sm">
                          {debt.institution}
                        </p>
                        <p className="text-xs text-rose-500 font-bold">
                          {formatCurrency(debt.currentValue)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteDebt(debt.id)}
                        className="text-rose-400 p-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "planejamento" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 md:p-8 rounded-2xl text-white shadow-md">
                  <h2 className="text-xl md:text-2xl font-bold mb-2">
                    Simulador de Independência
                  </h2>
                  <p className="text-purple-200 text-xs md:text-sm mb-6">
                    Veja o poder dos juros compostos a longo prazo.
                  </p>

                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 bg-white/10 p-4 rounded-xl">
                    <label className="font-medium text-sm">
                      Guardar mensalmente:
                    </label>
                    <div className="relative w-full md:w-64">
                      <span className="absolute left-3 top-2 text-white/70">
                        R$
                      </span>
                      <input
                        type="number"
                        className="w-full bg-white/20 border border-white/30 rounded-lg py-2 pl-10 pr-4 text-white font-bold outline-none focus:bg-white/30"
                        value={simSaving}
                        onChange={(e) => setSimSaving(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-6 md:mt-8">
                    {[1, 5, 10].map((years) => {
                      const r = selic / 100 / 12;
                      const n = years * 12;
                      const fv =
                        simSaving > 0
                          ? simSaving * ((Math.pow(1 + r, n) - 1) / r)
                          : 0;
                      return (
                        <div
                          key={years}
                          className="bg-white/10 border border-white/20 p-4 rounded-xl text-center"
                        >
                          <p className="text-xs md:text-sm text-purple-200 mb-1">
                            Em {years} {years === 1 ? "ano" : "anos"}
                          </p>
                          <h4 className="text-lg md:text-2xl font-bold">
                            {formatCurrency(fv)}
                          </h4>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </>
        </div>
      </main>
    </div>
  );
}
