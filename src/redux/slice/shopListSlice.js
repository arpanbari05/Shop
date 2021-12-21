import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  shopList: [],
  filteredList: [],
}

const slice = createSlice({
  name: "shop list",
  initialState,
  reducers: {
    addShop(state, action) {
      state.shopList.push(action.payload);
      state.filteredList.push(action.payload);
    },
    removeShop(state, action) {
      const index = state.shopList.findIndex(shop => shop.id === action.payload);
      state.shopList.splice(index, 1);
      state.filteredList.splice(index, 1);
    },
    replaceShopList(state, action) {
      state.filteredList = action.payload;
    }
  }
})

export const shopListReducer = slice.reducer;
export const shopListActions = slice.actions;