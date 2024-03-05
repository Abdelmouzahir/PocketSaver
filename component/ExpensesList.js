import {Text, View, FlatList} from 'react-native';
import ExpensesItem from './ExpensesItem';

function renderExItem(itemData) {
    return  <ExpensesItem {...itemData.item} />
    
}

export default function ExpensesList({expenses}) {
    return(
       <FlatList data={expenses} renderItem={renderExItem} keyExtractor={(item) =>item.id }/>
    )
}