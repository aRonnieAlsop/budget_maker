import Image from "next/image";
import BudgetForm from "./components/BudgetForm";

export default function Home() {
  return (
    <div className="budget-form">
      {/* Budget Form:*/}
      <h1>Budget</h1>
      <BudgetForm />
    </div>
  );
}
