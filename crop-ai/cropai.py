import sys
import cv2 as cv
import numpy as np

def crop(img_src):
    # Color of interest BGR , 0 - 200 for all
    lower = np.array([0, 0, 0], dtype="uint8")
    upper = np.array([254, 254, 254], dtype="uint8")

    img = cv.imread(img_src,cv.COLOR_BGR2RGB)

    if img is None:
        raise Exception("Image not found {}".format(img_src))
    # masking image from the upper and lower colors
    mask = cv.inRange(img, lower, upper)
    ret,thresh = cv.threshold(mask, 40, 255, 0)
    contours, hierarchy = cv.findContours(thresh, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)

    # max contour region
    c = max(contours, key = cv.contourArea)
    x,y,w,h = cv.boundingRect(c)

    return img, img[y:y+h,x:x+w],(x,y,w,h)

usage = "Usage: cropai.py <image_path> <image_destination>"

if __name__ == "__main__":

    argsLength = len(sys.argv)
    if argsLength < 2:
        print("Image src not provided")
        print(usage)
        sys.exit(1)


    if (argsLength < 3):
        print("Image destination not provided")
        print(usage)
        sys.exit(1)

    img_src = sys.argv[1]
    img_dest = sys.argv[2]
    
    img, crop_img, region = crop(img_src)

    cv.imwrite(img_dest, crop_img)
