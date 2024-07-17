package com.tutomas.javataxiseguimiento.config;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class WebSocketHandler extends TextWebSocketHandler {

    private List<WebSocketSession> sessions = new ArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
        System.out.println("Conexión establecida: " + session.getId());
        sessions.add(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println("Mensaje recibido desde cliente: " + message.getPayload());
        // Aquí puedes procesar el mensaje si es necesario
        sendMessageToSubscribers(message);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        System.out.println("Conexión cerrada: " + session.getId());
        sessions.remove(session);
    }

    public void sendMessageToSubscribers(TextMessage message) throws IOException {
        for (WebSocketSession session : sessions) {
            session.sendMessage(message);
        }
    }
}
