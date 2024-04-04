import axios from "axios";

const BACKEND_URL = "https://pocketsaver-df153-default-rtdb.firebaseio.com";

export default async function storeExp(expenseData){
   const response = await axios.post(BACKEND_URL + '/expenses.json', expenseData);
   const id = response.data.name; // The name field in firebase returns the key for the object
   return id;
}

export async function fetchExpenses(){
    const response = await axios.get( BACKEND_URL + '/expenses.json');

    const expenses = [];
    for(const key in response.data){
    const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: new Date(response.data[key].date),
        description: response.data[key].description
    };
    expenses.push(expenseObj); 
    }
    return expenses;
 }

export function updateExp(id, expenseData){
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExp(id){
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
