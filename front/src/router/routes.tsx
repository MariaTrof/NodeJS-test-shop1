import ErrorPage from "../pages/ErrorPage/ErrorPage";
import FormPage from "../pages/FormPage/FormPage";
import MainPage from "../pages/MainPage/MainPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import StockPage from "../pages/StockPage/StockPage";


export const publicRoutes = [
  {
   path: "/",
    element: <MainPage />, 
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/form",
 element: <FormPage />,  
  },
  {
    path: "/products",
    element: <ProductPage />,
  },


 {
   path: "/stock",
 element: <StockPage />,   
  },

 // {
 //   path: "/actions",
 /* element: <ActionPage />,*/  
 // },
];