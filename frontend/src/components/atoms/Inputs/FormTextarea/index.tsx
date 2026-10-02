import React from 'react';
import './index.css';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  name,
  className = '',
  rows = 3,
  ...props
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label fw-semibold">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        className={`form-control app-input ${className}`}
        {...props}
      />
    </div>
  );
};

export default FormTextarea;
