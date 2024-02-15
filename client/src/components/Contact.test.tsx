import { render, screen } from '@testing-library/react';
import Contact from './Contact';

test('renders header text', () => {
  render(<Contact />);
  const someHeaderText = screen.getByText(/Contact/);
  expect(someHeaderText).toBeInTheDocument();
});
