"use client";

import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { deleteFornecedor, getFornecedores } from '@/services/fornecedors.service';
import FornecedorCard from '../GridItem';
import Modal from '../Modal';
import CadastroFornecedorForm from '../CadastroFornecedorForm';
import { Fornecedor } from '@/interfaces/Fornecedor';

export default function GridFornecedores() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [disabledButtons, setDisableButtons] = useState(false);
  const [fornecedorParaEditar, setFornecedorParaEditar] = useState<Fornecedor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleEdit = (fornecedor: Fornecedor) => {
    setFornecedorParaEditar(fornecedor); // Define o fornecedor a ser editado
    setIsModalOpen(true); // Abre o modal
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDeleteFornecedor = async (id: number) => {
    try {
      await deleteFornecedor(id);
      setFornecedores(fornecedores.filter(fornecedor => fornecedor.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  const handleSaveFornecedor = (fornecedor: Fornecedor) => {
    if (fornecedor.id) {
      const updatedFornecedores = fornecedores.map((f) =>
        f.id === fornecedor.id ? fornecedor : f
      );
      setFornecedores(updatedFornecedores);
    }
    setFornecedorParaEditar(null);
    setIsModalOpen(false);
  };
  
  useEffect(() => {
    fetchFornecedores();
  }, [currentPage]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.gridContainer}>
        {fornecedores.map((fornecedor) => (
          <FornecedorCard
            key={fornecedor.id}
            id={fornecedor.id!}
            name={fornecedor.name}
            email={fornecedor.email}
            description={fornecedor.description}
            cnpj={fornecedor.cnpj}
            onDelete={handleDeleteFornecedor}
            onEdit={handleEdit}
          />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className={styles.pageButton}>
            Anterior
        </button>
        <button onClick={handleNextPage} disabled={disabledButtons} className={styles.pageButton}>
            Próxima
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CadastroFornecedorForm fornecedorParaEditar={fornecedorParaEditar} onSave={handleSaveFornecedor} />
      </Modal>
    </div>
  );
}
