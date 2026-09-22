import React from 'react';
import './index.css';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  className = '',
  ...props
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label fw-semibold">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={`form-control app-input ${className}`}
        {...props}
      />
    </div>
  );
};

export default FormInput;