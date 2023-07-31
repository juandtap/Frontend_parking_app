import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Factura } from '../model/factura';


const urlbase = "http://localhost:8080/parking_app/webservice/parking/"
@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) { }


  save(factura : Factura){
    console.log("Servicio POST")
    console.log("factura: "+factura.numero)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<any>(urlbase+"nuevafactura", JSON.stringify(factura), { headers })
  }


  getAll(){
    return this.http.get<Factura[]>(urlbase+"facturas")
  }
}
