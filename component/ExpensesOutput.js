import { View, StyleSheet, Text} from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../constants/styles';
import ExpensesDefinedBudget from './ExpensesDefinedBudget';


export default function ExpensesOutput({expenses, expensesPeriod, fallbackText}) {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>;
    if(expenses.length > 0){
        content = (
            <View>
                <ExpensesList expenses={expenses} />
            </View>
        );
    }else{
        content = <Text style={styles.infoText}>{fallbackText}</Text>;
    }
    return(
        <View style={styles.container} >
         <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
         <ExpensesDefinedBudget expenses={expenses} setBudget={0} />
         {content}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
        flex: 1
    },
    infoText:{
        color: "black",
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 80,
        flex: 1
        
    }
});