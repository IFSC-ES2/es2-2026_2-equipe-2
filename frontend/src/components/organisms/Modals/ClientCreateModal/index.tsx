import React from 'react';
import Modal from '../Modal';
import FormCreateClient from '../../../organisms/Form/FormCreateClient';
import type { Cliente } from '../../../../interfaces/cliente.interface';

export interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  cliente?: Cliente;
}

const ClientCreateModal: React.FC<ClientModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  cliente,
}) => {
  const title = cliente ? 'Editar Cliente' : 'Novo Cliente';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      <FormCreateClient
        cliente={cliente}
        onSuccess={() => {
          onSuccess();
          onClose();
        }}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default ClientCreateModal;
