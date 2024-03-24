import React, { useState } from 'react';
import ToppingsData from '../../Assets/data/toppings.json'; 
import './Pizza.css'; // Import CSS file for styling

const Pizza = () => {
  const basePrice = 6; // Base price of the pizza
  const [toppings, setToppings] = useState([]);
  const [totalPrice, setTotalPrice] = useState(basePrice);

  const handleCheckboxChange = (topping, isChecked) => {
    if (isChecked) {
      setToppings([...toppings, topping]);
      setTotalPrice(totalPrice + topping.price);
    } else {
      const updatedToppings = toppings.filter(item => item !== topping);
      const updatedTotalPrice = updatedToppings.reduce((acc, curr) => acc + curr.price, basePrice);
      setToppings(updatedToppings);
      setTotalPrice(updatedTotalPrice < basePrice ? basePrice : updatedTotalPrice);
    }
  };

  const handleOrder = () => {
    // Logic to place an order
    // Display a message below the app
    const message = document.createElement('div');
    message.textContent = `Your pizza has been ordered!, you need to pay £${totalPrice.toFixed(2)} `;
    message.classList.add('order-message');
    document.body.appendChild(message);
    setTimeout(() => {
      message.remove();
    }, 10000); // Remove the message after 3 seconds
  };

  const handleClearOrder = () => {
    setToppings([]);
    setTotalPrice(basePrice);
  };

  return (
    <div className="pizza-container">
      <h1 className="title">Build Your Own Pizza</h1>
      <div className="toppings-container">
        {ToppingsData.map(topping => (
          <div key={topping.name} className="topping">
            <input
              type="checkbox"
              id={topping.name}
              onChange={e => handleCheckboxChange(topping, e.target.checked)}
            />
            <label htmlFor={topping.name}>{topping.name} - £{topping.price.toFixed(2)}</label>
          </div>
        ))}
      </div>
      <div className="selected-toppings">
        <p>Pizza Base price is £{basePrice}.00</p>
        <h2 className="selected-title">Ingredients Selected:</h2>
        {toppings.map(topping => (
          <div key={topping.name} className="selected-topping">
            <img src={require(`../../Assets/img/${topping.imageUrl}`)} alt={topping.name} className="thumbnail" />
            <span>{topping.name}</span>
          </div>
        ))}
      </div>
      <div className="total-price">
        <h2>Total Price: £{totalPrice.toFixed(2)}</h2>
      </div>
      <div className="buttons">
        <button onClick={handleOrder}>Order Your Pizza</button>
        <button onClick={handleClearOrder}>Clear Order</button>
      </div>
    </div>
  );
};

export default Pizza;


