import { render, screen } from '@testing-library/react';
import ContactForm from './ContactForm';
import user from '@testing-library/user-event';

async function enterIntoTextBox(
  textBoxes: HTMLElement[],
  id: string,
  value: string
) {
  const input = textBoxes.find((t) => t.id === id);

  expect(input).toBeInTheDocument();
  if (input) {
    await user.type(input, value);
  }
}

describe('<ContactForm>', () => {
  it('renders form element', () => {
    render(<ContactForm />);

    const form = screen.getByTestId('ContactForm');

    expect(form).toBeInTheDocument();
  });

  it('displays all entered values on submit', async () => {
    render(<ContactForm />);

    const textBoxes = screen.getAllByRole('textbox');

    await enterIntoTextBox(
      textBoxes,
      'subject',
      'This is a lovely subject from me'
    );
    await enterIntoTextBox(
      textBoxes,
      'message',
      'This is a lovely message from me!'
    );

    const reasonForContact = screen
      .getAllByRole('combobox')
      .find((c) => c.id === 'reasonForContact');

    expect(reasonForContact).toBeInTheDocument();

    if (reasonForContact) {
      await user.selectOptions(reasonForContact, 'vegetables');
    }

    const submit = screen.getByRole('button');

    await user.click(submit);

    expect(
      screen.getByText(/This is a lovely message from me!/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Subject/i)).toBeInTheDocument();
    expect(screen.getByText(/vegetables/i)).toBeInTheDocument();
  });
});
