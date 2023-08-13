import { render, screen } from '@testing-library/react';
import Confess from './Confess';

test('renders header text', () => {
  render(<Confess />);
  const someHeaderText = screen.getByText(/Confess/);
  expect(someHeaderText).toBeInTheDocument();
});
