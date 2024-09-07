
import { FC } from "react";
import styles from "./Product.module.scss";
import { removeProduct } from "../../redux/ProductSlice";
import { useAppDispatch } from "../../redux/store";


export interface ProductProps {
  id: number;
  plu: string;
  name: string;
}

const Product: FC<ProductProps> = ({ id, plu, name }) => {
 // const dispatch = useAppDispatch();

 // const handleDelete = () => {
//    dispatch(removeProduct(id)); // Вызываем действие для удаления продукта
//  };

  return (
    <div className={styles.container}>
      <p>ID: {id}</p>
      <p>PLU: {plu}</p>
      <p>Name: {name}</p>
   {/*   <button onClick={handleDelete}>Удалить товар</button> */}
    </div>
  );
};

export default Product;
