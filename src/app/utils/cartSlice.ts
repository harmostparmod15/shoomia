import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    showCartPage: false,
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action?.payload);
    },
    removeItem: (state, action) => {
      state.items.pop();
    },
    toggleCartPage: (state, action) => {
      state.showCartPage = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const { addItem, removeItem, toggleCartPage } = cartSlice.actions;
