from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    if not data or 'num1' not in data or 'num2' not in data or 'operation' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    num1 = data['num1']
    num2 = data['num2']
    operation = data['operation']
    result = None

    try:
        num1 = float(num1)
        num2 = float(num2)
        if operation == '+':
            result = num1 + num2
        elif operation == '-':
            result = num1 - num2
        elif operation == '*':
            result = num1 * num2
        elif operation == '/':
            if num2 == 0:
                return jsonify({'error': 'Cannot divide by zero'}), 400
            result = num1 / num2
        else:
            return jsonify({'error': 'Invalid operation'}), 400
    except ValueError:
        return jsonify({'error': 'Invalid number input'}), 400

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)