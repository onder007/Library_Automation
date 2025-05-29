
import React from 'react';

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  textarea?: boolean;
  rows?: number;
  selectOptions?: { value: string | number; label: string }[];
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  textarea = false,
  rows = 3,
  selectOptions,
  disabled = false,
}) => {
  const commonInputClasses = `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
    error ? 'border-red-500 focus:ring-red-300' : 'border-neutral-DEFAULT focus:ring-primary-light'
  } ${disabled ? 'bg-neutral-light cursor-not-allowed' : 'bg-white'}`;

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-neutral-dark mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={commonInputClasses}
          disabled={disabled}
        />
      ) : selectOptions ? (
         <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={required}
          className={commonInputClasses}
          disabled={disabled}
        >
          <option value="" disabled>{placeholder || `Select ${label.toLowerCase()}`}</option>
          {selectOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={commonInputClasses}
          disabled={disabled}
        />
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;
