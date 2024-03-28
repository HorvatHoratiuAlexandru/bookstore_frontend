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
        state[key].amount = state[key].amount + 1;
      } else {
        state[key] = {
          amount: 1,
          title: value.title,
          price: value.price,
          img: value.img,
        };
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const key = action.payload;

      if (state[key]) {
        state[key].amount = state[key].amount - 1;
      }

      if (state[key].amount === 0) {
        delete state[key];
      }
    },
    removeAllItems: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      delete state[key];
    },
    addByKey: (state, action: PayloadAction<string>) => {
      const key = action.payload;

      if (state[key]) {
        state[key].amount = state[key].amount + 1;
      }

      if (state[key].amount === 0) {
        delete state[key];
      }
    },
  },
});

export const { addItem, removeItem, removeAllItems, addByKey } =
  cartSlice.actions;

export default cartSlice.reducer;
