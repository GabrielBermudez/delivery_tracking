import React, { useRef, useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import CocheSVG from "./CocheSVG";
import { Client } from "@stomp/stompjs";
import { Chat } from "./Components/Chat";

function EvtClickMapa({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    },
  });
}

export default function App() {
  const [position, setPosition] = useState([48.8583701, 2.292985]);
  const [posicionCoche, setPosicionCoche] = useState([0, 0]);
  const [posicionAnterior, setPosicionAnterior] = useState([0, 0]);
  const [anguloCoche, setAnguloCoche] = useState(0);
  const [mensajes, setMensajes] = useState([]);

  const webSocketRef = useRef(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 5; // Máximo número de intentos de reconexión
  const retryDelay = 2000;

  const connectWebSocket = () => {
    if (webSocketRef.current) {
      webSocketRef.current.close();
    }

    const ws = new WebSocket("ws://localhost:8080/websocket"); // Reemplaza con tu URL y puerto WebSocket
    webSocketRef.current = ws;

    ws.onopen = () => {
      setRetryCount(0);

      // Suscribirse a /taxi/coordenada y /taxi/mensaje
      ws.send(JSON.stringify({
        type: 'subscribe',
        destination: '/taxi/coordenada'
      }));

      ws.send(JSON.stringify({
        type: 'subscribe',
        destination: '/taxi/mensaje'
      }));
    };

    ws.onmessage = (event) => {
      const mensaje = JSON.parse(event.data);

      switch (mensaje.type) {
        case "coordenada":
          const puntoNuevo = [mensaje.data.x, mensaje.data.y];
          const anguloNuevo = calcularAnguloDireccionGPS(posicionAnterior, puntoNuevo);
          setPosicionAnterior(puntoNuevo);
          setPosicionCoche([mensaje.data.x, mensaje.data.y]);
          setPosition([mensaje.data.x, mensaje.data.y]); // Actualizar position aquí
          setAnguloCoche(anguloNuevo);
          break;
        case "mensaje-cliente":
          setMensajes((prevMensajes) => [...prevMensajes, mensaje.data]);
          break;
        default:
          break;
      }
    };

    ws.onclose = () => {
      if (retryCount < maxRetries) {
        setTimeout(() => {
          setRetryCount(retryCount + 1);
          connectWebSocket();
        }, retryDelay);
      } else {
      }
    };
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.onclose = null;
        webSocketRef.current.close();
      }
    };
  }, []);

  const svgIconoCoche = L.divIcon({
    html: `<div class='svg-icon' style="transform: rotate(${anguloCoche}deg);">${CocheSVG}</div>`,
    className: "svg-icon",
  });

  const calcularAnguloDireccionGPS = (puntoAnterior, puntoNuevo) => {
    const [lat1, lon1] = puntoAnterior;
    const [lat2, lon2] = puntoNuevo;

    const deltaX = lat2 - lat1;
    const deltaY = lon2 - lon1;
    const anguloRad = Math.atan2(deltaY, deltaX);
    const anguloGrados = (anguloRad * 180) / Math.PI;
    return anguloGrados;
  };

  const mapKey = position.join(","); // Generar una clave única basada en la posición actual

  return (
    <div className="container">
      <div className="mapContainer">
        <MapContainer key={mapKey} center={position} zoom={20} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <EvtClickMapa
            onClick={(c) =>
              console.log(
                "coordenadas.add(new Coordenada(" + c.lat + ", " + c.lng + "));"
              )
            }
          />
          <Marker position={posicionCoche} icon={svgIconoCoche} />
        </MapContainer>
      </div>
      <div className="chatContainer">
        <Chat mensajes={mensajes} setMensajes={setMensajes} />
      </div>
    </div>
  );
}
