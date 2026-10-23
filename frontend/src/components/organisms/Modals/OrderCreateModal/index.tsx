import React from 'react';
import Modal from '../Modal';
import FormCreateOrder from '../../Form/FormCreateOrder';
import type { PedidoComRelacionamentos } from '../../../../interfaces/pedido.interface';

export interface OrderCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  order?: PedidoComRelacionamentos;
}

const OrderCreateModal: React.FC<OrderCreateModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  order,
}) => {
  const title = order ? `Editar Pedido #${order.id}` : 'Criar Novo Pedido';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      <FormCreateOrder
        key={order?.id ?? 'novo-pedido'}
        onSuccess={() => {
          onSuccess();
          onClose();
        }}
        onCancel={onClose}
        order={order}
      />
    </Modal>
  );
};

export default OrderCreateModal;
