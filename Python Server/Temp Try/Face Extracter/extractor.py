import face_recognition
import cv2
import os

def extract_faces(input_image_path, output_folder):
    # Load the input image
    image = face_recognition.load_image_file(input_image_path)
    
    # Find all face locations in the image
    face_locations = face_recognition.face_locations(image)
    
    # Create the output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Loop through each face found in the image
    for i, (top, right, bottom, left) in enumerate(face_locations):
        # Extract the face
        face_image = image[top:bottom, left:right]
        
        # Convert to BGR for saving with OpenCV
        face_image_bgr = cv2.cvtColor(face_image, cv2.COLOR_RGB2BGR)
        
        # Construct a filename for the extracted face
        face_filename = os.path.join(output_folder, f"face_{i + 1}.jpg")
        
        # Save the extracted face
        cv2.imwrite(face_filename, face_image_bgr)
        print(f"Saved {face_filename}")

# Usage
input_image_path = "../class images/class.jpeg"  # Path to the input image
output_folder = "extracted_faces"      # Folder to save extracted faces

extract_faces(input_image_path, output_folder)
