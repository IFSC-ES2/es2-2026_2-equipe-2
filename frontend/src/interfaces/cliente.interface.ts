export interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string | null;
  documento: string | null;
  endereco: string | null;
  criado_em: string;
}

export type ClienteCreate = Omit<Cliente, 'id' | 'criado_em'>;

export type ClienteUpdate = Partial<ClienteCreate>;
