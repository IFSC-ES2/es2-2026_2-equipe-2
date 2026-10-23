import React from 'react';
import Modal from '../Modal';
import FormCreateClient from '../../../organisms/Form/FormCreateClient';
import type {
  Cliente,
  ClienteCreate,
} from '../../../../interfaces/cliente.interface';

export interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  saveService?: (data: ClienteCreate) => Promise<unknown>;
  cliente?: Cliente;
}

const ClientCreateModal: React.FC<ClientModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  saveService,
  cliente,
}) => {
  const title = cliente ? 'Editar Cliente' : 'Novo Cliente';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      <FormCreateClient
        key={cliente?.id ?? 'new'}
        onSuccess={() => {
          onSuccess();
          onClose();
        }}
        onCancel={onClose}
        saveService={saveService}
        cliente={cliente}
      />
    </Modal>
  );
};

export default ClientCreateModal;
