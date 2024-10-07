import { API_URL } from "@/config/config";
import { Fornecedor } from "@/interfaces/Fornecedor";

export const createFornecedor = async (fornecedor: { name: string; email: string; description: string; cnpj: string }) => {
  const response = await fetch(`${API_URL}/fornecedores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([fornecedor]),
  });

  return await response.json();
};

export const createManyFornecedores = async (fornecedores: Fornecedor) => {
  const response = await fetch(`${API_URL}/fornecedores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fornecedores),
  });

  console.log("teste");
  
  return await response.json();
}

export const getFornecedores = async (page: number = 1, size: number = 5) => {
  try {
    const response = await fetch(`${API_URL}/fornecedores/list?page=${page}&size=${size}`);

    if (!response.ok) {
        throw new Error(`Erro ao buscar fornecedores: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar fornecedores:", error);
    throw error;
  }
}

export const updateFornecedor = async (fornecedor: { id: number, name: string; email: string; description: string; cnpj: string }) => {
  try {
    const response = await fetch(`${API_URL}/fornecedores`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fornecedor),
    });

    if (!response.ok) {
        throw new Error(`Erro ao atualizar fornecedores: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar fornecedores:", error);
    throw error;
  }
}

export const deleteFornecedor = async (id: number) => {
  try {
    await fetch(`${API_URL}/fornecedores/${id}`, {
      method: 'DELETE',
    });    
  } catch (error) {
    throw new Error("Ocorreu um erro: " + error)
  }
};