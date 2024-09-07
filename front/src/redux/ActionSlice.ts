import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ActionHistoryEntry {
  id: number;
  product_id: number;
  shop_id: number;
  action: string;
  action_date: string; // Можно заменить на Date, если нужно
}

interface ActionHistoryState {
  actionHistory: ActionHistoryEntry[];
  page: number;
  limit: number;
  total: number;
}

const initialState: ActionHistoryState = {
  actionHistory: [],
  page: 1,
  limit: 10,
  total: 0,
};

// AsyncThunk для получения истории действий
export const fetchActionHistory = createAsyncThunk(
  "actionHistory/fetchActionHistory",
  async (params: {
    page?: number;
    limit?: number;
    shop_id?: number;
    action?: string;
    start_date?: string;
    end_date?: string;
  }) => {
    const response = await axios.get("/api/action-history", { params });
    return response.data; // Возвращаем данные о действиях
  }
);

// AsyncThunk для добавления записи в историю действий
export const createActionHistory = createAsyncThunk(
  "actionHistory/createActionHistory",
  async (actionHistory: Omit<ActionHistoryEntry, "id">) => {
    const response = await axios.post("/api/action-history", actionHistory);
    return response.data; // Возвращаем созданную запись
  }
);

const ActionSlice = createSlice({
  name: "actionHistory",
  initialState,
  reducers: {
    setActionHistory: (
      state,
      action: PayloadAction<{ data: ActionHistoryEntry[]; total: number }>
    ) => {
      state.actionHistory = action.payload.data;
      state.total = action.payload.total;
    },
    addActionHistory: (state, action: PayloadAction<ActionHistoryEntry>) => {
      state.actionHistory.push(action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActionHistory.pending, (state) => {
        // Здесь можно установить состояние загрузки
      })
      .addCase(
        fetchActionHistory.fulfilled,
        (
          state,
          action: PayloadAction<{ total: number; data: ActionHistoryEntry[] }>
        ) => {
          state.actionHistory = action.payload.data; // Устанавливаем полученные записи
          state.total = action.payload.total; // Устанавливаем общее количество
        }
      )
      .addCase(fetchActionHistory.rejected, (state, action) => {
        // Здесь можно обработать ошибку при загрузке
      })
      .addCase(
        createActionHistory.fulfilled,
        (state, action: PayloadAction<ActionHistoryEntry>) => {
          state.actionHistory.push(action.payload); // Добавляем новую запись
        }
      );
  },
});

export const { setActionHistory, addActionHistory, setPage, setLimit } =
  ActionSlice.actions;
export default ActionSlice.reducer;
