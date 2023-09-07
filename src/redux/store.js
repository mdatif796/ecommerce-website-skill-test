import { configureStore } from "@reduxjs/toolkit";
import cart from "./slice/cart";
import product from "./slice/product";
export const store = configureStore({
  reducer: {
    myproduct: product,
    cart: cart,
  },
});
