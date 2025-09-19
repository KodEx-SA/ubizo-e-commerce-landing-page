from flask import Flask, request, jsonify
from flask_cors import CORS
from chat import get_response

app = Flask(__name__)
CORS(app)  # enable CORS for all routes

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome, I am your virtual assistant. How can I assist you today?"})

@app.route("/predict", methods=["POST"])
def predict():
    text = request.json.get("message", "").strip()
    
    if not text:
        return jsonify({"response": "Please enter a valid message."})

    response = get_response(text)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
