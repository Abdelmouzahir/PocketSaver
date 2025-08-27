import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { GlobalStyles } from "../constants/styles";

export default function ExpensesDefinedBudget({ expenses }) {
  const [budget, setBudget] = useState(null);
  const [tempBudget, setTempBudget] = useState("");
  const [showModal, setShowModal] = useState(false);

  const expensesSum = useMemo(
    () => expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
    [expenses]
  );

  const hasAlertedRef = useRef(false);

  useEffect(() => {
    if (budget == null) {
      hasAlertedRef.current = false;
      return;
    }
    if (expensesSum > budget && !hasAlertedRef.current) {
      hasAlertedRef.current = true;
      Alert.alert("Budget exceeded", "Your expenses are over the budget!");
    } else if (expensesSum <= budget) {
      hasAlertedRef.current = false;
    }
  }, [expensesSum, budget]);

  const openModal = () => {
    setTempBudget(budget != null ? String(budget) : "");
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const saveBudget = () => {
    const value = parseFloat(tempBudget.replace(",", "."));
    if (isNaN(value) || value < 0) {
      Alert.alert("Invalid amount", "Please enter a valid non-negative number.");
      return;
    }
    setBudget(value);
    hasAlertedRef.current = false;
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      {/* Make the label clickable */}
      <Pressable onPress={openModal} hitSlop={8}>
        <Text style={styles.period}>
          {budget == null ? "Tap to set budget" : `Budget: $${budget.toFixed(2)}`}
        </Text>
      </Pressable>

      {/* Right: amount */}
      <Text
        style={[
          styles.sum,
          budget != null && expensesSum > budget ? styles.sumOver : null,
        ]}
      >
        ${expensesSum.toFixed(2)}
      </Text>

      {/* Popup for entering budget */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.backdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Set your budget 💵</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 500"
              keyboardType="numeric"
              value={tempBudget}
              onChangeText={setTempBudget}
              returnKeyType="done"
              onSubmitEditing={saveBudget}
            />
            <View style={styles.actions}>
              <Pressable onPress={closeModal} style={[styles.actionBtn, styles.cancel]}>
                <Text style={[styles.actionText , styles.cancelText]}>Cancel</Text>
              </Pressable>
              <Pressable onPress={saveBudget} style={[styles.actionBtn, styles.save]}>
                <Text style={[styles.actionText, styles.saveText]}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    color: GlobalStyles.colors.primary50,
    fontSize: 12,
    textDecorationLine: "underline", // hint it's clickable
  },
  sum: {
    color: GlobalStyles.colors.primary50,
    fontSize: 16,
    fontWeight: "bold",
  },
  sumOver: {
    color: "#ff3b30",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: GlobalStyles.colors.primary700,
    borderRadius: 10,
    padding: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#111",
  },
  input: {
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary100,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    color: "#111",
    backgroundColor: GlobalStyles.colors.primary100,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 12,
  },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  cancel: {
    backgroundColor: "#eee",
  },
  save: {
    backgroundColor: GlobalStyles.colors.primary500,
  },
  actionText: {
    fontWeight: "600",
  },
  saveText: {
    color: "white",
  },
  cancelText: {
    color: GlobalStyles.colors.primary500,
  },
});
