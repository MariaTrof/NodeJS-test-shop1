import { FC } from "react";
import styles from "./ProductSort.module.scss";

interface SortProps {
  onSortChange: (sortBy: string, order: 'asc' | 'desc') => void;
}

const ProductSort: FC<SortProps> = ({ onSortChange}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, order] = e.target.value.split('-') as [string, 'asc' | 'desc'];
    onSortChange(sortBy, order);
  };
  return (
    <div className={styles.container}>
        <div className={styles.text}>Sort by Products:</div>
      <select onChange={handleChange} className={styles.form}>
        <option value="name-asc">Название (по возрастанию)</option>
        <option value="name-desc">Название (по убыванию)</option>
        <option value="plu-asc">PLU (по возрастанию)</option>
        <option value="plu-desc">PLU (по убыванию)</option>
      </select>

      <div className={styles.text}>Sort by Stocks:</div>
      <select onChange={handleChange} className={styles.form}>
        <option value="quantity_on_shelf-asc">Количество на полке (по возрастанию)</option>
        <option value="quantity_on_shelf-desc">Количество на полке (по убыванию)</option>
        <option value="quantity_in_order-asc">Количество в заказе (по возрастанию)</option>
        <option value="quantity_in_order-desc">Количество в заказе (по убыванию)</option>
      </select>
    </div>
  );
};

export default ProductSort;
