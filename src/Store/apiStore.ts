import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../@All/Component/Login/LoginApi";
import { productApi } from "../App/Pages/Admin/Tab/Products/ProductApi";
import { categoryApi } from "../App/Pages/Admin/Tab/AdminCategory/CategoryApi";
import AuthReducer from "../AuthSlice/AuthSlice"
import FormReducer from "../@All/Component/FormSlice/FomSlice"
import cartReduce from "../@All/Component/Cart/CartStore/CartSlice"
import { CartApi } from "../@All/Component/Cart/CartApi/CartApi";
import { AddressesApi } from "../@All/Component/Addresses/AddressesApi";
import { CheckOutapi } from "../@All/Component/Cart/CartPayment/CheckOut/CheckOutAPi";
export const store = configureStore({
  reducer: {
    RegisterData: FormReducer,
    userAuth: AuthReducer,

    cart: cartReduce, 

    [authApi.reducerPath]: authApi.reducer,
    [CartApi.reducerPath]: CartApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [AddressesApi.reducerPath]: AddressesApi.reducer,
     [CheckOutapi.reducerPath]: CheckOutapi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(productApi.middleware)
      .concat(categoryApi.middleware)
      .concat(CartApi.middleware)
      .concat(AddressesApi.middleware)
      .concat(CheckOutapi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

