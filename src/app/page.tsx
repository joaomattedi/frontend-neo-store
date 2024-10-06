"use client";

import GridFornecedores from "@/components/GridFornecedores";
import styles from "./page.module.css";
import CadastroFornecedorForm from "@/components/CadastroFornecedorForm";
import { useState } from "react";

interface Fornecedor {
  id?: number;
  name: string;
  email: string;
  description: string;
  cnpj: string;
}

export default function Home() {
  const [fornecedor, setFornecedor] = useState<Fornecedor | null>(null);
  
  return (
    <div>
      <aside>
        <CadastroFornecedorForm fornecedor={fornecedor} />
      </aside>
      <main className={styles.main}>
       <GridFornecedores setFornecedorToEdit={setFornecedor}/>
      </main>
    </div>
  );
}
