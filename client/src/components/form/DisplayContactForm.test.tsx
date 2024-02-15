import { render, screen } from '@testing-library/react';
import { DisplayContactForm } from './DisplayContactForm';
import { ContactFormData } from './ContactForm.types';

describe('<DisplayContactForm>', () => {
  it('renders all provided data', () => {
    const form: ContactFormData = {
      subject: '34uyhain',
      reasonForContact: 'united',
      message: 'eiohguirehuigihe',
    };

    render(<DisplayContactForm form={form} />);

    expect(screen.getByText('👉 ' + form.subject)).toBeInTheDocument();
    expect(screen.getByText('👉 ' + form.message)).toBeInTheDocument();
    expect(screen.getByText('👉 ' + form.reasonForContact)).toBeInTheDocument();
  });
});
