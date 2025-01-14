import React, { SetStateAction, useEffect, useState, Dispatch } from 'react';
import ErrorMessage from '../ErrorMessage';
import {
  ContactFormChangeHandler,
  ContactFormData,
} from '../ContactForm.types';

export interface TextInputProps {
  id: string;
  name: keyof ContactFormData;

  type: 'text' | 'textarea';
  label: string;
  placeholder?: string;
  value: string;

  onChangeHandler: ContactFormChangeHandler;
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
      <div className='py-4 my-4 text-black'>
        <label htmlFor={name} className='text-white'>
          {label}:{' '}
        </label>
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
