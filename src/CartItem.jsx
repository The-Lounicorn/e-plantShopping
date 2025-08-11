import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

console.log("🛒 CartItem component mounted");

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Increment quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      id: item.id,
      quantity: item.quantity + 1
    }));
  };

  // Decrement quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        id: item.id,
        quantity: item.quantity - 1
      }));
    }
  };

  // Remove item
  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  // Calculate total cost for an item
  const calculateTotalCost = (item) => {
    const unitPrice = parseFloat(item.cost.substring(1)); // "$12" → 12
    return (unitPrice * item.quantity).toFixed(2);
  };

  // Calculate total cart amount
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const itemTotal = parseFloat(item.cost.substring(1)) * item.quantity;
      return total + itemTotal;
    }, 0).toFixed(2);
  };

  // Handle continue shopping
  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  return (
    <div className="cart-container">
      <h2>🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-quantity">
                  <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))}
          <h3>Total Cart Amount: ${calculateTotalAmount()}</h3>
          <div className="continue_shopping_btn">
            <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
            <br />
            <button className="get-started-button1" onClick={() => alert('Checkout functionality coming soon!')}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;