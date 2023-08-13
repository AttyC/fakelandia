import { render, screen } from '@testing-library/react';
import { DisplayConfessForm } from './DisplayConfessForm';
import { ConfessFormData } from './ConfessForm.types';

describe('<DisplayConfessForm>', () => {
  it('renders all provided data', () => {
    const form: ConfessFormData = {
      subject: '34uyhain',
      reasonForContact: 'united',
      message: 'eiohguirehuigihe',
    };

    render(<DisplayConfessForm form={form} />);

    expect(screen.getByText('👉 ' + form.subject)).toBeInTheDocument();
    expect(screen.getByText('👉 ' + form.message)).toBeInTheDocument();
    expect(screen.getByText('👉 ' + form.reasonForContact)).toBeInTheDocument();
  });
});
