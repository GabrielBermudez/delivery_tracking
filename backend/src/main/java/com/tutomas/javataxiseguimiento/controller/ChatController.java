package com.tutomas.javataxiseguimiento.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tutomas.javataxiseguimiento.config.WebSocketHandler;
import com.tutomas.javataxiseguimiento.model.Mensaje;
import com.tutomas.javataxiseguimiento.model.MessagePayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/taxiapp/chat")
public class ChatController {

    private final WebSocketHandler webSocketHandler;

    @Autowired
    public ChatController(WebSocketHandler webSocketHandler) {
        this.webSocketHandler = webSocketHandler;
    }

    @PostMapping("/send-mensaje-cliente")
    public void sendMensajeCliente(@RequestBody Mensaje mensaje) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonString = objectMapper.writeValueAsString(new MessagePayload<>("mensaje-cliente", mensaje));
        TextMessage textMessage = new TextMessage(jsonString);
        webSocketHandler.sendMessageToSubscribers(textMessage);
    }

    @PostMapping("/send-mensaje-delivery")
    public void sendMensajeDelivery(@RequestBody Mensaje mensaje) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonString = objectMapper.writeValueAsString(new MessagePayload<>("mensaje-delivery", mensaje));
        TextMessage textMessage = new TextMessage(jsonString);
        webSocketHandler.sendMessageToSubscribers(textMessage);
    }
}
