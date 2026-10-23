import React, { useState, useEffect } from 'react';
import Button from '../../../atoms/Button';
import FormInput from '../../../atoms/Inputs/FormInput';
import FormTextarea from '../../../atoms/Inputs/FormTextarea';
import FormSelect, {
  type SelectOption,
} from '../../../atoms/Inputs/FormSelect';
import {
  createProduto,
  updateProdutos,
} from '../../../../services/produto.service';
import { getCategorias } from '../../../../services/categoria.service';
import { getFornecedores } from '../../../../services/fornecedor.service';
import type {
  ProdutoCreate,
  Produto,
} from '../../../../interfaces/produto.interface';

export interface FormCreateProductProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  saveService?: (data: ProdutoCreate) => Promise<unknown>;
  product?: Produto; // optional for edit mode
}
interface Categoria {
  id: number;
  nome: string;
}
interface Fornecedor {
  id: number;
  nome: string;
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
  product,
}) => {
  const buildInitialForm = (product?: Produto) =>
    product
      ? {
          sku: product.sku,
          nome: product.nome,
          descricao: product.descricao ?? '',
          categoria_id:
            product.categoria?.id != null ? String(product.categoria.id) : '',
          fornecedor_id:
            product.fornecedor?.id != null ? String(product.fornecedor.id) : '',
          preco: product.preco.toString(),
          quantidade: product.quantidade?.toString() ?? '',
          estoque_minimo: product.estoque_minimo?.toString() ?? '',
        }
      : INITIAL_FORM;

  const [formData, setFormData] = useState(() => buildInitialForm(product));
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [categoriasOptions, setCategoriasOptions] = useState<SelectOption[]>(
    [],
  );
  const [fornecedoresOptions, setFornecedoresOptions] = useState<
    SelectOption[]
  >([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [categorias, fornecedores] = await Promise.all([
          getCategorias(),
          getFornecedores(),
        ]);

        setCategoriasOptions([
          { label: 'Selecione uma categoria', value: '' },
          ...categorias.map((c: Categoria) => ({
            label: c.nome,
            value: String(c.id),
          })),
        ]);

        setFornecedoresOptions([
          { label: 'Selecione um fornecedor', value: '' },
          ...fornecedores.map((f: Fornecedor) => ({
            label: f.nome,
            value: String(f.id),
          })),
        ]);
      } catch (err) {
        console.error('Erro ao carregar opções', err);
      }
    };
    fetchOptions();
  }, []);

  const resetForm = () => {
    setFormData(buildInitialForm(product));
    setError(null);
  };

  const handleCancel = () => {
    resetForm();
    onCancel?.();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const name = target.name || e.currentTarget.name;
    const value = target.value;
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
      categoria_id: formData.categoria_id
        ? Number(formData.categoria_id)
        : null,
      fornecedor_id: formData.fornecedor_id
        ? Number(formData.fornecedor_id)
        : null,
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
      const service = product
        ? (data: ProdutoCreate) => updateProdutos(product.id.toString(), data)
        : saveService;
      await service(payload);
      resetForm();
      onSuccess?.();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Erro ao cadastrar produto',
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
          <FormSelect
            label="Categoria"
            name="categoria_id"
            value={formData.categoria_id}
            onChange={handleChange}
            options={categoriasOptions}
          />
        </div>
        <div className="col-md-6">
          <FormSelect
            label="Fornecedor"
            name="fornecedor_id"
            value={formData.fornecedor_id}
            onChange={handleChange}
            options={fornecedoresOptions}
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
            variant="danger"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
        )}
        <Button type="submit" variant="success" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Produto'}
        </Button>
      </div>
    </form>
  );
};

export default FormCreateProduct;
