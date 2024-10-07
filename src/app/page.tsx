import GridFornecedores from "@/components/GridFornecedores";
import CadastroFornecedorForm from "@/components/CadastroFornecedorForm";
import UploadJsonFornecedor from "@/components/UploadJsonFornecedor";

export default function Home() {  
  return (
    <div>
      <div>
        <CadastroFornecedorForm />
        <UploadJsonFornecedor />
      </div>
      <div>
       <GridFornecedores/>
      </div>
    </div>
  );
}
