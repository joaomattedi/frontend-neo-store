"use client";

import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { getFornecedores } from '@/services/fornecedors.service';

interface Fornecedor {
  id?: number;
  name: string;
  email: string;
  description: string;
  cnpj: string;
}

export default function GridFornecedores() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [disabledButtons, setDisableButtons] = useState(false);

  const fetchFornecedores = async () => {
    try {
      const data = await getFornecedores(currentPage);
      if (data.length > 0) {
        setFornecedores(data);
        setDisableButtons(false);
      }
      if (data.length < 5) {
        setDisableButtons(true);
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar fornecedores");
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  useEffect(() => {
    fetchFornecedores();
  }, [currentPage]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.gridContainer}>
      {fornecedores.map((fornecedor, index) => (
        <div key={index} className={styles.gridItem}>
            <h3>{fornecedor.name}</h3>
            <p>{fornecedor.email}</p>
            <p>{fornecedor.description}</p>
            <p>{fornecedor.cnpj}</p>
            <button>Editar</button>
        </div>
      ))}
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className={styles.pageButton}>
            Anterior
        </button>
        <button onClick={handleNextPage} disabled={disabledButtons} className={styles.pageButton}>
            Próxima
        </button>
      </div>
    </div>
  );
}
