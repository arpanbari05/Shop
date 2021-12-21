import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  area: "",
  category: "",
  opening: "",
  closing: ""
}

const slice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setArea(state, action) {
      state.area = action.payload;
    },
    setCatgory(state, action) {
      state.category = action.payload;
    },
    setOpening(state, action) {
      state.opening = action.payload;
    },
    setClosing(state, action) {
      state.closing = action.payload;
    },
  }
})

export const filterReducer = slice.reducer;
export const filterActions = slice.actions;
