import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

const plantsArray = [
  {
    name: 'Lavender',
    image: 'https://example.com/lavender.jpg',
    description: 'Aromatic herb known for its calming scent.',
    cost: '12.99',
    category: 'Aromatic'
  },
  {
    name: 'Aloe Vera',
    image: 'https://example.com/aloe.jpg',
    description: 'Medicinal plant used for skin treatments.',
    cost: '9.99',
    category: 'Medicinal'
  }
  // Add more plants as needed
];

const ProductList = () => {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState({});
  const totalQuantity = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true
    }));
  };

  return (
    <div>
      <nav>
        <span>🛒 Cart: {totalQuantity}</span>
      </nav>
      <div className="product-grid">
        {plantsArray.map((plant, index) => (
          <div key={index} className="plant-card">
            <img src={plant.image} alt={plant.name} className="plant-image" />
            <h3>{plant.name}</h3>
            <p>{plant.description}</p>
            <p><strong>${parseFloat(plant.cost).toFixed(2)}</strong></p>
            <button
              onClick={() => handleAddToCart(plant)}
              disabled={addedToCart[plant.name]}
            >
              {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;