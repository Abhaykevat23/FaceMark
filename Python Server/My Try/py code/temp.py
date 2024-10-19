import face_recognition
import cv2
import os

# Load known faces
known_face_encodings = []
known_face_names = []

# Directory containing known face images
known_faces_dir = "../images"

# Loop through each known face image
for filename in os.listdir(known_faces_dir):
    if filename.endswith(".jpg") or filename.endswith(".png"):
        # Load the image
        image_path = os.path.join(known_faces_dir, filename)
        image = face_recognition.load_image_file(image_path)
        image.astype('uint8')

        # Check if the image has at least one face
        face_encodings = face_recognition.face_encodings(image)
        if face_encodings:  # Only proceed if we found a face
            encoding = face_encodings[0]
            known_face_encodings.append(encoding)
            # Get the name from the filename (without extension)
            name = os.path.splitext(filename)[0]
            known_face_names.append(name)
        else:
            print(f"No faces found in {filename}. Skipping this image.")

# Load the image you want to check
input_image_path = "../image.jpg"
input_image = face_recognition.load_image_file(input_image_path)

# Find all face locations and encodings in the input image
face_locations = face_recognition.face_locations(input_image)
face_encodings = face_recognition.face_encodings(input_image, face_locations)

# Convert the input image to BGR format for OpenCV
input_image_bgr = cv2.cvtColor(input_image, cv2.COLOR_RGB2BGR)

# Loop through each face found in the input image
for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
    # Compare the face with known faces
    matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
    name = "Unknown"

    # Use the first match found
    if True in matches:
        first_match_index = matches.index(True)
        name = known_face_names[first_match_index]

    # Draw a box around the face and label it
    cv2.rectangle(input_image_bgr, (left, top), (right, bottom), (0, 255, 0), 2)
    cv2.putText(input_image_bgr, name, (left, bottom + 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

# Display the resulting image
cv2.imshow("Face Recognition", input_image_bgr)
cv2.waitKey(0)
cv2.destroyAllWindows()
