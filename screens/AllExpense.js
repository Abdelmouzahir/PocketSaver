import { Text, View,Image } from "react-native";
import ExpensesOutput from "../component/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../component/Expenses-context";

export default function AllExpense() {
   const walletImg = <Image source={require('../assets/wallet.png')} style={{width: 200, height: 200, alignSelf: 'center'}} />;
   const expensesCtx =  useContext(ExpensesContext);

   const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();

   });
  return (
   <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" fallbackText={<><Text>No registered expenses found.</Text>{walletImg}</>} />
  );
}