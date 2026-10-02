import React, { useState } from 'react';
import Button from '../../../atoms/Button';
import FormInput from '../../../atoms/Inputs/FormInput';
import {
  createCliente,
  updateCliente,
} from '../../../../services/cliente.service';
import type {
  Cliente,
  ClienteCreate,
} from '../../../../interfaces/cliente.interface';

export interface FormClientProps {
  cliente?: Cliente;
  onSuccess?: () => void;
  onCancel?: () => void;
  saveService?: (data: ClienteCreate) => Promise<unknown>;
}

const INITIAL_FORM = {
  nome: '',
  email: '',
  telefone: '',
  documento: '',
  endereco: '',
};

const isDocumentoValid = (documento: string) => {
  const trimmed = documento.trim();
  if (!trimmed) return true;
  return /^[0-9.\-/\s]+$/.test(trimmed) && /\d/.test(trimmed);
};

const isTelefoneValid = (telefone: string) => {
  const trimmed = telefone.trim();
  if (!trimmed) return true;
  return /^[0-9()\-+\s]+$/.test(trimmed) && /\d/.test(trimmed);
};

const FormCreateClient: React.FC<FormClientProps> = ({
  cliente,
  onSuccess,
  onCancel,
  saveService = createCliente,
}) => {
  const isEditMode = Boolean(cliente);

  const buildInitialForm = (cliente?: Cliente) =>
    cliente
      ? {
          nome: cliente.nome ?? '',
          email: cliente.email ?? '',
          telefone: cliente.telefone ?? '',
          documento: cliente.documento ?? '',
          endereco: cliente.endereco ?? '',
        }
      : INITIAL_FORM;

  const [formData, setFormData] = useState(() => buildInitialForm(cliente));
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setFormData(buildInitialForm(cliente));
    setError(null);
  };

  const handleCancel = () => {
    resetForm();
    onCancel?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nomeTrimmed = formData.nome.trim();
    const emailTrimmed = formData.email.trim();

    if (!nomeTrimmed || !emailTrimmed) {
      setError('Preencha os campos obrigatórios: Nome e E-mail.');
      return;
    }

    if (!isDocumentoValid(formData.documento)) {
      setError(
        'Documento inválido. Utilize apenas números e símbolos de CPF/CNPJ.',
      );
      return;
    }

    if (!isTelefoneValid(formData.telefone)) {
      setError('Telefone inválido. Utilize apenas números e símbolos.');
      return;
    }

    const payload: ClienteCreate = {
      nome: nomeTrimmed,
      email: emailTrimmed,
      telefone: formData.telefone.trim() ? formData.telefone.trim() : null,
      documento: formData.documento.trim() ? formData.documento.trim() : null,
      endereco: formData.endereco.trim() ? formData.endereco.trim() : null,
    };

    try {
      setLoading(true);
      setError(null);

      const service = cliente
        ? (data: ClienteCreate) => updateCliente(cliente.id, data)
        : saveService;
      await service(payload);

      resetForm();
      onSuccess?.();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : isEditMode
            ? 'Erro ao atualizar cliente'
            : 'Erro ao cadastrar cliente',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="alert alert-danger py-2" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        <div className="col-md-8">
          <FormInput
            label="Nome / Razão Social *"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Ex: João da Silva ou Distribuidora XPTO Ltda"
            required
          />
        </div>
        <div className="col-md-4">
          <FormInput
            label="Documento"
            name="documento"
            value={formData.documento}
            onChange={handleChange}
            placeholder="Ex: 123.456.789-00"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <FormInput
            label="E-mail *"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="cliente@email.com"
            required
          />
        </div>
        <div className="col-md-6">
          <FormInput
            label="Telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="(48) 99999-9999"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <FormInput
            label="Endereço"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            placeholder="Rua, número, bairro, cidade"
          />
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
        {onCancel && (
          <Button
            type="button"
            variant="danger"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
        )}
        <Button type="submit" variant="success" disabled={loading}>
          {loading
            ? 'Salvando...'
            : isEditMode
              ? 'Salvar Alterações'
              : 'Salvar Cliente'}
        </Button>
      </div>
    </form>
  );
};

export default FormCreateClient;
