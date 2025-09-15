import { useContext } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../component/Expenses-context";

// Categories with emoji labels for display and plain values for logic
const CATEGORIES = [
  { label: "Rent or morgage 🏠", value: "Rent or morgage" },
  { label: "Food 🍔", value: "Food" },
  { label: "Transport 🚗", value: "Transport" },
  { label: "Bills 📃", value: "Bills" },
  { label: "Entertainment 🎮", value: "Entertainment" },
  { label: "Shopping 🛍️", value: "Shopping" },
  { label: "Health 💊", value: "Health" },
  { label: "Other 🛒", value: "Other" },
];

export default function DashContent() {
  const { expenses } = useContext(ExpensesContext);

  const totalAmount = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0).toFixed(2);
  const hasExpenses = expenses.length > 0;

  // Calculate totals per category
  const categoryTotals = CATEGORIES.map(({ label, value }) => {
    const total = expenses
      .filter((exp) => exp.category === value)
      .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    return { label, total: total.toFixed(2) };
  });

  return (
    <View style={styles.container}>
      {hasExpenses ? (
        <>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryText}>Total Expenses</Text>
            <Text style={styles.amount}>${totalAmount}</Text>
            <Text style={styles.count}>
              {expenses.length} {expenses.length === 1 ? "entry" : "entries"}
            </Text>
          </View>

          <View style={styles.categoryList}>
            <Text style={styles.categoryHeader}>By Category</Text>
            {categoryTotals.map(({ label, total }) => (
              <View key={label} style={styles.categoryItem}>
                <Text style={styles.categoryLabel}>{label}</Text>
                <Text style={styles.categoryAmount}>${total}</Text>
              </View>
            ))}
          </View>
        </>
      ) : (
        <View style={styles.emptyState}>
          <Image source={require("../assets/report.png")} style={styles.image} />
          <Text style={styles.emptyText}>No expenses registered yet.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  summaryBox: {
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 18,
    color: GlobalStyles.colors.primary50,
    marginBottom: 8,
  },
  amount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  count: {
    fontSize: 16,
    color: GlobalStyles.colors.primary200,
    marginTop: 4,
  },
  categoryList: {
    marginTop: 10,
  },
  categoryHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary50,
    marginBottom: 12,
    textAlign: "center",
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: GlobalStyles.colors.primary600,
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
  },
  categoryLabel: {
    color: GlobalStyles.colors.primary50,
    fontSize: 16,
  },
  categoryAmount: {
    color: "black", // 👈 updated to black as requested
    fontWeight: "bold",
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 64,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
});