import { createContext, useReducer } from "react";


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    setExpense : (expenses) => {},
    deleteExpense: (id) => {}, 
    setExpense: (expenses) => {},
    updateExpense: (id, {description, amount, date}) => {},
});

function expReducer(state, action) {
    switch(action.type) {
        case 'ADD':
            //const id = new Date().toString() + Math.random().toString(); own id 
            const id = action.payload.id;
            return [{...action.payload, id: id}, ...state];
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
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
    const [expenseState, dispatch] = useReducer(expReducer, []);
 
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
 