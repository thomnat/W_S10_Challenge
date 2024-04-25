import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orders: [],
};

const previousOrdersSlice = createSlice({
  name: 'previousOrders',
  initialState,
  reducers: {
    filterOrdersBySize(state, action) {
      const { size } = action.payload;
      state.orders = state.orders.filter(order => order.size === size) 
    },
  },
})

export const { filterOrdersBySize } = previousOrdersSlice.actions;
export default previousOrdersSlice.reducer;