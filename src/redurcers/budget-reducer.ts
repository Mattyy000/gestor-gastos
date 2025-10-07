import { v4 as uuid } from "uuid";
import type { Category, DraftExpense, Expense } from "../types";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal" }
  | { type: "close-modal" }
  | { type: "add-expense"; payload: { expense: DraftExpense } }
  | { type: "remove-expense"; payload: { id: Expense["id"] } }
  | { type: "get-expense-by-id"; payload: { id: Expense["id"] } }
  | { type: "update-expense"; payload: { expense: Expense } }
  | { type: "reset" }
  | { type: "app-filter"; payload: { id: Category["id"] } };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
  currentCategory: Category["id"];
};

const initialBudget = () => {
  const localStorageBudget = localStorage.getItem("budget");
  return localStorageBudget ? Number(localStorageBudget) : 0;
};

const localStorageExpenses = () => {
  const localStorageExpenses = localStorage.getItem("expenses");
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: localStorageExpenses(),
  editingId: "",
  currentCategory: "",
};

const createExpense = (draftExpense: DraftExpense): Expense => {
  return {
    ...draftExpense,
    id: uuid(),
  };
};

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  if (action.type === "add-budget") {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }

  if (action.type === "show-modal") {
    return {
      ...state,
      modal: true,
    };
  }

  if (action.type === "close-modal") {
    return {
      ...state,
      modal: false,
      editingId: "",
    };
  }

  if (action.type === "add-expense") {
    const expense = createExpense(action.payload.expense);

    return {
      ...state,
      expenses: [...state.expenses, expense],
      // modal: false, (Cerrar el modal al cargar los datos)
    };
  }

  if (action.type === "remove-expense") {
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id != action.payload.id
      ),
    };
  }

  if (action.type === "get-expense-by-id") {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true,
    };
  }

  if (action.type === "update-expense") {
    return {
      ...state,
      expenses: state.expenses.map((expense) =>
        expense.id === action.payload.expense.id
          ? action.payload.expense
          : expense
      ),
      modal: false,
      editingId: "",
    };
  }

  if (action.type === "reset") {
    return {
      ...state,
      budget: 0,
      expenses: [],
    };
  }

  if (action.type === "app-filter") {
    return {
      ...state,
      currentCategory: action.payload.id,
    };
  }

  return state;
};
