import { useState, useEffect, useCallback } from 'react';
import './App.css';
import StepsForm from './components/entities/StepsForm';
import Table from './components/shared/Table';
import StatsPanel from './components/entities/StatsPanel';
import type { StepData } from './components/shared/TableRow';

/**
 * Главный компонент приложения для учета спортивных тренировок
 * @component
 * @returns {JSX.Element} Основной компонент приложения
 * 
 * @description
 * Приложение позволяет добавлять, удалять и редактировать записи о тренировках.
 * Данные автоматически сортируются по дате (новые сверху).
 * При добавлении записи с существующей датой значения суммируются.
 */

const App: React.FC = () => {
  // Состояние данных тренировок
  const [stepsData, setStepsData] = useState<StepData[]>([]);
  
  // Состояние для редактирования (null если не редактируется)
  const [editingData, setEditingData] = useState<StepData | null>(null);

  /**
   * Эффект для загрузки данных из localStorage при монтировании
   * Восстанавливает сохраненные данные тренировок
   */
  useEffect(() => {
    const savedData = localStorage.getItem('stepsData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setStepsData(parsedData);
      } catch (error) {
        console.error('Ошибка загрузки данных из localStorage:', error);
      }
    }
  }, []);

  /**
   * Эффект для сохранения данных в localStorage при изменении
   * Сохраняет текущие данные тренировок
   */
  useEffect(() => {
    localStorage.setItem('stepsData', JSON.stringify(stepsData));
  }, [stepsData]);

  /**
   * Функция сортировки данных по дате (новые сверху)
   * @param {StepData[]} data - Массив данных для сортировки
   * @returns {StepData[]} Отсортированный массив
   */
  const sortDataByDate = (data: StepData[]): StepData[] => {
    return [...data].sort((a, b) => {
      // Сравниваем даты в формате YYYY-MM-DD
      return b.date.localeCompare(a.date);
    });
  };

  /**
   * Обработчик добавления/обновления записи
   * @param {StepData} newData - Новые данные тренировки
   */
  const handleSubmit = (newData: StepData) => {
    setStepsData(prevData => {
      // Проверяем, есть ли уже запись с такой датой
      const existingIndex = prevData.findIndex(item => item.date === newData.date);
      
      let updatedData: StepData[];
      
      if (existingIndex !== -1) {
        if (editingData && editingData.date === newData.date) {
          // Редактирование существующей записи
          updatedData = prevData.map(item =>
            item.date === newData.date ? newData : item
          );
        } else {
          // Суммирование расстояния для существующей даты
          updatedData = prevData.map((item, index) =>
            index === existingIndex
              ? { ...item, distance: item.distance + newData.distance }
              : item
          );
        }
      } else {
        // Добавление новой записи
        updatedData = [...prevData, newData];
      }
      
      // Сортируем и обновляем данные
      const sortedData = sortDataByDate(updatedData);
      
      // Сбрасываем режим редактирования
      setEditingData(null);
      
      return sortedData;
    });
  };

  /**
   * Обработчик удаления записи
   * @param {string} date - Дата записи для удаления
   */
  const handleDelete = (date: string) => {
    setStepsData(prevData => {
      const updatedData = prevData.filter(item => item.date !== date);
      return sortDataByDate(updatedData);
    });
  };

  /**
   * Обработчик начала редактирования записи
   * @param {StepData} data - Данные для редактирования
   */
  const handleEdit = (data: StepData) => {
    setEditingData(data);
  };

  /**
   * Обработчик отмены редактирования
   */
  const handleCancelEdit = useCallback(() => {
    setEditingData(null);
  }, []);

  return (
    <div className="app">
      {/* Заголовок приложения */}
      <header className="header">
        <h1 className="title">Учет спортивных тренировок</h1>
        <p className="subtitle">Отслеживайте ваши прогулки и тренировки</p>
      </header>

      {/* Основное содержимое */}
      <main className="main">
        {/* Форма ввода данных */}
        <StepsForm
          onSubmit={handleSubmit}
          editData={editingData}
          onCancelEdit={handleCancelEdit}
        />

        {/* Таблица с данными */}
        <Table
          data={stepsData}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

        {/* Панель статистики */}
        <StatsPanel data={stepsData} />
      </main>

      {/* Подвал приложения */}
      <footer className="footer">
        <p>© 2025 Track Your Workouts. All rights reserved. Author: N.Yurchenko</p>
      </footer>
    </div>
  );
};

export default App;
