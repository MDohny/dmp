import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from '../screens/home-screen';
import PredictScreen from '../screens/predict-screen';

const Stack = createStackNavigator()

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home Screen">
        <Stack.Screen name='Home Screen' component={HomeScreen} />
        <Stack.Screen name='Predict Screen' component={PredictScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
