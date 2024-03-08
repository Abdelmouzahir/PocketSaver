import { useContext, useLayoutEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../UI/Button";
import { ExpensesContext } from "../component/Expenses-context";


export default function ManageExpense({route, navigation}) {
    const expensesCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEdited = !!editedExpenseId; // convert to boolean

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

    function AddorEditHandler(){
      if(isEdited){
        expensesCtx.editExpense(editedExpenseId, expenseData);
      }else{
        expensesCtx.addExpense(expenseData);
      }
     navigation.goBack();
    }
  
  return (
    <View style={styles.container}>
       <View style={styles.buttons}>
        <Button style={styles.button}  mode="flat" onPress={cancelHandler}>Cancel</Button>
        <Button  style={styles.button} onPress={AddorEditHandler}>{isEdited ? 'Update' : 'Add' }</Button>
       </View>
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
  },
  buttons : {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
});

