import React, { useState } from 'react';
import './ImageClick.css';

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showClearButton, setShowClearButton] = useState(false);

  const handleImageClick = (imageName) => {
    setSelectedImage(imageName);
    setShowClearButton(true);
  };

  const handleClearText = () => {
    setSelectedImage(null);
    setShowClearButton(false);
  };

  return (
    <div className="image-gallery-container">
      <h1 className='title'>Cute Icons App</h1>
      <div className="image-grid">
        <div className="image" onClick={() => handleImageClick('Bugatti')} style={{ backgroundColor: selectedImage === 'Image 1' ? 'lightblue' : 'transparent' }}>
          <img src={require(`../../Assets/img/bugatti.jpeg`)} alt="Bugatti" className="responsive-image" />
        </div>
        <div className="image" onClick={() => handleImageClick('Ferari')} style={{ backgroundColor: selectedImage === 'Image 2' ? 'lightblue' : 'transparent' }}>
          <img src={require(`../../Assets/img/ferari.jpeg`)} alt="Ferrari" className="responsive-image" />
        </div>
        <div className="image" onClick={() => handleImageClick('Lamborghini')} style={{ backgroundColor: selectedImage === 'Image 3' ? 'lightblue' : 'transparent' }}>
          <img src={require(`../../Assets/img/lambo.jpg`)} alt="Lamborghini" className="responsive-image" />
        </div>
        <div className="image" onClick={() => handleImageClick('Nissan Gtr')} style={{ backgroundColor: selectedImage === 'Image 4' ? 'lightblue' : 'transparent' }}>
          <img src={require(`../../Assets/img/gtr.jpg`)} alt="GTR" className="responsive-image" />
        </div>
      </div>
      {showClearButton && (
        <button onClick={handleClearText} className="clear-button">Clear Text</button>
      )}
      {selectedImage && (
        <p className="selected-image-text">You selected: <span className="selected-image">{selectedImage}</span></p>
      )}
    </div>
  );
};

export default ImageGallery;
