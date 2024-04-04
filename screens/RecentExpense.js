import { Text, View, Image } from "react-native";
import ExpensesOutput from "../component/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../component/Expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOv from "../UI/LoadingOv";
import ErrorgOv from "../UI/ErrorOv";

export default function RecentExpense() {
  const expensesCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  const[error, setError] = useState(); 

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpense(expenses);
      } catch (error) {
        setError('Could NOt fetch expenses!');
      }
      setIsFetching(false);
    }

    getExpenses();
  }, []);

  function errorHandler(){
    setError(null);
  }

  if(error && !isFetching){
    return <ErrorgOv message={error} onCofirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOv />;
  }

  const expenseImg = <Image source={require('../assets/expenses.png')} style={{ width: 200, height: 200, alignSelf: 'center' }} />;

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const last7days = getDateMinusDays(today, 7);

    return (expense.date >= last7days) && (expense.date <= today);
  });

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days" fallbackText={<><Text>No expenses registered for the last 7 days.</Text>{expenseImg}</>} />
  );
}
