import React, { useEffect, useState } from 'react';
import styles from "./StockPage.module.scss";
import "./StockSkeleton";
import StockSkeleton from './StockSkeleton';

interface Stock {
  id: number;
  product_id: number;
  shop_id: number;
  quantity_on_shelf: number;
  quantity_in_order: number;
}

const StockPage: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
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

  const fetchStocks = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/stock?limit=${limit}&page=${currentPage}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setStocks(data.items);
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
    fetchStocks();
  }, [currentPage, limit]);

  if (isLoading) {
    return <StockSkeleton />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }



  return (
    <div>
      <h1>Список Остатков</h1>
      <div>
        <div>
          <div>
            <div>ID</div>
            <div>Продукт ID</div>
            <div>Магазин ID</div>
            <div>Количество на полке</div>
            <div>Количество в заказе</div>
          </div>
        </div>
        <div>
          {stocks.map(stock => (
            <div key={stock.id}>
              <div>{stock.id}</div>
              <div>{stock.product_id}</div>
              <div>{stock.shop_id}</div>
              <div>{stock.quantity_on_shelf}</div>
              <div>{stock.quantity_in_order}</div>
            </div>
          ))}
        </div>
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

export default StockPage;
