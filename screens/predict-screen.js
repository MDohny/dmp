import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
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
        let imageUri = "data:image/png;base64," + this.state.image
    return (
    <View style={styles.container}>
        <Image
            source={{ uri: imageUri }}
            style={styles.image}
          />
    
      <TouchableOpacity
      onPress={() => {
          
          handleAudioDigits(this.state.digits, "EN")
          
    }}
      style={styles.audiobutton}
      >
        <Text style={styles.buttonText}>
            PLAY THE DIGITS
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={() => this.props.navigation.navigate("Home Screen")}
      style={styles.backbutton}
      >
        <Text style={styles.buttonText}>
            NEW IMAGE
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
    audiobutton: {
      backgroundColor: '#38686A',
      padding: 5,
      width: 200,
      alignItems: 'center',
      justifyContent: 'center',
      width : "100%", 
      position: "absolute",
      bottom:50,
      height:45
    },
    backbutton: {
      backgroundColor: '#38686A',
      padding: 5,
      width: 200,
      alignItems: 'center',
      justifyContent: 'center',
      width : "100%", 
      position: "absolute",
      bottom:0,
      height:45
    },
    buttonText : {
        fontSize : 20,
        color: "#fff"
        
    },
    image: {
      width: 400,
      alignItems: 'center',
      justifyContent: 'center', 
      position: "absolute",
      bottom:100,
      height:520
    },
});
