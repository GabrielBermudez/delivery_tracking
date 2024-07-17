export const BASE_URL = 'http://localhost:8080';
export const WS_BASE_URL = 'ws://localhost:8080/websocket';

export const routes = {
  coordenadas: {
    enviar: 'taxiapp/send-coordenada',
  },
  mensaje: {
    enviar: 'taxiapp/chat/send-mensaje-cliente',
  },
  pedidos: {
    detallePedido: 'pedidos/detalle-pedido',
  },
};