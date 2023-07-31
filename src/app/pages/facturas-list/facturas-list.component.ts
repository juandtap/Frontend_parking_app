import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-facturas-list',
  templateUrl: './facturas-list.component.html',
  styleUrls: ['./facturas-list.component.css']
})
export class FacturasListComponent {
  facturaList: any
  displayedColumns: string[] = ['Id', 'Numero','Fecha', 'Total', 'Ticket', 'Tarifa'];

  

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(private facturaService: FacturaService, private router: Router){
      this.facturaList =  this.facturaService.getAll()
    
     
  }

 


}
