import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../components/hooks/redux';
import { fetchProducts } from '../../store/productsSlice';
import { Spin, Button } from 'antd';
import styles from './Wardrobe.module.scss';

export const Wardrobe: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spin tip="Загрузка вещей..." size="large" />
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Мой гардероб</h1>
        <Button type="primary" size="large" onClick={() => navigate('/wardrobe/add')}>
          + Добавить вещь
        </Button>
      </div>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <p>В гардеробе пока нет вещей</p>
          <Button type="primary" onClick={() => navigate('/wardrobe/add')}>
            Добавить первую вещь
          </Button>
        </div>
      ) : (
        <div className={styles.grid}>
          {items.map((product) => (
            <div
              key={product.id}
              className={styles.card}
              onClick={() => navigate(`/wardrobe/${product.id}`)}
            >
              <div className={styles.cardImage}>
                <img
                  src={product.image || 'https://via.placeholder.com/300x200?text=Нет+изображения'}
                  alt={product.name}
                />
              </div>
              <div className={styles.cardContent}>
                <h3>{product.name}</h3>
                <p className={styles.category}>{product.category}</p>
                <p className={styles.description}>{product.detailDescription.slice(0, 100)}...</p>
                <span className={styles.date}>Добавлено: {product.addAt}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wardrobe;