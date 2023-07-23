import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TarifaService } from 'src/app/services/tarifa.service';

@Component({
  selector: 'app-tarifas-list',
  templateUrl: './tarifas-list.component.html',
  styleUrls: ['./tarifas-list.component.css']
})
export class TarifasListComponent {

  

  constructor(private tarifaService: TarifaService, private router: Router){

  }

  dataSource = [
     
  ]

  applyFilter(event: Event){

  }

  displayedColumns: string[] = ['id', 'Tarifa', 'Precio/Hora', 'Descripcion'];
}

// ejemplo completo en : https://material.angular.io/components/table/examples#table-overview