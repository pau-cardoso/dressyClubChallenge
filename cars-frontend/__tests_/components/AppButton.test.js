import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AppButton from '../../components/AppButton';

describe('<AppButton />', () => {
  it('renders correctly', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<AppButton onPress={onPressMock}>Press Me</AppButton>);
    expect(getByText('Press Me')).toBeDefined();
  });

  it('calls onPress callback when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<AppButton onPress={onPressMock}>Press Me</AppButton>);
    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});