package com.tutomas.javataxiseguimiento.model;

public class Pedido {
    private String nombre;
    private String descripcion;
    private double precio;
    private String horaEstimada;
    private double latitud;
    private double longitud;

    public Pedido(String nombre, String descripcion, double precio, String horaEstimada, double latitud, double longitud) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.horaEstimada = horaEstimada;
        this.latitud = latitud;
        this.longitud = longitud;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getHoraEstimada() {
        return horaEstimada;
    }

    public void setHoraEstimada(String horaEstimada) {
        this.horaEstimada = horaEstimada;
    }

    public double getLatitud() {
        return latitud;
    }

    public void setLatitud(double latitud) {
        this.latitud = latitud;
    }

    public double getLongitud() {
        return longitud;
    }

    public void setLongitud(double longitud) {
        this.longitud = longitud;
    }
}
