import { FC } from "react";
import styles from "./Sort.module.scss";

interface SortProps {
  onSortChange: (sortBy: string, order: "asc" | "desc") => void;
}

const ActionSort: FC<SortProps> = ({ onSortChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, order] = e.target.value.split("-") as [
      string,
      "asc" | "desc"
    ];
    onSortChange(sortBy, order);
  };
  return (
    <div className={styles.container}>
      <div className={styles.text}>Sort Actions:</div>
      <select onChange={handleChange} className={styles.form}>
        <option value="shop_id-asc">shop_id (по возрастанию)</option>
        <option value="shop_id-desc">shop_id (по убыванию)</option>
        <option value="plu-asc">PLU (по возрастанию)</option>
        <option value="plu-desc">PLU (по убыванию)</option>
        <option value="action_date-asc">date (по возрастанию)</option>
        <option value="action_date-desc">date (по убыванию)</option>
        <option value="action-asc">action (по возрастанию)</option>
        <option value="action-desc">action (по убыванию)</option>
      </select>
    </div>
  );
};

export default ActionSort;
