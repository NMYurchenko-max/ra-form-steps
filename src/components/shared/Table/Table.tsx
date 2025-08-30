import React from 'react';
import styles from './Table.module.css';
import TableRow from '../TableRow';
import type { StepData } from '../TableRow';

/**
 * Интерфейс пропсов для компонента Table
 * @interface TableProps
 * @property {StepData[]} data - Массив данных тренировок
 * @property {(date: string) => void} onDelete - Функция удаления записи по дате
 * @property {(data: StepData) => void} onEdit - Функция редактирования записи
 */
interface TableProps {
  data: StepData[];
  onDelete: (date: string) => void;
  onEdit: (data: StepData) => void;
}

/**
 * Компонент Table отображает таблицу с данными тренировок
 * @component
 * @param {TableProps} props - Пропсы компонента
 * @returns {JSX.Element} Элемент таблицы
 * 
 * @example
 * <Table data={stepsData} onDelete={handleDelete} onEdit={handleEdit} />
 */
const Table: React.FC<TableProps> = ({ data, onDelete, onEdit }) => {
  /**
   * Проверяет, есть ли данные для отображения
   * @returns {boolean} true если данных нет
   */
  const isEmpty = data.length === 0;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        {/* Заголовок таблицы */}
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell}>Дата</th>
            <th className={styles.headerCell}>Пройдено, км</th>
            <th className={styles.headerCell}>Действия</th>
          </tr>
        </thead>
        
        {/* Тело таблицы */}
        <tbody>
          {isEmpty ? (
            // Сообщение при отсутствии данных
            <tr>
              <td colSpan={3} className={styles.emptyMessage}>
                Нет данных о тренировках
              </td>
            </tr>
          ) : (
            // Отображение строк с данными
            data.map((step) => (
              <TableRow
                key={step.date}
                data={step}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
