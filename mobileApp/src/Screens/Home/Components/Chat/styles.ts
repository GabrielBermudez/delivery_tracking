import { StyleSheet } from 'react-native';

export const makeStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f1e9',
      borderRadius: 20,
      paddingVertical: 10,
    },
    flatListContainer: {
      flex: 1,
      marginBottom: 60,
    },
    row: {
      marginVertical: 5,
      marginHorizontal: 20,
      paddingVertical: 5,
      paddingHorizontal: 10,
      flexDirection: 'row',
      borderRadius: 10,
      backgroundColor: '#363638',
      alignItems: 'center',
      alignSelf: 'flex-start',
    },
    rowDelivery: {
      marginVertical: 5,
      marginHorizontal: 20,
      paddingVertical: 5,
      paddingHorizontal: 10,
      flexDirection: 'row',
      borderRadius: 10,
      backgroundColor: '#005046',
      alignItems: 'center',
      alignSelf: 'flex-end',
    },
    logoUser: {
      width: 30,
      height: 30,
    },
    textContainer: {
      paddingLeft: 10,
      paddingRight: 30,
    },
    messageText: {
      color: 'white',
      fontSize: 16,
    },
    dateText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'left',
    },
    dateTextDelivery: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'right',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 5,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#f5f1e9',
    },
    textInput: {
      flex: 1,
      height: 40,
      backgroundColor: '#fff',
      borderWidth: 0.5,
      borderRadius: 20,
      paddingHorizontal: 10,
      marginRight: 10,
      borderColor: 'black'
    },
    sendButton: {
      backgroundColor: '#4CAF50',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      borderWidth: 0.5,
      borderColor: 'black'
    },
    sendButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
};
