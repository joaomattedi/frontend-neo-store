import React from 'react';
import styles from './index.module.css'

interface Fornecedor {
  id?: number;
  name: string;
  email: string;
  description: string;
  cnpj: string;
}

interface FornecedorProps {
  id: number;
  name: string;
  email: string;
  description: string;
  cnpj: string;
  onDelete: (id: number) => void;
  onEdit: (fornecedor: Fornecedor) => void;
}

export default function FornecedorCard({ id, name, email, description, cnpj, onDelete, onEdit }: FornecedorProps) {
  return (
    <div className={styles.fornecedorCard}>
      <h3>{name}</h3>
      <p>Email: {email}</p>
      <p>Description: {description}</p>
      <p>CNPJ: {cnpj}</p>
      <button onClick={() => onEdit({id,name,email,description,cnpj})} className={styles.pageButton}>Editar</button>
      <button onClick={() => onDelete(id)} className={styles.pageButton}>Deletar</button>
    </div>
  );
};
