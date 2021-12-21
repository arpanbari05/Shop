import { shopListReducer } from "./slice/shopListSlice";
import { filterReducer } from "./slice/filterSlice";
import { modelReducer } from "./slice/modelSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    shopList: shopListReducer,
    filter: filterReducer,
    model: modelReducer
  },
});
