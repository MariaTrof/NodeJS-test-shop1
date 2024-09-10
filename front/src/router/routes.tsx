import ActionPage from "../pages/ActionPage/ActionPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import FormPage from "../pages/FormPage/FormPage";
import MainPage from "../pages/MainPage/MainPage";
import ProductPage from "../pages/ProductPage/ProductPage";

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
    path: "/actions",
    element: <ActionPage />,
  },
];
