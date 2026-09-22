import React from 'react';
import Modal from '../Modal';
import FormCreateProduct from '../../Form/FormCreateProduct';
import type { ProdutoCreate } from '../../../../interfaces/produto.interface';

export interface ProductCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  saveService?: (data: ProdutoCreate) => Promise<unknown>;
}

const ProductCreateModal: React.FC<ProductCreateModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  saveService,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Produto" size="lg">
      <FormCreateProduct
        onSuccess={() => {
          onSuccess();
          onClose();
        }}
        onCancel={onClose}
        saveService={saveService}
      />
    </Modal>
  );
};

export default ProductCreateModal;
