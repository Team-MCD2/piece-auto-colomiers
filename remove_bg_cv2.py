import os
import cv2
import numpy as np
from PIL import Image

def process_image(input_path, output_path):
    if not os.path.exists(input_path):
        print(f"Error: Could not find '{input_path}'.")
        return

    print(f"Loading '{input_path}'...")
    
    # 1. Read the image using OpenCV
    img = cv2.imread(input_path)
    if img is None:
        print(f"Error: Could not load image. Check if {input_path} is a valid image.")
        return

    # Convert from BGR (OpenCV default) to BGRA (adds the Alpha/Transparency channel)
    rgba = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
    
    # 2. Identify the Shield to protect its interior
    # Convert to grayscale to easily spot white vs non-white
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Threshold: Everything darker than near-white (240) becomes pure white (255)
    # This creates a silhouette of the shield and the text.
    _, non_white_mask = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
    
    # Find all distinct external shapes (contours) in the silhouette
    contours, _ = cv2.findContours(non_white_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if not contours:
        print("Error: Could not detect the logo shapes.")
        return

    # The shield is structurally the largest continuous shape in the image
    shield_contour = max(contours, key=cv2.contourArea)
    
    # Create a solid mask that covers the ENTIRE shield (protecting the white car/text inside)
    shield_mask = np.zeros_like(gray)
    cv2.drawContours(shield_mask, [shield_contour], -1, 255, -1)
    
    # 3. Create a mask of all white pixels in the original image
    _, white_mask = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY)
    
    # 4. The pixels we want to remove are:
    # (White pixels) AND (Outside the shield mask)
    # This combination perfectly isolates the background AND the white holes inside 'O' and 'R'
    bg_white_mask = cv2.bitwise_and(white_mask, cv2.bitwise_not(shield_mask))
    
    # To prevent jagged edges (aliasing) around the text and shield, 
    # we apply a very slight blur to our removal mask to soften the edges.
    bg_white_mask = cv2.GaussianBlur(bg_white_mask, (3, 3), 0)
    
    # Make those specific background pixels transparent
    # Any pixel where the mask is strong becomes fully transparent
    rgba[bg_white_mask > 128] = [0, 0, 0, 0]
    
    print("Saving transparent logo...")
    # Convert back from OpenCV format (BGRA) to PIL format (RGBA) for easy saving
    output_img = Image.fromarray(cv2.cvtColor(rgba, cv2.COLOR_BGRA2RGBA))
    output_img.save(output_path)
    
    print(f"Success! Transparent image saved to: {output_path}")

if __name__ == "__main__":
    # We process the main logo file. 
    # The npm run assets:brand script will then generate all other sizes based on this one.
    INPUT_FILE = "images/logo.jpg" 
    OUTPUT_FILE = "images/logo.png"
    
    process_image(INPUT_FILE, OUTPUT_FILE)
