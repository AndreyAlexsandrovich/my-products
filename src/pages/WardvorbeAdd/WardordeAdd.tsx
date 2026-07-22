import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../components/hooks/redux';
import { addProduct } from '../../store/productsSlice';
import { Button, Input, Select } from 'antd';
import styles from './WardrobeAdd.module.scss';

export const WardrobeAdd: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);


  const [name, setName] = useState('');
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [addAt, setAddAt] = useState(new Date().toISOString().split('T')[0]);
  const [image, setImage] = useState('');
  const [detailDescription, setDetailDescription] = useState('');


  const [errors, setErrors] = useState<{ name?: string; category?: string; addAt?: string; detailDescription?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'Название обязательно';
    if (!category) newErrors.category = 'Категория обязательна';
    if (!addAt) newErrors.addAt = 'Дата обязательна';
    if (!detailDescription.trim()) newErrors.detailDescription = 'Описание обязательно';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }


    try {
      await dispatch(addProduct({ name, category: category!, addAt, image, detailDescription })).unwrap();
      navigate('/wardrobe');
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Добавить вещь</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label>Название *</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Название" />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.field}>
          <label>Категория *</label>
          <Select
            placeholder="Выберите категорию"
            onChange={(value) => setCategory(value)}
            value={category}
            options={[
              { value: 'Электроника', label: 'Электроника' },
              { value: 'Одежда', label: 'Одежда' },
              { value: 'Обувь', label: 'Обувь' },
              { value: 'Аксессуары', label: 'Аксессуары' },
              { value: 'Другое', label: 'Другое' },
            ]}
          />
          {errors.category && <span className={styles.error}>{errors.category}</span>}
        </div>

        <div className={styles.field}>
          <label>Дата добавления *</label>
          <input type="date" value={addAt} onChange={(e) => setAddAt(e.target.value)} className={styles.dateInput} />
          {errors.addAt && <span className={styles.error}>{errors.addAt}</span>}
        </div>

        <div className={styles.field}>
          <label>Ссылка на изображение</label>
          <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/image.jpg" />
        </div>

        <div className={styles.field}>
          <label>Описание *</label>
          <Input.TextArea value={detailDescription} onChange={(e) => setDetailDescription(e.target.value)} placeholder="Описание" rows={4} />
          {errors.detailDescription && <span className={styles.error}>{errors.detailDescription}</span>}
        </div>

        <div className={styles.actions}>
          <Button onClick={() => navigate('/wardrobe')} size="large">Отмена</Button>
          <Button type="primary" htmlType="submit" size="large" loading={loading}>
            {loading ? 'Добавление...' : 'Добавить'}
          </Button>
        </div>
      </form>
    </div>
  );
};