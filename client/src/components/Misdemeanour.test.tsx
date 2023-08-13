import { render, screen } from '@testing-library/react';
import Misdemeanour from './Misdemeanour';
import { TMisdemeanour } from '../../types/misdemeanours.types';

const mockCrimes: Array<TMisdemeanour> = [
  {
    citizenId: 1111,
    misdemeanour: 'vegetables',
    date: '1/1/23',
  },

  {
    citizenId: 2222,
    misdemeanour: 'united',
    date: '2/2/23',
  },
  { citizenId: 3333, misdemeanour: 'lift', date: '3/3/23' },
];

test('renders crime citizenId', () => {
  const mockCrime: TMisdemeanour = mockCrimes[0];
  render(<Misdemeanour crime={mockCrime} />);
  const citizenIdText = screen.getByText(/1111/);
  expect(citizenIdText).toBeInTheDocument();
});
