import { useContext, useLayoutEffect } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../UI/Button";
import { ExpensesContext } from "../component/Expenses-context";
import ExpensesForm from "../component/ExpensesForm";



export default function ManageExpense({route, navigation}) {
    const expensesCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEdited = !!editedExpenseId; // convert to boolean

    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);

    useLayoutEffect(() =>{
      navigation.setOptions({
        title: isEdited ? 'Edit Expense' : 'Add Expense'
    });
    }, [navigation, isEdited]);
    
    function deleteExpense(){
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
      
    }

    function cancelHandler(){
      navigation.goBack();
    }

    function confirmHandler(expenseData){
      if(isEdited){
        expensesCtx.updateExpense(editedExpenseId, expenseData);
      }else{
        expensesCtx.addExpense(expenseData);
      }
     navigation.goBack();
    }
  
  return (
    <View style={styles.container}>
      <ExpensesForm 
       submitButtonLabel={isEdited ? 'Update' : 'Add'} 
       onSubmit={confirmHandler}
       onCancel={cancelHandler} 
       defaultV = {selectedExpense}
      />
      {isEdited && (
        <View style={styles.deleteContainer}>
          <IconButton icon="trash" onPress={deleteExpense} color={GlobalStyles.colors.error50} size={36} />
        </View> 
      )}
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 24
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
});

