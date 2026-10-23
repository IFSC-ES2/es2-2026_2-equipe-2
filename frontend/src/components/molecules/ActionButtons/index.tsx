import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Modal from '../../organisms/Modals/Modal';
import Button from '../../atoms/Button';

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete }) => {
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleConfirm = () => {
    if (onDelete) {
      onDelete();
    }
    setShowConfirm(false);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-edit me-2"
        onClick={onEdit}
        title="Editar"
      >
        <i className="bi bi-pencil-square" />
      </button>

      <button
        type="button"
        className="btn btn-delete"
        onClick={() => setShowConfirm(true)}
        title="Excluir"
      >
        <i className="bi bi-trash" />
        <i className="bi bi-trash-fill btn-delete-hover" />
      </button>

      <Modal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Confirmar exclusão"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowConfirm(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleConfirm}>
              Confirmar
            </Button>
          </>
        }
      >
        <p>Tem certeza que deseja excluir este produto?</p>
      </Modal>
    </>
  );
};

export default ActionButtons;
