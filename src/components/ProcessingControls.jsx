import React from 'react';

function ProcessingControls({ onProcess, disabled }) {
  return (
    <div className="flex justify-center">
      <button
        onClick={onProcess}
        disabled={disabled}
        className={`px-6 py-2 rounded-lg text-white font-semibold
          ${disabled 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        Process Image
      </button>
    </div>
  );
}

export default ProcessingControls;