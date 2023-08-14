import { useContext, useState } from 'react';
import {
  validateMessage,
  validateSubject,
  validateReasonForContact,
} from './validation/validate_confess_form';
import { DisplayConfessForm } from './DisplayConfessForm';
import { SelectInput } from './inputs/Select';
import { TextInput } from './inputs/TextInput';
import { ConfessFormChangeHandler, ConfessFormData } from './ConfessForm.types';
import ConfessHeader from './ConfessHeader';
import { MISDEMEANOURS } from '../../../types/misdemeanours.types';

import { MisdemeanourContext } from '../../utils/context';

const defaultFormData: ConfessFormData = {
  subject: '',
  reasonForContact: 'NOT_SELECTED',
  message: '',
};

const ConfessForm = () => {
  const [formData, setFormData] = useState<ConfessFormData>(defaultFormData);

  const { crimes, setCrimes } = useContext(MisdemeanourContext);

  const onChangeHandler: ConfessFormChangeHandler = <
    TKey extends keyof ConfessFormData
  >(
    value: ConfessFormData[TKey],
    name: TKey
  ) => {
    setSubmitted(false);
    const newData: ConfessFormData = { ...formData };
    newData[name] = value;
    setFormData(newData);
  };

  const [submitted, setSubmitted] = useState(false);
  const [reasonIsValid, setReasonIsValid] = useState(false);
  const [inputIsValid, setInputIsValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      subject: formData.subject,
      reason: formData.reasonForContact,
      details: formData.message,
    };
    const response = await fetch('http://localhost:8080/api/confess', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const result = await response.json();

    console.log(result);
    result.success === false && setSuccessMessage('Aw boo, no success!');

    if (result.success === true && result.justTalked === false) {
      const id = Math.floor(Math.random() * (10000 - 1) + 1);
      const date = new Date().toLocaleDateString();
      setSuccessMessage('Confession received!');
      setCrimes({
        crimes,
        ...[
          {
            citizenId: id,
            misdemeanour: MISDEMEANOURS[data.reason],
            date: date,
          },
        ],
      });
    }
    return result;
  };

  return (
    <>
      {successMessage}
      <form
        data-testid='ConfessForm'
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          handleSubmit(e);
        }}
      >
        <ConfessHeader />
        <TextInput
          id='subject'
          type='text'
          name='subject'
          value={formData.subject}
          placeholder='Enter Subject'
          label='Subject'
          validate={validateSubject}
          onChangeHandler={onChangeHandler}
          setInputIsValid={setInputIsValid}
        />
        <hr />
        <SelectInput
          id='reasonForContact'
          name='reasonForContact'
          value={formData.reasonForContact ?? ''}
          label='Reason for Contact'
          validate={validateReasonForContact}
          onChangeHandler={onChangeHandler}
          setReasonIsValid={setReasonIsValid}
          options={[
            { value: 'NOT_SELECTED', display: '-' },
            { value: 'rudeness', display: 'Mild Public Rudeness = 🤪' },
            { value: 'lift', display: 'Speaking in a Lift = 🗣' },
            { value: 'vegetables', display: 'Not Eating Your Vegetables = 🥗' },
            { value: 'united', display: 'Supporting Manchester United = 😈' },
            { value: 'talk', display: 'I just want to talk' },
          ]}
        />
        <hr />
        <TextInput
          id='message'
          type='textarea'
          name='message'
          value={formData.message}
          placeholder='Enter Message'
          label='Your Message'
          validate={validateMessage}
          onChangeHandler={onChangeHandler}
          setInputIsValid={setInputIsValid}
        />
        <hr />
        <button
          type='submit'
          disabled={!reasonIsValid || !inputIsValid}
          className={
            !reasonIsValid || !inputIsValid
              ? 'bg-gray-100 border-2 text-gray-300 font-semibold'
              : 'bg-pink-600 border-2 text-gray-100 font-semibold'
          }
        >
          Submit
        </button>
        <hr />
      </form>
      {submitted && <DisplayConfessForm form={formData} />}
    </>
  );
};

export default ConfessForm;

