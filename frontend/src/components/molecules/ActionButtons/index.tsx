import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete }) => {
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
        onClick={onDelete}
        title="Excluir"
      >
        <i className="bi bi-trash" />
        <i className="bi bi-trash-fill btn-delete-hover" />
      </button>
    </>
  );
};

export default ActionButtons;
