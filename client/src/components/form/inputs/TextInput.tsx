import React, { SetStateAction, useEffect, useState, Dispatch } from 'react';
import ErrorMessage from '../ErrorMessage';
import {
  ConfessFormChangeHandler,
  ConfessFormData,
} from '../ConfessForm.types';

export interface TextInputProps {
  id: string;
  name: keyof ConfessFormData;

  type: 'text' | 'textarea';
  label: string;
  placeholder?: string;
  value: string;

  onChangeHandler: ConfessFormChangeHandler;
  setInputIsValid: Dispatch<SetStateAction<boolean>>;
  validate: (value: string) => string[];
}

export const TextInput: React.FC<TextInputProps> = ({
  id,
  name,
  type,
  label,
  placeholder,
  onChangeHandler,
  value,
  validate,
  setInputIsValid,
}) => {
  const [touched, setTouched] = useState(false);

  const validationErrors = validate(value);

  useEffect(() => {
    setInputIsValid(validationErrors?.length === 0);
  });

  return (
    <>
      <div>
        <label htmlFor={name}>{label}: </label>
        {type === 'textarea' && (
          <textarea
            id={id}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={(e) => {
              setTouched(true);
              onChangeHandler(e.target.value, name);
            }}
          />
        )}
        {type === 'text' && (
          <input
            id={id}
            name={name}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={(e) => {
              setTouched(true);
              onChangeHandler(e.target.value, name);
            }}
          />
        )}
      </div>
      {touched && <ErrorMessage name={name} messages={validationErrors} />}
    </>
  );
};
