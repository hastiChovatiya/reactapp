import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((item) => item._id !== action.payload);
    },
    clear(state, action) {
      state = [];
      return state;
    },
  },
});

export const { add, remove, clear } = cartSlice.actions;
export default cartSlice.reducer;
