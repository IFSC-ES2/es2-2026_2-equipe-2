import type { Usuario } from '../interfaces/usuario.interface';

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:8080'
).replace(/\/+$/, '');

const USUARIOS_API_URL = `${API_BASE_URL}/api/usuarios`;

const MOCK_USUARIO_PADRAO: Usuario = {
  id: 1,
  nome: 'Usuario',
  email: 'usuario@gmail.com',
};

export async function getUsuarioAtual(): Promise<Usuario> {
  try {
    const response = await fetch(`${USUARIOS_API_URL}/me`);
    if (!response.ok) {
      return MOCK_USUARIO_PADRAO;
    }
    const data = await response.json();
    return data.data ?? data;
  } catch {
    return MOCK_USUARIO_PADRAO;
  }
}

export async function getUsuarios(): Promise<Usuario[]> {
  try {
    const response = await fetch(USUARIOS_API_URL);
    if (!response.ok) {
      return [MOCK_USUARIO_PADRAO];
    }
    const data = await response.json();
    return data.data ?? data;
  } catch {
    return [MOCK_USUARIO_PADRAO];
  }
}
