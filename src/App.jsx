import React from 'react';
import Header from './components/Header';
import ImageProcessor from './components/ImageProcessor';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ImageProcessor />
      </main>
    </div>
  );
}

export default App;