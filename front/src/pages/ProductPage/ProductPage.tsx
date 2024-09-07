import { FC, useEffect, useState } from "react";
import ProductPageSkeleton from "./ProductPageSkeleton";
import styles from "./ProductPage.module.scss";

interface Product {
  id: number;
  name: string;
  plu: string;
}

const ProductPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);


  const updateLimit = () => {
    const width = window.innerWidth;
    if (width >= 1400) {
      setLimit(5);
    } else if (width >= 1200) {
      setLimit(4);
    } else if (width >= 900) {
      setLimit(3); 
    } else {
      setLimit(2);
    }
  };

  useEffect(() => {
    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => {
      window.removeEventListener("resize", updateLimit);
    };
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products?limit=${limit}&page=${currentPage}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Неизвестная ошибка");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, limit]);

  if (isLoading) {
    return <ProductPageSkeleton />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Список товаров</h1>
      <div className={styles.list}>
        {products.map((product) => (
          <li key={product.id} className={styles.product_box}>
            <div className={styles.box}>
              <div className={styles.name}>{product.name}</div>
              <div className={styles.description}>
                <div className={styles.text}>PLU: {product.plu}</div>
                <div className={styles.text}>ID: {product.id}</div>
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.name}>Stock:</div>
              <div className={styles.description}>
                <div className={styles.text}>stock in shelf: {product.plu}</div>
                <div className={styles.text}>stock in order: {product.id}</div>
              </div>
              <div>Change quantity</div>
              <button className={styles.btn}>+</button>
              <button className={styles.btn}>-</button>
            </div>
          </li>
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
          disabled={currentPage === 1}
          className={styles.btn}
        >
          Назад
        </button>

        <div className={styles.text_page}>
          Страница {currentPage} из {totalPages}
        </div>

        <button
          onClick={() => {
            if (currentPage < totalPages) {
              setCurrentPage(currentPage + 1);
            }
          }}
          disabled={currentPage === totalPages}
          className={styles.btn}
        >
          Вперёд
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
