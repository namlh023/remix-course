import { Link, Outlet, useMatches } from "@remix-run/react";
import expensesStyle from "~/styles/expenses.css";
import ExpensesList from "~/components/expenses/ExpensesList";

export default function ExpensesPage() {
  const matches = useMatches();
  const expenses = matches.find((matche) => matche.id === "routes/expenses");
  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <span>Add expense</span>
          </Link>
          <a href="/expenses/raw">Load raw expense</a>
        </section>
        <ExpensesList expenses={expenses.data} />
      </main>
    </>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: expensesStyle }];
}

export const handle = { disableJS: true };
