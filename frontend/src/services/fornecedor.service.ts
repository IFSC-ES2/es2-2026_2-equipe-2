const FORNECEDORES_API_URL = 'http://localhost:8080/api/fornecedores';

export async function getFornecedores() {
  const response = await fetch(FORNECEDORES_API_URL);
  if (!response.ok) throw new Error('Falha ao buscar fornecedores');
  const result = await response.json();
  return result.data ?? result;
}
