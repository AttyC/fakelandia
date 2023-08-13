import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { ConfessFormData } from '../ConfessForm.types';
import { TextInput, TextInputProps } from './TextInput';

describe('<TextInput>', () => {
  it('renders an <input> given required props', () => {
    const requiredProps: TextInputProps = {
      id: 'subject',
      type: 'text',
      name: 'subject',
      label: 'Subject',
      placeholder: 'Enter Subject',
      value: '',
      onChangeHandler: jest.fn(),
      validate: jest.fn(),
      setInputIsValid: jest.fn(),
    };
    render(<TextInput {...requiredProps} />);

    // 💡 both <input> and <textarea> have role "textbox"
    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });

  it('renders a <textarea> given required props', () => {
    const requiredProps: TextInputProps = {
      id: 'message',
      type: 'textarea',
      name: 'message',
      label: 'Your message',
      placeholder: 'Enter Message',
      value: '',
      onChangeHandler: jest.fn(),
      validate: jest.fn(),
      setInputIsValid: jest.fn(),
    };
    render(<TextInput {...requiredProps} />);

    // 💡 both <input> and <textarea> have role "textbox"
    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });

  it('renders basic fields given required props', () => {
    const requiredProps: TextInputProps = {
      id: 'subject',
      type: 'text',
      name: 'subject',
      label: 'Subject',
      placeholder: 'Enter Subject',
      value: '',
      onChangeHandler: jest.fn(),
      validate: jest.fn(),
      setInputIsValid: jest.fn(),
    };
    render(<TextInput {...requiredProps} />);

    const byPlaceholder = screen.getByPlaceholderText('Enter Subject');
    const label = screen.getByText('Subject:');

    expect(byPlaceholder).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  // it('sets the value to a provided value', () => {
  //   const requiredProps: TextInputProps = {
  //     id: 'speciesName',
  //     type: 'text',
  //     name: 'speciesName',
  //     label: 'Subject',
  //     value: 'Humans',
  //     onChangeHandler: jest.fn(),
  //     validate: jest.fn(),
  //   };
  //   render(<TextInput {...requiredProps} />);

  //   const input = screen.getByRole('textbox');

  //   expect(input).toHaveValue('Humans');
  // });

  // 💡 We run this test for both <input> and <textarea> to check they're both wired correctly
  it('<input> calls onChange with the correct parameters when a new value is entered', async () => {
    const mockChangeHandler = jest.fn();

    const inputName = 'someInputName';

    const requiredProps: TextInputProps = {
      id: 'subject',
      type: 'text',
      // we're using a non-valid key just to make sure our input passes the provided name
      // to the onChangeHandler, so we have to say "pretend this is really a valid property"
      // on the ConfessFormData type. We do this by saying "as keyof ConfessFormData"
      name: inputName as keyof ConfessFormData,
      label: 'Subject',
      value: '',
      onChangeHandler: mockChangeHandler,
      validate: jest.fn(),
      setInputIsValid: jest.fn(),
    };
    render(<TextInput {...requiredProps} />);

    await user.type(screen.getByRole('textbox'), 'I love textboxes');

    expect(mockChangeHandler).toHaveBeenCalledTimes(16);
    expect(mockChangeHandler).toHaveBeenLastCalledWith('s', inputName);

    // 💡⚠️ NB: We can't test that the value actually gets updated here!
    //           If we write a test like expect(input).toHaveValue('Humans') it will FAIL ❌
    //           That's because state is stored in the form, not in the TextInput
    //           ✅ The job of the TextInput is ONLY to call the onChangeHandler with the correct params
  });

  // 💡 We run this test for both <input> and <textarea> to check they're both wired correctly
  it('<textarea> calls onChange with the correct parameters when a new value is entered', async () => {
    const mockChangeHandler = jest.fn();

    const inputName = 'someInputName';

    const requiredProps: TextInputProps = {
      id: 'subject',
      type: 'textarea',
      // we're using a non-valid key just to make sure our input passes the provided name
      // to the onChangeHandler, so we have to say "pretend this is really a valid property"
      // on the ConfessFormData type. We do this by saying "as keyof ConfessFormData"
      name: inputName as keyof ConfessFormData,
      label: 'Subject',
      value: '',
      onChangeHandler: mockChangeHandler,
      validate: jest.fn(),
      setInputIsValid: jest.fn(),
    };
    render(<TextInput {...requiredProps} />);

    await user.type(screen.getByRole('textbox'), 'I love textboxes');

    expect(mockChangeHandler).toHaveBeenCalledTimes(16);
    expect(mockChangeHandler).toHaveBeenLastCalledWith('s', inputName);

    // 💡⚠️ NB: We can't test that the value actually gets updated here!
    //           If we write a test like expect(input).toHaveValue('Humans') it will FAIL ❌
    //           That's because state is stored in the form, not in the TextInput
    //           ✅ The job of the TextInput is ONLY to call the onChangeHandler with the correct params
  });

  it('validates the provided value', async () => {
    const mockValidate = jest.fn();
    const value = 'lift';

    const requiredProps: TextInputProps = {
      id: 'reasonForContact',
      type: 'text',
      name: 'reasonForContact',
      label: 'Reason for Contact',
      value: value,
      onChangeHandler: jest.fn(),
      validate: mockValidate,
      setInputIsValid: jest.fn(),
    };
    render(<TextInput {...requiredProps} />);

    expect(mockValidate).toHaveBeenCalledTimes(1);
    expect(mockValidate).toHaveBeenCalledWith(value);
  });

  it('does not display error messages if the input is not touched', async () => {
    const mockValidate = jest.fn();
    const value = '';

    mockValidate.mockReturnValue([
      'Fake error message',
      'Another fake error message',
    ]);

    const requiredProps: TextInputProps = {
      id: 'subject',
      type: 'text',
      name: 'subject',
      label: 'Subject',
      value: value,
      onChangeHandler: jest.fn(),
      validate: mockValidate,
      setInputIsValid: jest.fn(),
    };
    render(<TextInput {...requiredProps} />);

    const errorOne = screen.queryByText('Fake error message');
    const errorTwo = screen.queryByText('Another fake error message');

    expect(errorOne).toBeNull();
    expect(errorTwo).toBeNull();
  });

  it('does display error messages if the input has been touched', async () => {
    const mockValidate = jest.fn();
    const value = '';

    mockValidate.mockReturnValue([
      'Fake error message',
      'Another fake error message',
    ]);

    const requiredProps: TextInputProps = {
      id: 'subject',
      type: 'text',
      name: 'subject',
      label: 'Subject',
      value: value,
      onChangeHandler: jest.fn(),
      validate: mockValidate,
      setInputIsValid: jest.fn(),
    };
    render(<TextInput {...requiredProps} />);

    await user.type(screen.getByRole('textbox'), 'Humans');

    const errorOne = screen.queryByText('Fake error message');
    const errorTwo = screen.queryByText('Another fake error message');

    expect(errorOne).toBeInTheDocument();
    expect(errorTwo).toBeInTheDocument();
  });
});
