import face_recognition
import cv2
import os
import numpy as np
import matplotlib.pyplot as plt

# Load known faces
known_face_encodings = []
known_face_names = []

# Directory containing known face images
known_faces_dir = "../class images"

# Loop through each known face image
for filename in os.listdir(known_faces_dir):
    if filename.endswith(".jpg") or filename.endswith(".png"):
        image_path = os.path.join(known_faces_dir, filename)
        image = face_recognition.load_image_file(image_path)
        face_encodings = face_recognition.face_encodings(image)
        if face_encodings:
            encoding = face_encodings[0]
            known_face_encodings.append(encoding)
            name = os.path.splitext(filename)[0]
            known_face_names.append(name)

# Load the image you want to check
input_image_path = "../class.jpeg"
input_image_bgr = cv2.imread(input_image_path)

# Enhance the input image
def enhance_image(image):
    # Convert to LAB color space
    lab_image = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    l_channel, a_channel, b_channel = cv2.split(lab_image)

    # Apply CLAHE to the L channel
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    cl = clahe.apply(l_channel)

    # Merge the CLAHE enhanced L channel back with the a and b channels
    enhanced_lab_image = cv2.merge((cl, a_channel, b_channel))
    enhanced_image = cv2.cvtColor(enhanced_lab_image, cv2.COLOR_LAB2BGR)

    # Adjust brightness and contrast
    brightness = 10
    contrast = 2.3
    enhanced_image = cv2.addWeighted(enhanced_image, contrast, np.zeros(enhanced_image.shape, enhanced_image.dtype), 0, brightness)

    return enhanced_image

# Enhance the input image
enhanced_image_bgr = enhance_image(input_image_bgr)

# Find all face locations and encodings in the enhanced image
face_locations = face_recognition.face_locations(enhanced_image_bgr)
face_encodings = face_recognition.face_encodings(enhanced_image_bgr, face_locations)

# Loop through each face found in the enhanced image
for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
    matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
    name = "Unknown"
    if True in matches:
        first_match_index = matches.index(True)
        name = known_face_names[first_match_index]
    
    cv2.rectangle(input_image_bgr, (left, top), (right, bottom), (0, 255, 0), 2)
    cv2.putText(input_image_bgr, name, (left, bottom + 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

# Displaying the image with zoom functionality
def show_image_with_zoom(window_name, image):
    while True:
        # Resize image based on the scale
        resized_image = cv2.resize(image, None, fx=0.4, fy=0.5)
        cv2.imshow(window_name, resized_image)
        
        key = cv2.waitKey(1) & 0xFF
        
        if key == ord('+'):  # Zoom in
            scale *= 0.1
        elif key == ord('-'):  # Zoom out
            scale /= 0.1
        elif key == ord('q'):  # Quit
            break

show_image_with_zoom("Face Recognition", input_image_bgr)

cv2.destroyAllWindows()
