import React, { ReactNode } from 'react';
import styles from './index.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps){
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-content']}>
        <button className={styles['close-button']} onClick={onClose}>
          Fechar
        </button>
        {children}
      </div>
    </div>
  );
};
