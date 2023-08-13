import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('<ErrorMessage>', () => {
	it('renders all provided error messages', () => {
		const errors: string[] = ['Some message', 'Another message'];

		render(<ErrorMessage name='someComponent' messages={errors} />);

		expect(screen.getByText(errors[0])).toBeInTheDocument();
		expect(screen.getByText(errors[1])).toBeInTheDocument();
	});
});
