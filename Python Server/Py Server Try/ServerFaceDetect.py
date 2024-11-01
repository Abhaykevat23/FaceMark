from flask import Flask, request
from werkzeug.utils import secure_filename
from flask_cors import CORS

import cv2
import face_recognition
import os

app = Flask(__name__)
CORS(app)

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
    class_image = cv2.imread(f'D:/Mini Project/FaceMark/Python Server/Py Server Try/uploads/{filename}')
    if class_image is None:
        print("Error: Image not loaded properly. Check the file path or format.")
        exit()

    class_image_rgb = cv2.cvtColor(class_image, cv2.COLOR_BGR2RGB)

    class_face_locations = face_recognition.face_locations(class_image_rgb)
    class_face_encodings = face_recognition.face_encodings(class_image_rgb, class_face_locations)

    folder_path = 'D:/Mini Project/FaceMark/Server/studentImages'
    face_data = []
    known_face_encodings = []
    known_face_names = []

    for filename in os.listdir(folder_path):
        if filename.endswith('.jpg') or filename.endswith('.png'): 
            face_image_path = os.path.join(folder_path, filename)
            face_image = face_recognition.load_image_file(face_image_path)
            face_encodings = face_recognition.face_encodings(face_image)

            if len(face_encodings) > 0:
                known_face_encodings.append(face_encodings[0]) 
                known_face_names.append(filename.split('.')[0])  

    for i in range(len(class_face_locations)):
        class_face_encoding = class_face_encodings[i]

        matches = face_recognition.compare_faces(known_face_encodings, class_face_encoding)

        face_distances = face_recognition.face_distance(known_face_encodings, class_face_encoding)

        best_match_index = None
        if len(face_distances) > 0:
            best_match_index = face_distances.argmin()

        if matches[best_match_index]:
            studNames = known_face_names[best_match_index]
            face_data.append([studNames])
            
    return {'message': 'Image Processed successfully','data':face_data}

if __name__ == '__main__':
    app.run(debug=True)
