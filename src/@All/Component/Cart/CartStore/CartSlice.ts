import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  productId: string;
  price: number;
  qty: number;
}

interface CartState {
  items: CartItem[];
  totalQty: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQty: 0,
  totalPrice: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartSlice: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;

      const existItem = state.items.find(
        (i) => i.productId === item.productId
      );

      if (existItem) {
        existItem.qty += item.qty;
      } else {
        state.items.push(item);
      }

      state.totalQty += item.qty;
      state.totalPrice += item.price * item.qty;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;

      const item = state.items.find(i => i.productId === productId);
      if (!item) return;

      state.totalQty -= item.qty;
      state.totalPrice -= item.price * item.qty;
      state.items = state.items.filter(i => i.productId !== productId);
    },

    clearCart: () => initialState,
  },
});

export const {
  addToCartSlice,
  removeFromCart,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;
