import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TextField from '../../components/TextField';

describe('TextField Component', () => {
  it('renders label when provided', () => {
    const { getByText } = render(<TextField label="Test Label" onChangeText={() => {}} value="" />);
    expect(getByText('Test Label')).toBeDefined();
  });

  it('renders error message when provided', () => {
    const { getByText } = render(<TextField onChangeText={() => {}} value="" errorMessage="Test Error" />);
    expect(getByText('Test Error')).toBeDefined();
  });

  it('calls onChangeText when text is entered', () => {
    const onChangeTextMock = jest.fn();
    const { getByDisplayValue } = render(<TextField onChangeText={onChangeTextMock} value="" />);
    fireEvent.changeText(getByDisplayValue(''), 'test input');
    expect(onChangeTextMock).toHaveBeenCalledWith('test input');
  });

  it('renders input with provided value', () => {
    const { getByDisplayValue } = render(<TextField onChangeText={() => {}} value="Test Value" />);
    expect(getByDisplayValue('Test Value')).toBeDefined();
  });

  it('renders input with provided inputMode', () => {
    const { getByTestId } = render(<TextField onChangeText={() => {}} value="" inputMode="numeric" />);
    expect(getByTestId('text-input').props.inputMode).toBe('numeric');
  });
});
