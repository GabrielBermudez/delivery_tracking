import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { makeStyles } from './styles';
import { requestLocationPermission } from '../../../../Utils/locationPermission';
import MapView, { Callout, Marker, Region } from 'react-native-maps';
import { mapStyle } from '../../../../Assets/MapStyle';
import Geolocation from 'react-native-geolocation-service';
import { IDetallePedido } from '../../../../Interfaces/iDetallePedido';
import MapViewDirections from 'react-native-maps-directions';
import CrossHairSvg from '../../../../Assets/CrossHairSvg';

type IMapProps = {
  detallePedido: IDetallePedido;
};

export const Map = ( { detallePedido }: IMapProps ) => {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyCsQoIV_crOup9KkteExz540Rs4yown-tQ';
  const styles = makeStyles();

  const mapRef = useRef<MapView>(null);

  const [ initialRegion, setInitialRegion ] = useState( {} as Region );
  const [ carPosition, setCarPosition ] = useState( {
    latitude: 0,
    longitude: 0,
  } );
  const [ isOnSubscribe, setIsOnSuscribe ] = useState( false );

  useEffect( () => {
    getLocation();
  }, [] );

  useEffect( () => {
    if ( isOnSubscribe ) {
      const watchId = Geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCarPosition( { latitude, longitude } );
          setInitialRegion( {
            ...initialRegion,
            latitude,
            longitude,
          } );
        },
        error => {
          console.error( 'Error watching position:', error );
        },
      );
      return () => {
        Geolocation.clearWatch( watchId );
      };
    }
  }, [ isOnSubscribe ] );

  const getLocation = () => {
    const result = requestLocationPermission();

    result.then( res => {
      if ( res ) {
        Geolocation.getCurrentPosition(
          position => {
            setInitialRegion( {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            } );
            setCarPosition( {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            } );
            setIsOnSuscribe( true );
          },
          _ => { },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    } );
  };

  const onHandlerRelocate = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(initialRegion, 1000);
    }
  };

  const PedidoMarker = ( detallePedido: IDetallePedido ) => {
    return (
      <Marker
        coordinate={ { latitude: detallePedido.latitud, longitude: detallePedido.longitud } }
        title={ detallePedido.nombre }
      >
        <Callout tooltip>
          <View style={ styles.callout }>
            <Text style={ styles.title }>{ detallePedido.nombre }</Text>
            <Text style={ styles.description }>
              Su pedido será entregado a las { detallePedido.horaEstimada }. El costo total es de ${ detallePedido.precio }
            </Text>
          </View>
        </Callout>
      </Marker>
    );
  };


  return (
    <View style={ styles.container }>
      { Object.keys( initialRegion ).length > 0 && (
        <>
          <MapView
            ref={mapRef}
            initialRegion={ initialRegion }            
            customMapStyle={ mapStyle }
            style={ styles.map }
            userLocationUpdateInterval={ 1000 }
            userLocationFastestInterval={ 1000 }
            loadingEnabled={ true }
          >
            <Marker
              coordinate={ {
                latitude: carPosition.latitude,
                longitude: carPosition.longitude,
              } }>
              <View style={ styles.markerContainer }>
                <Image
                  source={ require( '../../../../Assets/coche.png' ) }
                  style={ styles.markerImage }
                />
              </View>
            </Marker>
            {
              Object.keys( detallePedido ).length > 0 && (
                <>
                  { PedidoMarker( detallePedido ) }
                  <MapViewDirections
                    origin={ initialRegion }
                    destination={ { latitude: detallePedido.latitud, longitude: detallePedido.longitud } }
                    apikey={ GOOGLE_MAPS_APIKEY }
                    strokeWidth={ 3 }
                    strokeColor={ 'red' }
                  />
                </>
              )
            }
          </MapView>
          <View style={ styles.buttonMapContainer }>
            <Pressable
              style={ styles.buttonMapView }
              onPress={ () => onHandlerRelocate() }>
              <CrossHairSvg />
            </Pressable>
          </View>
        </>
      ) }
    </View>
  );
};
