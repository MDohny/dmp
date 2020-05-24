import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


export async function handleImageTake(){
    var result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled){
        
        
        
        //Clear the cache after uploading
        await FileSystem.deleteAsync(result.uri);
//         await FileSystem.getInfoAsync(result.uri).then((info) => {
//             console.log(info);
//         });
//        
    }
    return { 
        predictedImage : predictedImage,
        predictedDigits : predictedDigits,
    }
    
}

async function handleUploadImage(imageUri, serverURL) {
    
}
