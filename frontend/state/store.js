import { configureStore } from '@reduxjs/toolkit'
import { pizzaApi } from './pizzaApi'
import previousOrdersSlice from './previousOrdersSlice'
import pizzaOrderFormSlice from './pizzaOrderFormSlice'

export const resetStore = () => 
configureStore({
  reducer: {
    [pizzaApi.reducerPath]: pizzaApi.reducer,
    previousOrders: previousOrdersSlice,
    pizzaOrderForm: pizzaOrderFormSlice,
    // add your reducer(s) here
  },
  middleware: getDefault => 
  getDefault().concat(
    pizzaApi.middleware
  ),
})

export const store = resetStore()
