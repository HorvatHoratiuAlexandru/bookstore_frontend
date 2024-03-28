import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartData } from "../../common/interfaces/cart.interface";

const initialState: CartData = {};

interface AddCartItemAction {
  key: string;
  value: {
    title: string;
    price: number;
    img: string;
  };
}

const cartSlice = createSlice({
  name: "cartData",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<AddCartItemAction>) => {
      const { key, value } = action.payload;

      if (state[key]) {
        state[key].ammount = state[key].ammount + 1;
      } else {
        state[key] = {
          ammount: 1,
          title: value.title,
          price: value.price,
          img: value.img,
        };
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const key = action.payload;

      if (state[key]) {
        state[key].ammount = state[key].ammount - 1;
      }

      if (state[key].ammount === 0) {
        delete state[key];
      }
    },
    removeAllItems: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      delete state[key];
    },
  },
});

export const { addItem, removeItem, removeAllItems } = cartSlice.actions;

export default cartSlice.reducer;
