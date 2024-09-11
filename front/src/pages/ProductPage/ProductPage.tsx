import { FC, useEffect, useState } from "react";
import ProductPageSkeleton from "./ProductPageSkeleton";
import styles from "./ProductPage.module.scss";
import ProductSort from "../../components/Sort/ProductSort";

interface Product {
  id: number;
  name: string;
  plu: string;
}

interface Stock {
  id: number;
  product_id: number;
  shop_id: number;
  quantity_on_shelf: number;
  quantity_in_order: number;
}

interface Shop {
  id: number;
  name: string;
}


const ProductPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSortChange = (sortBy: string, order: 'asc' | 'desc') => {
    setSortBy(sortBy);
    setSortOrder(order);
  };

  const updateLimit = () => {
    const width = window.innerWidth;
    if (width >= 1400) {
      setLimit(4);
    } else if (width >= 1200) {
      setLimit(3);
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

   useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); 
      try {
        console.log("Fetching products with limit: ", limit);
        const response = await fetch(
          `http://localhost:5005/api/products?limit=${limit}&page=${currentPage}`
        );
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setProducts(data.items);
        setTotalPages(data.totalPages);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Неизвестная ошибка");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchStocks = async () => {
      try {
        const response = await fetch(`http://localhost:5005/api/stock`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setStocks(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Неизвестная ошибка");
      }
    };

    const fetchShops = async () => {
      try {
        const response = await fetch(`http://localhost:5005/api/shops`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setShops(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Неизвестная ошибка");
      }
    };

    fetchProducts();
    fetchStocks();
    fetchShops();
  }, [currentPage, limit]);
 const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortBy === 'plu') {
      return sortOrder === 'asc' ? a.plu.localeCompare(b.plu) : b.plu.localeCompare(a.plu);
    }
    return 0;
  });

  const sortedStocks = [...stocks].sort((a, b) => {
    // Сортировка по запасам
    if (sortBy === 'quantity_on_shelf') {
      return sortOrder === 'asc' ? a.quantity_on_shelf - b.quantity_on_shelf : b.quantity_on_shelf - a.quantity_on_shelf;
    } else if (sortBy === 'quantity_in_order') {
      return sortOrder === 'asc' ? a.quantity_in_order - b.quantity_in_order : b.quantity_in_order - a.quantity_in_order;
    }
    return 0;
  });

  if (isLoading) return <ProductPageSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.title}>Product Page</div>
      <ProductSort onSortChange={handleSortChange} />
      <div className={styles.list}>
        {sortedProducts.map((product) => {
          const productStock = sortedStocks.find(
            (stock) => stock.product_id === product.id
          );
          const shop = productStock
            ? shops.find((shop) => shop.id === productStock.shop_id)
            : null;
          return (
            <li key={product.id} className={styles.product_box}>
              <div className={styles.box}>
                <div className={styles.name}>{product.name}</div>
                <div className={styles.description}>
                  <div className={styles.text}>PLU: {product.plu}</div>
                  <div className={styles.text}>ID: {product.id}</div>
                  {productStock && shop && (
                    <>
                      <div className={styles.text}>Магазин ID: {shop.id}</div>
                      <div className={styles.text}>
                        Название магазина: {shop.name}
                      </div>
                      <div className={styles.text}>
                        Количество на полке: {productStock.quantity_on_shelf}
                      </div>
                      <div className={styles.text}>
                        Количество в заказе: {productStock.quantity_in_order}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </li>
          );
        })}
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
