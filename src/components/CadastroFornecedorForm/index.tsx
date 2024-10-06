"use client";

import { createFornecedor } from '@/services/fornecedors.service';
import React, { useState } from 'react'
import styles from './index.module.css';

export default function CadastroFornecedorForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [cnpj, setCnpj] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const fornecedor = { name, email, description, cnpj };
    
    try {
      const response = await createFornecedor(fornecedor);
      console.log(response);
      alert('Fornecedor criado');
    } catch (error) {
      console.log(error);
      alert('Erro ao criar fornecedor');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.inputField}>
        <label>Nome</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className={styles.inputField}>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className={styles.inputField}>
        <label>Descrição</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div className={styles.inputField}>
        <label>CNPJ</label>
        <input type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} required />
      </div>
      <button type="submit" className={styles.submitButton}>Cadastrar Fornecedor</button>
    </form>
  );

}
