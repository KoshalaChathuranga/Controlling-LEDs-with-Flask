# routes.py
from app import app
from flask import render_template, request

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/position', methods=['POST'])
def position():
    position_data = request.json
    print(f'Position: {position_data["x"]} * {position_data["y"]}')
    return '', 204
