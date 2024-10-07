"use client";

import { Fornecedor } from '@/interfaces/Fornecedor';
import { createManyFornecedores } from '@/services/fornecedors.service';
import React, { useState } from 'react'

import styles from "./index.module.css"

interface ImportJsonResponse {
  cadastrosCriados: Fornecedor[]
  cadastrosComErro: Fornecedor[]
}

export default function UploadFornecedores() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<ImportJsonResponse | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    console.log(selectedFile);
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileContent = event.target?.result;
      console.log(fileContent);
      
      if (fileContent) {
        try {

          console.log('aqui');
          
          const fornecedores = JSON.parse(fileContent as string);
          console.log(fornecedores);
          
          const response = await createManyFornecedores(fornecedores)
          console.log(response);
          
          setResult(response);
        } catch (error) {
          console.error('Erro ao ler o arquivo JSON', error);
        }
      }
    };
  
    reader.readAsText(selectedFile!);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>Cadastro de fornecedores em massa (JSON)</h3>
      </div>
      <div className={styles.buttonsContainer}>
        <input type="file" accept=".json" onChange={handleFileChange} />
        <button onClick={handleSubmit}>Upload JSON</button>
      </div>
      {result && (
        <div className={styles.resultContainer}>
          <h3>Cadastros Criados:</h3>
          <ul>
            {result.cadastrosCriados.map((fornecedor, index) => (
              <li key={index}>
                {fornecedor.name} - {fornecedor.email} - {fornecedor.cnpj}
              </li>
            ))}
          </ul>

          <h3>Cadastros Com Erro:</h3>
          <ul>
            {result.cadastrosComErro.map((fornecedor, index) => (
              <li key={index}>
                {fornecedor.name} - {fornecedor.email} - {fornecedor.cnpj}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};