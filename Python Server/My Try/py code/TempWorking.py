import cv2
import face_recognition
import pandas as pd
import os

# Load the class image and convert it to RGB
class_image = cv2.imread('D:/Mini Project/FaceMark/Python Server/Py Server Try/uploads/IMG_8656.jpg')
if class_image is None:
    print("Error: Image not loaded properly. Check the file path or format.")
    exit()

# Convert to RGB (face_recognition expects RGB)
class_image_rgb = cv2.cvtColor(class_image, cv2.COLOR_BGR2RGB)

# Detect face locations and encodings in the class image
class_face_locations = face_recognition.face_locations(class_image_rgb)
class_face_encodings = face_recognition.face_encodings(class_image_rgb, class_face_locations)

# Path to folder with individual face images
folder_path = 'D:/Mini Project/FaceMark/Server/studentImages'  # Replace with the path to your folder

# Initialize lists for storing face data
face_data = []
known_face_encodings = []
known_face_names = []

# Loop through each file in the folder and load the images
for filename in os.listdir(folder_path):
    if filename.endswith('.jpg') or filename.endswith('.png'):  # Ensure it only loads image files
        # Load the individual face image and encode it
        face_image_path = os.path.join(folder_path, filename)
        face_image = face_recognition.load_image_file(face_image_path)
        face_encodings = face_recognition.face_encodings(face_image)
        
        # Check if face encodings were found
        if len(face_encodings) > 0:
            known_face_encodings.append(face_encodings[0])  # Store the encoding of the face
            known_face_names.append(filename.split('.')[0])  # Use filename as the label

# Iterate through detected faces in the class image
for i, (top, right, bottom, left) in enumerate(class_face_locations):
    # Get the encoding of the face in the class image
    class_face_encoding = class_face_encodings[i]

    # Compare face with known faces in the folder
    matches = face_recognition.compare_faces(known_face_encodings, class_face_encoding)

    # Get the face distances (how similar each face is)
    face_distances = face_recognition.face_distance(known_face_encodings, class_face_encoding)

    # Find the best match index (the smallest distance)
    best_match_index = None
    if len(face_distances) > 0:
        best_match_index = face_distances.argmin()

    # Check if a match was found
    if matches[best_match_index]:
        name = known_face_names[best_match_index]  # Get the name of the matched face
        
        # Draw a rectangle and label the face with the name
        cv2.rectangle(class_image, (left, top), (right, bottom), (0, 255, 0), 2)
        cv2.putText(class_image, name, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

        # Add face data to list (label and coordinates)
        face_data.append([name, left, top, right - left, bottom - top])
    else:
        # If no match, label the face as "Unknown"
        cv2.rectangle(class_image, (left, top), (right, bottom), (0, 0, 255), 2)
        cv2.putText(class_image, "Unknown", (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)
        face_data.append(["Unknown", left, top, right - left, bottom - top])

# Save the labeled class image
cv2.imwrite('class_image_with_comparison.jpg', class_image)
