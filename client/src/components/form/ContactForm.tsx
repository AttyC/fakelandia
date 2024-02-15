import { useContext, useState } from 'react';
import {
  validateMessage,
  validateSubject,
  validateReasonForContact,
} from './validation/validate_contact_form';
import { DisplayContactForm } from './DisplayContactForm';
import { SelectInput } from './inputs/Select';
import { TextInput } from './inputs/TextInput';
import { ContactFormChangeHandler, ContactFormData } from './ContactForm.types';
import ContactHeader from './ContactHeader';
import { MISDEMEANOURS } from '../../../types/misdemeanours.types';

import { MisdemeanourContext } from '../../utils/context';

const defaultFormData: ContactFormData = {
  subject: '',
  reasonForContact: 'NOT_SELECTED',
  message: '',
};

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>(defaultFormData);
  const { crimes, setCrimes } = useContext(MisdemeanourContext);

  const onChangeHandler: ContactFormChangeHandler = <
    TKey extends keyof ContactFormData
  >(
    value: ContactFormData[TKey],
    name: TKey
  ) => {
    setSubmitted(false);
    const newData: ContactFormData = { ...formData };
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
    const response = await fetch('http://localhost:8080/api/Contact', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const result = await response.json();
    result.success === false && setSuccessMessage('Aw boo, no success!');

    if (result.success === true && result.justTalked === false) {
      const id = Math.floor(Math.random() * (10000 - 1) + 1);
      const date = new Date().toLocaleDateString();
      setSuccessMessage('Contaction received!');
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
        data-testid='ContactForm'
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          handleSubmit(e);
        }}
        className='border-2 m-6 p-6 bg-sky-900 text-white font-medium'
      >
        <ContactHeader />
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
              ? 'my-6 bg-gray-100 border-2 text-gray-300 font-semibold'
              : 'my-6 bg-pink-600 border-2 text-gray-100 font-semibold'
          }
        >
          Submit
        </button>
        <hr />
      </form>
      {submitted && <DisplayContactForm form={formData} />}
    </>
  );
};

export default ContactForm;
