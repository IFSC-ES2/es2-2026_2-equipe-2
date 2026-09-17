import React from 'react';

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
        className={`form-control ${className}`}
        {...props}
      />
    </div>
  );
};

export default FormInput;
