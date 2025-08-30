import React from 'react';
import styles from './TableRow.module.css';
import Icon, { IconType } from '../Icon';

/**
 * Интерфейс данных одной записи тренировки
 * @interface StepData
 * @property {string} date - Дата тренировки в формате YYYY-MM-DD
 * @property {number} distance - Пройденное расстояние в километрах
 */
export interface StepData {
  date: string;
  distance: number;
}

/**
 * Интерфейс пропсов для компонента TableRow
 * @interface TableRowProps
 * @property {StepData} data - Данные одной строки таблицы
 * @property {(date: string) => void} onDelete - Функция удаления записи по дате
 * @property {(data: StepData) => void} onEdit - Функция редактирования записи
 */
interface TableRowProps {
  data: StepData;
  onDelete: (date: string) => void;
  onEdit: (data: StepData) => void;
}

/**
 * Компонент TableRow отображает одну строку таблицы с данными тренировки
 * @component
 * @param {TableRowProps} props - Пропсы компонента
 * @returns {JSX.Element} Элемент строки таблицы
 * 
 * @example
 * <TableRow data={{date: '2023-07-20', distance: 10}} onDelete={handleDelete} onEdit={handleEdit} />
 */
const TableRow: React.FC<TableRowProps> = ({ data, onDelete, onEdit }) => {
  /**
   * Форматирует дату из ISO (YYYY-MM-DD) в локальный формат ДД.ММ.ГГГГ
   * @param {string} isoDate - Дата в формате ISO
   * @returns {string} Дата в формате ДД.ММ.ГГГГ
   */
  const formatDateToLocal = (isoDate: string): string => {
    const [year, month, day] = isoDate.split('-');
    return `${day}.${month}.${year}`;
  };

  /**
   * Обработчик клика по иконке удаления
   */
  const handleDelete = () => {
    onDelete(data.date);
  };

  /**
   * Обработчик клика по иконке редактирования
   */
  const handleEdit = () => {
    onEdit(data);
  };

  return (
    <tr className={styles.row}>
      <td className={styles.cell}>{formatDateToLocal(data.date)}</td>
      <td className={styles.cell}>{data.distance.toFixed(1)} км</td>
      <td className={styles.cellActions}>
        <Icon type={IconType.EDIT} onClick={handleEdit} title="Редактировать" />
        <Icon type={IconType.DELETE} onClick={handleDelete} title="Удалить" />
      </td>
    </tr>
  );
};

export default TableRow;
