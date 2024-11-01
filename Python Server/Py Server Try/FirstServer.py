from flask import Flask, request
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/upload-image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return 'No image uploaded', 400

    file = request.files['image']
    if file.filename == '':
        return 'No selected file', 400

    filename = secure_filename(file.filename)
    file.save(f'uploads/{filename}')

    # Process the image here (e.g., resize, convert to grayscale)
    




    return {'message': 'Image Processed successfully'}

if __name__ == '__main__':
    app.run(debug=True)
