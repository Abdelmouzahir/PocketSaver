import {Text, View, StyleSheet} from 'react-native';
import { GlobalStyles } from '../constants/styles';

export default function ExpensesSummary({expenses,periodName}) {
    const expensesSum = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    return(
         <View  style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.sum} > ${expensesSum.toFixed(2)}</Text>
         </View>     
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    period:{
        color: GlobalStyles.colors.primary50,
        fontSize: 12
    },
    sum: {
        color: GlobalStyles.colors.primary50,
        fontSize: 16,
        fontWeight:'bold'
    }
});