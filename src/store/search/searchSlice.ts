import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bookData } from "../../common/interfaces/responses/book.res.interface";

const initialState: bookData[] = [];

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<bookData[]>) => {
      return action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;
