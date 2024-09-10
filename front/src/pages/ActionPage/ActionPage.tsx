import { useEffect, useState } from "react";
import styles from "./ActionPage.module.scss";
import axios from "axios";
import ActionPageSkeleton from "./ActionPageSkeleton";

interface Product {
  id: number;
  name: string;
  plu: string;
}

interface Shop {
  id: number;
  name: string;
 
}

interface ActionHistory {
  id: number;
  product_id: number;
  shop_id: number;
  action: string;
  action_date: string;
  product: Product;
  shop: Shop;
}

const ActionPage: React.FC = () => {
  const [actionHistories, setActionHistories] = useState<ActionHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);


   const updateLimit = () => {
    const width = window.innerWidth;
    if (width >= 1400) {
      setLimit(6);
    } else if (width >= 1200) {
      setLimit(5);
    } else if (width >= 900) {
      setLimit(4); 
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

const fetchActionHistories = async () => {
    try {
      const response = await fetch(
        `http://localhost:5005/api/actions?limit=${limit}&page=${currentPage}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setActionHistories(data.items);
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
    fetchActionHistories();
  }, [currentPage, limit]);

  if (isLoading) {
    return <ActionPageSkeleton />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className={styles.title}>Action History</div>
      <ul>
        {actionHistories.map((action) => (
          <li key={action.id} className={styles.list}>
            <strong>Действие:</strong> {action.action} <br />
            <strong>Продукт:</strong> {action.product.name} <br />
            <strong>Магазин:</strong> {action.shop.name} <br />
            <strong>Дата действия:</strong> {action.action_date} <br />
          </li>
        ))}
      </ul>
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

export default ActionPage;
