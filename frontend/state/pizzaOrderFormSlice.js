import { createSlice } from "@reduxjs/toolkit";

let id = 1;
const getNextId = () => id++;

const initialState = {
  id: getNextId(),
  fullName: "",
  size: "",
  toppings: {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
  },
}

export const pizzaOrderFormSlice = createSlice({
  name: 'pizzaOrderForm',
  initialState,
  reducers: {
    setFullName(state, action) {
      state.fullName = action.payload;
    },
    setSize(state, action) {
      state.size = action.payload;
    },
    toggleTopping(state, action) {
      const { topping, isChecked } = action.payload;
      state.toppings[topping] = isChecked;
    },
    resetForm(state) {
      // id = getNextId();
      state.fullName = '';
      state.size = '';
      state.toppings = {
      '1': false,
      '2': false,
      '3': false,
      '4': false,
      '5': false,
      };
    },
  },
});

export const { setFullName, setSize, toggleTopping, resetForm } = pizzaOrderFormSlice.actions;

export default pizzaOrderFormSlice.reducer;
