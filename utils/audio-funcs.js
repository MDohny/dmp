import { Audio } from "expo-av"
import { AudioResources } from "./audio-resources.js"

async function digitAudio(digit, lang) {
    var source = (lang + digit)
    console.log(source);
    var soundObject = new Audio.Sound();

    var onPlaybackStatusUpdate = (status) => {
        console.log("Playback Status Updated");
    }
    
    soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    
    try {
        
        await soundObject.loadAsync(AudioResources[source])
        await soundObject.playAsync().then(async playbackStatus => {
            setTimeout(() => {
               soundObject.unloadAsync();
            }, playbackStatus.playableDurationMillis)
            
        })
    } catch (e) {
        console.log(e);
    }
}

export function handleAudioDigits(digits, lang){
    var counter = 0;
    var audioInterval = setInterval(() => {
        digitAudio(digits[counter], lang);
        counter++;
        if(counter === digits.length){
            clearInterval(audioInterval);
        }
    }, 800)
}

