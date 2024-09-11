import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
//import StockSlice from "./StockSlice";
//import ShopSlice from "./ShopSlice";
//import ProductSlice from "./ProductSlice";
//import ActionSlice from "./ActionSlice";

const store = configureStore({
  reducer: {
  //  shop: ShopSlice,
  //  product: ProductSlice,
  //  stock: StockSlice,
   // action: ActionSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
