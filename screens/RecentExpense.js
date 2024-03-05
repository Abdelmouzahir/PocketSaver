import { Text, View } from "react-native";
import ExpensesOutput from "../component/ExpensesOutput";

export default function RecentExpense() {
  return (
    <ExpensesOutput expensesPeriod={"Last 7 days"}/>
  );
}