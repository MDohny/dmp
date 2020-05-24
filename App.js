import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from "./navigation/StackNavigator.js";

export default function App() {
  return (
    <StackNavigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    button: {
      backgroundColor: '#38686A',
      padding: 5,
      width: 200,
      alignItems: 'center',
      justifyContent: 'center',
      width : "100%"
    },
    buttonText : {
        fontSize : 20,
        color: "#fff"
        
    }
});
