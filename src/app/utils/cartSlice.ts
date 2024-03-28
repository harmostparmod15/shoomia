import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    showCartPage: false,
  },
  reducers: {
    addItem: (state: any, action) => {
      state.items.push(action?.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    toggleCartPage: (state, action) => {
      state.showCartPage = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const { addItem, clearCart, toggleCartPage } = cartSlice.actions;
