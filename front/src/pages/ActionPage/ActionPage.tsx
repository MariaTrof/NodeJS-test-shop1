import { useEffect, useState } from "react";
import styles from "./ActionPage.module.scss";
import ActionPageSkeleton from "./ActionPageSkeleton";
import ActionSort from "../../components/Sort/ActionSort";

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
  const [limit, setLimit] = useState(4);
  const [sortBy, setSortBy] = useState<string>("shop_id"); // По умолчанию сортировка по shop_id
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

const handleSortChange = (sortBy: string, order: "asc" | "desc") => {
  console.log("Сортировка по:", sortBy, "направление", order);
  setSortBy(sortBy);
  setSortOrder(order);
};

  const updateLimit = () => {
    const width = window.innerWidth;
    if (width >= 1400) {
      setLimit(3);
    } else if (width >= 1200) {
      setLimit(3);
    } else if (width >= 900) {
      setLimit(2);
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

  const sortedActionHistories = [...actionHistories].sort((a, b) => {
    let comparison = 0;

    if (sortBy === "action") {
      comparison = a.action.localeCompare(b.action);
    } else if (sortBy === "action_date") {
      comparison =
        new Date(a.action_date).getTime() - new Date(b.action_date).getTime();
    } else if (sortBy === "shop_id") {
      comparison = a.shop_id - b.shop_id;
    } else if (sortBy === "plu") {
      comparison = a.product.plu.localeCompare(b.product.plu);
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  if (isLoading) {
    return <ActionPageSkeleton />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className={styles.title}>Action History</div>
      <ActionSort onSortChange={handleSortChange} />

      <ul>
        {sortedActionHistories.map((action) => (
          <li key={action.id} className={styles.list}>
            <strong>Действие:</strong> {action.action} <br />
            <strong>Продукт:</strong>{" "}
            {action.product ? action.product.name : "Нет данных"} <br />
            <strong>PLU:</strong>{" "}
            {action.product ? action.product.plu : "Нет данных"} <br />
            <strong>Магазин:</strong>{" "}
            {action.shop ? action.shop.name : "Нет данных"} <br />
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
