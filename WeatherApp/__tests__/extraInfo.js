import React from 'react';
import { render } from '@testing-library/react-native';
import ExtraInfo from '../components/extraInfo';

// Mock the location prop
const mockLocation = {
  main: {
    feels_like: 20, // Example data
    humidity: 50,   // Example data
  },
  wind: {
    speed: 5,      // Example data
  },
  visibility: 10,  // Example data
};

// Mock the FontAwesome5, MaterialCommunityIcons, and MaterialIcons components
jest.mock('@expo/vector-icons', () => ({
    FontAwesome5: 'FontAwesome5',
    MaterialCommunityIcons: 'MaterialCommunityIcons',
    MaterialIcons: 'MaterialIcons',
}));


test('renders ExtraInfo component correctly', () => {
  const { getByText } = render(<ExtraInfo location={mockLocation} />);

  // Write your assertions here to check if the component renders as expected
  expect(getByText('More Information')).toBeTruthy();
  expect(getByText('Feels like')).toBeTruthy();
  expect(getByText('Humidity')).toBeTruthy();
  expect(getByText('Wind')).toBeTruthy();
  expect(getByText('Visibility')).toBeTruthy();
});