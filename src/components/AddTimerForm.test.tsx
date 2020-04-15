import React from 'react';
import { render } from '@testing-library/react';
import AddTimerForm from './AddTimerForm';
import userEvent from '@testing-library/user-event';

describe('AddTimeForm component', () => {
  it('should render properly', () => {
    const { getAllByLabelText, getAllByPlaceholderText, getByRole } = render(<AddTimerForm />);
    expect(getAllByPlaceholderText('Countdown')).toHaveLength(1);
    expect(getAllByPlaceholderText('Reminder note')).toHaveLength(1);
    expect(getAllByLabelText('Auto repeat?', { selector: 'input' })).toHaveLength(1);
    expect(getByRole('button')).toHaveAttribute('type', 'submit');
    expect(getByRole('button')).toHaveTextContent('Add');
  });

  it('should trigger onSubmit callback on form submit', () => {
    const mockCallback = jest.fn();
    const { getByRole, getByPlaceholderText } = render(<AddTimerForm onSubmit={mockCallback} />);
    expect(mockCallback).not.toHaveBeenCalled();
    userEvent.type(getByPlaceholderText('Countdown'), '30');
    userEvent.type(getByPlaceholderText('Reminder note'), 'Stretch time');
    getByRole('button').click();
    expect(mockCallback).toHaveBeenCalled();
  });

  it('should clear form field values after submission', () => {
    const { debug, getByRole, getByPlaceholderText, getByLabelText } = render(<AddTimerForm onSubmit={jest.fn()} />);
    const countdownInput = getByPlaceholderText('Countdown');
    const noteInput = getByPlaceholderText('Reminder note');
    const checkbox = getByLabelText('Auto repeat?', { selector: 'input' });
    userEvent.type(countdownInput, '30');
    userEvent.type(noteInput, 'Stretch time');
    checkbox.click();
    expect(countdownInput).toHaveValue('30');
    expect(noteInput).toHaveValue('Stretch time');
    expect(checkbox).toBeChecked();

    getByRole('button').click();
    expect(countdownInput).toHaveValue('');
    expect(noteInput).toHaveValue('');
    expect(checkbox).not.toBeChecked();
  });
});
