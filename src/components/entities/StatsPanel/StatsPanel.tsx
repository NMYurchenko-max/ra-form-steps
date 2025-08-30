import React from 'react';
import styles from './StatsPanel.module.css';
import type { StepData } from '../../shared/TableRow';

/**
 * Интерфейс пропсов для компонента StatsPanel
 * @interface StatsPanelProps
 * @property {StepData[]} data - Массив данных тренировок для расчета статистики
 */
interface StatsPanelProps {
  data: StepData[];
}

/**
 * Компонент StatsPanel отображает сводную статистику по тренировкам
 * @component
 * @param {StatsPanelProps} props - Пропсы компонента
 * @returns {JSX.Element} Элемент панели статистики
 * 
 * @example
 * <StatsPanel data={stepsData} />
 */
const StatsPanel: React.FC<StatsPanelProps> = ({ data }) => {
  /**
   * Рассчитывает общее количество тренировок
   * @returns {number} Общее количество записей
   */
  const getTotalWorkouts = (): number => {
    return data.length;
  };

  /**
   * Рассчитывает суммарное пройденное расстояние
   * @returns {number} Общее расстояние в километрах
   */
  const getTotalDistance = (): number => {
    return data.reduce((total, workout) => total + workout.distance, 0);
  };

  /**
   * Рассчитывает среднее расстояние за тренировку
   * @returns {number} Среднее расстояние в километрах
   */
  const getAverageDistance = (): number => {
    if (data.length === 0) return 0;
    return getTotalDistance() / data.length;
  };

  /**
   * Находит дату самой длинной тренировки
   * @returns {string} Дата самой длинной тренировки или пустая строка
   */
  const getLongestWorkoutDate = (): string => {
    if (data.length === 0) return '';
    const longest = data.reduce((max, workout) => 
      workout.distance > max.distance ? workout : max
    );
    return longest.date;
  };

  /**
   * Находит максимальное расстояние за тренировку
   * @returns {number} Максимальное расстояние в километрах
   */
  const getMaxDistance = (): number => {
    if (data.length === 0) return 0;
    return Math.max(...data.map(workout => workout.distance));
  };

  return (
    <div className={styles.statsPanel}>
      <h3 className={styles.title}>Статистика тренировок</h3>
      
      <div className={styles.statsGrid}>
        {/* Общее количество тренировок */}
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Всего тренировок:</span>
          <span className={styles.statValue}>{getTotalWorkouts()}</span>
        </div>

        {/* Суммарное расстояние */}
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Общее расстояние:</span>
          <span className={styles.statValue}>
            {getTotalDistance().toFixed(1)} км
          </span>
        </div>

        {/* Среднее расстояние */}
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Среднее за тренировку:</span>
          <span className={styles.statValue}>
            {getAverageDistance().toFixed(1)} км
          </span>
        </div>

        {/* Самая длинная тренировка */}
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Самая длинная:</span>
          <span className={styles.statValue}>
            {getMaxDistance().toFixed(1)} км
            {getLongestWorkoutDate() && (
              <span className={styles.date}>({getLongestWorkoutDate()})</span>
            )}
          </span>
        </div>
      </div>

      {/* Сообщение при отсутствии данных */}
      {data.length === 0 && (
        <div className={styles.emptyMessage}>
          Добавьте первую тренировку, чтобы увидеть статистику
        </div>
      )}
    </div>
  );
};

export default StatsPanel;
