import React from 'react';
import { render } from '@testing-library/react-native';
import CarRow from '../../components/CarRow';

describe('CarRow Component', () => {
  const car = {
    _id: '1',
    model: 'Test Model',
    brand: { _id: '1', name: 'Test Brand' },
    color: { _id: '1', name: 'Test Color' },
    value: 10000,
    production_cost: 5000,
    transportation_cost: 2000,
  };

  it('renders car properties when not editing', () => {
    const { getByText } = render(<CarRow car={car} />);
    expect(getByText('Test Model')).toBeDefined();
    expect(getByText('Test Brand')).toBeDefined();
    expect(getByText('Test Color')).toBeDefined();
    expect(getByText('$10,000.00')).toBeDefined(); // Assuming USDollar format
    expect(getByText('$5,000.00')).toBeDefined(); // Assuming USDollar format
    expect(getByText('$2,000.00')).toBeDefined(); // Assuming USDollar format
    expect(getByText('$7,000.00')).toBeDefined(); // Assuming USDollar format
  });
});
