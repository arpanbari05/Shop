import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  showFilter: false,
  showForm: false,
}

const slice = createSlice({
  name: "model", 
  initialState,
  reducers: {
    setFilter(state, action) {
      state.showFilter = action.payload;
    },
    setForm(state, action) {
      state.showForm = action.payload;
    },
  }
})

export const modelReducer = slice.reducer;
export const modelActions = slice.actions;