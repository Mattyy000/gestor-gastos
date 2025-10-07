import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function BudgetTracker() {
  const { state, totalExpenses, avaibleBudget, dispatch } = useBudget();

  const percetage = +((totalExpenses / state.budget) * 100).toFixed(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percetage}
          styles={buildStyles({
            pathColor: percetage === 100 ? "#DC2626" : "#3b82f6",
            trailColor: "#f5f5f5",
            textSize: 8,
          })}
          text={`${percetage}% Gastado`}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg hover:bg-pink-800 cursor-pointer"
          onClick={() => dispatch({ type: "reset" })}
        >
          Resetear App
        </button>
        <AmountDisplay label="Presupuesto" amount={state.budget} />
        <AmountDisplay label="Disponible" amount={avaibleBudget} />
        <AmountDisplay label="Gastado" amount={totalExpenses} />
      </div>
    </div>
  );
}
