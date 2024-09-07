// import axios from "axios";

// // Функция для получения истории действий
// export const fetchActionHistory = async (params: {
//   page?: number;
//   limit?: number;
//   shop_id?: number;
//   action?: string;
//   start_date?: string;
//   end_date?: string;
// }) => {
//   try {
//     const response = await axios.get(`/api/action-history`, { params });
//     return response.data; // Возвращаем данные о действиях
//   } catch (error) {
//     throw new Error(
//       error.response.data.message || "Ошибка при загрузке истории действий"
//     );
//   }
// };

// // Функция для добавления записи в историю действий
// export const createAction = async (actionData: {
//   product_id: number;
//   shop_id: number;
//   action: string;
// }) => {
//   try {
//     const response = await axios.post(`/api/action-history`, actionData);
//     return response.data; // Возвращаем созданную запись
//   } catch (error) {
//     throw new Error(
//       error.response.data.message || "Ошибка при добавлении записи"
//     );
//   }
// };
