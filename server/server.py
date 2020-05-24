from flask import Flask, request, jsonify
import dill
import netifaces as ni
from pprint import pprint
import imutils
import cv2
import os
from PIL import Image



#Accepts raw image from server and return preprocessed image for prediction
def handle_preprocess_image(image_path):
    preprocessed_image = cv2.imread(image_path)
    preprocessed_image = cv2.rotate(preprocessed_image,
                                    cv2.ROTATE_90_COUNTERCLOCKWISE)
    preprocessed_image = imutils.resize(preprocessed_image, width=420)
    #preprocessed_image_copy = preprocessed_image.copy()
    
    image_gray = cv2.cvtColor(preprocessed_image, cv2.COLOR_BGR2GRAY)
    image_blurred = cv2.GaussianBlur(image_gray, (3, 3), 0)

    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5,5))
    image_blackhat = cv2.morphologyEx(image_blurred, cv2.MORPH_BLACKHAT, kernel)

    return image_blackhat




#Check for IPv4 adress
ni.ifaddresses('wlp8s0')
ip = ni.ifaddresses('wlp8s0')[ni.AF_INET][0]['addr']


#Loading the CNN model
with open("cnn_model.pkl", "rb") as model_file:
    cnn_model = dill.load(model_file)
    #pprint(dir(cnn_model))


#Initialize Flask Server
app = Flask(__name__)

@app.route("/predict", methods=["GET","POST"])
def predict():
    if(request.method == "POST"):
        if(request.files):
            image = request.files["imageToProcess"]
            image_name = image.filename
            image.save(os.path.join(os.getcwd(), image_name))
            
            
            
            imageToProcess = handle_preprocess_image(image_name)
            print(imageToProcess.shape)
            cv2.imshow("image", imageToProcess)
            cv2.waitKey()
                    
            return("asd")
    else:
        return("asdasd")


#Run the server with available address on port 5000
if __name__ == "__main__":
    app.run(host=ip, port="5000", debug=True)



