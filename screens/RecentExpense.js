import { Text, View, Image } from "react-native";
import ExpensesOutput from "../component/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../component/Expenses-context";
import { getDateMinusDays } from "../util/date";


export default function RecentExpense() {
  const expenseImg = <Image source={require('../assets/expenses.png')} style={{width: 200, height: 200, alignSelf: 'center'}} />;
  const expensesCtx =  useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const last7days = getDateMinusDays(today, 7)

    return (expense.date >= last7days) && (expense.date <= today);
  });
  
  return (
    <ExpensesOutput  expenses={recentExpenses} expenseexpensesPeriod="Last 7 days" fallbackText={<><Text>No expenses registred for the last 7 days.</Text>{expenseImg}</>}/>
  );
}