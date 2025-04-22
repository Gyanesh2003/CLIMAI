from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
from climaai import predict_weather  # Import your ML model function

app = Flask(__name__)
CORS(app)

@app.route('/api/weather', methods=['GET'])
def get_weather():
    location = request.args.get('location', 'default')
    
    try:
        # Get prediction from your ML model
        prediction = predict_weather(location)
        
        # Format the response
        response = {
            'temperature': float(prediction['temperature']),
            'condition': str(prediction['condition']),
            'humidity': float(prediction['humidity']),
            'wind_speed': float(prediction['wind_speed']),
            'location': location,
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 