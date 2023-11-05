import { useLoaderData } from "@remix-run/react";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";
import { getExpenses } from "~/data/expenses.server";
import { requireUserSession } from "~/data/auth.server";

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  return getExpenses(userId);
}

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData();
  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}
