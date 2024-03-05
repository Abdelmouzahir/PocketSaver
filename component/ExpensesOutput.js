import { View, StyleSheet} from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../constants/styles';

const DUMMY_Expenses = [
    {id: 'e1', description: 'New Shoes', amount: 99.99, date: new Date(2021, 7, 14)},
    {id: 'e2', description: 'New Shirt', amount: 59.99, date: new Date(2021, 7, 14)},
    {id: 'e3', description: 'New Pants', amount: 79.99, date: new Date(2021, 7, 14)},
    {id: 'e4', description: 'New Socks', amount: 19.99, date: new Date(2021, 7, 14)}
];
export default function ExpensesOutput({expenses, expensesPeriod}) {
    return(
        <View style={styles.container} >
         <ExpensesSummary expenses={DUMMY_Expenses} periodName={expensesPeriod} />
         <ExpensesList expenses={DUMMY_Expenses} />
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
    }
});