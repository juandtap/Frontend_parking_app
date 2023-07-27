import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-vehiculos-list',
  templateUrl: './vehiculos-list.component.html',
  styleUrls: ['./vehiculos-list.component.css']
})
export class VehiculosListComponent {


  vehiculoList: any
  displayedColumns: string[] = ['Placa', 'Marca','Color', 'Cedula', 'Nombre'];

  

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(private vehiucloService: VehiculoService, private router: Router){
      this.vehiculoList =  this.vehiucloService.getAll()
    
     
  }

 


 
      

}
