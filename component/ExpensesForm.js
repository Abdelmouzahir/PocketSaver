import { View, StyleSheet, Text } from "react-native";
import Input from "./Input";
import { GlobalStyles } from "../constants/styles";
import { useState } from "react";
import Button from "../UI/Button";
import { Picker } from "@react-native-picker/picker";

export default function ExpensesForm({ submitButtonLabel, onCancel, onSubmit, defaultV }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultV ? defaultV.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultV ? defaultV.date.toISOString().slice(0, 10) : '',
      isValid: true,
    },
    description: {
      value: defaultV ? defaultV.description : '',
      isValid: true,
    },
    category: {
      value: defaultV ? defaultV.category : '',
      isValid: true,
    },
  });

  function inputChangedHandler(inputKey, enteredValue) {
    setInputs((currentInputs) => ({
      ...currentInputs,
      [inputKey]: { value: enteredValue, isValid: true },
    }));
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
      category: inputs.category.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;
    const categoryIsValid = expenseData.category.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid || !categoryIsValid) {
      setInputs((currentInputs) => ({
        amount: { value: currentInputs.amount.value, isValid: amountIsValid },
        date: { value: currentInputs.date.value, isValid: dateIsValid },
        description: { value: currentInputs.description.value, isValid: descriptionIsValid },
        category: { value: currentInputs.category.value, isValid: categoryIsValid },
      }));
      return;
    }

    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expenses 💸</Text>
      <View style={styles.container}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputs.date.value,
          }}
        />
      </View>

      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value: inputs.description.value,
        }}
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Category</Text>
        <Picker
          selectedValue={inputs.category.value}
          onValueChange={(itemValue) => inputChangedHandler('category', itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select a category" value="" />
          <Picker.Item label="Rent or Morgage" value="Rent or morgage" />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Transport" value="Transport" />
          <Picker.Item label="Bills" value="Bills" />
          <Picker.Item label="Entertainment" value="Entertainment" />
          <Picker.Item label="Shopping" value="Shopping" />
          <Picker.Item label="Health" value="Health" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <Text style={styles.errorText}>
        {!inputs.amount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid ||
        !inputs.category.isValid
          ? 'Please provide valid inputs'
          : ''}
      </Text>

      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary50,
    marginVertical: 24,
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  rowInput: {
    flex: 1,
  },
  pickerContainer: {
    marginTop: 16,
    marginHorizontal: 8,
    borderRadius: 12,
  },
  pickerLabel: {
    fontSize: 16,
    color: GlobalStyles.colors.primary50,
    marginBottom: 4,
    borderRadius: 12,
  },
  picker: {
    borderRadius: 12,
    backgroundColor: GlobalStyles.colors.primary100,

  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    margin: 8,
  },
});