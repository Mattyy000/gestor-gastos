import { categories } from "../db/categories";
import { useBudget } from "../hooks/useBudget";
import type { ChangeEvent } from "react";

export default function FilterByCategories() {
  const { dispatch } = useBudget();
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "app-filter", payload: { id: e.target.value } });
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-10 ">
      <div className="flex flex-col md:flex-row md:items-center gap-5 ">
        <label htmlFor="category">Filtrar por Categoria</label>
        <select
          name="category"
          id="category"
          className="bg-slate-100 p-3 flex-1 rounded"
          onChange={handleChange}
        >
          <option value="">--- Todas las categorias ---</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
