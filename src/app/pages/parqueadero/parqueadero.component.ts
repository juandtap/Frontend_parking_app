import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NavigationExtras, Router } from '@angular/router';
import { Vehiculo } from 'src/app/model/vehiculo';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-parqueadero',
  templateUrl: './parqueadero.component.html',
  styleUrls: ['./parqueadero.component.css']
})
export class ParqueaderoComponent{
 
  ticketList: any;

  displayedColumns: string[] = ['Placa', 'Marca', 'Entrada','Salida'];

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(private ticketService: TicketService, private router: Router){
    this.ticketList =  this.ticketService.getAll()
    

}

goToFacture(vehiculo: Vehiculo) {

  //const tarifaJson = JSON.stringify(tarifa);
  let params: NavigationExtras = {
    queryParams: {
      vehiculoToEdit: vehiculo,
    },
  };
  this.router.navigate(['pages/facturas-add'], params);

}



}
