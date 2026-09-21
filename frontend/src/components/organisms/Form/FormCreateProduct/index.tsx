import React, { useState } from 'react';
import Button from '../../../atoms/Button';
import FormInput from '../../../atoms/Inputs/FormInput';
import FormTextarea from '../../../atoms/Inputs/FormTextarea';
import { createProduto } from '../../../../services/produto.service';
import type { ProdutoCreate } from '../../../../interfaces/produto.interface';

export interface FormCreateProductProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  saveService?: (data: ProdutoCreate) => Promise<unknown>;
}

const INITIAL_FORM = {
  sku: '',
  nome: '',
  descricao: '',
  categoria_id: '',
  fornecedor_id: '',
  preco: '',
  quantidade: '',
  estoque_minimo: '',
};

const FormCreateProduct: React.FC<FormCreateProductProps> = ({
  onSuccess,
  onCancel,
  saveService = createProduto,
}) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setError(null);
  };

  const handleCancel = () => {
    resetForm();
    onCancel?.();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const skuTrimmed = formData.sku.trim();
    const nomeTrimmed = formData.nome.trim();

    if (!skuTrimmed || !nomeTrimmed || formData.preco === '') {
      setError('Preencha os campos obrigatórios: SKU, Nome e Preço.');
      return;
    }

    const precoNum = Number(formData.preco);
    if (isNaN(precoNum) || precoNum < 0) {
      setError('O preço deve ser um valor numérico maior ou igual a zero.');
      return;
    }

    const payload: ProdutoCreate = {
      sku: skuTrimmed,
      nome: nomeTrimmed,
      descricao: formData.descricao.trim() ? formData.descricao.trim() : null,
      categoria_id: formData.categoria_id ? Number(formData.categoria_id) : null,
      fornecedor_id: formData.fornecedor_id ? Number(formData.fornecedor_id) : null,
      preco: precoNum,
      quantidade:
        formData.quantidade !== '' ? Number(formData.quantidade) : undefined,
      estoque_minimo:
        formData.estoque_minimo !== ''
          ? Number(formData.estoque_minimo)
          : undefined,
    };

    try {
      setLoading(true);
      setError(null);
      await saveService(payload);
      resetForm();
      onSuccess?.();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar produto');
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
        <div className="col-md-4">
          <FormInput
            label="SKU *"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="Ex: PROD-001"
            required
          />
        </div>
        <div className="col-md-8">
          <FormInput
            label="Nome do Produto *"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Ex: Parafuso Sextavado"
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <FormTextarea
            label="Descrição"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descrição detalhada do produto"
            rows={2}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <FormInput
            label="Categoria (ID)"
            name="categoria_id"
            type="number"
            value={formData.categoria_id}
            onChange={handleChange}
            placeholder="Ex: 1"
          />
        </div>
        <div className="col-md-6">
          <FormInput
            label="Fornecedor (ID)"
            name="fornecedor_id"
            type="number"
            value={formData.fornecedor_id}
            onChange={handleChange}
            placeholder="Ex: 1"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <FormInput
            label="Preço (R$) *"
            name="preco"
            type="number"
            step="0.01"
            value={formData.preco}
            onChange={handleChange}
            placeholder="0.00"
            required
          />
        </div>
        <div className="col-md-4">
          <FormInput
            label="Quantidade Inicial"
            name="quantidade"
            type="number"
            value={formData.quantidade}
            onChange={handleChange}
            placeholder="0"
          />
        </div>
        <div className="col-md-4">
          <FormInput
            label="Estoque Mínimo"
            name="estoque_minimo"
            type="number"
            value={formData.estoque_minimo}
            onChange={handleChange}
            placeholder="0"
          />
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Salvar Produto'}
        </Button>
      </div>
    </form>
  );
};

export default FormCreateProduct;
