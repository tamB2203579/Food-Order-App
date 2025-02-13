import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions } from 'react-native';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/colors';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('screen');

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.grey, 
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderRadius: 50,
          position: 'absolute',
          bottom: 30,
          height: 60,
          width: width * 0.4,
          left: width / 2 - (width * 0.4) / 2,
          alignSelf: 'center',
          borderColor: COLORS.primary,
          borderWidth: 2,
          borderTopColor: COLORS.primary,
          borderTopWidth: 2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={24} color={color} style={[styles.icon, { left: '35%' }]}/>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="person" size={24} color={color} style={[styles.icon, { right: '35%' }]} />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = {
  icon: {
    position: 'absolute',
    top: '50%', 
  },
};

export default HomeTabNavigator;
