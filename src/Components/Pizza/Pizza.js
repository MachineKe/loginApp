import React, { useState } from 'react';
import ToppingsData from '../../Assets/data/toppings.json'; 

const Pizza = () => {
  const [toppings, setToppings] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleCheckboxChange = (topping, isChecked) => {
    if (isChecked) {
      setToppings([...toppings, topping]);
      setTotalPrice(totalPrice + topping.price);
    } else {
      const updatedToppings = toppings.filter(item => item !== topping);
      setToppings(updatedToppings);
      setTotalPrice(totalPrice - topping.price);
    }
  };

  const handleOrder = () => {
    // Logic to place an order
    alert('Your pizza has been ordered!');
  };

  const handleClearOrder = () => {
    setToppings([]);
    setTotalPrice(0);
  };

  return (
    <div className="App">
      <h1>Build Your Own Pizza</h1>
      <div className="toppings-container">
        {ToppingsData.map(topping => (
          <div key={topping.name} className="topping">
            <input
              type="checkbox"
              id={topping.name}
              onChange={e => handleCheckboxChange(topping, e.target.checked)}
            />
            <label htmlFor={topping.name}>{topping.name} - ${topping.price.toFixed(2)}</label>
          </div>
        ))}
      </div>
      <div className="selected-toppings">
        <h2>Ingredients Selected:</h2>
        {toppings.map(topping => (
          <div key={topping.name} className="selected-topping">
            <img src={require(`../../Assets/img/${topping.imageUrl}`)} alt={topping.name} />
            <span>{topping.name}</span>
          </div>
        ))}
      </div>
      <div className="total-price">
        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
      </div>
      <div className="buttons">
        <button onClick={handleOrder}>Order Your Pizza</button>
        <button onClick={handleClearOrder}>Clear Order</button>
      </div>
    </div>
  );
};

export default Pizza;
