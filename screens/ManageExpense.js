import { useContext, useLayoutEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../UI/Button";
import { ExpensesContext } from "../component/Expenses-context";
import ExpensesForm from "../component/ExpensesForm";
import storeExp, { deleteExp, updateExp } from "../util/http";
import LoadingOv from "../UI/LoadingOv";
import ErrorgOv from "../UI/ErrorOv";


export default function ManageExpense({route, navigation}) {
    const [isSubmitting, setIsSubmitting] =  useState(false);  // button loading state
    const[error, setError] = useState(); 
    const expensesCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEdited = !!editedExpenseId; // convert to boolean

    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);

    useLayoutEffect(() =>{
      navigation.setOptions({
        title: isEdited ? 'Edit Expense' : 'Add Expense'
    });
    }, [navigation, isEdited]);
    
    async function deleteExpense(){
      setIsSubmitting(true);
      try {
        await deleteExp(editedExpenseId);
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
      } catch (error) {
          setError('Could not delete expense! - please try again later.');
          setIsSubmitting(false);
      }
    }

    function cancelHandler(){
      navigation.goBack();
    }

    async function  confirmHandler(expenseData){
      setIsSubmitting(true);
      try{
        if(isEdited){
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExp(editedExpenseId, expenseData);
        }else{
         const id = await storeExp(expenseData);
        expensesCtx.addExpense({...expenseData, id: id});
        }
       navigation.goBack(); 
      } catch (error) {
        setError('Could not save expense! - please try again later.');
        setIsSubmitting(false);
      }  
    }

    function errorHandler(){
      setError(null);
    }
    if(error && !isSubmitting){
      return <ErrorgOv message={error} onCofirm={errorHandler} />;
    }

    if(isSubmitting){
      return <LoadingOv />;

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

