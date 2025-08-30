import React from 'react';
import styles from './Input.module.css';

/**
 * Типы инпутов
 */
const InputTypes = {
  TEXT: 'text',
  NUMBER: 'number',
  DATE: 'date',
  EMAIL: 'email',
  PASSWORD: 'password'
} as const;

// Тип для значений InputType
export type InputType = typeof InputTypes[keyof typeof InputTypes];

// Экспортируем константу под другим именем
export const InputType = InputTypes;

/**
 * Интерфейс пропсов для компонента Input
 * @interface InputProps
 * @property {string} value - Текущее значение ввода
 * @property {(value: string) => void} onChange - Функция обратного вызова при изменении значения
 * @property {InputType} [type] - Тип инпута (text, number, date и т.д.)
 * @property {string} [placeholder] - Текст плейсхолдера
 * @property {string} [className] - Дополнительные CSS классы
 * @property {boolean} [required] - Флаг обязательного поля
 * @property {number} [min] - Минимальное значение (для number)
 * @property {number} [max] - Максимальное значение (для number)
 * @property {number} [step] - Шаг изменения значения (для number)
 * @property {string} [id] - ID элемента
 * @property {string} [name] - Name элемента
 */
interface InputProps {
  value: string;
  onChange: (value: string) => void;
  type?: InputType;
  placeholder?: string;
  className?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  id?: string;
  name?: string;
}

/**
 * Универсальный компонент Input для различных типов ввода
 * @component
 * @param {InputProps} props - Пропсы компонента
 * @returns {JSX.Element} Элемент ввода
 * 
 * @example
 * <Input 
 *   type={InputType.DATE} 
 *   value="2023-07-20" 
 *   onChange={(value) => console.log(value)} 
 *   placeholder="Выберите дату"
 * />
 */
const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type = InputType.TEXT,
  placeholder = '',
  className = '',
  required = false,
  min,
  max,
  id,
  name
}) => {
  /**
   * Обработчик изменения значения в поле ввода
   * @param {React.ChangeEvent<HTMLInputElement>} event - Событие изменения
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  // Формируем классы для инпута
  const inputClasses = `${styles.input} ${className}`.trim();

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={inputClasses}
      required={required}
      min={min}
      max={max}
      id={id}
      name={name}
      step={type === InputType.NUMBER ? '0.1' : undefined} // Шаг 0.1 для числовых полей
    />
  );
};

export default Input;
