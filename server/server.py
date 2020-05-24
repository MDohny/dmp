import socket
from flask import Flask, request
import netifaces as ni 

ni.ifaddresses('wlp8s0')
ip = ni.ifaddresses('wlp8s0')[ni.AF_INET][0]['addr']
print(ip)


app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    if request.method == "POST":
        if request.files:
            uploadde_image = request.files["imageToUpload"]
            image_name =
            





if __name__ == "__main__":
    app.run(host=ip, port=8000, debug=True)
    
