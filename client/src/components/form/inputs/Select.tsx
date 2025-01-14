import React, { useEffect, Dispatch, SetStateAction } from 'react';
import ErrorMessage from '../ErrorMessage';
import {
  ReasonForContact,
  ContactFormChangeHandler,
  ContactFormData,
} from '../ContactForm.types';

type Option = { display: string; value: ReasonForContact };

export interface SelectProps {
  id: string;
  name: keyof ContactFormData;
  options: Option[];
  label: string;
  value: string;
  onChangeHandler: ContactFormChangeHandler;
  setReasonIsValid: Dispatch<SetStateAction<boolean>>;
  validate: (value: string) => string[];
}

export const SelectInput: React.FC<SelectProps> = ({
  id,
  name,
  options,
  label,
  onChangeHandler,
  value,
  validate,
  setReasonIsValid,
}) => {
  const validationErrors = validate(value);

  useEffect(() => {
    setReasonIsValid(validationErrors?.length === 0);
  });

  return (
    <>
      <div className='py-4 my-4 text-black'>
        <label htmlFor={name} className='text-white'>
          {label}:{' '}
        </label>
        <select
          id={id}
          value={value}
          onChange={(e) => {
            onChangeHandler(e.target.value, name);
          }}
        >
          {options.map((o, index) => (
            <option key={`select-${name}-o-${index}`} value={o.value}>
              {o.display}
            </option>
          ))}
        </select>
      </div>
      {<ErrorMessage name={name} messages={validationErrors} />}
    </>
  );
};
