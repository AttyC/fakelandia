import { ContactFormData } from './ContactForm.types';

export const DisplayContactForm: React.FC<{ form: ContactFormData }> = ({
  form,
}) => (
  <div>
    <div>
      <strong>Subject: </strong> <span>👉 {form.subject}</span>
    </div>
    <div>
      <strong>Reason for Contact: </strong>
      <span>👉 {form.reasonForContact}</span>
    </div>
    <div>
      <strong>Message: </strong>
      <span>👉 {form.message}</span>
    </div>
  </div>
);
