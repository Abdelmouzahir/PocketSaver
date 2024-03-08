import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpense';
import RecentExpense from './screens/RecentExpense';
import AllExpense from './screens/AllExpense';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './UI/IconButton';
import ExpensesContextProvider from './component/Expenses-context';
import {StyleSheet } from 'react-native';


const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function ExpensesOverview() {
  
  return (
    <BottomTab.Navigator screenOptions={ ({ navigation }) => ({
       headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: GlobalStyles.colors.primary50,
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.primary50,
        headerRight: ({tintColor}) => <IconButton icon="add" onPress={() => {navigation.navigate('ManageExpense')}} color={tintColor} size={24} />
    })}>
      <BottomTab.Screen name="RecentExpense" component={RecentExpense} options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="hourglass" color={color} size={size} />
        )
      }} />
      <BottomTab.Screen name="AllExpense" component={AllExpense} options={{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({ color, size }) => (
          <Ionicons  name="calendar" color={color} size={size} />
        )
      
      }} />
    </BottomTab.Navigator>
  );

}


export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
       <NavigationContainer>
         <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: GlobalStyles.colors.primary50
         }}>
           <Stack.Screen name="ExpensesOverview" component={ExpensesOverview}  options={{headerShown: false}}/>
           <Stack.Screen name="ManageExpense" component={ManageExpense} options={{presentation: 'modal'}} />  
        </Stack.Navigator>
       </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

