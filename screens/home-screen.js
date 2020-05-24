import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { handleImageTake } from "../utils/image-funcs.js";


const dummyDigits = [ "1", "2", "5" ]

export default class HomeScreen extends React.Component {
  render() {
    return (
    <View style={styles.container}>
      <TouchableOpacity
      onPress={() => handleImageTake().then(() => {
          this.props.navigation.navigate("Predict Screen");
    })}
      style={styles.button}
      >
        <Text style={styles.buttonText}>
            TAKE AN IMAGE
        </Text>
      </TouchableOpacity>
    </View>
  );
      }
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
