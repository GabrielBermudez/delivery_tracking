package com.tutomas.javataxiseguimiento.controller;

import com.tutomas.javataxiseguimiento.model.Pedido;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/pedidos")
public class PedidosController {

    LocalDateTime horaActual = LocalDateTime.now();
    LocalDateTime horaEstimada = horaActual.plusHours(1);
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
    String horaEstimadaFormateada = horaEstimada.format(formatter);

    @GetMapping("/detalle-pedido")
    public Pedido getDetallePedido() {
        // Crear un objeto de Pedido con datos de ejemplo
        Pedido pedido = new Pedido(
                "Pizza Muzzarella",
                "Pizza a la piedra",
                150.75,
                horaEstimadaFormateada,
                -32.9031628,
                -68.7975735
        );

        return pedido;
    }
}
