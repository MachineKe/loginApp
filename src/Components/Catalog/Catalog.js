import React, { useState, useEffect, useRef } from 'react';
import data from '../../Assets/data/catalog.json'; // Import JSON data

const Catalogue = () => {
  const [items, setItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0); // Index of the selected item
  const [touchStartX, setTouchStartX] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Set items state with data from JSON file
    setItems(data);
  }, []);

  const handleItemClick = (item, index) => {
    setSelectedIndex(index); // Update the selected index
  };

  const handlePrevious = () => {
    // Decrement the index to navigate to the previous item
    setSelectedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : items.length - 1));
  };

  const handleNext = () => {
    // Increment the index to navigate to the next item
    setSelectedIndex(prevIndex => (prevIndex < items.length - 1 ? prevIndex + 1 : 0));
  };

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    const sensitivity = 50; // Adjust sensitivity for swipe detection

    if (deltaX > sensitivity) {
      handlePrevious(); // Swipe right, navigate to previous item
    } else if (deltaX < -sensitivity) {
      handleNext(); // Swipe left, navigate to next item
    }
  };

  const selectedItem = items[selectedIndex]; // Get the currently selected item

  return (
    <div
      className="catalogue-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      ref={containerRef}
    >
      <div className="catalogue-items">
        {items.map((item, index) => (
          <img
            key={item.id}
            src={require(`../../Assets/img/${item.imageUrl}`)}
            alt={item.title}
            onClick={() => handleItemClick(item, index)}
          />
        ))}
      </div>
      <div className="catalogue-details">
        {selectedItem ? (
          <div>
            <h2>{selectedItem.title}</h2>
            <p>{selectedItem.description}</p>
            <img src={require(`../../Assets/img/${selectedItem.imageUrl}`)} alt={selectedItem.title} />
          </div>
        ) : (
          <p className="placeholder-text">Please select an item from the catalogue</p>
        )}
      </div>
      <div className="navigation-buttons">
        <button className="nav-button" onClick={handlePrevious}>Previous</button>
        <button className="nav-button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Catalogue;

