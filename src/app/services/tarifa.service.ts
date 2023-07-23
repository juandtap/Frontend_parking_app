import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarifa } from '../model/tarifa';
import { Observable } from 'rxjs';

const urlbase = "http://localhost:8080/parking_app/webservice/parking/"

@Injectable({
  providedIn: 'root'
})
export class TarifaService {

  constructor(private http: HttpClient) { }

  save(tarifa : Tarifa){
    console.log("Servicio POST")
    console.log("tarifa: "+tarifa.tipoTarifa+ " "+tarifa.precioHora+" tipo :"+typeof(tarifa.precioHora))
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<any>(urlbase+"nuevatarifa", JSON.stringify(tarifa), { headers })
  }

  getAll(){
    return this.http.get<Tarifa[]>(urlbase+"tarifas")
  }
}
