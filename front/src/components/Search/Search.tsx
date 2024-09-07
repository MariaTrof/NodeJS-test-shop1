import SearchIcon from '@mui/icons-material/Search';
import styles from "./Search.module.scss"
import { FC } from "react";


const Search: FC = () => {
  return (
<div className={styles.container} >
      <div>
    <form className={styles.form} >
        <input type="text" placeholder="Поиск ..." className={styles.input}  />
        <button className={styles.btn} >
        <SearchIcon className={styles.icon}  /> 
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;