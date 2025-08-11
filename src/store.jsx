// store.js

// 1️⃣ Import configureStore from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// 2️⃣ Import your cart reducer from CartSlice
import cartReducer from './CartSlice'; // adjust path if needed

// 3️⃣ Create the Redux store
const store = configureStore({
  reducer: {
    // 🛒 'cart' slice managed by cartReducer
    cart: cartReducer,
  },
});

// 4️⃣ Export the store for use in <Provider>
export default store;
