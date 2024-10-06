import { API_URL } from "@/config/config";

export const createFornecedor = async (fornecedor: { name: string; email: string; description: string; cnpj: string }) => {
  const response = await fetch(`${API_URL}/fornecedores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([fornecedor]),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar fornecedor: ' + response.statusText);
  }

  return await response.json();
};

export const getFornecedores = 
  async (page: number = 1, size: number = 5) => {
      try {
          const response = await fetch(`${API_URL}/fornecedores/list?page=${page}&size=${size}`);

          if (!response.ok) {
              throw new Error(`Erro ao buscar fornecedores: ${response.statusText}`);
          }

          const data = await response.json();
          return data;
      } catch (error) {
          console.error("Erro ao buscar fornecedores:", error);
          throw error;
      }
  }
