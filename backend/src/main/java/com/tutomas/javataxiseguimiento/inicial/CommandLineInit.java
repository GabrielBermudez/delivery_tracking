package com.tutomas.javataxiseguimiento.inicial;

import com.tutomas.javataxiseguimiento.model.Coordenada;
import org.springframework.boot.CommandLineRunner;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Component
public class CommandLineInit implements CommandLineRunner {

    private final RestTemplate restTemplet = new RestTemplate();
    private final String url = "http://localhost:8080/taxiapp/send-coordenada";

    @Override
    public void run(String... args) throws Exception {
        /*List<Coordenada> coordenadas = new ArrayList<>();
        coordenadas.add(new Coordenada(51.50520527706977, -0.1382001014766732));
        coordenadas.add(new Coordenada(51.506060471919554, -0.13905812530414122));
        coordenadas.add(new Coordenada(51.5070225469402, -0.1400877538971268));
        coordenadas.add(new Coordenada(51.507663919001885, -0.14077417295909722));
        coordenadas.add(new Coordenada(51.50851906770676, -0.138714915773146));
        coordenadas.add(new Coordenada(51.50873285237517, -0.13734207764918516));
        coordenadas.add(new Coordenada(51.50958798101733, -0.13579763475972675));
        coordenadas.add(new Coordenada(51.51022931696616, -0.13476800616674112));
        coordenadas.add(new Coordenada(51.51129819015172, -0.13356677280825793));
        coordenadas.add(new Coordenada(51.51193950202568, -0.1316791203878043));
        coordenadas.add(new Coordenada(51.512901452909205, -0.12961986320185306));
        coordenadas.add(new Coordenada(51.51193950202568, -0.12876183937436506));
        coordenadas.add(new Coordenada(51.51097753082923, -0.12841862984338984));
        coordenadas.add(new Coordenada(51.50958798101733, -0.127903815546897));
        coordenadas.add(new Coordenada(51.508839744333166, -0.12738900125040423));
        coordenadas.add(new Coordenada(51.5079846016471, -0.12721739648490663));
        coordenadas.add(new Coordenada(51.509053527496846, -0.12498653453345777));
        coordenadas.add(new Coordenada(51.50990865012026, -0.12275567258200895));
        coordenadas.add(new Coordenada(51.51097753082923, -0.1203532058650625));
        coordenadas.add(new Coordenada(51.51129819015172, -0.11829394867911128));
        coordenadas.add(new Coordenada(51.51022931696616, -0.11812234391361366));
        coordenadas.add(new Coordenada(51.50948109081482, -0.1191519725065793));
        coordenadas.add(new Coordenada(51.50862596016634, -0.1208680201615553));
        coordenadas.add(new Coordenada(51.50723633863057, -0.12155443922352573));
        coordenadas.add(new Coordenada(51.50616737014722, -0.12292727734750654));
        coordenadas.add(new Coordenada(51.504456968409706, -0.12327048687850174));
        coordenadas.add(new Coordenada(51.50328102997258, -0.12361369640949693));
        coordenadas.add(new Coordenada(51.5018912454229, -0.12412851070596977));
        coordenadas.add(new Coordenada(51.50114288234036, -0.12378530117499453));
        coordenadas.add(new Coordenada(51.50082215154299, -0.12172604398902334));
        coordenadas.add(new Coordenada(51.500715240775605, -0.11880876297560407));
        coordenadas.add(new Coordenada(51.500501418488426, -0.11760752961712086));
        coordenadas.add(new Coordenada(51.500501418488426, -0.11709271532062805));
        coordenadas.add(new Coordenada(51.499004634388534, -0.112802596183228));
        coordenadas.add(new Coordenada(51.498149307117934, -0.11040012946628153));
        coordenadas.add(new Coordenada(51.49761471942267, -0.1079976627493351));
        coordenadas.add(new Coordenada(51.496224762070554, -0.10473717220490066));
        coordenadas.add(new Coordenada(51.49697320591172, -0.10422235790842782));
        coordenadas.add(new Coordenada(51.497507801131185, -0.10353593884643743));
        coordenadas.add(new Coordenada(51.498790804075725, -0.10456556743942304));
        coordenadas.add(new Coordenada(51.50039450696865, -0.10490877697039826));
        coordenadas.add(new Coordenada(51.50146361088052, -0.10456556743942304));
        coordenadas.add(new Coordenada(51.50242578295791, -0.10422235790842782));

        enviarCoordenadasPeriodicamente(coordenadas);*/
    }

    private void enviarCoordenadasPeriodicamente(List<Coordenada> coordenadas) {
        for (Coordenada coordenada : coordenadas) {
            enviarCoordenada(coordenada);
            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

    private void enviarCoordenada(Coordenada coordenada) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Coordenada> requestEntity = new HttpEntity<>(coordenada, headers);

        ResponseEntity<Coordenada> responseEntity = restTemplet.postForEntity(url, requestEntity, Coordenada.class);

        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            System.out.println("Coordenada enviada>>>: " + coordenada);
        } else {
            System.out.println("Error al enviar coordenada: " + coordenada);
        }
    }
}
