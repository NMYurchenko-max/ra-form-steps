import React from 'react';
import styles from './Icon.module.css';

/**
 * Типы иконок
 */
const IconTypes = {
  DELETE: 'delete',
  EDIT: 'edit',
  ADD: 'add',
  CHECK: 'check'
} as const;

// Тип для значений IconType
export type IconType = typeof IconTypes[keyof typeof IconTypes];

// Экспортируем константу под другим именем
export const IconType = IconTypes;

/**
 * Интерфейс пропсов для компонента Icon
 */
interface IconProps {
  type: IconType;
  onClick?: () => void;
  className?: string;
  title?: string;
  disabled?: boolean;
}

/**
 * Компонент Icon для отображения различных иконок
 */
const Icon: React.FC<IconProps> = ({
  type,
  onClick,
  className = '',
  title,
  disabled = false
}) => {
  /**
   * Обработчик клика по иконке
   */
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  /**
   * Функция для получения символа иконки по типу
   */
  const getIconSymbol = (): string => {
    switch (type) {
      case IconType.DELETE:
        return '✘'; // Символ крестика
      case IconType.EDIT:
        return '✎'; // Символ карандаша
      case IconType.ADD:
        return '➕'; // Символ плюса
      case IconType.CHECK:
        return '✓'; // Символ галочки
      default:
        return '';
    }
  };

  // Формируем классы для иконки
  const iconClasses = `${styles.icon} ${styles[type]} ${disabled ? styles.disabled : ''} ${className}`.trim();

  // Создаем объект с props для span
  const spanProps = {
    className: iconClasses,
    onClick: handleClick,
    title: title,
    role: 'button',
    tabIndex: disabled ? -1 : 0,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    }
  };

  // Добавляем aria-disabled только если иконка отключена
  if (disabled) {
    (spanProps as any)['aria-disabled'] = 'true';
  }

  return (
    <span {...spanProps}>
      {getIconSymbol()}
    </span>
  );
};

export default Icon;
