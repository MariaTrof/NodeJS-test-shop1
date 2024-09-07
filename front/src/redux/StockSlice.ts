import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Stock {
  id: number;
  product_id: number;
  shop_id: number;
  quantity_on_shelf: number;
  quantity_in_order: number;
}

interface StockState {
  stocks: Stock[];
  total: number;
  page: number;
  limit: number;
}

const initialState: StockState = {
  stocks: [],
  total: 0,
  page: 1,
  limit: 10,
};

const StockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    setStocks: (
      state,
      action: PayloadAction<{ data: Stock[]; total: number }>
    ) => {
      state.stocks = action.payload.data;
      state.total = action.payload.total;
    },
    addStock: (state, action: PayloadAction<Stock>) => {
      state.stocks.push(action.payload);
    },
    updateStock: (state, action: PayloadAction<Stock>) => {
      const index = state.stocks.findIndex(
        (stock) => stock.id === action.payload.id
      );
      if (index !== -1) {
        state.stocks[index] = action.payload;
      }
    },
    removeStock: (state, action: PayloadAction<number>) => {
      state.stocks = state.stocks.filter(
        (stock) => stock.id !== action.payload
      );
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
  },
});

export const {
  setStocks,
  addStock,
  updateStock,
  removeStock,
  setPage,
  setLimit,
} = StockSlice.actions;
export default StockSlice.reducer;
