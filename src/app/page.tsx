import GridFornecedores from "@/components/GridFornecedores";
import CadastroFornecedorForm from "@/components/CadastroFornecedorForm";

export default function Home() {  
  return (
    <div>
      <aside>
        <CadastroFornecedorForm />
      </aside>
      <main>
       <GridFornecedores/>
      </main>
    </div>
  );
}
