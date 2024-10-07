export const validarCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj.length !== 14) {
    return false;
  }

  if (/^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  const pesosPrimeiroDigito = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const primeiroDigitoVerificador = calcularDigito(cnpj, pesosPrimeiroDigito);

  if (primeiroDigitoVerificador !== parseInt(cnpj[12])) {
    return false;
  }

  const pesosSegundoDigito = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const segundoDigitoVerificador = calcularDigito(cnpj, pesosSegundoDigito);

  return segundoDigitoVerificador === parseInt(cnpj[13]);
};

const calcularDigito = (cnpj: string, pesos: number[]): number => {
  let soma = 0;
  for (let i = 0; i < pesos.length; i++) {
    soma += parseInt(cnpj[i]) * pesos[i];
  }
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
};