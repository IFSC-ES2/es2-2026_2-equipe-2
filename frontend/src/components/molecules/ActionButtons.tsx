import React from 'react';
import Button from '../atoms/Button';

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete }) => {
  return (
    <>
      <Button variant="primary" size="sm" className="me-2" onClick={onEdit}>
        Editar
      </Button>
      <Button variant="danger" size="sm" onClick={onDelete}>
        Excluir
      </Button>
    </>
  );
};

export default ActionButtons;
