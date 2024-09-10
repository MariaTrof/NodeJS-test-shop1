import axios from "axios";

 const $apiClient = axios.create({
  baseURL: "https://localhost:5005/api",
 });

$apiClient.interceptors.response.use(
   (response) => response,
   (error) => {
    console.error("API Error:", error);
     return Promise.reject(error);
   }
 );

 export default $apiClient;
