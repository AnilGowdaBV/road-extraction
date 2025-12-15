import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import ProcessingControls from './ProcessingControls';
import ResultsView from './ResultsView';
import LoadingSpinner from './LoadingSpinner';
import { processImage } from '../utils/imageProcessing';

function ImageProcessor() {
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [isOpenCVLoaded, setIsOpenCVLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Wait for OpenCV.js to be loaded
    if (window.cv) {
      setIsOpenCVLoaded(true);
    } else {
      window.onCvLoaded = () => setIsOpenCVLoaded(true);
    }
  }, []);

  const handleImageUpload = (uploadedImage) => {
    setImage(uploadedImage);
    setResults(null);
    setError(null);
  };

  const handleProcessing = async () => {
    if (!image || !isOpenCVLoaded) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const processedResults = await processImage(image);
      setResults(processedResults);
    } catch (error) {
      console.error('Error processing image:', error);
      setError('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <ImageUploader onImageUpload={handleImageUpload} />
      {error && (
        <div className="text-red-600 text-center">{error}</div>
      )}
      {image && (
        <ProcessingControls 
          onProcess={handleProcessing}
          disabled={isProcessing || !isOpenCVLoaded}
        />
      )}
      {isProcessing && <LoadingSpinner />}
      {results && <ResultsView results={results} originalImage={image} />}
    </div>
  );
}

export default ImageProcessor;