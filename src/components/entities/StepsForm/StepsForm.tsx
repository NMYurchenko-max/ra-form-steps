import React, { useState, useEffect } from 'react';
import styles from './StepsForm.module.css';
import Input, { InputType } from '../../shared/Input';
import Button, { ButtonType } from '../../shared/Button';
import type { StepData } from '../../shared/TableRow';

/**
 * Интерфейс пропсов для компонента StepsForm
 * @interface StepsFormProps
 * @property {(data: StepData) => void} onSubmit - Функция отправки формы
 * @property {StepData | null} [editData] - Данные для редактирования (если есть)
 * @property {() => void} [onCancelEdit] - Функция отмены редактирования
 */
interface StepsFormProps {
  onSubmit: (data: StepData) => void;
  editData?: StepData | null;
  onCancelEdit?: () => void;
}

/**
 * Интерфейс состояния формы
 * @interface FormState
 * @property {string} date - Дата тренировки
 * @property {string} distance - Пройденное расстояние
 */
interface FormState {
  date: string;
  distance: string;
}

/**
 * Компонент StepsForm для ввода данных о тренировках
 * @component
 * @param {StepsFormProps} props - Пропсы компонента
 * @returns {JSX.Element} Элемент формы ввода
 * 
 * @example
 * <StepsForm onSubmit={handleSubmit} />
 */
const StepsForm: React.FC<StepsFormProps> = ({
  onSubmit,
  editData = null,
  onCancelEdit
}) => {
  // Состояние формы
  const [formState, setFormState] = useState<FormState>({
    date: '',
    distance: ''
  });

  // Состояние ошибок валидации
  const [errors, setErrors] = useState<{ date?: string; distance?: string }>({});

  /**
   * Эффект для заполнения формы при редактировании
   * Заполняет поля формы данными из editData
   */
  useEffect(() => {
    if (editData) {
      setFormState({
        date: editData.date,
        distance: editData.distance.toString()
      });
    } else {
      setFormState({
        date: '',
        distance: ''
      });
    }
  }, [editData]);

  /**
   * Валидация формы
   * @returns {boolean} true если форма валидна
   */
  const validateForm = (): boolean => {
    const newErrors: { date?: string; distance?: string } = {};

    // Валидация даты
    if (!formState.date) {
      newErrors.date = 'Дата обязательна для заполнения';
    } else {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(formState.date)) {
        newErrors.date = 'Неверный формат даты (YYYY-MM-DD)';
      }
    }

    // Валидация расстояния
    if (!formState.distance) {
      newErrors.distance = 'Расстояние обязательно для заполнения';
    } else {
      const distanceValue = parseFloat(formState.distance);
      if (isNaN(distanceValue) || distanceValue <= 0) {
        newErrors.distance = 'Расстояние должно быть положительным числом';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Обработчик изменения поля даты
   * @param {string} value - Новое значение даты
   */
  const handleDateChange = (value: string) => {
    setFormState(prev => ({ ...prev, date: value }));
    // Очищаем ошибку при изменении
    if (errors.date) {
      setErrors(prev => ({ ...prev, date: undefined }));
    }
  };

  /**
   * Обработчик изменения поля расстояния
   * @param {string} value - Новое значение расстояния
   */
  const handleDistanceChange = (value: string) => {
    setFormState(prev => ({ ...prev, distance: value }));
    // Очищаем ошибку при изменении
    if (errors.distance) {
      setErrors(prev => ({ ...prev, distance: undefined }));
    }
  };

  /**
   * Обработчик отправки формы
   * @param {React.FormEvent} event - Событие формы
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      // Преобразуем данные и отправляем
      const stepData: StepData = {
        date: formState.date,
        distance: parseFloat(formState.distance)
      };

      onSubmit(stepData);

      // Сбрасываем форму только если не в режиме редактирования
      if (!editData) {
        setFormState({
          date: '',
          distance: ''
        });
      }
    }
  };

  /**
   * Обработчик отмены редактирования
   */
  const handleCancelEdit = () => {
    if (onCancelEdit) {
      onCancelEdit();
    }
    setFormState({
      date: '',
      distance: ''
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formRow}>
        {/* Поле ввода даты */}
        <div className={styles.inputGroup}>
          <label htmlFor="date" className={styles.label}>
            Дата тренировки
          </label>
          <Input
            id="date"
            type={InputType.DATE}
            value={formState.date}
            onChange={handleDateChange}
            placeholder="2023-07-20"
            required
            className={errors.date ? styles.inputError : ''}
          />
          {errors.date && <span className={styles.error}>{errors.date}</span>}
        </div>

        {/* Поле ввода расстояния */}
        <div className={styles.inputGroup}>
          <label htmlFor="distance" className={styles.label}>
            Пройдено, км
          </label>
          <Input
            id="distance"
            type={InputType.NUMBER}
            value={formState.distance}
            onChange={handleDistanceChange}
            placeholder="Введите расстояние"
            min={0.1}
            step={0.1}
            required
            className={errors.distance ? styles.inputError : ''}
          />
          {errors.distance && (
            <span className={styles.error}>{errors.distance}</span>
          )}
        </div>

        {/* Кнопки формы */}
        <div className={styles.buttonGroup}>
          {editData ? (
            <>
              <Button type={ButtonType.PRIMARY} htmlType="submit">
                Сохранить
              </Button>
              <Button
                type={ButtonType.SECONDARY}
                onClick={handleCancelEdit}
              >
                Отмена
              </Button>
            </>
          ) : (
            <Button type={ButtonType.PRIMARY} htmlType="submit">
              Добавить
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default StepsForm;
