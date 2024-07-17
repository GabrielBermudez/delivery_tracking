import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {makeStyles} from './styles';
import {format} from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BASE_URL, routes, WS_BASE_URL} from '../../../../Utils/routes';
import axios from 'axios';


type Item = {
  item: {
    id: number;
    date: Date;
    message: string;
    type: string;
  };
};

export const Chat = () => {
  const styles = makeStyles();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<any>([]);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  useEffect(() => {
   const ws = new WebSocket(WS_BASE_URL);

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'subscribe',
        destination: '/taxi/mensaje-delivery'
      }));
      
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'mensaje-delivery') {
        setMessages((prevMensajes: any) => [...prevMensajes, {
          id: messages.length + 1,
          message: message.data.mensaje,
          date: message.data.fecha,
          type: 'Client',
        }]);
      }
    };

    ws.onerror = (error) => {
    };

    ws.onclose = () => {
    };

    ws.addEventListener('message', (event) => {
    });

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim().length > 0) {
      axios
        .post(`${BASE_URL}/${routes.mensaje.enviar}`, {
          mensaje: inputMessage,
          fecha: format(new Date(), 'hh:mm').toString(),
        }).then((response) => {
          
        })
        .catch(error => {
          if (error.response) {
            console.log('Error response:', error.response.data);
            console.log('Error status:', error.response.status);
            console.log('Error headers:', error.response.headers);
          } else if (error.request) {
            console.log('Error request:', error.request);
          } else {
            console.log('Error message:', error.message);
          }
        });
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          message: inputMessage,
          date: new Date(),
          type: 'Delivery',
        },
      ]);
      setInputMessage('');
    }
  };

  const renderItem = ({ item }: Item) => {
    return item.type === 'Client' ? (
      <View style={styles.row}>
        <Icon name={'account'} size={30} color={'white'} />
        <View style={styles.textContainer}>
          <Text style={styles.messageText}>{item.message}</Text>
          <Text style={styles.dateText}>{item.date.toString()}</Text>
        </View>
      </View>
    ) : (
      <View style={styles.rowDelivery}>
        <View style={styles.textContainer}>
          <Text style={styles.messageText}>{item.message}</Text>
          <Text style={styles.dateTextDelivery}>
            {format(item.date, 'hh:mm')}
          </Text>
        </View>
        <Icon name={'moped'} size={30} color={'white'} />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <View style={styles.flatListContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Escribe un mensaje..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
