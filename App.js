import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardScreen from './screens/OnBoardScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Cart" component={CartScreen} 
        // options={{
        //   headerStyle: {
        //     backgroundColor: "#F9813A"
        //   }
        // }}
        />
        <Stack.Screen name="OnBoard" component={OnBoardScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerShown: false,
          gestureEnabled: false
        }}/>
        {/* <Stack.Screen name="Cart" component={CartScreen}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;