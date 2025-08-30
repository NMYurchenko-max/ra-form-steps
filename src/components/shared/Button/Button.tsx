import React from 'react';
import styles from './Button.module.css';

/**
 * Типы кнопок
 */
export const ButtonType = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGER: 'danger'
} as const;

// Тип для значений ButtonType
export type ButtonType = typeof ButtonType[keyof typeof ButtonType];

/**
 * Интерфейс пропсов для компонента Button
 * @interface ButtonProps
 * @property {React.ReactNode} children - Содержимое кнопки (текст или элементы)
 * @property {ButtonType} [type] - Тип кнопки (primary, secondary, danger)
 * @property {boolean} [disabled] - Флаг отключения кнопки
 * @property {() => void} [onClick] - Функция обратного вызова при клике
 * @property {string} [className] - Дополнительные CSS классы
 */
interface ButtonProps {
  children: React.ReactNode;
  type?: ButtonType;
  htmlType?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Универсальный компонент Button для создания кнопок разных типов
 * @component
 * @param {ButtonProps} props - Пропсы компонента
 * @returns {JSX.Element} Элемент кнопки
 * 
 * @example
 * <Button type={ButtonType.PRIMARY} onClick={() => console.log('Click')}>
 *   Сохранить
 * </Button>
 */
const Button: React.FC<ButtonProps> = ({
  children,
  type = ButtonType.PRIMARY,
  htmlType = 'button',
  disabled = false,
  onClick,
  className = ''
}) => {
  /**
   * Обработчик клика по кнопке
   * Вызывает переданную функцию onClick, если кнопка не заблокирована
   */
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  // Формируем классы для кнопки на основе типа и состояния
  const buttonClasses = `${styles.button} ${styles[type]} ${disabled ? styles.disabled : ''} ${className}`.trim();

  return (
    <button
      type={htmlType}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
      {...(disabled ? { 'aria-disabled': 'true' } : {})}
    >
      {children}
    </button>
  );
};

export default Button;
