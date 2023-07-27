import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehiculo } from '../model/vehiculo';

const urlbase = "http://localhost:8080/parking_app/webservice/parking/"
@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  constructor(private http: HttpClient) { }

  save(vehiculo : Vehiculo){
    console.log("Servicio POST")
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<any>(urlbase+"nuevovehiculo", JSON.stringify(vehiculo), { headers })
  }

  getAll(){
    return this.http.get<Vehiculo[]>(urlbase+"vehiculos")
  }
}
