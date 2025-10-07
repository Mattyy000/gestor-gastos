/* eslint-disable react-refresh/only-export-components */
import { useReducer, createContext, useMemo } from "react";
import type { Dispatch, ReactNode } from "react";
import { budgetReducer, initialState } from "../redurcers/budget-reducer";
import type { BudgetActions, BudgetState } from "../redurcers/budget-reducer";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  totalExpenses: number;
  avaibleBudget: number;
};

type BudgetProviderProps = {
  children: ReactNode;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpenses = useMemo(
    () => state.expenses.reduce((total, expense) => expense.amount + total, 0),
    [state.expenses]
  );
  const avaibleBudget = state.budget - totalExpenses;

  return (
    <BudgetContext.Provider
      value={{ state, dispatch, totalExpenses, avaibleBudget }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
