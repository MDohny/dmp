import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from "axios"


export async function handleImageTake(){
    var result = await ImagePicker.launchCameraAsync();
    var predictedImage = null;
    var predictedDigits = null;
    
    if (!result.cancelled){
        await handleUploadImage(result.uri).then((response) => {
            predictedImage = response["imageData"];
            predictedDigits = response["predictedLabels"];
            
        });
        
        //console.log(result);
        
        //Clear the cache after uploading
        await FileSystem.deleteAsync(result.uri);
//         await FileSystem.getInfoAsync(result.uri).then((info) => {
//             console.log(info);
//         });
//        
    }
    return { 
        predictedImage : predictedImage,
        predictedDigits : predictedDigits
    }
    
}

async function handleUploadImage(imageUri) {
    let api_url = "http://10.56.24.107:5000/predict";
    
    let localUri = imageUri;
    let filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    formData.append('imageToProcess', { uri: localUri, name: filename, type });
    
    
//     const imageToProcess = {
//         imageUri : imageUri,
//         type : "image/jpg",
//         name : "imageToProcess.jpg"   
//     }
    
    //const formData = new FormData();
    //formData.append("imageToProcess", imageToProcess);
    
    try {
        let result = await fetch(api_url, {
            method: "POST",
            body: formData,
            })
        let json = await result.json();
        return json
        //axios.post(api_url, formData).then((res) => {console.log(res.json())}) 
    } catch(e) {
        console.log(e);
    }
    
 
    //fetch(api_url, {method: "POST"}).then((res) => {console.log(res.json())}).catch(e => {console.log(e)})
}
