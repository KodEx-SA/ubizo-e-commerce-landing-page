from flask import Flask, request, jsonify
from flask_cors import CORS
from chat import get_response

app = Flask(__name__)
CORS(app)  # enable CORS for all routes

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Welcome, I am your virtual assistant. How can I assist you today?",
        "options": [
            {"label": "🛒 Start Shopping", "action": "navigate", "value": "/shop"},
            {"label": "📦 Start Selling", "action": "navigate", "value": "/sell"},
            {"label": "📞 Contact Support", "action": "intent", "value": "support"}
        ]
    })

@app.route("/predict", methods=["POST"])
def predict():
    text = request.json.get("message", "").strip()
    
    if not text:
        return jsonify({"response": "Please enter a valid message."})

    response_data = get_response(text)

    # Ensure the response always has a consistent structure
    if isinstance(response_data, dict):
        return jsonify(response_data)  # Already has {"response": ..., "options": ...}
    else:
        return jsonify({"response": response_data, "options": []})

if __name__ == "__main__":
    app.run(debug=True)

# deploy using vercel
