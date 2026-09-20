import React from 'react';
import './index.css';

export interface SelectOption {
  label: string;
  value: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options?: SelectOption[];
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  options = [],
  className = '',
  ...props
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label fw-semibold">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className={`form-select app-input ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;