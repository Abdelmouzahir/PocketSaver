import { createContext, useReducer } from "react";

const DUMMY_Expenses = [
    {id: 'e1', description: 'New Shoes', amount: 99.99, date: new Date(2021, 7, 14)},
    {id: 'e2', description: 'New Shirt', amount: 59.99, date: new Date(2021, 5, 14)},
    {id: 'e3', description: 'New Pants', amount: 79.99, date: new Date(2021, 2, 14)},
    {id: 'e4', description: 'New Socks', amount: 19.99, date: new Date(2021, 1, 14)}
];

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {}, 
    setExpense: (expenses) => {},
    updateExpense: (id, {description, amount, date}) => {},
});

function expReducer(state, action) {
    switch(action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id}, ...state];
        case 'UPDATE':
            const expenseIndex = state.findIndex(expense => expense.id === action.payload.id);
            const updatedExpenses = [...state];
            updatedExpenses[expenseIndex] = {...updatedExpenses[expenseIndex], ...action.payload.data};
            return updatedExpenses;
         case 'REMOVE':
            return state.filter(expense => expense.id !== action.payload);
        default:
            return state;
    }
 }
 

export default function ExpensesContextProvider({children}) {
    const [expenseState, dispatch] = useReducer(expReducer, DUMMY_Expenses);
 
    function addExpense(expenseData){
      dispatch({type: 'ADD' , payload: expenseData}); 
    }
    function setExpense(expenses){
        dispatch({type: 'SET', payload: expenses});
    }
 
     function deleteExpense(id){
          dispatch({type: 'REMOVE', payload: id});
     }
 
     function updateExpense(id, expenseData){
         dispatch({type: 'UPDATE', payload: {id: id , data: expenseData}});
     }
     const value = {
         expenses: expenseState,
         setExpense: setExpense,
         addExpense,
         deleteExpense,
         updateExpense,
     };
 
     return (
         <ExpensesContext.Provider value={value}>
             {children}
         </ExpensesContext.Provider>
     );
 }
 