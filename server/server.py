from flask import Flask, request, jsonify, Response
import dill
import netifaces as ni
from pprint import pprint
import imutils
import cv2
import os
from PIL import Image
import numpy as np
import base64

#Check for IPv4 adress
ni.ifaddresses('wlp8s0')
ip = ni.ifaddresses('wlp8s0')[ni.AF_INET][0]['addr']


#Loading the CNN model
with open("cnn_model.pkl", "rb") as model_file:
    cnn_model = dill.load(model_file)
    #pprint(dir(cnn_model))


#Accepts raw image from server and return preprocessed image for prediction
def handle_preprocess_image(image_path):
    preprocessed_image = cv2.imread(image_path)
    #preprocessed_image = cv2.rotate(preprocessed_image,
    #                                cv2.ROTATE_90_COUNTERCLOCKWISE)
    preprocessed_image = imutils.resize(preprocessed_image, width=420)
    image_orig = preprocessed_image.copy()
    
    image_gray = cv2.cvtColor(preprocessed_image, cv2.COLOR_BGR2GRAY)
    image_blurred = cv2.GaussianBlur(image_gray, (3, 3), 0)

    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5,5))
    image_blackhat = cv2.morphologyEx(image_blurred, cv2.MORPH_BLACKHAT, kernel)

    _, image_th = cv2.threshold(image_blackhat, 0, 255, cv2.THRESH_BINARY|cv2.THRESH_OTSU)
    image_th = cv2.dilate(image_th, None)
    
    return image_th, image_orig


def detect_digits_and_bboxes(image):
    #find countours
    (contours, _) = cv2.findContours(image.copy(),
                                     cv2.RETR_EXTERNAL,
                                     cv2.CHAIN_APPROX_SIMPLE)
    
    avg_cnt_area = np.mean([cv2.contourArea(c) for c in contours])
    digits = []
    bboxes = []
    
    for (i, c) in enumerate(contours):
        if(cv2.contourArea(c) < avg_cnt_area/10):
            continue
        
        mask = np.zeros(image.shape, dtype="uint8")
        (x,y,w,h) = cv2.boundingRect(c)

        hull = cv2.convexHull(c)
        cv2.drawContours(mask,[hull],-1,255,-1)
        mask = cv2.bitwise_and(image,image,mask=mask)

        digit_roi = mask[y:y+h, x:x+w]
        
        #cv2_imshow(digit_roi)
        
        
        digit = cv2.resize(digit_roi, (18, 18))
        digit = np.pad(digit, ((5,5),(5,5)), "constant", constant_values=0)

        digits.append(digit)
        bboxes.append((x,y,w,h))
    
    return digits, bboxes


def predict_digits_labels(digits):
    predicted_labels = []
    
    for digit in digits:
        digit = (digit/255) - 0.5
        label = cnn_model.predict(digit)
    
        #print(np.argmax(label))
        predicted_labels.append(np.argmax(label))
    
    return predicted_labels


def process_image(image, bboxes, predicted_labels):
    for (x,y,w,h), label in sorted(zip(bboxes, predicted_labels)):
        cv2.rectangle(image, (x, y), (x + w, y + h), (51, 173, 255), 1)
        cv2.putText(image, str(label), (x+2,y-5), cv2.FONT_HERSHEY_SIMPLEX, 1.0, 
                    (51, 173, 255), 2)
    return image

#Initialize Flask Server
app = Flask(__name__)

@app.route("/predict", methods=["GET","POST"])
def predict():
    if(request.method == "POST"):
        if(request.files):
            image = request.files["imageToProcess"]
            image_name = image.filename
            image.save(os.path.join(os.getcwd(), image_name))
            
            
            
            imageToProcess, image_orig = handle_preprocess_image(image_name)
            
            digits, bboxes = detect_digits_and_bboxes(imageToProcess)
            #print(digits[0])
            
            predicted_labels = predict_digits_labels(digits)
            
            processedImage = process_image(image_orig, bboxes, predicted_labels)
            
            #cv2.imshow("Processed Image", processedImage)
            #cv2.waitKey()
            
            _, img_encoded = cv2.imencode('.png', processedImage)
            img_response = base64.b64encode(img_encoded).decode()
            predicted_labels_response = [str(i) for i in predicted_labels]
            
            os.remove(image_name)
            
            response_dict = { "imageData" : img_response,
                             "predictedLabels" : predicted_labels_response}
            response = jsonify(response_dict)
            
            
            return(response)
    else:
        return("asdasd")


#Run the server with available address on port 5000
if __name__ == "__main__":
    app.run(host=ip, port="5000", debug=True)



