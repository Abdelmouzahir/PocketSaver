import React from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import { GlobalStyles } from "../constants/styles";

export default function AlertModal({
  visible,
  title,
  message,
  onCancel,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>
          <View style={styles.actions}>
            <Pressable onPress={onCancel} style={[styles.actionBtn, styles.cancel]}>
              <Text style={[styles.actionText, styles.cancelText]}>{cancelLabel}</Text>
            </Pressable>
            <Pressable onPress={onConfirm} style={[styles.actionBtn, styles.confirm]}>
              <Text style={[styles.actionText, styles.confirmText]}>{confirmLabel}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  modalMessage: {
    fontSize: 14,
    color: "#111",
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  cancel: {
    backgroundColor: "#eee",
  },
  confirm: {
    backgroundColor: GlobalStyles.colors.error50,
  },
  actionText: {
    fontWeight: "600",
  },
  confirmText: {
    color: "white",
  },
  cancelText: {
    color: GlobalStyles.colors.primary500,
  },
});
