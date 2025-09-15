//dashboard screen expenses
import { Text, View, Image, StyleSheet } from "react-native";
import DashContent from "../component/Dash-content";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../component/Expenses-context";
import { fetchExpenses } from "../util/http";
import LoadingOv from "../UI/LoadingOv";
import ErrorgOv from "../UI/ErrorOv";



export default function Dashboard() {

  const expensesCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  const[error, setError] = useState();
    useEffect(() => {
    async function getExpenses() {
        setIsFetching(true);
        try {
            const expenses = await fetchExpenses();
            expensesCtx.setExpense(expenses);
        } catch (error) {
            setError('Dashboard Not Found!');
        }
        setIsFetching(false);
    }
    getExpenses();
    }, []);
    function errorHandler(){
        setError(null);
        }
        if(error && !isFetching){
            return <ErrorgOv message={error} onCofirm={errorHandler} />;
            }
        if (isFetching) {
            return <LoadingOv />;
        }
    return (
         <DashContent />
    );
}


const styles = StyleSheet.create({
    fallbackContainer: {
        flex: 1,
        justifyContent: "center", // vertical centering
        alignItems: "center",     // horizontal centering
        paddingHorizontal: 16,
        paddingVertical: 24,
      },
        text: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        },

        img: {

        marginTop: 22,
        width: 200,
        height: 200,
        resizeMode: "contain",
            
        },
    });
