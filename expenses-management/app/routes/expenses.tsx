import { Outlet } from "@remix-run/react";
import expensesStyles from "~/styles/expenses.css";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import { getExpenses } from "~/data/expenses.server";
import { requireUserSession } from "~/data/auth.server";

export default function Expenses() {
  return (
    <main>
      <ExpensesHeader />
      <h1>Expenses</h1>
      <Outlet />
    </main>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);
  // if (!expenses || expenses.length === 0) {
  //   throw json(
  //     { message: "Could not find any expenses" },
  //     { status: 404, statusText: "Not found" }
  //   );
  // }
  return expenses;
}
