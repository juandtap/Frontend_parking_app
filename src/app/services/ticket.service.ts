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
}
