import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/CartSlice'; // Adjust path as needed
import './ProductList.css'; // Optional: for styling

const plantsArray = [
  {
    name: 'Lavender',
    image: 'https://example.com/lavender.jpg',
    description: 'Aromatic herb known for its calming scent.',
    cost: 12.99,
    category: 'Aromatic'
  },
  {
    name: 'Aloe Vera',
    image: 'https://example.com/aloe.jpg',
    description: 'Medicinal plant used for skin treatments.',
    cost: 9.99,
    category: 'Medicinal'
  },
  // Add more plants as needed
];

const ProductList = () => {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true
    }));
  };

  return (
    <div className="product-grid">
      {plantsArray.map((plant, index) => (
        <div key={index} className="plant-card">
          <img src={plant.image} alt={plant.name} className="plant-image" />
          <h3>{plant.name}</h3>
          <p>{plant.description}</p>
          <p><strong>${plant.cost.toFixed(2)}</strong></p>
          <button
            onClick={() => handleAddToCart(plant)}
            disabled={addedToCart[plant.name]}
          >
            {addedToCart[plant.name] ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;