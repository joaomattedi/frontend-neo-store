"use client";

import { createFornecedor, updateFornecedor } from '@/services/fornecedors.service';
import React, { useEffect, useState } from 'react'
import styles from './index.module.css';
import { validarCNPJ } from '@/utils/cnpj-utils';
import { validarEmail } from '@/utils/email-utils';
import { Fornecedor } from '@/interfaces/Fornecedor';

interface CadastroFornecedorFormProps {
  fornecedorParaEditar?: Fornecedor | null;
  onSave?: (fornecedor: Fornecedor) => void;
}

export default function CadastroFornecedorForm({fornecedorParaEditar, onSave}: CadastroFornecedorFormProps) {
  const [fornecedor, setFornecedor] = useState<Fornecedor>({
    name: '',
    email: '',
    description: '',
    cnpj: ''
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validarEmail(fornecedor.email)) {
      alert('E-mail Inválido!');
      return;
    }
    
    if (!validarCNPJ(fornecedor.cnpj)) {
      alert('CNPJ Inválido!');
      return;
    }
    
    try {
      if (fornecedorParaEditar) {
        const fornecedorAtualizar = {
          ...fornecedor,
          id: fornecedorParaEditar.id!,
        }
        await updateFornecedor(fornecedorAtualizar);
        if (onSave) {
          onSave(fornecedorAtualizar);
        }
      }
      await createFornecedor(fornecedor);
      alert('Fornecedor criado');
    } catch (error) {
      console.log(error);
      alert('Erro ao criar fornecedor');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFornecedor((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    if (fornecedorParaEditar) {
      setFornecedor(fornecedorParaEditar);
    }
  }, [fornecedorParaEditar])

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.inputField}>
        <label>Nome</label>
        <input type="text" name="name" value={fornecedor.name} onChange={handleChange} required />
      </div>
      <div className={styles.inputField}>
        <label>Email</label>
        <input type="email" name="email" value={fornecedor.email} onChange={handleChange} required />
      </div>
      <div className={styles.inputField}>
        <label>Descrição</label>
        <input type="text" name="description" value={fornecedor.description} onChange={handleChange} required />
      </div>
      <div className={styles.inputField}>
        <label>CNPJ</label>
        <input type="text" name="cnpj" value={fornecedor.cnpj} onChange={handleChange} required />
      </div>
      <button type="submit" className={styles.submitButton}>Cadastrar Fornecedor</button>
    </form>
  );

}
