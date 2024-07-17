import React, { useEffect, useState } from 'react';
import { makeStyles } from './styles';
import { View } from 'react-native';
import { Map } from './Components/Map';
import { Chat } from './Components/Chat';
import axios from 'axios';
import { BASE_URL, routes } from '../../Utils/routes';
import { IDetallePedido } from '../../Interfaces/iDetallePedido';

export const Home = () => {
  const styles = makeStyles();

  const [ detallePedido, setDetallePedido ] = useState( {} as IDetallePedido );

  useEffect( () => {
    onHandleGetDetallePedido();
  }, [] );

  const onHandleGetDetallePedido = async () => {
    const { data } = await axios.get(
      `${ BASE_URL }/${ routes.pedidos.detallePedido }`,
    );
    
    setDetallePedido(data);
  };

  return (
    <View style={ styles.container }>
      <View style={ styles.mapContainer }>
        <Map detallePedido={detallePedido} />
      </View>
      <View style={ styles.chatContainer }>
        <Chat />
      </View>
    </View>
  );
};
