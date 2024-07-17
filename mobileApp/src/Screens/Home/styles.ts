import { StyleSheet } from 'react-native';

export const makeStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    mapContainer: {
      flex: 0.6,
    },
    chatContainer: {
      flex: 0.4,
    },
  });
};
