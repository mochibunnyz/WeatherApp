import React from 'react';
import { render } from '@testing-library/react-native';
import ExtraInfo from '../components/extraInfo';

// Mock the location prop
// Mock the weatherData prop
const mockWeatherData = {
  main: {
    temp_min: 10, 
    temp_max: 30, 
    feels_like: 20, 
    humidity: 50, 
  },
  wind: {
    speed: 5, 
  },
  visibility: 10, 
  sys: { 
    sunrise: 1631827200, 
    sunset: 1631870700, 
  },
  dt: 1631849412, 
  timezone: 3600,
};

// Mock the FontAwesome5, MaterialCommunityIcons, and MaterialIcons components
jest.mock('@expo/vector-icons', () => ({
    FontAwesome5: 'FontAwesome5',
    MaterialCommunityIcons: 'MaterialCommunityIcons',
    MaterialIcons: 'MaterialIcons',
    Feather: 'Feather',
}));


test('renders ExtraInfo component correctly', () => {
  const { getByText } = render(<ExtraInfo weatherData={mockWeatherData} />);

  // Write your assertions here to check if the component renders as expected
  expect(getByText('More Information')).toBeTruthy();
  
  expect(getByText('Min. Temp')).toBeTruthy();
  expect(getByText('Max. Temp')).toBeTruthy()
  expect(getByText('Feels like')).toBeTruthy();
  expect(getByText('Humidity')).toBeTruthy();
  expect(getByText('Wind')).toBeTruthy();
  expect(getByText('Visibility')).toBeTruthy();
  expect(getByText('Sunrise')).toBeTruthy();
  expect(getByText('Sunset')).toBeTruthy();
});