import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-parqueadero',
  templateUrl: './parqueadero.component.html',
  styleUrls: ['./parqueadero.component.css']
})
export class ParqueaderoComponent {

  vehiculoList: any
  displayedColumns: string[] = ['Placa', 'Entrada','Salida'];

  

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(private vehiucloService: VehiculoService, private router: Router){
      this.vehiculoList =  this.vehiucloService.getAll()
    

}
}
