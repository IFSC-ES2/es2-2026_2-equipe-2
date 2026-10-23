import React from 'react';
import Modal from '../Modal';
import FormCreateProduct from '../../Form/FormCreateProduct';
import type {
  ProdutoCreate,
  Produto,
} from '../../../../interfaces/produto.interface';

export interface ProductCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  saveService?: (data: ProdutoCreate) => Promise<unknown>;
  product?: Produto;
}

const ProductCreateModal: React.FC<ProductCreateModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  saveService,
  product,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Produto" size="lg">
      <FormCreateProduct
        key={product?.id ?? 'new'}
        onSuccess={() => {
          onSuccess();
          onClose();
        }}
        onCancel={onClose}
        saveService={saveService}
        product={product}
      />
    </Modal>
  );
};

export default ProductCreateModal;
