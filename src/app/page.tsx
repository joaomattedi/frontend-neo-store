import GridFornecedores from "@/components/GridFornecedores";
import CadastroFornecedorForm from "@/components/CadastroFornecedorForm";
import UploadJsonFornecedor from "@/components/UploadJsonFornecedor";

import styles from "./page.module.css";

export default function Home() {  
  return (
    <div>
      <div className={styles.cadContainer}>
        <CadastroFornecedorForm />
        <UploadJsonFornecedor />
      </div>
      <div>
       <GridFornecedores/>
      </div>
    </div>
  );
}
