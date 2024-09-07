import { FC, useState } from "react";
import styles from "./FormPage.module.scss";

const FormPage: FC = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productPLU: '',
    productId: '',
    shopId: '',
    quantityOnShelf: '',
    quantityInOrder: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Сохранение продукта
      const productResponse = await fetch('http://localhost:5000/api/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.productName,
          plu: formData.productPLU,
        }),
      });

      const productData = await productResponse.json();

      // Сохранение запаса
      const stockResponse = await fetch('http://localhost:5000/api/stock/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productData.id,  // Если productData содержит id нового продукта
          shop_id: formData.shopId,
          quantity_on_shelf: formData.quantityOnShelf,
          quantity_in_order: formData.quantityInOrder,
        }),
      });

      const stockData = await stockResponse.json();
      
      if (productResponse.ok && stockResponse.ok) {
        alert('Product and stock created successfully!');
        setFormData({ productName: '', productPLU: '', productId: '', shopId: '', quantityOnShelf: '', quantityInOrder: '' });
      } else {
        alert(`Error: ${productData.error || stockData.error}`);
      }
    } catch (error) {
      alert('An error occurred while creating product and stock.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Create Product:</div>
      <div className={styles.box}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="text"
            name="productPLU"
            placeholder="Product PLU"
            value={formData.productPLU}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="text"
            name="productId"
            placeholder="Product ID"
            value={formData.productId}
            onChange={handleChange}
            className={styles.input}
          />
          <div className={styles.text}>Shop</div>
          <input
            type="text"
            name="shopId"
            placeholder="Shop ID"
            value={formData.shopId}
            onChange={handleChange}
            className={styles.input}
          />
          <div className={styles.text}>Stock</div>
          <input
            type="text"
            name="quantityOnShelf"
            placeholder="Quantity on Shelf"
            value={formData.quantityOnShelf}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="text"
            name="quantityInOrder"
            placeholder="Quantity In Order"
            value={formData.quantityInOrder}
            onChange={handleChange}
            className={styles.input}
          />
          <button type="submit" className={styles.btn}>Submit!</button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
