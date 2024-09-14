import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardScreen from './screens/OnBoardScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import CartScreen from './screens/CartScreen';
import AntDesign from '@expo/vector-icons/AntDesign';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="Cart" component={CartScreen} 
        options={{
          headerStyle: {
            backgroundColor: "#F9813A",
            
          },
          title: "Order",
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: 'bold'
          },
          headerLeft: () => (
            <AntDesign name="left" size={24} color="black" 
            onPress={() => navigation.goBack()}
            />
            // <AntDesign 
            //   name="arrowleft" 
            //   size={24} 
            //   color="white" 
            //   style={{ marginLeft: 10 }} 
            //   onPress={() => navigation.navigate('Home')} // Tuỳ chỉnh hành động điều hướng
            // />
          ),
          
        }}
        /> */}
        <Stack.Screen name="OnBoard" component={OnBoardScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerShown: false,
          gestureEnabled: false,
        
        }}/>
        <Stack.Screen name="Cart" component={CartScreen}/>
        <Stack.Screen name="Details" component={DetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;