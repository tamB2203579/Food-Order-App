import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from './components/CartContext';
import OnBoardScreen from './screens/OnBoardScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeTabNavigator from './screens/HomeTabNavigator';
import DetailsScreen from './screens/DetailsScreen';
import CartScreen from './screens/CartScreen';
import DeliveryScreen from './screens/DeliveryScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="OnBoard" component={OnBoardScreen}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{ gestureEnabled: false }}/>
          <Stack.Screen name="SignUp" component={SignUpScreen}/>
          <Stack.Screen name="HomeTab" component={HomeTabNavigator} options={{ gestureEnabled: false }}/>
          <Stack.Screen name="Details" component={DetailsScreen}/>
          <Stack.Screen name="Cart" component={CartScreen}/>
          <Stack.Screen name="Delivery" component={DeliveryScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

export default App;