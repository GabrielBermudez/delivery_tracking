package com.tutomas.javataxiseguimiento.controller;

import com.tutomas.javataxiseguimiento.model.Mensaje;
import com.tutomas.javataxiseguimiento.model.MessagePayload;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MensajeController {

    @MessageMapping("/taxi/cliente")
    @SendTo("/taxi/mensaje")
    public Mensaje mensajeEnvio(
            Mensaje mensaje
    ) {
        System.out.println("1- Mensaje recibido desde el cliente: " + mensaje);
        return new MessagePayload<>("mensaje-cliente", mensaje).getData();
    }

    @MessageMapping("/taxi/delivery")
    @SendTo("/taxi/mensaje-delivery")
    public Mensaje mensajeEnvioDelivery(
            Mensaje mensaje
    ) {
        System.out.println("2- Mensaje recibido desde el cliente: " + mensaje);
        return new MessagePayload<>("mensaje-delivery", mensaje).getData();
    }

}
