import { Platform } from 'react-native';

export default getApiUrl = () => {
  let apiUrl;

  if (Platform.OS === 'android') {
    apiUrl = 'http://10.0.2.2:3100'; // Android emulator
  } else if (Platform.OS === 'ios') {
    apiUrl = 'http://localhost:3100'; // iOS simulator
  } else {
    apiUrl = 'http://localhost:3100'; // Default to localhost
  }
  return apiUrl;
}
