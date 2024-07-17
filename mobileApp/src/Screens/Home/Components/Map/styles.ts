import { StyleSheet } from 'react-native';

export const makeStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    mapView: {
      width: '100%',
      marginLeft:5,
      overflow:"hidden",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    markerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    markerImage: {
      width: 27,
      height: 39.14,
      resizeMode: 'contain',
    },
    callout: {
      width: 250,
      padding: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: 10,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 14,
      color: '#d9eb72',
    },
    description: {
      marginTop: 5,
      fontSize: 12,
      color: '#d9eb72',
    },
    buttonMapContainer: {
      alignItems: 'flex-end',
      padding: 20,
    },
    buttonMapView: {
      backgroundColor: '#f5f1e9',
      padding: 10,
      width: 46,
      height: 46,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
  });
};
