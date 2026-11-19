const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:8080'
).replace(/\/+$/, '');

const FORNECEDORES_API_URL = `${API_BASE_URL}/api/fornecedores`;

export async function getFornecedores() {
  const response = await fetch(FORNECEDORES_API_URL);
  if (!response.ok) throw new Error('Falha ao buscar fornecedores');
  const result = await response.json();
  return result.data ?? result;
}
