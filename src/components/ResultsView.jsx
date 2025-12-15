import React from 'react';

function ResultsView({ results, originalImage }) {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg overflow-hidden">
          <h3 className="text-center py-2 bg-gray-50 border-b">Original Satellite Image</h3>
          <div className="bg-black">
            <img src={originalImage} alt="Original" className="w-full h-auto" />
          </div>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <h3 className="text-center py-2 bg-gray-50 border-b">Detected Road Mask (Basic)</h3>
          <div className="bg-black">
            <img src={results.mask} alt="Mask" className="w-full h-auto" />
          </div>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <h3 className="text-center py-2 bg-gray-50 border-b">Overlay of Road Mask on Image</h3>
          <div className="bg-black">
            <img src={results.highlighted} alt="Highlighted" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsView;