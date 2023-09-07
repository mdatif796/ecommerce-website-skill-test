const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add(state, action) {
      // adding to my cart
      state.push(action.payload);
    },
    remove(state, action) {
      // removing from cart
      let item = state.filter((item) => item.id !== action.payload);
      return item;
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
