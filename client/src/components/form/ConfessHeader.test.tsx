import { render, screen } from '@testing-library/react';
import ConfessHeader, { CONFESS_HEADER_TEXT } from './ConfessHeader';

test('renders header text', () => {
  render(<ConfessHeader />);
  const someHeaderText = screen.getByText(CONFESS_HEADER_TEXT);
  expect(someHeaderText).toBeInTheDocument();
});
