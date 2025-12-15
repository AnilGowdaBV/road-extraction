import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

function ImageUploader({ onImageUpload }) {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`border-4 border-dashed p-12 rounded-lg text-center cursor-pointer transition-colors duration-200
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}
    >
      <input {...getInputProps()} />
      <FiUpload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <p className="text-xl font-semibold text-gray-600 mb-2">
        {isDragActive ? 'Drop the image here' : 'Upload Satellite Image'}
      </p>
      <p className="text-gray-500">
        Drag & drop a satellite image here, or click to select one
      </p>
      <p className="text-sm text-gray-400 mt-2">
        Supported formats: JPEG, JPG, PNG
      </p>
    </div>
  );
}

export default ImageUploader;