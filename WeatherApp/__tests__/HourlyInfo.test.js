import React from 'react';
import { render } from '@testing-library/react-native';
import HourlyInfo from '../components/HourlyInfo';

// Mock the FontAwesome5, MaterialCommunityIcons, and MaterialIcons components
jest.mock('@expo/vector-icons', () => ({
  FontAwesome5: 'FontAwesome5',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  MaterialIcons: 'MaterialIcons',
  Feather: 'Feather',
}));

describe('HourlyInfo Component', () => {
  const forecastData = {
    description: 'Sunny',
    minTemp: 20,
    maxTemp: 30,
    feelsLike: 25,
    humidity: 50,
    visibility: 10,
    clouds: 20,
    wind: 5,
    gust: 8,
    sunrise: '6:00 AM',
    sunset: '6:00 PM',
  };

  it('renders correctly', () => {
    const { getByText } = render(<HourlyInfo forecastData={forecastData} />);
    
    // Assertions to check if the expected elements/text are present
    expect(getByText('Forecast: Sunny')).toBeTruthy();
    expect(getByText('Min. Temp')).toBeTruthy();
    expect(getByText('Max. Temp')).toBeTruthy();
    expect(getByText('Feels like')).toBeTruthy();
    expect(getByText('Humidity')).toBeTruthy();
    expect(getByText('Visibility')).toBeTruthy();
    expect(getByText('Cloudiness')).toBeTruthy();
    expect(getByText('Wind Speed')).toBeTruthy();
    expect(getByText('Wind Gust')).toBeTruthy();
    expect(getByText('Sunrise')).toBeTruthy();
    expect(getByText('Sunset')).toBeTruthy();
    
    // Assertions to check if the corresponding weather data is displayed
    expect(getByText('20.0 °')).toBeTruthy();
    expect(getByText('30.0 °')).toBeTruthy();
    expect(getByText('25.0 °')).toBeTruthy();
    expect(getByText('50 %')).toBeTruthy();
    expect(getByText('10 km')).toBeTruthy();
    expect(getByText('20 %')).toBeTruthy();
    expect(getByText('5 m/s')).toBeTruthy();
    expect(getByText('8 m/s')).toBeTruthy();
    expect(getByText('6:00 AM')).toBeTruthy();
    expect(getByText('6:00 PM')).toBeTruthy();
    
    
  });

  // Add more test cases for different scenarios as needed
});
