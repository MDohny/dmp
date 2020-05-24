import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { handleAudioDigits } from "../utils/audio-funcs.js";
import { useNavigation } from '@react-navigation/native';

const dummyDigits = [ "1", "2", "5" ]

export default class PredictScreen extends React.Component {
    constructor(props){
        super(props);
    }
    
    state = {
        image : this.props.route.params.predictedImage,
        digits : this.props.route.params.predictedDigits
    }
    
    
    render() {
    return (
    <View style={styles.container}>
      <TouchableOpacity
      onPress={() => {
          console.log(this.state.digits)
          handleAudioDigits(this.state.digits, "EN")
          
    }}
      style={styles.button}
      >
        <Text style={styles.buttonText}>
            PLAY THE DIGITS
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
