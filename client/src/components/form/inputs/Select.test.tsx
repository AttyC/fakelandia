import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { SelectInput, SelectProps } from './Select';

describe('<SelectInput>', () => {
  it('renders given required props', () => {
    const requiredProps: SelectProps = {
      id: 'subject',
      name: 'subject',
      label: 'Subject',
      options: [],
      value: '',
      onChangeHandler: jest.fn(),
      validate: jest.fn(),
      setReasonIsValid: jest.fn(),
    };
    render(<SelectInput {...requiredProps} />);

    const input = screen.getByText(requiredProps.label + ':');

    expect(input).toBeInTheDocument();
  });

  it('renders a list of options', () => {
    const options = [
      'NOT_SELECTED',
      'rudeness',
      'lift',
      'vegetables',
      'united',
      'talk',
    ];

    const requiredProps: SelectProps = {
      id: 'reasonForContact',
      name: 'reasonForContact',
      label: 'Reason for Contact',
      options: [
        { value: 'NOT_SELECTED', display: options[0] },
        { value: 'rudeness', display: options[1] },
        { value: 'lift', display: options[2] },
        { value: 'vegetables', display: options[3] },
        { value: 'united', display: options[4] },
        { value: 'talk', display: options[5] },
      ],
      value: '',
      onChangeHandler: jest.fn(),
      validate: jest.fn(),
      setReasonIsValid: jest.fn(),
    };
    render(<SelectInput {...requiredProps} />);

    const optionOne = screen.getByText(options[0]);
    const optionTwo = screen.getByText(options[1]);

    expect(optionOne).toBeInTheDocument();
    expect(optionTwo).toBeInTheDocument();
  });

  it('sets the value to a provided value', () => {
    const options = [
      'NOT_SELECTED',
      'rudeness',
      'lift',
      'vegetables',
      'united',
      'talk',
    ];

    const requiredProps: SelectProps = {
      id: 'reasonForContact',
      name: 'reasonForContact',
      label: 'Reason for Contact',
      options: [
        { value: 'NOT_SELECTED', display: options[0] },
        { value: 'rudeness', display: options[1] },
        { value: 'lift', display: options[2] },
        { value: 'vegetables', display: options[3] },
        { value: 'united', display: options[4] },
        { value: 'talk', display: options[5] },
      ],
      value: 'vegetables',
      onChangeHandler: jest.fn(),
      validate: jest.fn(),
      setReasonIsValid: jest.fn(),
    };
    render(<SelectInput {...requiredProps} />);

    // 💡 "combobox" is the correct role for a dropdown/select element
    const input = screen.getByRole('combobox');

    expect(input).toHaveValue('vegetables');
  });

  it('calls onChange with the correct parameters when a new value is selected', async () => {
    const options = [
      'NOT_SELECTED',
      'rudeness',
      'lift',
      'vegetables',
      'united',
      'talk',
    ];

    const mockChangeHandler = jest.fn();

    const requiredProps: SelectProps = {
      id: 'reasonForContact',
      name: 'reasonForContact',
      label: 'Reason for Contact',
      options: [
        { value: 'NOT_SELECTED', display: options[0] },
        { value: 'rudeness', display: options[1] },
        { value: 'lift', display: options[2] },
        { value: 'vegetables', display: options[3] },
        { value: 'united', display: options[4] },
        { value: 'talk', display: options[5] },
      ],
      value: 'talk',
      onChangeHandler: mockChangeHandler,
      validate: jest.fn(),
      setReasonIsValid: jest.fn(),
    };
    render(<SelectInput {...requiredProps} />);

    await user.selectOptions(screen.getByRole('combobox'), 'united');

    expect(mockChangeHandler).toHaveBeenCalledTimes(1);
    expect(mockChangeHandler).toHaveBeenCalledWith(
      'united',
      'reasonForContact'
    );

    // 💡⚠️ NB: We can't test that the value actually gets updated here!
    //           If we write a test like expect(select).toHaveValue('4') it will FAIL ❌
    //           That's because state is stored in the form, not in the Select
    //           ✅ The job of the Select is ONLY to call the onChangeHandler with the correct params
  });

  it('validates the provided value', async () => {
    const mockValidate = jest.fn();
    const value = 'Not Eating Your Vegetables = 🥗';

    const requiredProps: SelectProps = {
      id: 'reasonForContact',
      name: 'reasonForContact',
      label: 'Reason for Contact',
      options: [],
      value: value,
      onChangeHandler: jest.fn(),
      validate: mockValidate,
      setReasonIsValid: jest.fn(),
    };
    render(<SelectInput {...requiredProps} />);

    expect(mockValidate).toHaveBeenCalledTimes(1);
    expect(mockValidate).toHaveBeenCalledWith(value);
  });

  // it('does not display error messages if select is not touched', async () => {
  //   const mockValidate = jest.fn();
  //   const value = 'Not Eating Your Vegetables = 🥗';

  //   mockValidate.mockReturnValue([
  //     'Fake error message',
  //     'Another fake error message',
  //   ]);

  //   const requiredProps: SelectProps = {
  //     id: 'speciesName',
  //     name: 'speciesName',
  //     label: 'Species Name',
  //     options: [],
  //     value: value,
  //     onChangeHandler: jest.fn(),
  //     validate: mockValidate,
  //     setReasonIsValid: jest.fn(),
  //   };
  //   render(<SelectInput {...requiredProps} />);

  //   const errorOne = screen.queryByText('Fake error message');
  //   const errorTwo = screen.queryByText('Another fake error message');

  //   expect(errorOne).toBeNull();
  //   expect(errorTwo).toBeNull();
  // });

  it('does display error messages if select has been touched', async () => {
    const mockValidate = jest.fn();
    const value = 'Not Eating Your Vegetables = 🥗';

    const options = [
      'NOT_SELECTED',
      'rudeness',
      'lift',
      'vegetables',
      'united',
      'talk',
    ];

    mockValidate.mockReturnValue([
      'Fake error message',
      'Another fake error message',
    ]);

    const requiredProps: SelectProps = {
      id: 'reasonForContact',
      name: 'reasonForContact',
      label: 'reasonForContact',
      options: [
        { value: 'NOT_SELECTED', display: options[0] },
        { value: 'rudeness', display: options[1] },
        { value: 'lift', display: options[2] },
        { value: 'vegetables', display: options[3] },
        { value: 'united', display: options[4] },
        { value: 'talk', display: options[5] },
      ],
      value: value,
      onChangeHandler: jest.fn(),
      validate: mockValidate,
      setReasonIsValid: jest.fn(),
    };
    render(<SelectInput {...requiredProps} />);

    await user.selectOptions(screen.getByRole('combobox'), 'vegetables');

    const errorOne = screen.queryByText('Fake error message');
    const errorTwo = screen.queryByText('Another fake error message');

    expect(errorOne).toBeInTheDocument();
    expect(errorTwo).toBeInTheDocument();
  });
});
