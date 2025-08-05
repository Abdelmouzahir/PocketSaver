import { Text, View,Image, StyleSheet } from "react-native";
import ExpensesOutput from "../component/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../component/Expenses-context";

export default function AllExpense() {
   const walletImg = <Image source={require('../assets/wallet.png')} style={{width: 200, height: 200, alignSelf: 'center'}} />;
   const expensesCtx =  useContext(ExpensesContext);

   const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();

   });
  return (
   <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" fallbackText={<View>
                                                                                          <Text style={styles.text}>No registered expenses found.</Text>
                                                                                           <View style={styles.img}>
                                                                                             {walletImg}
                                                                                            </View>
                                                                                         </View>} />
);
}




const styles = StyleSheet.create({
    text:{
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        
    },
    img:{
       marginTop: 22
    }
});