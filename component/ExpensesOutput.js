import { View, StyleSheet, Text } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../constants/styles";
import ExpensesDefinedBudget from "./ExpensesDefinedBudget";

export default function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
  const isEmpty = !expenses || expenses.length === 0;

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesDefinedBudget expenses={expenses} setBudget={0} />

      <View style={styles.body}>
        {isEmpty ? (
          <View style={styles.emptyWrap}>
            {typeof fallbackText === "string" ? (
              <Text style={styles.infoText}>{fallbackText}</Text>
            ) : (
              fallbackText
            )}
          </View>
        ) : (
          <View style={styles.listWrap}>
            <ExpensesList expenses={expenses} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  body: {
    flex: 1, // give the area under the headers space
  },
  listWrap: {
    flex: 1,
  },
  emptyWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 64, // keeps away from iOS home indicator
  },
  infoText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
