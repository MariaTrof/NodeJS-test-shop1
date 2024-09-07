import { FC } from "react";
import styles from "./App.module.scss";

import Search from "../components/Search/Search";
import { Link, Route,  Routes } from "react-router-dom";
import ProductPage from "../pages/ProductPage/ProductPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import MainPage from "../pages/MainPage/MainPage";
import StockPage from "../pages/StockPage/StockPage";
import FormPage from "../pages/FormPage/FormPage";

const App: FC = () => {
  return (
    <div className={styles.app}>
      <div className={styles.head}>
        <div className={styles.head_content}>
          <p className={styles.title}>Shop App</p>
          <Search />
          <div className={styles.links_list}>
            <Link className={styles.link} to="/actions">
              Action History
            </Link>
            <Link className={styles.link} to="/products">
              Products
            </Link>
            <Link className={styles.link} to="/stock">
              Stock
            </Link>
            <Link className={styles.link} to="/form">
              FORM
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/stock" element={<StockPage />} />
          <Route path="/actions" element={<ProductPage />} />
          <Route path="/form" element={<FormPage />} /> 
          <Route path="*" element={<ErrorPage />} />

        </Routes>
      </div>
      <div className={styles.foo}>2024 ©github.com/MariaTrof</div>
    </div>
  );
};

export default App;
