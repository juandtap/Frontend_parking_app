import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../model/ticket';

const urlbase = "http://localhost:8080/parking_app/webservice/parking/"

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  save(ticket: Ticket){
    console.log("Servicio POST")
    console.log("ticket para el vehiculo : "+ticket.vehiculo.placa)

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    return this.http.post<any>(urlbase+"nuevoticket", JSON.stringify(ticket), {headers})

  }

  getAll(){
    return this.http.get<Ticket[]>(urlbase+"tickets")
  }

  // si los campos del cliente fueron llenados se actualiza el ticket
  // antes de marcar la hora de salida
  updateClientData(ticket: Ticket){
    console.log("Servicio PUT")
    console.log("Se actualiza informacion del cliente en el ticket : "+ticket.id)

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    return this.http.put<any>(urlbase+"actualizardatoscliente", JSON.stringify(ticket), {headers})
  }

  updateEndTime(ticket: Ticket){
    console.log("Servicio PUT")
    console.log("Se marca hora de salida en el ticket : "+ticket.id)

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    return this.http.put<any>(urlbase+"actualizarticket", JSON.stringify(ticket), {headers})
  }
}
