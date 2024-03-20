import { createSlice } from "@reduxjs/toolkit";

const initialState: { isSearchOpen: boolean } = { isSearchOpen: false };

const searchToggleSlice = createSlice({
  name: "searchToggle",
  initialState,
  reducers: {
    setSearchToggle: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
  },
});

export const { setSearchToggle } = searchToggleSlice.actions;

export default searchToggleSlice.reducer;
