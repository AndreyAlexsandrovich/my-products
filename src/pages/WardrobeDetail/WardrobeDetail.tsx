import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../components/hooks/redux';
import { fetchProductById, deleteProduct, clearCurrentProduct } from '../../store/productsSlice';
import { Spin, Button, Modal } from 'antd';
import styles from './WardrobeDetail.module.scss';

export const WardrobeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentProduct, loading } = useAppSelector((state) => state.products);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [id, dispatch]);

  const handleDelete = async () => {
    if (id) {
      try {
        await dispatch(deleteProduct(id)).unwrap();
        navigate('/wardrobe');
      } catch {
       
      }
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spin tip="Загрузка..." size="large" />
      </div>
    );
  }

  if (!currentProduct) {
    return <div className={styles.error}>Вещь не найдена</div>;
  }

  return (
    <div className={styles.container}>
      <Button className={styles.backButton} onClick={() => navigate('/wardrobe')}>
        ← Назад к списку
      </Button>

      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            src={currentProduct.image || 'https://via.placeholder.com/400x400?text=Нет+изображения'}
            alt={currentProduct.name}
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <h1 className={styles.name}>{currentProduct.name}</h1>
          <p className={styles.category}>Категория: {currentProduct.category}</p>
          <p className={styles.date}>Добавлено: {currentProduct.addAt}</p>
          <p className={styles.description}>{currentProduct.detailDescription}</p>

          <div className={styles.actions}>
            <Button danger size="large" onClick={() => setIsModalOpen(true)}>
              Удалить
            </Button>
          </div>
        </div>
      </div>

      <Modal
        title="Подтверждение удаления"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={() => setIsModalOpen(false)}
        okText="Удалить"
        cancelText="Отмена"
        okButtonProps={{ danger: true }}
      >
        <p>
          Вы уверены, что хотите удалить вещь <strong>«{currentProduct.name}»</strong>?
        </p>
        <p>Это действие нельзя отменить.</p>
      </Modal>
    </div>
  );
};

export default WardrobeDetail;