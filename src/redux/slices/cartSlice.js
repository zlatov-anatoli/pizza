import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  totalPrice: 0,
  items: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const isFull = state.items.find((obj) => action.payload.id === obj.id)
      if (isFull) {
        isFull.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }
      state.totalPrice = state.totalPrice + action.payload.price
    },
    minusProduc: (state, action) => {
      const isEmpty = state.items.find((obj) => action.payload.id === obj.id)
      if (isEmpty) {
        isEmpty.count--
        state.totalPrice = state.totalPrice - isEmpty.price
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id)
      state.totalPrice -= action.payload.price * action.payload.count
    },
    clearProuduct: (state) => {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const { addProduct, clearProuduct, removeItem, minusProduc } =
  cartSlice.actions

export default cartSlice.reducer
