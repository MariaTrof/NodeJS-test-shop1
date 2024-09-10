import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./FormPage.module.scss";
import axios from 'axios';



const FormPage: React.FC = () => {
  const [isProductForm, setIsProductForm] = useState(true);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const endpoint = isProductForm ? 'http://localhost:5005/api/products' : 'http://localhost:5005/api/stock';
      const response = await axios.post(endpoint, data);
      console.log(`${isProductForm ? 'Product' : 'Stock'} создан:`, response.data);
    } catch (error) {
      console.error(`Ошибка при создании ${isProductForm ? 'продукта' : 'стока'}:`, error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{isProductForm ? 'Create Product' : 'Create Stock'}</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {isProductForm ? (
          <>
            <div>
              <input placeholder="Product PLU "{...register('plu', { required: true })} className={styles.input}/>
              {errors.plu && <div className={styles.text}>Это поле обязательно для заполнения</div>}
            </div>
            <div>
            
              <input placeholder="Product Name"{...register('name', { required: true })} className={styles.input}/>
              {errors.name && <div className={styles.text}>Это поле обязательно для заполнения</div>}
            </div>
            <div>

              <input placeholder="Shop Id"{...register('shopId', { required: true })} className={styles.input}/>
              {errors.shopId && <div className={styles.text}>Это поле обязательно для заполнения</div>}
            </div>
         
          </>
        ) : (
          <>
            <div>

              <input placeholder="id" {...register('id', { required: true })} className={styles.input}/>
              {errors.id && <div className={styles.text}>Это поле обязательно для заполнения</div>}
            </div>
            <div>
          
              <input placeholder="Product Id" {...register('product_id', { required: true })} className={styles.input}/>
              {errors.product_id && <div className={styles.text}>Это поле обязательно для заполнения</div>}
            </div>
            <div>
          
              <input placeholder="Shop Id"{...register('shop_id', { required: true })} className={styles.input}/>
              {errors.shop_id && <div className={styles.text}>Это поле обязательно для заполнения</div>}
            </div>
            <div>
     
              <input type="number" placeholder="quantity on shelf"{...register('quantity_on_shelf', { required: true })} className={styles.input}/>
              {errors.quantity_on_shelf && <div className={styles.text}>Это поле обязательно для заполнения</div>}
            </div>
            <div>
              <input type="number" placeholder="quantity in order"{...register('quantity_in_order', { required: true })} className={styles.input}/>
              {errors.quantity_in_order && <div className={styles.text}>Это поле обязательно для заполнения</div>}
            </div>
          </>
        )}
        
        <button type="submit" className={styles.btn}>{isProductForm ? 'SUBMIT' : 'SUBMIT'}</button>
      </form>

      <button onClick={() => setIsProductForm(!isProductForm)} className={styles.btn}>
        {isProductForm ? 'Create Stock' : 'Create Product'}
      </button>
    </div>
  );
};

export default FormPage;
