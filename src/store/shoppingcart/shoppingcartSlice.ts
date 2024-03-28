import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartData } from "../../common/interfaces/cart.interface";

const initialState: CartData = {};

const cartSlice = createSlice({
  name: "cartData",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      state[action.payload] = state[action.payload]
        ? state[action.payload] + 1
        : 1;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state[action.payload] = state[action.payload]
        ? state[action.payload] - 1
        : 0;

      if (state[action.payload] === 0) {
        delete state[action.payload];
      }
    },
    removeAllItems: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { addItem, removeItem, removeAllItems } = cartSlice.actions;

export default cartSlice.reducer;
