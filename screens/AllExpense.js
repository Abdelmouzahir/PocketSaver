import { Text, View, Image, StyleSheet } from "react-native";
import ExpensesOutput from "../component/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../component/Expenses-context";

export default function AllExpense() {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallbackText={
        <View style={styles.fallbackContainer}>
          <Text style={styles.text}>No registered expenses found.</Text>
          <Image
            source={require("../assets/wallet.png")}
            style={styles.img}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center", // vertical centering
    alignItems: "center",     // horizontal centering
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  img: {
    marginTop: 22,
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
