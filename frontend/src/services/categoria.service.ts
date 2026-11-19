const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:8080'
).replace(/\/+$/, '');

const CATEGORIAS_API_URL = `${API_BASE_URL}/api/categorias`;

export async function getCategorias() {
  const response = await fetch(CATEGORIAS_API_URL);

  if (!response.ok) throw new Error('Falha ao buscar categorias');

  const result = await response.json();
  return result.data ?? result;
}
