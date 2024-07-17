package com.tutomas.javataxiseguimiento.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tutomas.javataxiseguimiento.config.WebSocketHandler;
import com.tutomas.javataxiseguimiento.model.Coordenada;
import com.tutomas.javataxiseguimiento.model.MessagePayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.TextMessage;

import java.io.IOException;

@RestController
@RequestMapping("/taxiapp")
public class TaxiController {

    private final WebSocketHandler webSocketHandler;

    @Autowired
    public TaxiController(WebSocketHandler webSocketHandler) {
        this.webSocketHandler = webSocketHandler;
    }

    @PostMapping("/send-coordenada")
    public void sendCoordenada(@RequestBody Coordenada coordenada) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonString = objectMapper.writeValueAsString(new MessagePayload<>("coordenada", coordenada));
        TextMessage textMessage = new TextMessage(jsonString);
        webSocketHandler.sendMessageToSubscribers(textMessage);
    }
}
