// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";

// interface ActionHistoryEntry {
//   id: number;
//   product_id: number;
//   shop_id: number;
//   action: string;
//   action_date: Date; 
//   stock_id: number;
// }

// interface ActionHistoryState {
//   actionHistory: ActionHistoryEntry[];
//   page: number;
//   limit: number;
//   total: number;
// }

// const initialState: ActionHistoryState = {
//   actionHistory: [],
//   page: 1,
//   limit: 10,
//   total: 0,
// };

// export const fetchActionHistory = createAsyncThunk(
//   "actionHistory/fetchActionHistory",
//   async (params: {
//     page?: number;
//     limit?: number;
//     shop_id?: number;
//     action?: string;
// action_date?: Date;
// stock_id?: number;
//   }) => {
//     const response = await axios.get("/api/actions", { params });
//     return response.data; 
//   }
// );


// export const createActionHistory = createAsyncThunk(
//   "actionHistory/createActionHistory",
//   async (actionHistory: Omit<ActionHistoryEntry, "id">) => {
//     const response = await axios.post("/api/actions", actionHistory);
//     return response.data; 
//   }
// );

// const ActionSlice = createSlice({
//   name: "actionHistory",
//   initialState,
//   reducers: {
//     setActionHistory: (
//       state,
//       action: PayloadAction<{ data: ActionHistoryEntry[]; total: number }>
//     ) => {
//       state.actionHistory = action.payload.data;
//       state.total = action.payload.total;
//     },
//     addActionHistory: (state, action: PayloadAction<ActionHistoryEntry>) => {
//       state.actionHistory.push(action.payload);
//     },
//     setPage: (state, action: PayloadAction<number>) => {
//       state.page = action.payload;
//     },
//     setLimit: (state, action: PayloadAction<number>) => {
//       state.limit = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchActionHistory.pending, (state) => {
//         // Здесь можно установить состояние загрузки
//       })
//       .addCase(
//         fetchActionHistory.fulfilled,
//         (
//           state,
//           action: PayloadAction<{ total: number; data: ActionHistoryEntry[] }>
//         ) => {
//           state.actionHistory = action.payload.data; // Устанавливаем полученные записи
//           state.total = action.payload.total; // Устанавливаем общее количество
//         }
//       )
//       .addCase(fetchActionHistory.rejected, (state, action) => {
//         // Здесь можно обработать ошибку при загрузке
//       })
//       .addCase(
//         createActionHistory.fulfilled,
//         (state, action: PayloadAction<ActionHistoryEntry>) => {
//           state.actionHistory.push(action.payload); // Добавляем новую запись
//         }
//       );
//   },
// });

// export const { setActionHistory, addActionHistory, setPage, setLimit } =
//   ActionSlice.actions;
// export default ActionSlice.reducer;
