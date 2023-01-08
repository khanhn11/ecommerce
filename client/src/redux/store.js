import { consfigureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";

export default consfigureStore({
  reducer: {
    cart: cartReducer,
  },
});
