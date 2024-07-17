import { Platform } from 'react-native';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export const requestLocationPermission = async (): Promise<boolean> => {
  const permission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  const result = await request(permission);

  if (result === RESULTS.GRANTED) {
    return true;
  } else {
    return requestLocationPermission();
  }
};