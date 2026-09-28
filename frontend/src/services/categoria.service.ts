const CATEGORIAS_API_URL = 'http://localhost:8080/api/categorias';

export async function getCategorias() {
  const response = await fetch(CATEGORIAS_API_URL);

  if (!response.ok) throw new Error('Falha ao buscar categorias');

  const result = await response.json();
  return result.data ?? result;
}
