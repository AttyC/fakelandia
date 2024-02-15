import { render, screen } from '@testing-library/react';
import ContactHeader, { Contact_HEADER_TEXT } from './ContactHeader';

test('renders header text', () => {
  render(<ContactHeader />);
  const someHeaderText = screen.getByText(Contact_HEADER_TEXT);
  expect(someHeaderText).toBeInTheDocument();
});
