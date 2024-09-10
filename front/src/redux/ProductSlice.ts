import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  id: number;
  plu: string;
  name: string;
}

interface ProductState {
  products: Product[];
  page: number;
  limit: number;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  page: 1,
  limit: 10,
  loading: false,
  error: null,
};


export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params: {
    page?: number;
    limit?: number;
    name?: string;
    plu?: string;
  }) => {
    const response = await axios.get("/api/products", { params });
    return response.data; 
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product: Omit<Product, "id">) => {
    const response = await axios.post("/api/products", product);
    return response.data; 
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, ...product }: Product) => {
    await axios.put(`/api/products/${id}`, product);
    return { id, ...product }; 
  }
);

export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id: number) => {
    await axios.delete(`/api/products/${id}`);
    return id; 
  }
);

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (
          state,
          action: PayloadAction<{ totalItems: number; items: Product[] }>
        ) => {
          state.loading = false;
          state.products = action.payload.items;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при загрузке продуктов";
      })
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.products.push(action.payload);
        }
      )
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const index = state.products.findIndex(
            (product) => product.id === action.payload.id
          );
          if (index !== -1) {
            state.products[index] = action.payload; 
          }
        }
      )
      .addCase(
        removeProduct.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.products = state.products.filter(
            (product) => product.id !== action.payload
          ); 
        }
      );
  },
});

export const { setPage, setLimit } = ProductSlice.actions;
export default ProductSlice.reducer;
