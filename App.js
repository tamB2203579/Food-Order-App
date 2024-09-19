import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardScreen from './screens/OnBoardScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import CartScreen from './screens/CartScreen';
import { CartProvider } from './components/CartContext';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="OnBoard" component={OnBoardScreen}/>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="SignUp" component={SignUpScreen}/>
          <Stack.Screen name="Home" component={HomeScreen} options={{ gestureEnabled: false }}/>
          <Stack.Screen name="Details" component={DetailsScreen}/>
          <Stack.Screen name="Cart" component={CartScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

export default App;