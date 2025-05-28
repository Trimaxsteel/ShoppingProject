import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@app/redux/index";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  quantity: number;
}

interface CartState {
  cart: Product[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const checkProductIsAdded = state.cart.find((item) => {
        return item.id === action.payload.id;
      });
      if (checkProductIsAdded) {
        state.cart = state.cart.map((item) => {
          return { ...item, quantity: item.quantity + 1 };
        });
      } else {
        state.cart = [...state.cart, { ...action.payload, quantity: 1 }];
        // state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product: any) => product.id !== action.payload.id,
      );
    },

    incrementQuantity: (state, action) => {
      state.cart = state.cart.map((item: any) => {
        return {
          ...item,
          quantity: action.payload,
        };
      });
    },

    decrementQuantity: (state, action) => {
      state.cart = state.cart.map((item: any) => {
        return { ...item, quantity: action.payload };
      });
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export const getCart = (state: RootState) => state.cart.cart;
export default cartSlice.reducer;
