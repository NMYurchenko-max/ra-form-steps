import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import Button, { ButtonType } from '../Button';

/**
 * Интерфейс пропсов для компонента Modal
 * @interface ModalProps
 * @property {boolean} isOpen - Флаг открытия модального окна
 * @property {() => void} onClose - Функция закрытия модального окна
 * @property {React.ReactNode} children - Содержимое модального окна
 * @property {string} [title] - Заголовок модального окна
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

/**
 * Компонент Modal для отображения модальных окон
 * @component
 * @param {ModalProps} props - Пропсы компонента
 * @returns {React.ReactPortal | null} Портальный рендеринг модального окна или null
 * 
 * @example
 * <Modal isOpen={isModalOpen} onClose={closeModal} title="Редактирование">
 *   <form>...</form>
 * </Modal>
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  /**
   * Обработчик закрытия модального окна по клику на оверлей
   * @param {React.MouseEvent<HTMLDivElement>} event - Событие клика
   */
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Эффект для добавления/удаления обработчика клавиши Escape
  useEffect(() => {
    /**
     * Обработчик закрытия модального окна по клавише Escape
     * @param {KeyboardEvent} event - Событие клавиатуры
     */
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset'; // Восстанавливаем скролл
    };
  }, [isOpen, onClose]);

  // Если модальное окно закрыто, не рендерим ничего
  if (!isOpen) {
    return null;
  }

  // Рендерим модальное окно через портал в body
  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        {/* Заголовок модального окна */}
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <Button
              type={ButtonType.SECONDARY}
              onClick={onClose}
              className={styles.closeButton}
            >
              ×
            </Button>
          </div>
        )}
        
        {/* Содержимое модального окна */}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
