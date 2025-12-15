import cv from 'opencv.js';

export async function processImage(imageData) {
  return new Promise((resolve, reject) => {
    try {
      // Ensure OpenCV is loaded
      if (!window.cv) {
        throw new Error('OpenCV is not loaded');
      }

      // Convert base64 to image
      const img = new Image();
      img.onload = () => {
        // Create canvas and get image data
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Convert to OpenCV matrix
        const mat = cv.matFromImageData(imgData);
        
        // Convert to grayscale
        const gray = new cv.Mat();
        cv.cvtColor(mat, gray, cv.COLOR_RGBA2GRAY);
        
        // Apply Gaussian blur
        const blurred = new cv.Mat();
        const ksize = new cv.Size(5, 5);
        cv.GaussianBlur(gray, blurred, ksize, 0);

        // Apply Canny edge detection
        const edges = new cv.Mat();
        cv.Canny(blurred, edges, 50, 150);

        // Dilate to connect edges
        const kernel = cv.Mat.ones(3, 3, cv.CV_8U);
        const dilated = new cv.Mat();
        cv.dilate(edges, dilated, kernel, new cv.Point(-1, -1), 2);

        // Create binary mask
        const mask = new cv.Mat();
        cv.threshold(dilated, mask, 127, 255, cv.THRESH_BINARY);

        // Create mask output (white roads on black background)
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = canvas.width;
        maskCanvas.height = canvas.height;
        cv.imshow(maskCanvas, mask);

        // Create overlay output
        const overlayMat = mat.clone();
        for (let i = 0; i < mask.rows; i++) {
          for (let j = 0; j < mask.cols; j++) {
            const pixel = mask.ucharPtr(i, j);
            if (pixel[0] > 0) {
              const outputPixel = overlayMat.ucharPtr(i, j);
              outputPixel[0] = 0;     // B
              outputPixel[1] = 0;     // G
              outputPixel[2] = 255;   // R
              outputPixel[3] = 255;   // Alpha
            }
          }
        }

        // Convert overlay to canvas
        const overlayCanvas = document.createElement('canvas');
        overlayCanvas.width = canvas.width;
        overlayCanvas.height = canvas.height;
        cv.imshow(overlayCanvas, overlayMat);

        // Clean up
        mat.delete();
        gray.delete();
        blurred.delete();
        edges.delete();
        dilated.delete();
        kernel.delete();
        mask.delete();
        overlayMat.delete();

        resolve({
          mask: maskCanvas.toDataURL(),
          highlighted: overlayCanvas.toDataURL()
        });
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageData;
    } catch (error) {
      reject(error);
    }
  });
}