// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";

// interface Shop {
//   id: number;
//   name: string;
// }

// interface ShopState {
//   shops: Shop[];
//   total: number;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ShopState = {
//   shops: [],
//   total: 0,
//   loading: false,
//   error: null,
// };

// // Асинхронные действия
// export const fetchShops = createAsyncThunk("shops/fetchShops", async () => {
//   const response = await axios.get("/api/shops");
//   return response.data; // Возвращаем данные о магазинах
// });

// export const createShop = createAsyncThunk(
//   "shops/createShop",
//   async (shop: Omit<Shop, "id">) => {
//     const response = await axios.post("/api/shops", shop);
//     return response.data; // Возвращаем созданный магазин
//   }
// );

// export const updateShop = createAsyncThunk(
//   "shops/updateShop",
//   async ({ id, name }: { id: number; name: string }) => {
//     await axios.put(`/api/shops/${id}`, { name });
//     return { id, name }; // Возвращаем обновленные данные
//   }
// );

// export const removeShop = createAsyncThunk(
//   "shops/removeShop",
//   async (id: number) => {
//     await axios.delete(`/api/shops/${id}`);
//     return id; // Возвращаем id удаленного магазина
//   }
// );

// // Создаем slice
// const shopSlice = createSlice({
//   name: "shops",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchShops.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchShops.fulfilled, (state, action: PayloadAction<Shop[]>) => {
//         state.loading = false;
//         state.shops = action.payload;
//       })
//       .addCase(fetchShops.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Ошибка при загрузке магазинов";
//       })
//       .addCase(createShop.fulfilled, (state, action: PayloadAction<Shop>) => {
//         state.shops.push(action.payload); // Добавляем новый магазин
//       })
//       .addCase(updateShop.fulfilled, (state, action: PayloadAction<Shop>) => {
//         const index = state.shops.findIndex(
//           (shop) => shop.id === action.payload.id
//         );
//         if (index !== -1) {
//           state.shops[index] = action.payload; // Обновляем магазин
//         }
//       })
//       .addCase(removeShop.fulfilled, (state, action: PayloadAction<number>) => {
//         state.shops = state.shops.filter((shop) => shop.id !== action.payload); // Удаляем магазин
//       });
//   },
// });

// export const {} = shopSlice.actions; // Если нужны дополнительные действия, добавьте их здесь
// export default shopSlice.reducer;
