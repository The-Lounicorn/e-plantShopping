import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existing = state.items.find(item => item.id === newItem.id);
      if (existing) {
        existing.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item && quantity >= 0) {
        item.quantity = quantity;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});

export const { addItem, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;